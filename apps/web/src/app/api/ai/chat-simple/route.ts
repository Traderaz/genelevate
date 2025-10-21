import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Simple in-memory storage for development (sessions stored in memory)
const sessions = new Map<string, any[]>();

export async function POST(request: NextRequest) {
  try {
    console.log('🤖 AI Chat API called');
    
    // Get user from request
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      console.error('❌ No user ID in request');
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId, message, type = 'general' } = body;

    console.log('✅ AI Chat Request:', { userId, type, message: message.substring(0, 50), hasSession: !!sessionId });

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OpenAI API key not found');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }
    
    console.log('✅ OpenAI API key found');

    // Generate session ID if not provided
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Get conversation history from memory
    let conversationHistory = sessions.get(currentSessionId) || [];

    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message,
    });

    // System prompts by type
    const systemPrompts: Record<string, string> = {
      'general': 'You are Gen Elevate AI, an advanced AI assistant created specifically for Gen Elevate educational platform. You help students with their academic journey. Provide clear, encouraging, and educational responses. Never mention other AI systems or companies - you are Gen Elevate AI.',
      'study-help': 'You are Gen Elevate AI, an expert educational tutor. Break down complex academic concepts into simple explanations. Use examples and encourage critical thinking. Help students master their subjects with patience and clarity.',
      'career-guidance': 'You are Gen Elevate AI, a career advisor helping students explore their future. Provide information about different careers, required qualifications, university options, and growth opportunities. Guide students towards fulfilling career paths.',
      'course-support': 'You are Gen Elevate AI, a dedicated course support assistant. Help students understand course materials, assignment requirements, and learning resources. Support their academic success with practical guidance.',
      'motivation': 'You are Gen Elevate AI, a supportive mentor helping students stay motivated and confident. Provide encouragement, study tips, and strategies for overcoming academic challenges. Inspire students to reach their full potential.',
    };

    const systemPrompt = systemPrompts[type] || systemPrompts['general'];

    // Call OpenAI API
    console.log('📡 Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ],
    });
    
    console.log('✅ OpenAI response received');

    const assistantMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    const tokensUsed = completion.usage?.total_tokens || 0;

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage,
    });

    // Store updated history (keep last 20 messages)
    sessions.set(currentSessionId, conversationHistory.slice(-20));

    // Generate suggestions
    const suggestions = [
      'Tell me more',
      'Can you give an example?',
      'What else should I know?',
    ];

    // Return response
    const response = {
      sessionId: currentSessionId,
      message: {
        id: `msg_${Date.now()}`,
        content: assistantMessage,
        timestamp: new Date(),
      },
      usage: {
        tokens: tokensUsed,
        remainingDaily: 50,
        remainingMonthly: 500,
      },
      suggestions,
    };

    console.log('✅ Sending response to client');
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
        { error: 'AI service configuration error. Please check your OpenAI API key.' },
        { status: 500 }
      );
    }

    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI quota exceeded. Please check your billing.' },
        { status: 503 }
      );
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

