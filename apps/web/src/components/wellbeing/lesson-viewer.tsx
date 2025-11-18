'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckSquare,
  ExternalLink,
  Award
} from 'lucide-react';
import { Lesson, LessonContent, ContentSection, TipBox } from '@/lib/data/uk-life-skills-modules';

interface LessonViewerProps {
  moduleId: string;
  lessonId: string;
}

export function LessonViewer({ moduleId, lessonId }: LessonViewerProps) {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const { getModuleById } = await import('@/lib/data/uk-life-skills-modules');
        const moduleData = getModuleById(moduleId);
        
        if (moduleData) {
          const currentLesson = moduleData.lessons.find(l => l.id === lessonId);
          setLesson(currentLesson || null);
          setModuleTitle(moduleData.title);
          setAllLessons(moduleData.lessons);
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonData();
  }, [moduleId, lessonId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson || !lesson.content) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Not Found</h2>
        <p className="text-muted-foreground mb-6">The lesson you're looking for doesn't exist yet.</p>
        <button
          onClick={() => router.push(`/wellbeing/module/${moduleId}`)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button"
        >
          Back to Module
        </button>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  const getTipBoxIcon = (type: string) => {
    switch (type) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'tip': return Lightbulb;
      default: return Info;
    }
  };

  const getTipBoxStyles = (type: string) => {
    switch (type) {
      case 'info': return { bg: 'bg-blue-500/10 border-blue-500/30', icon: 'text-blue-600' };
      case 'warning': return { bg: 'bg-yellow-500/10 border-yellow-500/30', icon: 'text-yellow-600' };
      case 'success': return { bg: 'bg-green-500/10 border-green-500/30', icon: 'text-green-600' };
      case 'tip': return { bg: 'bg-purple-500/10 border-purple-500/30', icon: 'text-purple-600' };
      default: return { bg: 'bg-blue-500/10 border-blue-500/30', icon: 'text-blue-600' };
    }
  };

  const renderTipBox = (tipBox: TipBox) => {
    const Icon = getTipBoxIcon(tipBox.type);
    const styles = getTipBoxStyles(tipBox.type);
    
    return (
      <div className={`p-4 rounded-lg border-2 ${styles.bg} my-6`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.icon}`} />
          <div>
            <h4 className="font-bold mb-2 !text-[#1a1a1a]">{tipBox.title}</h4>
            <p className="text-sm !text-[#1a1a1a]">{tipBox.content}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (section: ContentSection, index: number) => {
    return (
      <div key={index} className="mb-8">
        <h2 className="text-2xl font-bold !text-[#0B5C9E] mb-4">{section.heading}</h2>
        {section.content && (
          <p className="!text-[#1a1a1a] leading-relaxed mb-4">{section.content}</p>
        )}
        
        {section.bullets && (
          <ul className="space-y-3 mb-4">
            {section.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-primary flex-shrink-0 mt-0.5" />
                <span className="!text-[#1a1a1a]">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {section.examples && section.examples.length > 0 && (
          <div className="space-y-4 my-6">
            {section.examples.map((example, idx) => (
              <div key={idx} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold !text-[#1a1a1a] mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  {example.title}
                </h4>
                <p className="text-sm !text-[#1a1a1a]">{example.description}</p>
              </div>
            ))}
          </div>
        )}

        {section.tipBox && renderTipBox(section.tipBox)}
      </div>
    );
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!lesson.content?.exercises) return 0;
    const correct = lesson.content.exercises.filter(
      (ex, idx) => ex.correctAnswer !== undefined && selectedAnswers[idx] === ex.correctAnswer
    ).length;
    return Math.round((correct / lesson.content.exercises.length) * 100);
  };

  const markComplete = async () => {
    // TODO: Save progress to Firestore
    console.log('Marking lesson complete:', lessonId);
    
    // Navigate to next lesson or back to module
    if (nextLesson) {
      router.push(`/wellbeing/module/${moduleId}/lesson/${nextLesson.id}`);
    } else {
      router.push(`/wellbeing/module/${moduleId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(`/wellbeing/module/${moduleId}`)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to {moduleTitle}
        </button>
        <span className="text-sm text-muted-foreground">
          Lesson {currentIndex + 1} of {allLessons.length}
        </span>
      </div>

      {/* Lesson Header */}
      <div className="teal-card border-2 border-teal-primary/30 rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-teal-primary">Lesson {currentIndex + 1}</span>
              <span className="text-sm text-teal-card-text-muted">• {lesson.duration}</span>
            </div>
            <h1 className="text-3xl font-bold text-teal-card-text mb-2">{lesson.title}</h1>
            <p className="text-teal-card-text-muted">{lesson.description}</p>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="teal-card border-2 border-teal-light/20 rounded-xl p-6 md:p-8">
        <div className="prose prose-lg max-w-none">
          {lesson.content.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* Exercises/Quiz */}
        {lesson.content.exercises && lesson.content.exercises.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-primary" />
              Practice Questions
            </h2>
            <div className="space-y-6">
              {lesson.content.exercises.map((exercise, idx) => (
                <div key={idx} className="bg-accent/30 border border-border rounded-lg p-6">
                  <p className="font-semibold text-foreground mb-4">
                    Question {idx + 1}: {exercise.question}
                  </p>
                  
                  {exercise.type === 'multiple-choice' && exercise.options && (
                    <div className="space-y-3">
                      {exercise.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[idx] === optIdx;
                        const isCorrect = exercise.correctAnswer === optIdx;
                        const showFeedback = showResults;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => !showResults && handleAnswerSelect(idx, optIdx)}
                            disabled={showResults}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              showFeedback
                                ? isCorrect
                                  ? 'border-green-500 bg-green-500/10'
                                  : isSelected
                                  ? 'border-red-500 bg-red-500/10'
                                  : 'border-border bg-background/50'
                                : isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50 hover:bg-accent'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                showFeedback && isCorrect
                                  ? 'border-green-500 bg-green-500'
                                  : isSelected
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              }`}>
                                {showFeedback && isCorrect && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span className="text-foreground">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {showResults && exercise.explanation && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-400">
                        <strong>Explanation:</strong> {exercise.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showResults && lesson.content.exercises.length > 0 && (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < lesson.content.exercises.length}
                className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers
              </button>
            )}

            {showResults && (
              <div className="mt-6 p-6 bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary rounded-lg">
                <div className="flex items-center gap-4">
                  <Award className="w-12 h-12 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Quiz Complete!</h3>
                    <p className="text-muted-foreground">
                      You scored {calculateScore()}% on this lesson's practice questions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Takeaways */}
        {lesson.content.keyTakeaways && lesson.content.keyTakeaways.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Takeaways</h2>
            <div className="grid gap-4">
              {lesson.content.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {lesson.content.resources && lesson.content.resources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Additional Resources</h2>
            <div className="space-y-3">
              {lesson.content.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-accent border border-border rounded-lg hover:border-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between teal-card border-2 border-teal-light/20 rounded-xl p-6">
        {prevLesson ? (
          <button
            onClick={() => router.push(`/wellbeing/module/${moduleId}/lesson/${prevLesson.id}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Lesson
          </button>
        ) : (
          <div></div>
        )}

        {nextLesson ? (
          <button
            onClick={markComplete}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button ml-auto"
          >
            Next Lesson
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={markComplete}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg netflix-button ml-auto"
          >
            <CheckCircle className="w-5 h-5" />
            Complete Module
          </button>
        )}
      </div>
    </div>
  );
}

