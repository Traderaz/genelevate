'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CourseData } from '@/app/creator-dashboard/create-course/page';
import { CheckCircle, AlertCircle, Eye, Upload } from 'lucide-react';

interface CoursePreviewProps {
  data: CourseData;
  onPublish: () => void;
}

export function CoursePreview({ data, onPublish }: CoursePreviewProps) {
  const validations = [
    { label: 'Course title', valid: data.title.length > 0, required: true },
    { label: 'Description', valid: data.description.length > 0, required: true },
    { label: 'Category', valid: data.category.length > 0, required: true },
    { label: 'At least one chapter', valid: data.chapters.length > 0, required: true },
    { label: 'At least one lesson', valid: data.chapters.some(ch => ch.lessons.length > 0), required: true },
    { label: 'Thumbnail image', valid: data.thumbnail.length > 0, required: false },
  ];

  const isReadyToPublish = validations.filter(v => v.required).every(v => v.valid);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Publishing Checklist</CardTitle>
          <CardDescription>Ensure your course meets all requirements before publishing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {validations.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                {item.valid ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
                <span className={item.valid ? 'text-foreground' : 'text-muted-foreground'}>
                  {item.label}
                  {item.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
            ))}
          </div>

          {!isReadyToPublish && (
            <div className="mt-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Complete all required items before publishing your course.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{data.title || 'Untitled Course'}</h3>
            <p className="text-muted-foreground mt-2">{data.description || 'No description'}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>{data.category || 'Uncategorized'}</Badge>
            <Badge variant="secondary" className="capitalize">{data.difficulty}</Badge>
            <Badge variant="outline">Included in Membership</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Chapters</p>
              <p className="text-2xl font-bold">{data.chapters.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lessons</p>
              <p className="text-2xl font-bold">
                {data.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quizzes</p>
              <p className="text-2xl font-bold">
                {data.chapters.filter(ch => ch.quiz).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ready to publish?</h3>
              <p className="text-sm text-muted-foreground">
                Your course will be submitted for review before going live.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={onPublish}
                disabled={!isReadyToPublish}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                <Upload className="w-4 h-4 mr-2" />
                Publish Course
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

