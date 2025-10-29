'use client';

import { useState } from 'react';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Edit, 
  ChevronDown, 
  ChevronRight,
  Video,
  FileText,
  HelpCircle,
  Layout,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CourseData } from '@/app/creator-dashboard/create-course/page';

interface CourseStructureProps {
  data: CourseData;
  onUpdate: (updates: Partial<CourseData>) => void;
  onBuildChapter?: (chapterId: string) => void;
}

export function CourseStructure({ data, onUpdate, onBuildChapter }: CourseStructureProps) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const addChapter = () => {
    const newChapter = {
      id: `chapter-${Date.now()}`,
      title: 'New Chapter',
      description: '',
      order: data.chapters.length,
      lessons: []
    };
    onUpdate({ chapters: [...data.chapters, newChapter] });
    setExpandedChapters([...expandedChapters, newChapter.id]);
  };

  const updateChapter = (chapterId: string, updates: any) => {
    onUpdate({
      chapters: data.chapters.map(ch =>
        ch.id === chapterId ? { ...ch, ...updates } : ch
      )
    });
  };

  const deleteChapter = (chapterId: string) => {
    if (confirm('Are you sure you want to delete this chapter?')) {
      onUpdate({
        chapters: data.chapters.filter(ch => ch.id !== chapterId)
      });
    }
  };

  const addLesson = (chapterId: string, type: 'video' | 'text' | 'mixed') => {
    const chapter = data.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const newLesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      type,
      content: {},
      duration: 0,
      order: chapter.lessons.length
    };

    updateChapter(chapterId, {
      lessons: [...chapter.lessons, newLesson]
    });
  };

  const updateLesson = (chapterId: string, lessonId: string, updates: any) => {
    const chapter = data.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    updateChapter(chapterId, {
      lessons: chapter.lessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, ...updates } : lesson
      )
    });
  };

  const deleteLesson = (chapterId: string, lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      const chapter = data.chapters.find(ch => ch.id === chapterId);
      if (!chapter) return;

      updateChapter(chapterId, {
        lessons: chapter.lessons.filter(lesson => lesson.id !== lessonId)
      });
    }
  };

  const addQuiz = (chapterId: string) => {
    const chapter = data.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title: 'Chapter Quiz',
      questions: []
    };

    updateChapter(chapterId, { quiz: newQuiz });
  };

  const removeQuiz = (chapterId: string) => {
    if (confirm('Are you sure you want to remove this quiz?')) {
      updateChapter(chapterId, { quiz: undefined });
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'text':
        return <FileText className="w-4 h-4" />;
      case 'mixed':
        return <Layout className="w-4 h-4" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Structure</CardTitle>
          <CardDescription>
            Organize your course into chapters and lessons. Drag to reorder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.chapters.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Layout className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No chapters yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start building your course by adding your first chapter
                </p>
                <Button onClick={addChapter}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Chapter
                </Button>
              </div>
            ) : (
              <>
                {data.chapters.map((chapter, chapterIndex) => (
                  <Card key={chapter.id} className="overflow-hidden">
                    <div className="bg-muted/50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button className="cursor-grab hover:bg-background/50 p-1 rounded">
                          <GripVertical className="w-5 h-5 text-muted-foreground" />
                        </button>
                        
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="flex items-center gap-2 flex-1"
                        >
                          {expandedChapters.includes(chapter.id) ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                          <div className="text-left flex-1">
                            {editingChapter === chapter.id ? (
                              <Input
                                value={chapter.title}
                                onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                                onBlur={() => setEditingChapter(null)}
                                autoFocus
                                className="font-semibold"
                              />
                            ) : (
                              <div>
                                <h3 className="font-semibold">
                                  Chapter {chapterIndex + 1}: {chapter.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {chapter.lessons.length} lessons
                                  {chapter.quiz && ' + 1 quiz'}
                                </p>
                              </div>
                            )}
                          </div>
                        </button>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingChapter(chapter.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteChapter(chapter.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {expandedChapters.includes(chapter.id) && (
                      <CardContent className="p-4 space-y-3">
                        {/* Chapter Description */}
                        <div>
                          <textarea
                            placeholder="Chapter description (optional)"
                            value={chapter.description}
                            onChange={(e) => updateChapter(chapter.id, { description: e.target.value })}
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm min-h-[60px]"
                          />
                        </div>

                        {/* Lessons */}
                        <div className="space-y-2">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                            >
                              <button className="cursor-grab p-1">
                                <GripVertical className="w-4 h-4 text-muted-foreground" />
                              </button>
                              
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                lesson.type === 'video' ? 'bg-blue-100 text-blue-600' :
                                lesson.type === 'text' ? 'bg-green-100 text-green-600' :
                                'bg-purple-100 text-purple-600'
                              }`}>
                                {getLessonIcon(lesson.type)}
                              </div>

                              <div className="flex-1">
                                {editingLesson === lesson.id ? (
                                  <Input
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(chapter.id, lesson.id, { title: e.target.value })}
                                    onBlur={() => setEditingLesson(null)}
                                    autoFocus
                                  />
                                ) : (
                                  <div>
                                    <p className="font-medium text-sm">
                                      {lessonIndex + 1}. {lesson.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground capitalize">
                                      {lesson.type} lesson
                                    </p>
                                  </div>
                                )}
                              </div>

                              <Badge variant="secondary" className="text-xs">
                                {lesson.duration || 0} min
                              </Badge>

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingLesson(lesson.id)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteLesson(chapter.id, lesson.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Add Lesson Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(chapter.id, 'video')}
                            className="flex-1"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Video Lesson
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(chapter.id, 'text')}
                            className="flex-1"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Text Lesson
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(chapter.id, 'mixed')}
                            className="flex-1"
                          >
                            <Layout className="w-4 h-4 mr-2" />
                            Mixed
                          </Button>
                        </div>

                        {/* Build Chapter Button */}
                        {chapter.lessons.length > 0 && onBuildChapter && (
                          <div className="pt-3">
                            <Button
                              onClick={() => onBuildChapter(chapter.id)}
                              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                              size="lg"
                            >
                              <ArrowRight className="w-5 h-5 mr-2" />
                              Build This Chapter
                            </Button>
                            <p className="text-xs text-center text-muted-foreground mt-2">
                              Add content to all lessons in this chapter
                            </p>
                          </div>
                        )}

                        {/* Quiz Section */}
                        <div className="pt-3 border-t border-border mt-3">
                          {chapter.quiz ? (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                              <div className="flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-yellow-600" />
                                <div>
                                  <p className="font-medium text-sm">Chapter Quiz</p>
                                  <p className="text-xs text-muted-foreground">
                                    {chapter.quiz.questions.length} questions
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeQuiz(chapter.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addQuiz(chapter.id)}
                              className="w-full"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Chapter Quiz (Optional)
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}

                {/* Add Chapter Button */}
                <Button onClick={addChapter} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Chapter
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Structure Overview */}
      {data.chapters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold text-primary">{data.chapters.length}</p>
                <p className="text-sm text-muted-foreground">Chapters</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold text-primary">
                  {data.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold text-primary">
                  {data.chapters.filter(ch => ch.quiz).length}
                </p>
                <p className="text-sm text-muted-foreground">Quizzes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

