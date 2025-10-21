import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { DebateTopic, DebateDifficulty, GenerateDebateTopicsRequest } from '@/types/debates';

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

    const body: GenerateDebateTopicsRequest = await request.json();
    const { 
      count = 5, 
      category, 
      difficulty = 'intermediate',
      yearGroups = ['Year 10', 'Year 11', 'Year 12', 'Year 13']
    } = body;

    // Validate inputs
    if (count < 1 || count > 20) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 20' },
        { status: 400 }
      );
    }

    // Generate topics using OpenAI
    const prompt = buildTopicGenerationPrompt(count, category, difficulty, yearGroups);
    
    console.log('🎯 Generating debate topics...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.8,
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: DEBATE_TOPIC_SYSTEM_PROMPT
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
    const topicsData = JSON.parse(responseText);
    
    // Convert to DebateTopic objects
    const topics: DebateTopic[] = topicsData.topics.map((topic: any, index: number) => ({
      id: `topic_${Date.now()}_${index}`,
      title: topic.title,
      description: topic.description,
      category: topic.category || category || 'society',
      difficulty: topic.difficulty || difficulty,
      targetYearGroups: yearGroups,
      suggestedBy: 'ai',
      createdAt: new Date(),
      usageCount: 0,
    }));

    console.log(`✅ Generated ${topics.length} debate topics`);

    return NextResponse.json({
      topics,
      tokensUsed: completion.usage?.total_tokens || 0,
    });

  } catch (error: any) {
    console.error('❌ Error generating debate topics:', error);
    
    if (error.message?.includes('JSON')) {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to generate debate topics' },
      { status: 500 }
    );
  }
}

function buildTopicGenerationPrompt(
  count: number,
  category?: string,
  difficulty?: DebateDifficulty,
  yearGroups?: string[]
): string {
  const categoryFilter = category ? `in the "${category}" category` : 'across various categories (ethics, technology, society, environment, politics, science, culture)';
  const difficultyDesc = getDifficultyDescription(difficulty);
  const ageRange = getAgeRange(yearGroups);

  return `Generate ${count} engaging debate topics ${categoryFilter}.

Target Audience: UK secondary school students in ${yearGroups?.join(', ')} (ages ${ageRange})
Difficulty Level: ${difficulty} - ${difficultyDesc}

Requirements:
1. Each topic should be thought-provoking and relevant to young people
2. Topics should be balanced (not obviously one-sided)
3. Topics should encourage critical thinking and research
4. Include real-world relevance and current issues
5. Age-appropriate and suitable for educational settings
6. Titles should be concise (under 100 characters)
7. Descriptions should provide context and key points to consider

Return ONLY valid JSON in this exact format:
{
  "topics": [
    {
      "title": "Should social media companies be held responsible for mental health issues?",
      "description": "Explore the role of social media platforms in teen mental health. Consider corporate responsibility, free speech, parental controls, and regulation.",
      "category": "technology",
      "difficulty": "intermediate"
    }
  ]
}`;
}

function getDifficultyDescription(difficulty?: DebateDifficulty): string {
  switch (difficulty) {
    case 'beginner':
      return 'Simple, accessible topics with clear arguments and straightforward concepts';
    case 'advanced':
      return 'Complex topics requiring deep research, nuanced arguments, and sophisticated reasoning';
    case 'intermediate':
    default:
      return 'Moderate complexity with room for multiple perspectives and deeper analysis';
  }
}

function getAgeRange(yearGroups?: string[]): string {
  if (!yearGroups || yearGroups.length === 0) return '14-18';
  
  const years = yearGroups.map(yg => {
    const match = yg.match(/Year (\d+)/);
    return match ? parseInt(match[1]) : 10;
  });
  
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const minAge = minYear + 4; // Year 10 = age 14
  const maxAge = maxYear + 4;
  
  return `${minAge}-${maxAge}`;
}

const DEBATE_TOPIC_SYSTEM_PROMPT = `You are an expert educator and debate coach specializing in creating engaging, thought-provoking debate topics for UK secondary school students.

Your topics should:
- Be balanced and not obviously one-sided
- Encourage critical thinking and research
- Be age-appropriate and educational
- Connect to real-world issues students care about
- Allow for multiple perspectives and nuanced arguments
- Avoid topics that are too sensitive or inappropriate for educational settings
- Be specific enough to debate but broad enough to allow creativity

Categories:
- Ethics: Moral dilemmas, rights and responsibilities, fairness
- Technology: AI, social media, privacy, innovation
- Society: Culture, diversity, education, social issues
- Environment: Climate change, conservation, sustainability
- Politics: Government, policy, democracy (age-appropriate)
- Science: Scientific advancement, health, research ethics
- Culture: Media, arts, identity, global perspectives

Always return valid JSON with the exact structure requested. Be creative, engaging, and educational.`;

