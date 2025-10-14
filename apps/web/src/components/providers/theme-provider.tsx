'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
};

const initialState: ThemeProviderState = {
  theme: 'dark', // Netflix defaults to dark
  setTheme: () => null,
  actualTheme: 'dark',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark', // Netflix-style default
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let resolvedTheme: 'dark' | 'light' = 'dark';

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      resolvedTheme = systemTheme;
    } else {
      resolvedTheme = theme;
    }

    root.classList.add(resolvedTheme);
    setActualTheme(resolvedTheme);

    // Set Netflix-style CSS custom properties
    if (resolvedTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#0f0f0f');
      root.style.setProperty('--bg-secondary', '#1a1a1a');
      root.style.setProperty('--bg-card', '#2a2a2a');
      root.style.setProperty('--border-color', '#404040');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--text-muted', '#737373');
      root.style.setProperty('--accent-color', '#e50914');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8f9fa');
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#4b5563');
      root.style.setProperty('--text-muted', '#9ca3af');
      root.style.setProperty('--accent-color', '#e50914');
    }
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setThemeState(newTheme);
      // TODO: Save to Firestore when user is authenticated
      // For now, we'll just update the state
    },
    actualTheme,
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};