import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { 
  DebateScoringResponse, 
  DEBATE_SCORING_WEIGHTS,
  DEBATE_POINTS 
} from '@/types/debates';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      submissionId,
      debateTitle,
      debateDescription,
      position,
      content,
      type,
      transcript,
    } = body;

    // Validate inputs
    if (!submissionId || !debateTitle || !content || !position || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`🎯 Scoring debate submission: ${submissionId}`);
    console.log(`   Type: ${type}, Position: ${position}`);

    // Use transcript for video/audio, content for text
    const textToScore = type === 'text' ? content : (transcript || content);

    // Score the submission using OpenAI
    const prompt = buildScoringPrompt(
      debateTitle,
      debateDescription,
      position,
      textToScore,
      type
    );

    const completion = await openAI.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.3, // Lower temperature for more consistent scoring
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: DEBATE_SCORING_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: prompt
        }
      ],
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    const scoringData = JSON.parse(responseText);

    // Calculate overall score using weights
    const overallScore = calculateOverallScore(scoringData.scores);

    // Determine rewards based on score
    const pointsEarned = calculatePoints(overallScore);
    const badgesEarned = determineBadges(scoringData.scores, overallScore);

    const response: DebateScoringResponse = {
      submissionId,
      scores: {
        clarity: scoringData.scores.clarity,
        structure: scoringData.scores.structure,
        reasoning: scoringData.scores.reasoning,
        evidence: scoringData.scores.evidence,
        delivery: scoringData.scores.delivery,
        overall: overallScore,
      },
      feedback: {
        strengths: scoringData.feedback.strengths,
        improvements: scoringData.feedback.improvements,
        detailedFeedback: scoringData.feedback.detailedFeedback,
        scoringBreakdown: scoringData.feedback.scoringBreakdown,
      },
      pointsEarned,
      badgesEarned,
    };

    console.log(`✅ Scored submission: Overall ${overallScore}/100, Points: ${pointsEarned}`);

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Error scoring debate submission:', error);
    
    if (error.message?.includes('JSON')) {
      return NextResponse.json(
        { error: 'Failed to parse AI scoring response' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to score submission' },
      { status: 500 }
    );
  }
}

function buildScoringPrompt(
  debateTitle: string,
  debateDescription: string,
  position: string,
  content: string,
  type: string
): string {
  return `Score this debate submission on the topic: "${debateTitle}"

Debate Context: ${debateDescription}
Position: ${position}
Submission Type: ${type}

Submission Content:
${content}

Score this submission on a scale of 0-100 for each criterion:

1. CLARITY (0-100): How clear and understandable is the argument?
   - Is the main argument easy to follow?
   - Are ideas expressed clearly and concisely?
   - Is language appropriate and precise?

2. STRUCTURE (0-100): How well-organized is the submission?
   - Does it have a clear introduction, body, and conclusion?
   - Are points presented in a logical order?
   - Are transitions between ideas smooth?

3. REASONING (0-100): How strong is the logical reasoning?
   - Are arguments logically sound?
   - Does the debater demonstrate critical thinking?
   - Are counterarguments considered?

4. EVIDENCE (0-100): How well is the argument supported?
   - Are claims backed by facts, examples, or data?
   - Is evidence relevant and credible?
   - Are sources or examples specific and appropriate?

5. DELIVERY (0-100): How effective is the presentation?
   - ${type === 'text' ? 'Is the writing engaging and confident?' : 'Is the speaker confident and engaging?'}
   - ${type === 'text' ? 'Is tone appropriate?' : 'Is pace, tone, and body language appropriate?'}
   - Does the presentation enhance the argument?

Provide constructive feedback:
- List 3-5 specific strengths
- List 3-5 specific areas for improvement
- Provide detailed overall feedback (2-3 paragraphs)
- Give specific feedback for each scoring criterion

Return ONLY valid JSON in this exact format:
{
  "scores": {
    "clarity": 85,
    "structure": 78,
    "reasoning": 82,
    "evidence": 75,
    "delivery": 80
  },
  "feedback": {
    "strengths": [
      "Clear main argument presented upfront",
      "Strong use of real-world examples"
    ],
    "improvements": [
      "Could consider counterarguments more thoroughly",
      "Add more specific statistics to support claims"
    ],
    "detailedFeedback": "Overall, this is a strong debate submission...",
    "scoringBreakdown": {
      "clarity": "Your main argument was easy to follow...",
      "structure": "Good organization with clear introduction...",
      "reasoning": "Solid logical reasoning, though...",
      "evidence": "Good use of examples, but...",
      "delivery": "Confident presentation style..."
    }
  }
}`;
}

function calculateOverallScore(scores: any): number {
  const overall = 
    scores.clarity * DEBATE_SCORING_WEIGHTS.clarity +
    scores.structure * DEBATE_SCORING_WEIGHTS.structure +
    scores.reasoning * DEBATE_SCORING_WEIGHTS.reasoning +
    scores.evidence * DEBATE_SCORING_WEIGHTS.evidence +
    scores.delivery * DEBATE_SCORING_WEIGHTS.delivery;
  
  return Math.round(overall);
}

function calculatePoints(overallScore: number): number {
  let points = DEBATE_POINTS.participation;

  if (overallScore >= 85) {
    points += DEBATE_POINTS.highScore;
  }

  return points;
}

function determineBadges(scores: any, overallScore: number): string[] {
  const badges: string[] = [];

  // Perfect score badge
  if (overallScore >= 95) {
    badges.push('debate_perfectionist');
  }

  // Category excellence badges
  if (scores.clarity >= 90) badges.push('crystal_clear');
  if (scores.structure >= 90) badges.push('master_organizer');
  if (scores.reasoning >= 90) badges.push('logical_thinker');
  if (scores.evidence >= 90) badges.push('fact_finder');
  if (scores.delivery >= 90) badges.push('confident_speaker');

  // Overall excellence
  if (overallScore >= 85) badges.push('debate_champion');
  if (overallScore >= 75) badges.push('skilled_debater');

  return badges;
}

const DEBATE_SCORING_SYSTEM_PROMPT = `You are an expert debate judge and educator evaluating student debate submissions for Gen Elevate educational platform.

Your role is to:
1. Evaluate submissions fairly and objectively
2. Provide scores from 0-100 for each criterion
3. Give constructive, encouraging feedback
4. Help students improve their debate skills
5. Be consistent in your scoring approach

Scoring Guidelines:
- 90-100: Exceptional - Demonstrates mastery
- 80-89: Very Good - Strong performance with minor improvements
- 70-79: Good - Solid performance with room for growth
- 60-69: Satisfactory - Meets basic requirements
- 50-59: Needs Improvement - Below expectations
- Below 50: Poor - Significant work needed

Be encouraging but honest. Students are aged 14-18 and learning. Focus on helping them grow.

Always return valid JSON with the exact structure requested. Be specific in your feedback with concrete examples from their submission.`;

