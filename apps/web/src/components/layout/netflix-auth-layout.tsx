'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface NetflixAuthLayoutProps {
  children: React.ReactNode;
}

export function NetflixAuthLayout({ children }: NetflixAuthLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <ArrowLeft className="w-5 h-5 text-brand-navy-light group-hover:text-brand-navy transition-colors" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-blue-medium to-brand-teal rounded-md flex items-center justify-center shadow-brand-sm">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-white drop-shadow-md">
              Gen Elevate
            </span>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Auth Card */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-brand-xl p-8 sm:p-10">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6">
        <p className="text-sm text-white/90 drop-shadow-md">
          © 2024 Gen Elevate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
