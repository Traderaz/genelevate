'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

export function AIFloatingDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      >
        <Sparkles className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      </button>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group-hover:scale-110">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-sm font-medium text-foreground">Ask Gen Elevate AI</p>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Gen Elevate AI</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-accent rounded-lg transition-colors"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-accent rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Sparkles className="w-16 h-16 text-primary mb-4" />
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Need Help?
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Chat with Gen Elevate AI for study help, career guidance, and motivation.
        </p>

        {/* Quick Actions */}
        <div className="space-y-2 w-full mb-6">
          {[
            { label: '📚 Study Help', type: 'study-help' },
            { label: '💼 Career Guidance', type: 'career-guidance' },
            { label: '⚡ Motivation', type: 'motivation' },
          ].map((action) => (
            <Link
              key={action.type}
              href={`/ai?type=${action.type}`}
              className="block w-full px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors text-sm font-medium text-foreground"
            >
              {action.label}
            </Link>
          ))}
        </div>

        <Link
          href="/ai"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          Open Full Chat
        </Link>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-accent/50">
        <p className="text-xs text-center text-muted-foreground">
          Powered by Gen Elevate AI • Safe & Private
        </p>
      </div>
    </div>
  );
}

