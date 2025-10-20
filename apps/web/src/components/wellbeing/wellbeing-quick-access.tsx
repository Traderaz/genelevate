'use client';

import { Heart, Phone, MessageCircle, Book, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function WellbeingQuickAccess() {
  const quickActions = [
    {
      title: 'Daily Check-In',
      description: 'How are you feeling today?',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      href: '/wellbeing#check-in',
      priority: 'normal'
    },
    {
      title: 'Crisis Support',
      description: 'Immediate help available 24/7',
      icon: Phone,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      href: 'tel:116123',
      priority: 'high',
      external: true
    },
    {
      title: 'Talk to Someone',
      description: 'Connect with a counselor',
      icon: MessageCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      href: 'https://www.youngminds.org.uk/young-person/get-help/',
      priority: 'normal',
      external: true
    },
    {
      title: 'Wellbeing Resources',
      description: 'Guides, tips, and exercises',
      icon: Book,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      href: '/wellbeing#resources',
      priority: 'normal'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Quick Access</h2>
        <span className="text-sm text-muted-foreground">Always available</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Component = action.external ? 'a' : Link;
          const linkProps = action.external 
            ? { href: action.href, target: action.href.startsWith('http') ? '_blank' : undefined, rel: action.href.startsWith('http') ? 'noopener noreferrer' : undefined }
            : { href: action.href };
          
          return (
          <Component
            key={action.title}
            {...linkProps}
            className={`relative bg-card border rounded-xl p-6 netflix-card hover:border-primary transition-all group ${
              action.priority === 'high' ? 'border-orange-500/50' : 'border-border'
            }`}
          >
            {action.priority === 'high' && (
              <div className="absolute top-3 right-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            )}
            <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </Component>
        );
        })}
      </div>

      {/* Safeguarding Notice */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Your wellbeing matters</p>
            <p className="text-sm text-muted-foreground">
              All content is safeguarding-approved and non-medical. If you're experiencing a crisis, 
              please contact emergency services (999) or speak to a trusted adult immediately.
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <a href="tel:116123" className="text-primary hover:underline">
                Samaritans: 116 123
              </a>
              <a href="tel:08001111" className="text-primary hover:underline">
                Childline: 0800 1111
              </a>
              <a href="https://www.youngminds.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                YoungMinds Crisis Messenger
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
