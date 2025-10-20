import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { 
  AIMessageRequest, 
  AIMessageResponse, 
  AI_RATE_LIMITS, 
  FORBIDDEN_TOPICS,
  AI_SYSTEM_PROMPTS,
  AISessionType
} from '@/types/ai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    // Get user from request
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      console.error('No user ID provided in request');
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    const body: AIMessageRequest = await request.json();
    const { sessionId, message, type = 'general', context } = body;

    console.log('AI Chat Request:', { userId, type, hasSession: !!sessionId });

    // 1. Safety Check
    const safetyCheck = await checkContentSafety(message);
    if (!safetyCheck.isSafe) {
      return NextResponse.json(
        { 
          error: 'Content flagged',
          reason: 'Your message contains content that violates our guidelines. Please rephrase and avoid medical, legal, or harmful topics.',
          flagged: true,
        },
        { status: 400 }
      );
    }

    // 2. Rate Limit Check
    const rateLimitCheck = await checkRateLimit(userId);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: `You've reached your ${rateLimitCheck.limitType} limit. Please try again later.`,
          resetTime: rateLimitCheck.resetTime,
        },
        { status: 429 }
      );
    }

    // 3. Get or Create Session
    let currentSessionId = sessionId;
    let session: any;

    if (sessionId) {
      // Load existing session
      const sessionDoc = await adminDb.collection('aiSessions').doc(sessionId).get();
      if (!sessionDoc.exists || sessionDoc.data()?.userId !== userId) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }
      session = { id: sessionDoc.id, ...sessionDoc.data() };
    } else {
      // Create new session
      const newSession = {
        userId,
        institutionId: null,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        type: type as AISessionType,
        status: 'active',
        messageCount: 0,
        totalTokens: 0,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        lastMessageAt: FieldValue.serverTimestamp(),
        context: context || {},
      };

      const sessionRef = await adminDb.collection('aiSessions').add(newSession);
      currentSessionId = sessionRef.id;
      session = { id: currentSessionId, ...newSession };
    }

    // 4. Get Conversation History
    if (!currentSessionId) {
      throw new Error('Session ID is required');
    }
    
    let conversationHistory: Array<{ role: string; content: string }> = [];
    
    // Only fetch history if this is an existing session (not a new one)
    if (sessionId) {
      const historySnapshot = await adminDb.collection('aiMessages')
        .where('sessionId', '==', currentSessionId)
        .orderBy('timestamp', 'asc')
        .limit(20)
        .get();

      conversationHistory = historySnapshot.docs.map(doc => ({
        role: doc.data().role,
        content: doc.data().content,
      }));
    }

    // 5. Save User Message
    const userMessage = {
      sessionId: currentSessionId,
      userId,
      role: 'user',
      content: message,
      timestamp: FieldValue.serverTimestamp(),
      flagged: false,
      metadata: context || {},
    };

    const userMessageRef = await adminDb.collection('aiMessages').add(userMessage);

    // 6. Call ChatGPT API
    const systemPrompt = AI_SYSTEM_PROMPTS[type as keyof typeof AI_SYSTEM_PROMPTS] || AI_SYSTEM_PROMPTS.general;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: rateLimitCheck.maxTokens,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ],
    });

    const assistantMessage = completion.choices[0]?.message?.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    // 7. Save Assistant Message
    const assistantMessageDoc = {
      sessionId: currentSessionId,
      userId,
      role: 'assistant',
      content: assistantMessage,
      timestamp: FieldValue.serverTimestamp(),
      tokens: tokensUsed,
      flagged: false,
    };

    const assistantMessageRef = await adminDb.collection('aiMessages').add(assistantMessageDoc);

    // 8. Update Session Stats
    await adminDb.collection('aiSessions').doc(currentSessionId).update({
      messageCount: FieldValue.increment(2), // user + assistant
      totalTokens: FieldValue.increment(tokensUsed),
      lastMessageAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // 9. Update Usage Stats
    await updateUsageStats(userId, tokensUsed, type);

    // 10. Log Audit Trail
    await logAudit(userId, currentSessionId, 'message_sent', {
      messageLength: message.length,
      tokensUsed,
      type,
    });

    // 11. Generate Follow-up Suggestions
    const suggestions = generateSuggestions(type, assistantMessage);

    // 12. Return Response
    const response: AIMessageResponse = {
      sessionId: currentSessionId!,
      message: {
        id: assistantMessageRef.id,
        content: assistantMessage,
        timestamp: new Date(),
      },
      usage: {
        tokens: tokensUsed,
        remainingDaily: rateLimitCheck.remainingDaily - 1,
        remainingMonthly: rateLimitCheck.remainingMonthly - 1,
      },
      suggestions,
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    // Check for specific OpenAI errors
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Log error for monitoring
    try {
      const userId = request.headers.get('x-user-id') || 'unknown';
      await adminDb.collection('aiAuditLogs').add({
        userId,
        sessionId: 'error',
        action: 'api_error',
        details: { error: error.message, stack: error.stack },
        timestamp: FieldValue.serverTimestamp(),
      });
    } catch (logError) {
      console.error('Failed to log audit:', logError);
    }

    return NextResponse.json(
      { 
        error: 'Failed to process message. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Safety check function
async function checkContentSafety(content: string): Promise<{ isSafe: boolean; flagged: boolean }> {
  const lowerContent = content.toLowerCase();
  
  // Check for forbidden topics
  const containsForbidden = FORBIDDEN_TOPICS.some(topic => 
    lowerContent.includes(topic.toLowerCase())
  );

  if (containsForbidden) {
    return { isSafe: false, flagged: true };
  }

  // Additional checks can be added here (e.g., external moderation API)
  
  return { isSafe: true, flagged: false };
}

// Rate limit check function
async function checkRateLimit(userId: string): Promise<{
  allowed: boolean;
  limitType?: string;
  resetTime?: Date;
  remainingDaily: number;
  remainingMonthly: number;
  maxTokens: number;
}> {
  // Get user profile to determine subscription tier
  const userDoc = await adminDb.collection('users').doc(userId).get();
  const userData = userDoc.data();
  const plan = userData?.subscription?.plan || 'free';
  
  const limits = AI_RATE_LIMITS[plan as keyof typeof AI_RATE_LIMITS] || AI_RATE_LIMITS.free;

  // Get or create usage document for today
  const today = new Date().toISOString().split('T')[0];
  const usageSnapshot = await adminDb.collection('aiUsage')
    .where('userId', '==', userId)
    .where('date', '==', today)
    .limit(1)
    .get();

  let usage: any;

  if (usageSnapshot.empty) {
    // Create new usage document
    usage = {
      userId,
      date: today,
      messagesCount: 0,
      tokensUsed: 0,
      sessionsCount: 0,
      typeBreakdown: {},
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    await adminDb.collection('aiUsage').add(usage);
  } else {
    usage = usageSnapshot.docs[0].data();
  }

  // Check daily limit
  if (usage.messagesCount >= limits.daily) {
    return {
      allowed: false,
      limitType: 'daily',
      resetTime: new Date(new Date().setHours(24, 0, 0, 0)),
      remainingDaily: 0,
      remainingMonthly: limits.monthly - usage.messagesCount,
      maxTokens: limits.maxTokensPerMessage,
    };
  }

  // Check monthly limit (would need month-wide aggregation in production)
  // For now, simplified check
  if (usage.messagesCount >= limits.monthly) {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
    nextMonth.setHours(0, 0, 0, 0);

    return {
      allowed: false,
      limitType: 'monthly',
      resetTime: nextMonth,
      remainingDaily: limits.daily - usage.messagesCount,
      remainingMonthly: 0,
      maxTokens: limits.maxTokensPerMessage,
    };
  }

  return {
    allowed: true,
    remainingDaily: limits.daily - usage.messagesCount,
    remainingMonthly: limits.monthly - usage.messagesCount,
    maxTokens: limits.maxTokensPerMessage,
  };
}

// Update usage stats
async function updateUsageStats(
  userId: string,
  tokens: number,
  type: string,
  institutionId?: string
) {
  const today = new Date().toISOString().split('T')[0];
  
  const usageSnapshot = await adminDb.collection('aiUsage')
    .where('userId', '==', userId)
    .where('date', '==', today)
    .limit(1)
    .get();

  if (!usageSnapshot.empty) {
    const usageDoc = usageSnapshot.docs[0];
    await usageDoc.ref.update({
      messagesCount: FieldValue.increment(1),
      tokensUsed: FieldValue.increment(tokens),
      [`typeBreakdown.${type}`]: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
}

// Audit logging
async function logAudit(
  userId: string,
  sessionId: string,
  action: string,
  details: any
) {
  try {
    await adminDb.collection('aiAuditLogs').add({
      userId,
      sessionId,
      action,
      details,
      timestamp: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to log audit:', error);
    // Don't throw - audit logging failure shouldn't break the main flow
  }
}

// Generate follow-up suggestions
function generateSuggestions(type: string, response: string): string[] {
  const suggestions: Record<string, string[]> = {
    'study-help': [
      'Can you explain this in a different way?',
      'Do you have any practice problems?',
      'What are the key points I should remember?',
    ],
    'career-guidance': [
      'What qualifications do I need for this career?',
      'What are the job prospects in this field?',
      'Can you suggest similar career paths?',
    ],
    'course-support': [
      'How do I submit my assignment?',
      'Where can I find additional resources?',
      'Can you clarify the assessment criteria?',
    ],
    'motivation': [
      'How can I stay focused while studying?',
      'What should I do when I feel overwhelmed?',
      'Can you give me some study tips?',
    ],
  };

  return suggestions[type] || [
    'Tell me more',
    'Can you give an example?',
    'What else should I know?',
  ];
}

