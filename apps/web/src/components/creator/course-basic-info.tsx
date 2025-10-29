'use client';

import { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CourseData } from '@/app/creator-dashboard/create-course/page';

interface CourseBasicInfoProps {
  data: CourseData;
  onUpdate: (updates: Partial<CourseData>) => void;
}

export function CourseBasicInfo({ data, onUpdate }: CourseBasicInfoProps) {
  const [tagInput, setTagInput] = useState('');

  const categories = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Computer Science', 'Art', 'Music', 'Physical Education', 'Languages'
  ];

  const yearGroups = [
    'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 
    'Year 11', 'Year 12', 'Year 13', 'A-Level'
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' }
  ];

  const handleAddTag = () => {
    if (tagInput && !data.tags.includes(tagInput)) {
      onUpdate({ tags: [...data.tags, tagInput] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    onUpdate({ tags: data.tags.filter(t => t !== tag) });
  };

  const toggleYearGroup = (year: string) => {
    if (data.yearGroups.includes(year)) {
      onUpdate({ yearGroups: data.yearGroups.filter(y => y !== year) });
    } else {
      onUpdate({ yearGroups: [...data.yearGroups, year] });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>
            Basic details about your course that students will see first
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Course Title *
            </label>
            <Input
              placeholder="e.g., Advanced Mathematics for A-Level Students"
              value={data.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="text-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Course Description *
            </label>
            <textarea
              placeholder="Describe what students will learn in this course..."
              value={data.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
          </div>

          {/* Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Category *
              </label>
              <select
                value={data.category}
                onChange={(e) => onUpdate({ category: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Difficulty Level *
              </label>
              <div className="flex gap-2">
                {difficulties.map(diff => (
                  <button
                    key={diff.value}
                    onClick={() => onUpdate({ difficulty: diff.value as any })}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      data.difficulty === diff.value
                        ? diff.color + ' ring-2 ring-offset-2'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tags (e.g., calculus, algebra)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button onClick={handleAddTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Year Groups */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Target Year Groups *
            </label>
            <div className="flex flex-wrap gap-2">
              {yearGroups.map(year => (
                <button
                  key={year}
                  onClick={() => toggleYearGroup(year)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    data.yearGroups.includes(year)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thumbnail Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Course Thumbnail</CardTitle>
          <CardDescription>
            Upload an eye-catching image for your course (recommended: 1920x1080px)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or WebP (max. 5MB)
            </p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

