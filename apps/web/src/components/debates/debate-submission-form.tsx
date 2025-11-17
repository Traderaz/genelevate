'use client';

import { useState, useRef } from 'react';
import { Video, FileText, Upload, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DebateSubmissionFormProps {
  debateId: string;
  userId: string;
  onSubmitSuccess: () => void;
}

export function DebateSubmissionForm({ debateId, userId, onSubmitSuccess }: DebateSubmissionFormProps) {
  const [submissionType, setSubmissionType] = useState<'video' | 'text'>('text');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast.error('Video file must be less than 500MB');
      return;
    }

    setVideoFile(file);
    
    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionType === 'text' && wordCount < 100) {
      toast.error('Text submission must be at least 100 words');
      return;
    }

    if (submissionType === 'text' && wordCount > 500) {
      toast.error('Text submission must not exceed 500 words');
      return;
    }

    if (submissionType === 'video' && !videoFile) {
      toast.error('Please select a video file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      let videoUrl = '';

      // Upload video if type is video
      if (submissionType === 'video' && videoFile) {
        const { ref, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');
        const { storage } = await import('@/lib/firebase');

        const fileName = `${userId}_${debateId}_${Date.now()}.${videoFile.name.split('.').pop()}`;
        const storageRef = ref(storage, `debate-submissions/${debateId}/${fileName}`);
        
        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => {
              console.error('Upload error:', error);
              reject(error);
            },
            async () => {
              videoUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(videoUrl);
            }
          );
        });
      }

      // Save submission to Firestore
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const submissionsRef = collection(db, 'debateSubmissions');
      await addDoc(submissionsRef, {
        debateId,
        userId,
        type: submissionType,
        content: submissionType === 'text' ? textContent : '',
        videoUrl: submissionType === 'video' ? videoUrl : '',
        submittedAt: serverTimestamp(),
        grade: null,
        feedback: null,
      });

      toast.success('Submission successful! Awaiting admin review.');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="teal-card border-2 border-white/20 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-teal-card-text mb-6">Submit Your Response</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Submission Type Selector */}
        <div>
          <label className="block text-sm font-semibold text-teal-card-text mb-3">
            Choose Submission Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSubmissionType('text')}
              className={`p-4 rounded-xl border-2 transition-all ${
                submissionType === 'text'
                  ? 'border-teal-gold bg-teal-gold/10'
                  : 'border-white/20 bg-white/5 hover:border-white/30'
              }`}
            >
              <FileText className={`w-6 h-6 mx-auto mb-2 ${
                submissionType === 'text' ? 'text-teal-gold' : 'text-teal-card-text-muted'
              }`} />
              <div className={`font-semibold ${
                submissionType === 'text' ? 'text-teal-gold' : 'text-teal-card-text'
              }`}>
                Text
              </div>
              <div className="text-xs text-teal-card-text-muted mt-1">
                100-500 words
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSubmissionType('video')}
              className={`p-4 rounded-xl border-2 transition-all ${
                submissionType === 'video'
                  ? 'border-teal-gold bg-teal-gold/10'
                  : 'border-white/20 bg-white/5 hover:border-white/30'
              }`}
            >
              <Video className={`w-6 h-6 mx-auto mb-2 ${
                submissionType === 'video' ? 'text-teal-gold' : 'text-teal-card-text-muted'
              }`} />
              <div className={`font-semibold ${
                submissionType === 'video' ? 'text-teal-gold' : 'text-teal-card-text'
              }`}>
                Video
              </div>
              <div className="text-xs text-teal-card-text-muted mt-1">
                Max 10 mins
              </div>
            </button>
          </div>
        </div>

        {/* Text Input */}
        {submissionType === 'text' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-teal-card-text">
                Your Argument
              </label>
              <span className={`text-sm ${
                wordCount < 100 ? 'text-red-400' :
                wordCount > 500 ? 'text-red-400' :
                'text-teal-card-text-muted'
              }`}>
                {wordCount} / 500 words
              </span>
            </div>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Present your argument here. Remember to structure it with a clear introduction, main points with evidence, and a strong conclusion..."
              className="w-full h-64 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold resize-none"
              required
            />
          </div>
        )}

        {/* Video Upload */}
        {submissionType === 'video' && (
          <div>
            <label className="block text-sm font-semibold text-teal-card-text mb-2">
              Upload Video
            </label>
            
            {videoPreview ? (
              <div className="space-y-4">
                <video
                  src={videoPreview}
                  controls
                  className="w-full max-h-96 rounded-lg bg-black"
                >
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={() => {
                    setVideoFile(null);
                    setVideoPreview(null);
                  }}
                  className="text-sm text-teal-gold hover:underline"
                >
                  Choose Different Video
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-teal-gold/50 transition-colors">
                <Upload className="w-12 h-12 text-teal-card-text-muted mx-auto mb-4" />
                <p className="text-teal-card-text mb-2">Upload your video response</p>
                <p className="text-teal-card-text-muted text-sm mb-4">
                  MP4, MOV, or WebM (max 500MB, up to 10 minutes)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="teal-button-primary px-6 py-2 rounded-lg"
                >
                  Choose Video File
                </button>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <p className="text-sm text-teal-card-text-muted">
            Your submission will be reviewed by an admin
          </p>
          <button
            type="submit"
            disabled={uploading}
            className="teal-button-primary px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {submissionType === 'video' ? `Uploading... ${uploadProgress}%` : 'Submitting...'}
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Submit Response
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

