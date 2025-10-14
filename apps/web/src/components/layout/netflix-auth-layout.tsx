'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface NetflixAuthLayoutProps {
  children: React.ReactNode;
}

export function NetflixAuthLayout({ children }: NetflixAuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold netflix-text-gradient">
              Gen Elevate
            </span>
          </div>
        </Link>

        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Auth Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-netflix p-8 sm:p-10">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6">
        <p className="text-sm text-muted-foreground">
          © 2024 Gen Elevate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
