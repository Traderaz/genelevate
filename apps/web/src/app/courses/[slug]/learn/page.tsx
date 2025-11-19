'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { getCourse, Course } from '@/lib/services/courses';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowLeft, CheckCircle, PlayCircle, Lock, Loader2, Lightbulb, AlertCircle, Target } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { verbalReasoningContent, LessonContent } from '@/lib/data/eleven-plus-content/verbal-reasoning-content';
import { nonVerbalReasoningContent } from '@/lib/data/eleven-plus-content/non-verbal-reasoning-content';
import { elevenPlusEnglishContent } from '@/lib/data/eleven-plus-content/english-content';
import { elevenPlusMathsContent } from '@/lib/data/eleven-plus-content/maths-content';
import mockExamsContent from '@/lib/data/eleven-plus-content/mock-exams-content';
import confidenceMindsetContent from '@/lib/data/eleven-plus-content/confidence-mindset-content';
import vocabularyBuildingContent from '@/lib/data/eleven-plus-content/vocabulary-building-content';

export default function CourseLearnPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  
  // Track selected answers and whether they've been submitted
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: number]: boolean }>({});

  const slug = params.slug as string;

  useEffect(() => {
    const loadCourse = async () => {
      if (!slug) return;
      
      try {
        const courseData = await getCourse(slug);
        if (courseData) {
          setCourse(courseData);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  // Reset answers when topic changes
  useEffect(() => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
  }, [selectedTopicIndex]);

  if (loading || authLoading) {
    return (
      <BasicPlanGuard redirectTo={`/courses/${slug}`}>
        <NetflixDashboardLayout>
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-teal-primary" />
          </div>
        </NetflixDashboardLayout>
      </BasicPlanGuard>
    );
  }

  if (!course) {
    return (
      <BasicPlanGuard redirectTo={`/courses/${slug}`}>
        <NetflixDashboardLayout>
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-teal-card-text mb-4">Course Not Found</h2>
              <Link href="/courses">
                <Button className="teal-button-primary">
                  Back to Courses
                </Button>
              </Link>
            </div>
          </div>
        </NetflixDashboardLayout>
      </BasicPlanGuard>
    );
  }

  const topics = course.topics || [];
  const currentTopic = topics[selectedTopicIndex];
  
  // Get lesson content if available
  const lessonContent: LessonContent | undefined = course.title.includes('Verbal Reasoning') && !course.title.includes('Vocabulary')
    ? verbalReasoningContent[selectedTopicIndex]
    : course.title.includes('Non-Verbal Reasoning')
    ? nonVerbalReasoningContent[selectedTopicIndex]
    : course.title.includes('English')
    ? elevenPlusEnglishContent[selectedTopicIndex]
    : course.title.includes('Maths') || course.title.includes('Mathematics')
    ? elevenPlusMathsContent[selectedTopicIndex]
    : course.title.includes('Mock Exams') || course.title.includes('Mock')
    ? mockExamsContent[selectedTopicIndex]
    : course.title.includes('Confidence') || course.title.includes('Mindset')
    ? confidenceMindsetContent[selectedTopicIndex]
    : course.title.includes('Vocabulary')
    ? vocabularyBuildingContent[selectedTopicIndex]
    : undefined;

  return (
    <BasicPlanGuard redirectTo={`/courses/${slug}`}>
      <NetflixDashboardLayout>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-2 text-teal-card-text-muted hover:text-teal-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course Details
            </Link>
            <div className="text-sm text-teal-card-text-muted">
              {selectedTopicIndex + 1} of {topics.length} modules
            </div>
          </div>

          {/* Course Title */}
          <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-teal-card-text mb-2">{course.title}</h1>
            <p className="text-teal-card-text-muted">{course.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Module List */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-lg font-bold text-teal-card-text mb-4">Course Modules</h2>
              <div className="space-y-2">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopicIndex(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedTopicIndex === index
                        ? 'bg-teal-primary/10 border-teal-primary text-teal-primary'
                        : 'teal-card border-teal-primary/30 hover:border-teal-gold'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        selectedTopicIndex === index
                          ? 'bg-teal-primary text-white'
                          : 'bg-teal-primary/10 text-teal-primary'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-2 ${
                          selectedTopicIndex === index
                            ? 'text-teal-primary'
                            : 'text-teal-card-text'
                        }`}>
                          {topic}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Progress Bar - Kid Friendly! */}
              <div className="teal-card border-2 border-teal-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-teal-primary">Your Progress 🎯</span>
                  <span className="text-sm font-bold text-teal-card-text">
                    Module {selectedTopicIndex + 1} of {topics.length}
                  </span>
                </div>
                <div className="w-full bg-teal-primary/10 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-primary to-teal-gold h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((selectedTopicIndex + 1) / topics.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-teal-card-text-muted mt-2 text-center">
                  {Math.round(((selectedTopicIndex + 1) / topics.length) * 100)}% Complete! Keep going! 🌟
                </p>
              </div>

              {/* Current Topic Card - Enhanced */}
              <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 pb-6 border-b-2 border-teal-primary/10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-primary to-teal-blue-medium text-white font-bold text-2xl flex-shrink-0 shadow-lg">
                    {selectedTopicIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-teal-card-text mb-2">{currentTopic}</h2>
                    {lessonContent && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-primary/10 text-teal-primary rounded-full text-sm font-semibold">
                          ⏱️ {lessonContent.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-gold/10 text-teal-gold rounded-full text-sm font-semibold">
                          📝 {lessonContent.practiceQuestions.length} Questions
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                {lessonContent ? (
                  <div className="space-y-6">
                    {/* Introduction - Enhanced */}
                    <div className="bg-gradient-to-br from-teal-primary/10 to-teal-blue-light/10 rounded-xl p-6 md:p-8 border-2 border-teal-primary/30 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-primary/20 flex items-center justify-center">
                          <span className="text-2xl">👋</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-teal-primary mb-3 flex items-center gap-2">
                            Let's Get Started!
                          </h3>
                          <p className="text-teal-card-text leading-relaxed text-base md:text-lg whitespace-pre-line">
                            {lessonContent.introduction}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Points - Enhanced with Emoji */}
                    <div className="teal-card border-2 border-teal-gold/40 rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-gold/20 flex items-center justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-bold text-teal-card-text">What You'll Learn</h3>
                      </div>
                      <ul className="space-y-4">
                        {lessonContent.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-4 p-4 bg-teal-gold/5 rounded-lg hover:bg-teal-gold/10 transition-colors">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-gold/20 flex items-center justify-center">
                              <span className="font-bold text-teal-gold text-sm">{index + 1}</span>
                            </div>
                            <span className="text-teal-card-text leading-relaxed text-base flex-1">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detailed Explanation - Enhanced with better readability */}
                    <div className="teal-card border-2 border-teal-primary/30 rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-primary/20 flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                        <h3 className="text-xl font-bold text-teal-card-text">Learn the Details</h3>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        {lessonContent.explanation.split('\n\n').map((paragraph, index) => (
                          <div key={index} className="mb-5">
                            {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                              <h4 className="text-lg font-bold text-teal-primary mb-3 pb-2 border-b-2 border-teal-primary/20 flex items-center gap-2">
                                <span className="text-xl">✨</span>
                                {paragraph.replace(/\*\*/g, '')}
                              </h4>
                            ) : paragraph.startsWith('**') ? (
                              <h4 className="text-base font-bold text-teal-primary mb-2">
                                {paragraph.replace(/\*\*/g, '')}
                              </h4>
                            ) : paragraph.match(/^\d+\./) ? (
                              <p className="text-teal-card-text ml-6 pl-4 border-l-2 border-teal-gold/30 py-1 text-base leading-relaxed">{paragraph}</p>
                            ) : paragraph.startsWith('- ') ? (
                              <ul className="space-y-2">
                                <li className="flex items-start gap-3 text-teal-card-text-muted text-base leading-relaxed">
                                  <span className="text-teal-gold flex-shrink-0">→</span>
                                  <span>{paragraph.substring(2)}</span>
                                </li>
                              </ul>
                            ) : paragraph.includes('✅') || paragraph.includes('❌') || paragraph.includes('💡') ? (
                              <p className="text-teal-card-text leading-relaxed text-base bg-teal-primary/5 p-4 rounded-lg">{paragraph}</p>
                            ) : (
                              <p className="text-teal-card-text-muted leading-relaxed text-base">{paragraph}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Worked Examples - Enhanced with visual hierarchy */}
                    {lessonContent.examples.length > 0 && (
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-blue-light/20 flex items-center justify-center">
                            <span className="text-2xl">💡</span>
                          </div>
                          <h3 className="text-xl font-bold text-teal-card-text">See How It's Done</h3>
                        </div>
                        {lessonContent.examples.map((example, index) => (
                          <div key={index} className="teal-card border-2 border-teal-blue-light/40 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-teal-blue-light to-teal-primary text-white rounded-full text-sm font-bold">
                                  {index + 1}
                                </span>
                                <span className="inline-block px-3 py-1 bg-teal-blue-light/20 text-teal-primary rounded-full text-sm font-bold">
                                  Example {index + 1}
                                </span>
                              </div>
                              <p className="text-teal-card-text font-semibold text-lg">{example.question}</p>
                            </div>
                            <div className="bg-gradient-to-br from-teal-primary/5 to-teal-blue-light/5 rounded-lg p-5 mb-5 border-l-4 border-teal-primary">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">🔍</span>
                                <h4 className="text-base font-bold text-teal-primary">Step-by-Step Working:</h4>
                              </div>
                              <div className="space-y-2">
                                {example.workingOut.split('\n').map((line, i) => (
                                  <p key={i} className="text-teal-card-text text-base leading-relaxed pl-4">{line}</p>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-teal-gold/10 to-teal-gold/5 border-2 border-teal-gold/30 rounded-lg">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-gold/20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-teal-gold" />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-teal-card-text mb-2 text-lg flex items-center gap-2">
                                  <span className="text-xl">✅</span>
                                  Answer: <span className="text-teal-primary">{example.answer}</span>
                                </p>
                                <p className="text-teal-card-text-muted text-base leading-relaxed">{example.explanation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Practice Questions - Enhanced with gamification */}
                    {lessonContent.practiceQuestions.length > 0 && (
                      <div className="space-y-5">
                        <div className="bg-gradient-to-r from-teal-primary/10 to-teal-gold/10 rounded-xl p-6 border-2 border-teal-primary/30">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-primary/20 flex items-center justify-center">
                              <span className="text-2xl">🎮</span>
                            </div>
                            <h3 className="text-xl font-bold text-teal-card-text">Your Turn! Practice Time</h3>
                          </div>
                          <p className="text-teal-card-text-muted text-base leading-relaxed">
                            Ready to test what you've learned? Try these questions and get instant feedback! 🌟
                          </p>
                        </div>
                        {lessonContent.practiceQuestions.map((question, index) => {
                          const isSubmitted = submittedAnswers[index];
                          const selectedAnswer = selectedAnswers[index];
                          const isCorrect = selectedAnswer === question.answer;

                          return (
                            <div key={index} className="teal-card border-2 border-teal-primary/40 rounded-xl p-6 md:p-8 hover:border-teal-gold hover:shadow-lg transition-all">
                              <div className="flex items-start justify-between mb-5">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-primary/20 flex items-center justify-center">
                                    <span className="font-bold text-teal-primary">{index + 1}</span>
                                  </div>
                                  <p className="text-teal-card-text font-medium text-base md:text-lg leading-relaxed flex-1 pt-1">
                                    {question.question}
                                  </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${
                                  question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                  question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {question.difficulty === 'easy' ? '⭐ Easy' :
                                   question.difficulty === 'medium' ? '⭐⭐ Medium' :
                                   '⭐⭐⭐ Hard'}
                                </span>
                              </div>

                              {question.options && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                                  {question.options.map((option, i) => {
                                    const isSelected = selectedAnswer === option;
                                    const isCorrectAnswer = option === question.answer;
                                    
                                    // Determine button styling based on state
                                    let buttonClass = "text-left p-4 rounded-xl border-2 transition-all font-medium text-base ";
                                    
                                    if (isSubmitted) {
                                      if (isCorrectAnswer) {
                                        // Show correct answer in green with celebration
                                        buttonClass += "border-green-500 bg-green-50 shadow-md ";
                                      } else if (isSelected && !isCorrect) {
                                        // Show wrong selected answer in red
                                        buttonClass += "border-red-500 bg-red-50 ";
                                      } else {
                                        buttonClass += "border-teal-primary/20 bg-white/50 opacity-50 ";
                                      }
                                    } else {
                                      // Before submission - more engaging hover states
                                      if (isSelected) {
                                        buttonClass += "border-teal-primary bg-teal-primary/15 shadow-sm ";
                                      } else {
                                        buttonClass += "border-teal-primary/30 hover:border-teal-primary hover:bg-teal-primary/10 hover:shadow-sm ";
                                      }
                                    }

                                    return (
                                      <button
                                        key={i}
                                        onClick={() => {
                                          if (!isSubmitted) {
                                            setSelectedAnswers(prev => ({ ...prev, [index]: option }));
                                          }
                                        }}
                                        disabled={isSubmitted}
                                        className={buttonClass}
                                      >
                                        <div className="flex items-center justify-between gap-3">
                                          <span className="text-teal-card-text flex-1">{option}</span>
                                          {isSubmitted && isCorrectAnswer && (
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                              <CheckCircle className="w-6 h-6 text-green-600" />
                                              <span className="text-green-600 font-bold">✓</span>
                                            </div>
                                          )}
                                          {isSubmitted && isSelected && !isCorrect && (
                                            <span className="text-red-600 font-bold text-xl flex-shrink-0">✗</span>
                                          )}
                                          {!isSubmitted && isSelected && (
                                            <span className="text-teal-primary font-bold flex-shrink-0">→</span>
                                          )}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Submit Button - Enhanced with encouraging design */}
                              {!isSubmitted && selectedAnswer && (
                                <button
                                  onClick={() => setSubmittedAnswers(prev => ({ ...prev, [index]: true }))}
                                  className="w-full py-4 px-6 bg-gradient-to-r from-teal-primary to-teal-blue-medium hover:from-teal-blue-medium hover:to-teal-primary text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                                >
                                  Check My Answer! 🎯
                                </button>
                              )}

                              {/* Feedback and Explanation - Enhanced with better visuals */}
                              {isSubmitted && (
                                <div className={`mt-5 p-6 rounded-xl border-2 ${
                                  isCorrect 
                                    ? 'bg-gradient-to-br from-green-50 to-green-100/50 border-green-500 shadow-md' 
                                    : 'bg-gradient-to-br from-red-50 to-orange-50/50 border-red-500 shadow-md'
                                }`}>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                                    }`}>
                                      {isCorrect ? (
                                        <span className="text-2xl">🎉</span>
                                      ) : (
                                        <span className="text-2xl">💪</span>
                                      )}
                                    </div>
                                    <div>
                                      <p className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                        {isCorrect ? 'Amazing! You got it right! 🌟' : 'Good try! Let\'s learn from this! 📚'}
                                      </p>
                                      <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                        {isCorrect ? 'Keep up the great work!' : 'Every mistake is a step closer to success!'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-white/70 rounded-lg p-4 space-y-3">
                                    <div>
                                      <p className="text-sm font-bold text-teal-primary uppercase tracking-wide mb-1">Correct Answer:</p>
                                      <p className="font-bold text-lg text-green-700">{question.answer}</p>
                                    </div>
                                    <div className="border-t-2 border-teal-primary/10 pt-3">
                                      <p className="text-sm font-bold text-teal-primary uppercase tracking-wide mb-2 flex items-center gap-2">
                                        <span className="text-base">💡</span>
                                        Why this is correct:
                                      </p>
                                      <p className="text-teal-card-text leading-relaxed text-base">{question.explanation}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Try Again Button - Enhanced */}
                              {isSubmitted && !isCorrect && (
                                <button
                                  onClick={() => {
                                    setSelectedAnswers(prev => {
                                      const newAnswers = { ...prev };
                                      delete newAnswers[index];
                                      return newAnswers;
                                    });
                                    setSubmittedAnswers(prev => {
                                      const newSubmitted = { ...prev };
                                      delete newSubmitted[index];
                                      return newSubmitted;
                                    });
                                  }}
                                  className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-teal-primary/10 to-teal-blue-light/10 hover:from-teal-primary/20 hover:to-teal-blue-light/20 text-teal-primary border-2 border-teal-primary/30 rounded-xl font-bold text-base transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                  <span>🔄</span>
                                  Try This Question Again
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Tips - Enhanced with visual appeal */}
                    {lessonContent.tips.length > 0 && (
                      <div className="teal-card border-2 border-teal-gold/40 rounded-xl p-6 md:p-8 bg-gradient-to-br from-yellow-50/30 to-orange-50/20 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-gold/20 flex items-center justify-center">
                            <span className="text-2xl">💡</span>
                          </div>
                          <h3 className="text-xl font-bold text-teal-card-text">Pro Tips for Success!</h3>
                        </div>
                        <ul className="space-y-4">
                          {lessonContent.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-4 p-4 bg-white/60 rounded-lg border-l-4 border-teal-gold hover:bg-white/80 transition-colors">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-gold to-yellow-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                                {index + 1}
                              </div>
                              <span className="text-teal-card-text leading-relaxed text-base flex-1">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Common Mistakes - Enhanced with warning design */}
                    {lessonContent.commonMistakes.length > 0 && (
                      <div className="teal-card border-2 border-red-400/40 rounded-xl p-6 md:p-8 bg-gradient-to-br from-red-50/40 to-orange-50/30 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                            <span className="text-2xl">⚠️</span>
                          </div>
                          <h3 className="text-xl font-bold text-teal-card-text">Watch Out! Common Mistakes</h3>
                        </div>
                        <ul className="space-y-4">
                          {lessonContent.commonMistakes.map((mistake, index) => (
                            <li key={index} className="flex items-start gap-4 p-4 bg-white/60 rounded-lg border-l-4 border-red-500 hover:bg-white/80 transition-colors">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                <span className="text-red-500 font-bold text-lg">✗</span>
                              </div>
                              <span className="text-teal-card-text leading-relaxed text-base flex-1">{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Exam Strategy - Enhanced with strategic design */}
                    <div className="teal-card border-2 border-teal-primary/40 rounded-xl p-6 md:p-8 bg-gradient-to-br from-teal-primary/10 to-teal-blue-light/5 shadow-md">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-primary/20 flex items-center justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-bold text-teal-card-text">Your Winning Exam Strategy</h3>
                      </div>
                      <div className="space-y-5 bg-white/60 rounded-lg p-6">
                        {lessonContent.examStrategy.split('\n\n').map((section, index) => (
                          <div key={index}>
                            {section.startsWith('**') && section.endsWith('**') ? (
                              <h4 className="text-lg font-bold text-teal-primary mb-3 pb-2 border-b-2 border-teal-primary/20 flex items-center gap-2">
                                <span className="text-xl">📌</span>
                                {section.replace(/\*\*/g, '')}
                              </h4>
                            ) : section.startsWith('**') ? (
                              <h4 className="text-base font-bold text-teal-primary mb-2 flex items-center gap-2">
                                <span>→</span>
                                {section.replace(/\*\*/g, '')}
                              </h4>
                            ) : section.match(/^\d+\./) ? (
                              <p className="text-teal-card-text ml-6 pl-4 border-l-2 border-teal-gold/30 py-1 text-base leading-relaxed">{section}</p>
                            ) : (
                              <p className="text-teal-card-text-muted leading-relaxed text-base">{section}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-teal-primary/5 to-teal-blue-light/5 rounded-lg p-8 border-2 border-teal-primary/20">
                      <div className="text-center py-12">
                        <PlayCircle className="w-16 h-16 text-teal-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-teal-card-text mb-2">
                          Content Coming Soon
                        </h3>
                        <p className="text-teal-card-text-muted max-w-md mx-auto">
                          Detailed lesson content for this module is being prepared and will be available soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  onClick={() => setSelectedTopicIndex(Math.max(0, selectedTopicIndex - 1))}
                  disabled={selectedTopicIndex === 0}
                  className="teal-button-secondary"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Module
                </Button>
                <Button
                  onClick={() => setSelectedTopicIndex(Math.min(topics.length - 1, selectedTopicIndex + 1))}
                  disabled={selectedTopicIndex === topics.length - 1}
                  className="teal-button-primary"
                >
                  Next Module
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}

