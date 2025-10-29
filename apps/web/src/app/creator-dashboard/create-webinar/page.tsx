'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
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
  Radio
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
  
  // Content
  videoUrl?: string; // For pre-recorded
  liveStreamUrl?: string; // For live (Zoom, YouTube, etc.)
  platform?: 'zoom' | 'youtube' | 'vimeo' | 'other';
  
  // Access Control
  requiredPlan: 'basic' | 'premium' | 'pro';
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
  enableRecording: boolean;
  sendReminders: boolean;
  
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export default function CreateWebinar() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  const [webinarData, setWebinarData] = useState<WebinarData>({
    title: '',
    description: '',
    category: '',
    type: 'pre-recorded',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    timezone: 'Europe/London',
    requiredPlan: 'basic',
    thumbnail: '',
    tags: [],
    yearGroups: [],
    hostName: userProfile?.displayName || '',
    hostBio: '',
    enableChat: true,
    enableQA: true,
    enableRecording: true,
    sendReminders: true,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const updateWebinarData = (updates: Partial<WebinarData>) => {
    setWebinarData(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date()
    }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Firestore as draft
      console.log('Saving webinar draft:', webinarData);
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      console.log('Publishing webinar:', webinarData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/creator-dashboard');
    } catch (error) {
      console.error('Error publishing webinar:', error);
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

  const plans = [
    { value: 'basic', label: 'Basic', description: 'All paying members' },
    { value: 'premium', label: 'Premium', description: 'Premium + Pro members' },
    { value: 'pro', label: 'Pro', description: 'Pro members only' }
  ];

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
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button 
                size="sm"
                onClick={handlePublish}
                disabled={isSaving || !webinarData.title}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isSaving ? 'Publishing...' : 'Publish Webinar'}
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
              {webinarData.type === 'live' ? 'Live Stream Link' : 'Video Upload'}
            </CardTitle>
            <CardDescription>
              {webinarData.type === 'live' 
                ? 'Provide the link to your live stream'
                : 'Upload your pre-recorded webinar video'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {webinarData.type === 'live' ? (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform</label>
                  <select
                    value={webinarData.platform}
                    onChange={(e) => updateWebinarData({ platform: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Select platform</option>
                    <option value="zoom">Zoom</option>
                    <option value="youtube">YouTube Live</option>
                    <option value="vimeo">Vimeo Live</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <LinkIcon className="w-4 h-4 inline mr-1" />
                    Live Stream URL *
                  </label>
                  <Input
                    placeholder="https://zoom.us/j/... or https://youtube.com/live/..."
                    value={webinarData.liveStreamUrl}
                    onChange={(e) => updateWebinarData({ liveStreamUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This link will only be visible to registered paying members
                  </p>
                </div>
              </>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">Upload webinar video</p>
                <p className="text-xs text-muted-foreground mb-4">
                  MP4, WebM (max. 2GB)
                </p>
                <Button size="sm">
                  Choose File
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Access Control - PAYWALL */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Access Control
            </CardTitle>
            <CardDescription>
              All webinars are behind a paywall - only paying members can attend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Required Membership Plan *</label>
              <div className="space-y-3">
                {plans.map(plan => (
                  <button
                    key={plan.value}
                    onClick={() => updateWebinarData({ requiredPlan: plan.value as any })}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      webinarData.requiredPlan === plan.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{plan.label}</h4>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                      {webinarData.requiredPlan === plan.value && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
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
                  Limit attendees for more intimate sessions
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

            {webinarData.type === 'live' && (
              <label className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                <div>
                  <p className="font-medium">Record Session</p>
                  <p className="text-sm text-muted-foreground">Save recording for on-demand viewing</p>
                </div>
                <input
                  type="checkbox"
                  checked={webinarData.enableRecording}
                  onChange={(e) => updateWebinarData({ enableRecording: e.target.checked })}
                  className="w-5 h-5"
                />
              </label>
            )}

            <label className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
              <div>
                <p className="font-medium">Send Email Reminders</p>
                <p className="text-sm text-muted-foreground">Notify registered students before the webinar</p>
              </div>
              <input
                type="checkbox"
                checked={webinarData.sendReminders}
                onChange={(e) => updateWebinarData({ sendReminders: e.target.checked })}
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
                <span className="text-sm text-muted-foreground">Required Plan</span>
                <Badge variant="secondary" className="capitalize">{webinarData.requiredPlan}</Badge>
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
