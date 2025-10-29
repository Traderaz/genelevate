'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  BookOpen, 
  Layout, 
  Palette, 
  Play,
  Settings,
  Eye,
  Save,
  Upload,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CourseBasicInfo } from '@/components/creator/course-basic-info';
import { CourseStructure } from '@/components/creator/course-structure';
import { ChapterBuilder } from '@/components/creator/chapter-builder';
import { CourseCustomization } from '@/components/creator/course-customization';
import { CoursePreview } from '@/components/creator/course-preview';

export interface CourseData {
  // Basic Info
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  tags: string[];
  yearGroups: string[];
  
  // Structure
  chapters: {
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      type: 'video' | 'text' | 'mixed' | 'quiz';
      content: any;
      duration: number;
      order: number;
    }[];
    quiz?: {
      id: string;
      title: string;
      questions: {
        id: string;
        question: string;
        type: 'multiple-choice' | 'true-false' | 'short-answer';
        options?: string[];
        correctAnswer: string | string[];
        explanation?: string;
      }[];
    };
  }[];
  
  // Customization
  styling: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: 'small' | 'medium' | 'large';
    theme: 'light' | 'dark' | 'auto';
  };
  
  // Meta
  status: 'draft' | 'pending' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const steps = [
  { id: 1, name: 'Basic Info', icon: BookOpen, description: 'Course details and settings' },
  { id: 2, name: 'Structure', icon: Layout, description: 'Build chapters one by one' },
  { id: 3, name: 'Customize', icon: Palette, description: 'Fonts, colors, and style' },
  { id: 4, name: 'Preview', icon: Eye, description: 'Review and publish' },
];

export default function CreateCourse() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [buildingChapterId, setBuildingChapterId] = useState<string | null>(null);
  
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    thumbnail: '',
    tags: [],
    yearGroups: [],
    chapters: [],
    styling: {
      primaryColor: '#e50914',
      secondaryColor: '#221f1f',
      fontFamily: 'Inter',
      fontSize: 'medium',
      theme: 'auto'
    },
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const updateCourseData = (updates: Partial<CourseData>) => {
    setCourseData(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date()
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Firestore as draft
      console.log('Saving draft:', courseData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      // TODO: Validate and publish to Firestore
      console.log('Publishing course:', courseData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/creator-dashboard');
    } catch (error) {
      console.error('Error publishing course:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBuildChapter = (chapterId: string) => {
    setBuildingChapterId(chapterId);
    setCurrentStep(3); // Jump to chapter builder
  };

  const handleChapterComplete = () => {
    setBuildingChapterId(null);
    setCurrentStep(2); // Return to structure
  };

  const handleBackToStructure = () => {
    setBuildingChapterId(null);
    setCurrentStep(2);
  };

  const renderStepContent = () => {
    // If building a chapter, show chapter builder
    if (buildingChapterId && currentStep === 3) {
      return (
        <ChapterBuilder
          data={courseData}
          chapterId={buildingChapterId}
          onUpdate={updateCourseData}
          onComplete={handleChapterComplete}
          onBack={handleBackToStructure}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return <CourseBasicInfo data={courseData} onUpdate={updateCourseData} />;
      case 2:
        return <CourseStructure data={courseData} onUpdate={updateCourseData} onBuildChapter={handleBuildChapter} />;
      case 3:
        return <CourseCustomization data={courseData} onUpdate={updateCourseData} />;
      case 4:
        return <CoursePreview data={courseData} onPublish={handlePublish} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-xl border-b border-border shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/creator-dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h1 className="text-xl font-bold">Create New Course</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              {currentStep === steps.length && (
                <Button 
                  size="sm"
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isSaving ? 'Publishing...' : 'Publish Course'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        currentStep > step.id
                          ? 'bg-primary text-primary-foreground'
                          : currentStep === step.id
                          ? 'bg-primary/20 text-primary border-2 border-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </button>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-4 rounded-full transition-all ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {courseData.chapters.length} chapters • {
                  courseData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)
                } lessons
              </div>
              
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
