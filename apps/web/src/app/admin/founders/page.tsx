'use client';

import { useState, useEffect, useRef } from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Founder } from '@/types/founder';
import { Plus, Edit2, Trash2, Save, X, Upload, Linkedin, Twitter, Mail, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminFoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    imageUrl: '',
    order: 0,
    socialLinks: {
      linkedin: '',
      twitter: '',
      email: '',
    },
    achievements: [''],
    isActive: true,
  });

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const foundersRef = collection(db, 'founders');
      const q = query(foundersRef, orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const foundersData: Founder[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          role: data.role,
          bio: data.bio,
          imageUrl: data.imageUrl,
          order: data.order,
          socialLinks: data.socialLinks || {},
          achievements: data.achievements || [],
          isActive: data.isActive,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });

      setFounders(foundersData);
    } catch (error) {
      console.error('Error fetching founders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFounder = async () => {
    try {
      const foundersRef = collection(db, 'founders');
      await addDoc(foundersRef, {
        ...formData,
        achievements: formData.achievements.filter(a => a.trim() !== ''),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      await fetchFounders();
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error('Error adding founder:', error);
      alert('Failed to add founder');
    }
  };

  const handleUpdateFounder = async (id: string) => {
    try {
      const founderRef = doc(db, 'founders', id);
      await updateDoc(founderRef, {
        ...formData,
        achievements: formData.achievements.filter(a => a.trim() !== ''),
        updatedAt: Timestamp.now(),
      });

      await fetchFounders();
      setEditingId(null);
      resetForm();
    } catch (error) {
      console.error('Error updating founder:', error);
      alert('Failed to update founder');
    }
  };

  const handleDeleteFounder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this founder?')) return;

    try {
      const founderRef = doc(db, 'founders', id);
      await deleteDoc(founderRef);
      await fetchFounders();
    } catch (error) {
      console.error('Error deleting founder:', error);
      alert('Failed to delete founder');
    }
  };

  const startEdit = (founder: Founder) => {
    setFormData({
      name: founder.name,
      role: founder.role,
      bio: founder.bio,
      imageUrl: founder.imageUrl,
      order: founder.order,
      socialLinks: {
        linkedin: founder.socialLinks?.linkedin || '',
        twitter: founder.socialLinks?.twitter || '',
        email: founder.socialLinks?.email || ''
      },
      achievements: founder.achievements && founder.achievements.length > 0 ? founder.achievements : [''],
      isActive: founder.isActive,
    });
    setEditingId(founder.id);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      imageUrl: '',
      order: 0,
      socialLinks: { linkedin: '', twitter: '', email: '' },
      achievements: [''],
      isActive: true,
    });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ''],
    });
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const removeAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB. Your image is ' + (file.size / (1024 * 1024)).toFixed(2) + 'MB');
      return;
    }

    setUploading(true);
    try {
      // Create a unique filename with sanitization
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `founders/${timestamp}_${sanitizedName}`;
      
      console.log('Uploading to:', filename);
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, filename);
      const uploadResult = await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          uploadedBy: 'admin',
          uploadedAt: new Date().toISOString(),
        }
      });
      
      console.log('Upload successful, getting URL...');
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      console.log('Download URL:', downloadURL);
      
      // Update form data with the image URL
      setFormData({ ...formData, imageUrl: downloadURL });
      
      alert('Image uploaded successfully!');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to upload image. ';
      
      if (error.code === 'storage/unauthorized') {
        errorMessage += 'Storage permissions not configured. Please check Firebase Storage rules.';
      } else if (error.code === 'storage/canceled') {
        errorMessage += 'Upload was canceled.';
      } else if (error.code === 'storage/unknown') {
        errorMessage += 'An unknown error occurred. Check console for details.';
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again or use an image URL instead.';
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <RoleGuard allowedRoles={['admin']}>
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-96 bg-card animate-pulse rounded-xl" />
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage Founders</h1>
              <p className="text-muted-foreground mt-2">
                Add, edit, or remove founders from the homepage
              </p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingId(null);
                resetForm();
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Founder
            </button>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || editingId) && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  {editingId ? 'Edit Founder' : 'Add New Founder'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Founder & CEO"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Brief biography..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Founder Image *
                  </label>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <div className="space-y-3">
                    {/* Image Preview */}
                    {formData.imageUrl && (
                      <div className="relative w-32 h-32 bg-secondary rounded-lg overflow-hidden border-2 border-border">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Upload/URL Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Or paste image URL..."
                      />
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        disabled={uploading}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5" />
                            Upload Image
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload an image or paste a URL. Max 5MB. Recommended: 800x800px or larger.
                    </p>
                    {uploading === false && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-500">
                        💡 If upload fails, check Firebase Storage rules or use an external image URL instead.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://twitter.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.socialLinks.email}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, email: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Achievements */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Key Achievements
                  </label>
                  <div className="space-y-2">
                    {formData.achievements.map((achievement, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Achievement..."
                        />
                        <button
                          onClick={() => removeAchievement(index)}
                          className="px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addAchievement}
                      className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                    >
                      + Add Achievement
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">Active (visible on homepage)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => editingId ? handleUpdateFounder(editingId) : handleAddFounder()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Update' : 'Add'} Founder
                </button>
              </div>
            </div>
          )}

          {/* Founders List */}
          <div className="grid grid-cols-1 gap-4">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between"
              >
                <div className="flex gap-4 flex-1">
                  <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    {founder.imageUrl && (
                      <img
                        src={founder.imageUrl}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{founder.name}</h3>
                        <p className="text-sm text-primary">{founder.role}</p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{founder.bio}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${founder.isActive ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                          {founder.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-2 py-1 bg-secondary rounded text-xs text-foreground">
                          Order: {founder.order}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(founder)}
                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFounder(founder.id)}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {founders.length === 0 && !showAddForm && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No founders added yet. Click "Add Founder" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

