'use client';

import { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
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
  Trash2,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CourseData } from '@/app/creator-dashboard/create-course/page';

interface ChapterBuilderProps {
  data: CourseData;
  chapterId: string;
  onUpdate: (updates: Partial<CourseData>) => void;
  onComplete: () => void;
  onBack: () => void;
}

interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'image' | 'code' | 'heading' | 'list';
  content: any;
  order: number;
  uploading?: boolean;
  uploadProgress?: number;
}

export function ChapterBuilder({ data, chapterId, onUpdate, onComplete, onBack }: ChapterBuilderProps) {
  const chapter = data.chapters.find(ch => ch.id === chapterId);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);

  if (!chapter) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-destructive">Chapter not found</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentLesson = chapter.lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === chapter.lessons.length - 1;
  const progress = ((currentLessonIndex + 1) / chapter.lessons.length) * 100;

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

  const handleVideoUpload = async (blockId: string, file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid video file (MP4, WebM, or MOV)');
      return;
    }

    // Validate file size (max 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      alert('Video file size must be less than 500MB');
      return;
    }

    try {
      setUploadingBlockId(blockId);
      
      // Create storage reference
      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storageRef = ref(storage, `courses/${chapterId}/${currentLesson.id}/${timestamp}_${sanitizedFileName}`);
      
      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setContentBlocks(blocks =>
            blocks.map(block =>
              block.id === blockId
                ? { ...block, uploading: true, uploadProgress: progress }
                : block
            )
          );
        },
        (error) => {
          console.error('Upload error:', error);
          alert('Failed to upload video. Please try again.');
          setUploadingBlockId(null);
          setContentBlocks(blocks =>
            blocks.map(block =>
              block.id === blockId
                ? { ...block, uploading: false, uploadProgress: 0 }
                : block
            )
          );
        },
        async () => {
          // Upload completed
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updateContentBlock(blockId, {
            url: downloadURL,
            fileName: file.name,
            fileSize: file.size,
            type: 'upload'
          });
          setUploadingBlockId(null);
          setContentBlocks(blocks =>
            blocks.map(block =>
              block.id === blockId
                ? { ...block, uploading: false, uploadProgress: 100 }
                : block
            )
          );
        }
      );
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video. Please try again.');
      setUploadingBlockId(null);
    }
  };

  const handleImageUpload = async (blockId: string, file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('Image file size must be less than 5MB');
      return;
    }

    try {
      setUploadingBlockId(blockId);
      
      // Create storage reference
      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storageRef = ref(storage, `courses/${chapterId}/${currentLesson.id}/images/${timestamp}_${sanitizedFileName}`);
      
      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setContentBlocks(blocks =>
            blocks.map(block =>
              block.id === blockId
                ? { ...block, uploading: true, uploadProgress: progress }
                : block
            )
          );
        },
        (error) => {
          console.error('Upload error:', error);
          alert('Failed to upload image. Please try again.');
          setUploadingBlockId(null);
          setContentBlocks(blocks =>
            blocks.map(block =>
              block.id === blockId
                ? { ...block, uploading: false, uploadProgress: 0 }
                : block
            )
          );
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updateContentBlock(blockId, {
            url: downloadURL,
            fileName: file.name,
            fileSize: file.size
          });
          setUploadingBlockId(null);
          setContentBlocks(blocks =>
            blocks.map(block =>
              block.id === blockId
                ? { ...block, uploading: false, uploadProgress: 100 }
                : block
            )
          );
        }
      );
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
      setUploadingBlockId(null);
    }
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    
    // TODO: Save content blocks to Firebase
    console.log('Saving lesson content:', { lesson: currentLesson, content: contentBlocks });
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save
    
    if (isLastLesson) {
      // Chapter complete!
      setIsSaving(false);
      onComplete();
    } else {
      // Move to next lesson
      setCurrentLessonIndex(currentLessonIndex + 1);
      setContentBlocks([]); // Reset for next lesson
      setIsSaving(false);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setContentBlocks([]); // TODO: Load saved content
    }
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
        const videoContent = block.content;
        const isUploading = block.uploading;
        const progress = block.uploadProgress || 0;
        
        return (
          <div className="space-y-4">
            {videoContent?.url ? (
              // Video uploaded successfully
              <div className="space-y-3">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={videoContent.url}
                    controls
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        {videoContent.fileName || 'Video uploaded'}
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        {videoContent.fileSize ? `${(videoContent.fileSize / (1024 * 1024)).toFixed(2)} MB` : ''}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateContentBlock(block.id, null)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : isUploading ? (
              // Upload in progress
              <div className="border-2 border-primary rounded-lg p-8">
                <div className="text-center mb-4">
                  <Video className="w-12 h-12 mx-auto mb-2 text-primary animate-pulse" />
                  <p className="text-sm font-medium">Uploading video...</p>
                  <p className="text-xs text-muted-foreground">Please don't close this page</p>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-center text-sm font-medium">{Math.round(progress)}%</p>
                </div>
              </div>
            ) : (
              // Upload or embed options
              <div className="space-y-3">
                <div
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'video/mp4,video/webm,video/quicktime';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleVideoUpload(block.id, file);
                    };
                    input.click();
                  }}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-2">Upload video from device</p>
                  <p className="text-xs text-muted-foreground">
                    MP4, WebM or MOV (max. 500MB)
                  </p>
                  <Button size="sm" className="mt-4" onClick={(e) => e.stopPropagation()}>
                    Choose File
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or embed</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    value={videoContent?.embedUrl || ''}
                    onChange={(e) => updateContentBlock(block.id, { embedUrl: e.target.value, type: 'embed' })}
                  />
                  <Button
                    size="sm"
                    disabled={!videoContent?.embedUrl}
                    onClick={() => {
                      if (videoContent?.embedUrl) {
                        updateContentBlock(block.id, { ...videoContent, url: videoContent.embedUrl });
                      }
                    }}
                  >
                    Embed
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 'image':
        const imageContent = block.content;
        const isImageUploading = block.uploading;
        const imageProgress = block.uploadProgress || 0;
        
        return (
          <div className="space-y-4">
            {imageContent?.url ? (
              // Image uploaded successfully
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imageContent.url}
                    alt="Uploaded content"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        {imageContent.fileName || 'Image uploaded'}
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        {imageContent.fileSize ? `${(imageContent.fileSize / 1024).toFixed(2)} KB` : ''}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateContentBlock(block.id, null)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : isImageUploading ? (
              // Upload in progress
              <div className="border-2 border-primary rounded-lg p-8">
                <div className="text-center mb-4">
                  <Image className="w-12 h-12 mx-auto mb-2 text-primary animate-pulse" />
                  <p className="text-sm font-medium">Uploading image...</p>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${imageProgress}%` }}
                    />
                  </div>
                  <p className="text-center text-sm font-medium">{Math.round(imageProgress)}%</p>
                </div>
              </div>
            ) : (
              // Upload option
              <div
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/jpeg,image/png,image/webp,image/gif';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleImageUpload(block.id, file);
                  };
                  input.click();
                }}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">Upload image from device</p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP or GIF (max. 5MB)
                </p>
                <Button size="sm" className="mt-4" onClick={(e) => e.stopPropagation()}>
                  Choose File
                </Button>
              </div>
            )}
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

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{chapter.title}</h2>
              <p className="text-muted-foreground">
                Lesson {currentLessonIndex + 1} of {chapter.lessons.length}: {currentLesson.title}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Structure
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Chapter Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {chapter.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(index)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  index === currentLessonIndex
                    ? 'bg-primary text-primary-foreground'
                    : index < currentLessonIndex
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {index < currentLessonIndex && <CheckCircle className="w-3 h-3 inline mr-1" />}
                Lesson {index + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Editor */}
      {contentBlocks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Start Building: {currentLesson.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add content blocks to create this {currentLesson.type} lesson
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

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentLessonIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Lesson
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              {contentBlocks.length} content {contentBlocks.length === 1 ? 'block' : 'blocks'}
            </div>
            
            <Button
              onClick={handleSaveAndNext}
              disabled={isSaving || contentBlocks.length === 0}
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              {isSaving ? (
                'Saving...'
              ) : isLastLesson ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Chapter
                </>
              ) : (
                <>
                  Save & Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

