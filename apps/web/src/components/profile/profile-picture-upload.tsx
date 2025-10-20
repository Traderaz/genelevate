'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { Camera, Upload, X, Loader2, Trash2 } from 'lucide-react';

interface ProfilePictureUploadProps {
  onClose: () => void;
}

export function ProfilePictureUpload({ onClose }: ProfilePictureUploadProps) {
  const { user, userProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!user || !selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileExtension = selectedFile.name.split('.').pop();
      const fileName = `profile_${user.uid}_${timestamp}.${fileExtension}`;
      
      // Create storage reference
      const storageRef = ref(storage as any, `profile-pictures/${user.uid}/${fileName}`);

      // Upload file
      await uploadBytes(storageRef, selectedFile);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update user profile in Firestore
      const userRef = doc(db as any, 'users', user.uid);
      await updateDoc(userRef, {
        photoURL: downloadURL,
        updatedAt: new Date(),
      });

      // Reload the page to show new profile picture
      window.location.reload();

    } catch (error: any) {
      console.error('Error uploading profile picture:', error);
      setError(error.message || 'Failed to upload profile picture. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!user || !userProfile?.photoURL) return;

    const confirmed = window.confirm('Are you sure you want to remove your profile picture?');
    if (!confirmed) return;

    setIsUploading(true);
    setError(null);

    try {
      // Delete from storage if it's a Firebase Storage URL
      if (userProfile.photoURL.includes('firebasestorage.googleapis.com')) {
        const oldPhotoRef = ref(storage as any, userProfile.photoURL);
        try {
          await deleteObject(oldPhotoRef);
        } catch (err) {
          console.log('Could not delete old photo from storage:', err);
          // Continue anyway - might be already deleted or not exist
        }
      }

      // Update user profile in Firestore
      const userRef = doc(db as any, 'users', user.uid);
      await updateDoc(userRef, {
        photoURL: null,
        updatedAt: new Date(),
      });

      // Reload the page
      window.location.reload();

    } catch (error: any) {
      console.error('Error removing profile picture:', error);
      setError(error.message || 'Failed to remove profile picture. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Profile Picture</h2>
              <p className="text-sm text-muted-foreground">Upload or change your photo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            disabled={isUploading}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current/Preview Picture */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-border bg-gradient-to-br from-primary to-primary/80">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : userProfile?.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt="Current profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary-foreground">
                    {userProfile?.displayName 
                      ? userProfile.displayName.split(' ').map(n => n[0]).join('') 
                      : userProfile?.firstName[0] + userProfile?.lastName[0]}
                  </div>
                )}
              </div>
              {preview && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* File Input (Hidden) */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Action Buttons */}
          <div className="space-y-3">
            {!selectedFile ? (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Choose Photo
                </button>

                {userProfile?.photoURL && (
                  <button
                    onClick={handleRemove}
                    disabled={isUploading}
                    className="w-full py-3 px-4 bg-red-500/10 text-red-500 rounded-lg font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Remove Photo
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Photo
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                    setError(null);
                  }}
                  disabled={isUploading}
                  className="w-full py-3 px-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          {/* Guidelines */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Accepted formats: JPEG, PNG, WebP, GIF</p>
            <p>• Maximum file size: 5MB</p>
            <p>• Recommended: Square images (1:1 ratio)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

