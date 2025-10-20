'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  X,
  Edit3,
  Loader2
} from 'lucide-react';
import { YearGroupSelector } from '../year-groups/year-group-selector';
import { YearGroup } from '@/types/year-groups';

interface EditableProfileProps {
  onCancel: () => void;
}

export function EditableProfile({ onCancel }: EditableProfileProps) {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    displayName: userProfile?.displayName || '',
    phone: '',
    location: '',
    bio: '',
    yearGroup: userProfile?.yearGroup || null as YearGroup | null,
    subjects: userProfile?.subjects || [] as string[],
  });

  const [newSubject, setNewSubject] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !formData.subjects.includes(newSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: formData.displayName || `${formData.firstName} ${formData.lastName}`,
        yearGroup: formData.yearGroup,
        subjects: formData.subjects,
        updatedAt: new Date(),
      });

      setSuccess(true);
      setTimeout(() => {
        onCancel(); // Close edit mode after successful save
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg text-foreground/50 cursor-not-allowed"
          />
          <p className="text-xs text-foreground/50 mt-1">Email cannot be changed here</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Display Name (optional)
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => handleInputChange('displayName', e.target.value)}
            placeholder="Leave blank to use First + Last name"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Year Group Selection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <YearGroupSelector
          selectedYearGroup={formData.yearGroup}
          onSelect={(yearGroup) => handleInputChange('yearGroup', yearGroup)}
          label="Your Year Group / Education Stage"
          required={true}
        />
      </div>

      {/* Subjects */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Subjects</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSubject();
              }
            }}
            placeholder="Add a subject (e.g., Mathematics)"
            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddSubject}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.subjects.map((subject, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm"
            >
              {subject}
              <button
                type="button"
                onClick={() => handleRemoveSubject(subject)}
                className="hover:text-primary/70 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {formData.subjects.length === 0 && (
          <p className="text-sm text-foreground/50 italic">No subjects added yet</p>
        )}
      </div>
    </form>
  );
}

