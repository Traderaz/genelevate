'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { DNATrackingProvider } from '@/contexts/dna-tracking-context';
import { Toaster } from '@/components/ui/toaster';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="gen-elevate-theme"
    >
      <AuthProvider>
        <DNATrackingProvider>
          {children}
          <Toaster />
        </DNATrackingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
