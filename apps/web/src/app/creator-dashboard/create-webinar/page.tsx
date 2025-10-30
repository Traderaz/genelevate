'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { createWebinar } from '@/lib/services/webinars';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { 
  ArrowLeft, 
  Check, 
  Video,
  Calendar,
  Users,
  Clock,
  Upload,
  Link as LinkIcon,
  Save,
  Eye,
  Sparkles,
  Play,
  Radio,
  Loader2,
  CheckCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export interface WebinarData {
  title: string;
  description: string;
  category: string;
  type: 'live' | 'pre-recorded';
  
  // Scheduling
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // minutes
  timezone: string;
  
  // Content - simplified to just embedUrl
  embedUrl: string; // YouTube, Vimeo, or Zoom embed URL
  platform: 'zoom' | 'youtube' | 'vimeo';
  
  // Access Control - handled automatically on backend
  maxAttendees?: number;
  
  // Additional Info
  thumbnail: string;
  tags: string[];
  yearGroups: string[];
  hostName: string;
  hostBio: string;
  
  // Features
  enableChat: boolean;
  enableQA: boolean;
  
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'cancelled';
}

export default function CreateWebinar() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  const [webinarData, setWebinarData] = useState<WebinarData>({
    title: '',
    description: '',
    category: '',
    type: 'pre-recorded',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    timezone: 'Europe/London',
    embedUrl: '',
    platform: 'youtube',
    thumbnail: '',
    tags: [],
    yearGroups: [],
    hostName: userProfile?.displayName || '',
    hostBio: '',
    enableChat: true,
    enableQA: true,
    status: 'draft'
  });

  const updateWebinarData = (updates: Partial<WebinarData>) => {
    setWebinarData(prev => ({
      ...prev,
      ...updates
    }));
    setError(null);
  };

  const handleVideoUpload = async (file: File) => {
    if (!user) return;

    // Validate file size (5GB = 5 * 1024 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 5GB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storagePath = `webinars/${user.uid}/${timestamp}_${sanitizedFileName}`;
      const storageRef = ref(storage, storagePath);

      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error('Upload error:', error);
          setError(`Upload failed: ${error.message}`);
          setIsUploading(false);
        },
        async () => {
          // Upload complete - get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Update webinar data with the video URL
          updateWebinarData({ 
            embedUrl: downloadURL,
            platform: 'youtube' // Will use custom player for uploaded videos
          });
          
          setUploadedFileName(file.name);
          setIsUploading(false);
          setUploadProgress(100);
        }
      );
    } catch (error: any) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.message}`);
      setIsUploading(false);
    }
  };

  const handleRemoveUpload = () => {
    setUploadedFileName(null);
    setUploadProgress(0);
    updateWebinarData({ embedUrl: '' });
  };

  const validateWebinar = (): boolean => {
    if (!webinarData.title.trim()) {
      setError('Please enter a webinar title');
      return false;
    }
    if (!webinarData.description.trim()) {
      setError('Please enter a description');
      return false;
    }
    if (!webinarData.category) {
      setError('Please select a category');
      return false;
    }
    if (!webinarData.scheduledDate) {
      setError('Please select a date');
      return false;
    }
    if (!webinarData.scheduledTime) {
      setError('Please select a time');
      return false;
    }
    if (!webinarData.embedUrl.trim()) {
      setError('Please enter the video/stream URL');
      return false;
    }
    if (webinarData.yearGroups.length === 0) {
      setError('Please select at least one year group');
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      await createWebinar({
        ...webinarData,
        status: 'draft',
        createdBy: user.uid
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/creator-dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving draft:', error);
      setError('Failed to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!user) return;
    
    if (!validateWebinar()) {
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      await createWebinar({
        ...webinarData,
        status: 'scheduled',
        createdBy: user.uid
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/creator-dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error publishing webinar:', error);
      setError('Failed to publish webinar. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const categories = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Computer Science', 'Art', 'Music', 'Study Skills', 'Career Guidance'
  ];

  const yearGroups = [
    'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 
    'Year 11', 'Year 12', 'Year 13', 'A-Level', 'All Years'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Success Message */}
      {success && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Webinar {webinarData.status === 'draft' ? 'saved as draft' : 'published successfully'}!</p>
            <p className="text-sm opacity-90">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center font-bold">!</div>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="ml-4 hover:opacity-75">
            ✕
          </button>
        </div>
      )}
      
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
                  <h1 className="text-xl font-bold">Create New Webinar</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  {webinarData.type === 'live' ? 'Live interactive session' : 'Pre-recorded presentation'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSaveDraft}
                disabled={isSaving || success}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                onClick={handlePublish}
                disabled={isSaving || success || !webinarData.title}
                className="bg-gradient-to-r from-[#e50914] to-[#b00710]"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Publish Webinar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Webinar Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Webinar Type</CardTitle>
            <CardDescription>Choose how you want to deliver this webinar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => updateWebinarData({ type: 'live' })}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  webinarData.type === 'live'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Radio className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Live Webinar</h3>
                    <Badge variant="secondary" className="text-xs">Real-time interaction</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Stream live via Zoom, YouTube, or other platform. Includes live chat and Q&A.
                </p>
              </button>

              <button
                onClick={() => updateWebinarData({ type: 'pre-recorded' })}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  webinarData.type === 'pre-recorded'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Pre-recorded</h3>
                    <Badge variant="secondary" className="text-xs">Upload video</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a pre-recorded video. Students can watch on-demand or at a scheduled premiere.
                </p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Details about your webinar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Webinar Title *
              </label>
              <Input
                placeholder="e.g., GCSE Maths Exam Preparation Workshop"
                value={webinarData.title}
                onChange={(e) => updateWebinarData({ title: e.target.value })}
                className="text-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description *
              </label>
              <textarea
                placeholder="Describe what students will learn in this webinar..."
                value={webinarData.description}
                onChange={(e) => updateWebinarData({ description: e.target.value })}
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Category *</label>
                <select
                  value={webinarData.category}
                  onChange={(e) => updateWebinarData({ category: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duration (minutes) *</label>
                <Input
                  type="number"
                  placeholder="60"
                  value={webinarData.duration}
                  onChange={(e) => updateWebinarData({ duration: parseInt(e.target.value) || 60 })}
                  min="15"
                  step="15"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Target Year Groups *</label>
              <div className="flex flex-wrap gap-2">
                {yearGroups.map(year => (
                  <button
                    key={year}
                    onClick={() => {
                      const newYearGroups = webinarData.yearGroups.includes(year)
                        ? webinarData.yearGroups.filter(y => y !== year)
                        : [...webinarData.yearGroups, year];
                      updateWebinarData({ yearGroups: newYearGroups });
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      webinarData.yearGroups.includes(year)
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

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>When will this webinar be available?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date *
                </label>
                <Input
                  type="date"
                  value={webinarData.scheduledDate}
                  onChange={(e) => updateWebinarData({ scheduledDate: e.target.value })}
                  className="[color-scheme:dark]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time *
                </label>
                <Input
                  type="time"
                  value={webinarData.scheduledTime}
                  onChange={(e) => updateWebinarData({ scheduledTime: e.target.value })}
                  className="[color-scheme:dark]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Timezone</label>
              <select
                value={webinarData.timezone}
                onChange={(e) => updateWebinarData({ timezone: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="Europe/London">UK Time (GMT/BST)</option>
                <option value="Europe/Paris">Central European Time</option>
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="America/Los_Angeles">Pacific Time (US)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Content Upload/Link */}
        <Card>
          <CardHeader>
            <CardTitle>
              {webinarData.type === 'live' ? 'Live Stream Link' : 'Video Content'}
            </CardTitle>
            <CardDescription>
              {webinarData.type === 'live' 
                ? 'Provide your Zoom, YouTube Live, or Vimeo Live embed URL'
                : 'Upload your video or provide a YouTube/Vimeo link'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {webinarData.type === 'live' ? (
              // Live stream - URL only
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform *</label>
                  <select
                    value={webinarData.platform}
                    onChange={(e) => updateWebinarData({ platform: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="youtube">YouTube Live</option>
                    <option value="vimeo">Vimeo Live</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <LinkIcon className="w-4 h-4 inline mr-1" />
                    Live Stream URL *
                  </label>
                  <Input
                    placeholder={
                      webinarData.platform === 'zoom' 
                        ? 'https://zoom.us/j/...' 
                        : webinarData.platform === 'youtube'
                        ? 'https://www.youtube.com/watch?v=...'
                        : 'https://vimeo.com/...'
                    }
                    value={webinarData.embedUrl}
                    onChange={(e) => updateWebinarData({ embedUrl: e.target.value })}
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    🔒 This link will only be visible to registered paying members
                  </p>
                </div>
              </>
            ) : (
              // Pre-recorded - Upload OR URL
              <>
                <div className="space-y-4">
                  {/* Upload Option */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {isUploading ? (
                      // Upload Progress
                      <div className="space-y-4">
                        <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                        <div>
                          <p className="text-sm font-medium mb-2">Uploading Video...</p>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="bg-gradient-to-r from-[#e50914] to-[#b00710] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
                        </div>
                      </div>
                    ) : uploadedFileName ? (
                      // Upload Complete
                      <div className="space-y-4">
                        <div className="w-12 h-12 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                            Video uploaded successfully!
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">{uploadedFileName}</p>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleRemoveUpload}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove & Upload Different File
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Upload Form
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm font-medium mb-2">Upload Video File</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          MP4, WebM, MOV (max. 5GB) • Recommended: 1080p
                        </p>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          id="video-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleVideoUpload(file);
                            }
                          }}
                          disabled={isUploading}
                        />
                        <label htmlFor="video-upload">
                          <Button type="button" size="sm" asChild disabled={isUploading}>
                            <span className="cursor-pointer">Choose File</span>
                          </Button>
                        </label>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-3">
                          ✓ Videos are automatically stored securely and optimized for streaming
                        </p>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or provide a link</span>
                    </div>
                  </div>

                  {/* URL Option */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Platform</label>
                      <select
                        value={webinarData.platform}
                        onChange={(e) => updateWebinarData({ platform: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <LinkIcon className="w-4 h-4 inline mr-1" />
                        Video URL
                      </label>
                      <Input
                        placeholder={
                          webinarData.platform === 'youtube'
                            ? 'https://www.youtube.com/watch?v=...'
                            : 'https://vimeo.com/...'
                        }
                        value={webinarData.embedUrl}
                        onChange={(e) => updateWebinarData({ embedUrl: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 {webinarData.platform === 'youtube' ? 'Use the share URL from YouTube' : 'Use the video URL from Vimeo'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Scheduled Release:</strong> This video will go live to students at your scheduled date and time
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Access Control - Auto Paywall Info */}
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Users className="w-5 h-5" />
              Access Control
            </CardTitle>
            <CardDescription>
              Automatic paywall - only members with active paid subscriptions can access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background/50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                🔒 <strong>All webinars are automatically protected</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Only users with active Basic, Premium, or Pro subscriptions can view and register for webinars.
                Non-subscribers will be redirected to the subscription page.
              </p>
            </div>

            {webinarData.type === 'live' && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Max Attendees (Optional)
                </label>
                <Input
                  type="number"
                  placeholder="Leave empty for unlimited"
                  value={webinarData.maxAttendees || ''}
                  onChange={(e) => updateWebinarData({ 
                    maxAttendees: e.target.value ? parseInt(e.target.value) : undefined 
                  })}
                  min="1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Limit attendees for more intimate live sessions
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Enable interactive features for your webinar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
              <div>
                <p className="font-medium">Enable Chat</p>
                <p className="text-sm text-muted-foreground">Allow students to chat during the webinar</p>
              </div>
              <input
                type="checkbox"
                checked={webinarData.enableChat}
                onChange={(e) => updateWebinarData({ enableChat: e.target.checked })}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
              <div>
                <p className="font-medium">Enable Q&A</p>
                <p className="text-sm text-muted-foreground">Students can submit questions</p>
              </div>
              <input
                type="checkbox"
                checked={webinarData.enableQA}
                onChange={(e) => updateWebinarData({ enableQA: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
          </CardContent>
        </Card>

            {/* Preview Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <Badge>{webinarData.type === 'live' ? 'Live Stream' : 'Pre-recorded'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Access</span>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Paid Members Only</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="font-medium">{webinarData.duration} minutes</span>
                  </div>
                  {webinarData.scheduledDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                      <span className="font-medium">{webinarData.scheduledDate} at {webinarData.scheduledTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
      </div>
    </div>
  );
}
