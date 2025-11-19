'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { SuccessStory } from '@/types/success-story';
import { Plus, Edit, Trash2, Upload, Award, X, TrendingUp } from 'lucide-react';
import { RoleGuard } from '@/components/auth/role-guard';
import Image from 'next/image';

export default function SuccessStoriesManagementPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    achievement: '',
    story: '',
    imageUrl: '',
    order: 0,
    grade: '',
    subject: '',
    university: '',
    beforeGrade: '',
    afterGrade: '',
    isActive: true,
  });

  useEffect(() => {
    loadStories();
  }, []);

  async function loadStories() {
    try {
      const storiesRef = collection(db, 'successStories');
      const snapshot = await getDocs(storiesRef);
      const storiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as SuccessStory[];
      
      // Sort in memory instead of using Firestore query
      storiesData.sort((a, b) => a.order - b.order);
      
      setStories(storiesData);
    } catch (error) {
      console.error('Error loading success stories:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
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

    setUploadingImage(true);
    try {
      // Create a unique filename with sanitization
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `success-stories/${timestamp}_${sanitizedName}`;
      
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
      setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleDeleteImage() {
    if (!formData.imageUrl) return;
    
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    try {
      // Extract the file path from the URL
      const imageUrl = formData.imageUrl;
      const decodedUrl = decodeURIComponent(imageUrl);
      const pathMatch = decodedUrl.match(/\/o\/(.+?)\?/);
      
      if (pathMatch && pathMatch[1]) {
        const imagePath = pathMatch[1];
        const imageRef = ref(storage, imagePath);
        
        // Delete from Firebase Storage
        await deleteObject(imageRef);
        console.log('Image deleted from storage:', imagePath);
      }

      // Clear the image URL from form
      setFormData(prev => ({ ...prev, imageUrl: '' }));
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. It may have already been deleted.');
      // Still clear the URL even if deletion fails
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const storyData: any = {
        studentName: formData.studentName,
        achievement: formData.achievement,
        story: formData.story,
        imageUrl: formData.imageUrl,
        order: Number(formData.order),
        isActive: formData.isActive,
        updatedAt: new Date(),
      };

      // Only include optional fields if they have values
      if (formData.grade && formData.grade.trim() !== '') {
        storyData.grade = formData.grade;
      }
      if (formData.subject && formData.subject.trim() !== '') {
        storyData.subject = formData.subject;
      }
      if (formData.university && formData.university.trim() !== '') {
        storyData.university = formData.university;
      }
      if (formData.beforeGrade && formData.beforeGrade.trim() !== '' && 
          formData.afterGrade && formData.afterGrade.trim() !== '') {
        storyData.beforeAfter = {
          before: formData.beforeGrade,
          after: formData.afterGrade,
        };
      }

      if (editingStory) {
        await updateDoc(doc(db, 'successStories', editingStory.id), storyData);
      } else {
        await addDoc(collection(db, 'successStories'), {
          ...storyData,
          createdAt: new Date(),
        });
      }

      await loadStories();
      closeModal();
      alert('Success story saved successfully!');
    } catch (error) {
      console.error('Error saving success story:', error);
      alert('Failed to save success story: ' + (error as Error).message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this success story?')) return;

    try {
      await deleteDoc(doc(db, 'successStories', id));
      await loadStories();
    } catch (error) {
      console.error('Error deleting success story:', error);
      alert('Failed to delete success story');
    }
  }

  function openModal(story?: SuccessStory) {
    if (story) {
      setEditingStory(story);
      setFormData({
        studentName: story.studentName,
        achievement: story.achievement,
        story: story.story,
        imageUrl: story.imageUrl,
        order: story.order,
        grade: story.grade || '',
        subject: story.subject || '',
        university: story.university || '',
        beforeGrade: story.beforeAfter?.before || '',
        afterGrade: story.beforeAfter?.after || '',
        isActive: story.isActive,
      });
    } else {
      setEditingStory(null);
      setFormData({
        studentName: '',
        achievement: '',
        story: '',
        imageUrl: '',
        order: stories.length,
        grade: '',
        subject: '',
        university: '',
        beforeGrade: '',
        afterGrade: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingStory(null);
  }

  return (
    <RoleGuard allowedRoles={['admin', 'super_admin']}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-teal-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-teal-primary" />
                  <h1 className="text-4xl font-bold text-brand-navy">Success Stories Management</h1>
                </div>
                <p className="text-brand-navy-light">Manage student success stories featured on the homepage</p>
              </div>
              <button
                onClick={() => openModal()}
                className="bg-teal-primary hover:bg-teal-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Success Story
              </button>
            </div>
          </div>

          {/* Stories Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-white rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-teal-primary/20">
              <Award className="w-16 h-16 text-teal-primary/50 mx-auto mb-4" />
              <p className="text-xl text-brand-navy-light">No success stories yet. Add your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map(story => (
                <div key={story.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-teal-primary/20 hover:border-teal-primary transition-all group">
                  <div className="relative h-64 bg-gradient-to-br from-teal-primary to-teal-gold">
                    {story.imageUrl && (
                      <Image
                        src={story.imageUrl}
                        alt={story.studentName}
                        fill
                        className="object-cover"
                      />
                    )}
                    {story.beforeAfter && (
                      <div className="absolute top-4 left-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                        <span className="text-xs font-bold text-red-600">{story.beforeAfter.before}</span>
                        <TrendingUp className="w-4 h-4 text-teal-primary" />
                        <span className="text-xs font-bold text-teal-primary">{story.beforeAfter.after}</span>
                      </div>
                    )}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      story.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {story.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-brand-navy">{story.studentName}</h3>
                      <span className="text-sm text-teal-primary font-semibold">#{story.order}</span>
                    </div>
                    <p className="text-sm text-teal-primary font-semibold mb-2 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {story.achievement}
                    </p>
                    <p className="text-sm text-brand-navy-light line-clamp-3 mb-4">&ldquo;{story.story}&rdquo;</p>
                    
                    {(story.subject || story.grade || story.university) && (
                      <div className="space-y-1 mb-4 text-xs text-brand-navy-light">
                        {story.subject && <div>📚 {story.subject}</div>}
                        {story.grade && <div>🎓 {story.grade}</div>}
                        {story.university && <div>🏛️ {story.university}</div>}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(story)}
                        className="flex-1 bg-teal-primary/10 hover:bg-teal-primary hover:text-white text-teal-primary px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-teal-primary/20">
                <div className="sticky top-0 bg-white border-b-2 border-teal-primary/20 p-6 flex items-center justify-between z-10">
                  <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
                    <Award className="w-6 h-6 text-teal-primary" />
                    {editingStory ? 'Edit Success Story' : 'Add Success Story'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-brand-navy-light hover:text-brand-navy transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={e => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={e => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Achievement *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.achievement}
                      onChange={e => setFormData(prev => ({ ...prev, achievement: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                      placeholder="Achieved A* in Maths"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Success Story *
                    </label>
                    <textarea
                      required
                      value={formData.story}
                      onChange={e => setFormData(prev => ({ ...prev, story: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about the student's journey..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                        placeholder="Mathematics"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Final Grade
                      </label>
                      <input
                        type="text"
                        value={formData.grade}
                        onChange={e => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                        placeholder="A*"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        University
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={e => setFormData(prev => ({ ...prev, university: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                        placeholder="Oxford University"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Before Grade
                      </label>
                      <input
                        type="text"
                        value={formData.beforeGrade}
                        onChange={e => setFormData(prev => ({ ...prev, beforeGrade: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                        placeholder="Grade C"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        After Grade
                      </label>
                      <input
                        type="text"
                        value={formData.afterGrade}
                        onChange={e => setFormData(prev => ({ ...prev, afterGrade: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-primary focus:outline-none transition-colors"
                        placeholder="Grade A*"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Student Image *
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-teal-primary/30 hover:border-teal-primary rounded-lg p-6 text-center transition-all">
                          <Upload className="w-8 h-8 text-teal-primary mx-auto mb-2" />
                          <p className="text-sm text-brand-navy-light">
                            {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      {formData.imageUrl && (
                        <div className="flex flex-col gap-2">
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-teal-primary">
                            <Image
                              src={formData.imageUrl}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="px-3 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-teal-primary focus:ring-teal-primary"
                    />
                    <label htmlFor="isActive" className="text-sm font-semibold text-brand-navy cursor-pointer">
                      Active (show on homepage)
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4 border-t-2 border-teal-primary/20">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 text-brand-navy transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploadingImage || !formData.imageUrl}
                      className="flex-1 px-6 py-3 rounded-xl font-semibold bg-teal-primary hover:bg-teal-primary/90 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {editingStory ? 'Update Story' : 'Add Story'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}

