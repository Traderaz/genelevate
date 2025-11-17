'use client';

import { useState } from 'react';
import { Smile, Meh, Frown, Heart, CheckCircle } from 'lucide-react';

export function DailyWellbeingCheck() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moods = [
    { id: 'great', label: 'Great', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { id: 'good', label: 'Good', icon: Smile, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { id: 'struggling', label: 'Struggling', icon: Frown, color: 'text-orange-500', bgColor: 'bg-orange-500/10' }
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      // In production, save to Firestore
      setIsSubmitted(true);
      
      // Show support resources if struggling
      if (selectedMood === 'struggling') {
        // Could trigger a modal or redirect to support page
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-teal-gold" />
          <div>
            <h3 className="font-semibold text-teal-card-text">Thanks for checking in!</h3>
            <p className="text-sm text-teal-card-text-muted">
              Your wellbeing matters. Keep up the great work! 🌟
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teal-card border border-white/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-teal-gold" />
        <h3 className="text-lg font-semibold text-teal-card-text">Daily Wellbeing Check-In</h3>
      </div>
      
      <p className="text-teal-card-text-muted mb-6">How are you feeling today?</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMood === mood.id
                ? `${mood.bgColor} border-current ${mood.color}`
                : 'border-white/20 hover:border-teal-gold/50 bg-white/5'
            }`}
          >
            <mood.icon className={`w-8 h-8 mx-auto mb-2 ${
              selectedMood === mood.id ? mood.color : 'text-teal-card-text-muted'
            }`} />
            <p className={`text-sm font-medium ${
              selectedMood === mood.id ? mood.color : 'text-teal-card-text-muted'
            }`}>
              {mood.label}
            </p>
          </button>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full px-6 py-3 teal-button-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Check-In
      </button>
    </div>
  );
}
