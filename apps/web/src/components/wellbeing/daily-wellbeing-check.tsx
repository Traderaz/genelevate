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
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <h3 className="font-semibold text-foreground">Thanks for checking in!</h3>
            <p className="text-sm text-muted-foreground">
              Your wellbeing matters. Keep up the great work! 🌟
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-foreground">Daily Wellbeing Check-In</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">How are you feeling today?</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMood === mood.id
                ? `${mood.bgColor} border-current ${mood.color}`
                : 'border-border hover:border-primary/50'
            }`}
          >
            <mood.icon className={`w-8 h-8 mx-auto mb-2 ${
              selectedMood === mood.id ? mood.color : 'text-muted-foreground'
            }`} />
            <p className={`text-sm font-medium ${
              selectedMood === mood.id ? mood.color : 'text-muted-foreground'
            }`}>
              {mood.label}
            </p>
          </button>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Check-In
      </button>
    </div>
  );
}
