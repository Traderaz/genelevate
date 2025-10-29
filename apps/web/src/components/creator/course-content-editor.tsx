'use client';

import { useState } from 'react';
import { 
  Video, 
  FileText, 
  Image, 
  Code, 
  List, 
  Type, 
  Bold, 
  Italic, 
  Underline,
  Link as LinkIcon,
  Upload,
  X,
  Plus,
  GripVertical,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CourseData } from '@/app/creator-dashboard/create-course/page';

interface CourseContentEditorProps {
  data: CourseData;
  onUpdate: (updates: Partial<CourseData>) => void;
}

interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'image' | 'code' | 'heading' | 'list';
  content: any;
  order: number;
}

export function CourseContentEditor({ data, onUpdate }: CourseContentEditorProps) {
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  const chapter = data.chapters.find(ch => ch.id === selectedChapter);
  const lesson = chapter?.lessons.find(l => l.id === selectedLesson);

  const addContentBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'text' ? '' : type === 'list' ? [] : null,
      order: contentBlocks.length
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (blockId: string, content: any) => {
    setContentBlocks(contentBlocks.map(block =>
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const deleteContentBlock = (blockId: string) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== blockId));
  };

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <div className="flex gap-2 p-2 bg-muted rounded-md">
              <Button size="sm" variant="ghost" className="h-8">
                <Bold className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8">
                <Italic className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8">
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px bg-border" />
              <Button size="sm" variant="ghost" className="h-8">
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, e.target.value)}
              placeholder="Start typing your content..."
              className="w-full min-h-[200px] px-4 py-3 rounded-md border border-input bg-background resize-none"
            />
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-2">Upload video or paste URL</p>
              <p className="text-xs text-muted-foreground mb-4">
                MP4, WebM or YouTube/Vimeo link
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input placeholder="https://youtube.com/watch?v=..." />
                <Button size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">Upload image</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, or WebP (max. 5MB)
            </p>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-2">
            <select className="px-3 py-2 rounded-md border border-input bg-background text-sm w-40">
              <option>JavaScript</option>
              <option>Python</option>
              <option>HTML</option>
              <option>CSS</option>
              <option>Java</option>
            </select>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, e.target.value)}
              placeholder="// Enter your code here..."
              className="w-full min-h-[200px] px-4 py-3 rounded-md border border-input bg-muted font-mono text-sm resize-none"
            />
          </div>
        );

      case 'heading':
        return (
          <Input
            value={block.content}
            onChange={(e) => updateContentBlock(block.id, e.target.value)}
            placeholder="Enter heading..."
            className="text-2xl font-bold"
          />
        );

      case 'list':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input placeholder="Add list item..." />
              <Button size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <ul className="space-y-1">
              {(block.content || []).map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <span className="flex-1">{item}</span>
                  <Button size="sm" variant="ghost">
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  if (!selectedChapter || !selectedLesson) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content Editor</CardTitle>
          <CardDescription>
            Select a lesson to edit its content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Chapter</label>
              <select
                value={selectedChapter}
                onChange={(e) => {
                  setSelectedChapter(e.target.value);
                  setSelectedLesson('');
                }}
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
              >
                <option value="">Choose a chapter...</option>
                {data.chapters.map((ch, index) => (
                  <option key={ch.id} value={ch.id}>
                    Chapter {index + 1}: {ch.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedChapter && chapter && (
              <div>
                <label className="text-sm font-medium mb-2 block">Select Lesson</label>
                <select
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                >
                  <option value="">Choose a lesson...</option>
                  {chapter.lessons.map((lesson, index) => (
                    <option key={lesson.id} value={lesson.id}>
                      Lesson {index + 1}: {lesson.title} ({lesson.type})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {data.chapters.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p>Create chapters and lessons first in the Structure step</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Editing: {lesson?.title}</CardTitle>
              <CardDescription>
                {chapter?.title} • {lesson?.type} lesson
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedLesson('');
                setSelectedChapter('');
              }}
            >
              Change Lesson
            </Button>
          </div>
        </CardHeader>
      </Card>

      {contentBlocks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Start Building Your Lesson</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add content blocks to create your lesson
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
              <Button onClick={() => addContentBlock('heading')} variant="outline">
                <Type className="w-4 h-4 mr-2" />
                Heading
              </Button>
              <Button onClick={() => addContentBlock('text')} variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Text
              </Button>
              <Button onClick={() => addContentBlock('video')} variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Video
              </Button>
              <Button onClick={() => addContentBlock('image')} variant="outline">
                <Image className="w-4 h-4 mr-2" />
                Image
              </Button>
              <Button onClick={() => addContentBlock('code')} variant="outline">
                <Code className="w-4 h-4 mr-2" />
                Code
              </Button>
              <Button onClick={() => addContentBlock('list')} variant="outline">
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {contentBlocks.map((block) => (
              <Card key={block.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <button className="cursor-grab p-1 mt-2">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="capitalize">
                          {block.type}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteContentBlock(block.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {renderContentBlock(block)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Add block:</span>
                <Button onClick={() => addContentBlock('heading')} size="sm" variant="outline">
                  <Type className="w-3 h-3 mr-1" />
                  Heading
                </Button>
                <Button onClick={() => addContentBlock('text')} size="sm" variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  Text
                </Button>
                <Button onClick={() => addContentBlock('video')} size="sm" variant="outline">
                  <Video className="w-3 h-3 mr-1" />
                  Video
                </Button>
                <Button onClick={() => addContentBlock('image')} size="sm" variant="outline">
                  <Image className="w-3 h-3 mr-1" />
                  Image
                </Button>
                <Button onClick={() => addContentBlock('code')} size="sm" variant="outline">
                  <Code className="w-3 h-3 mr-1" />
                  Code
                </Button>
                <Button onClick={() => addContentBlock('list')} size="sm" variant="outline">
                  <List className="w-3 h-3 mr-1" />
                  List
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

