export const theme = {
  colors: {
    // Netflix-inspired color palette
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Netflix red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    // Dark theme colors
    dark: {
      bg: '#0f0f0f', // Netflix dark background
      surface: '#1a1a1a',
      card: '#2a2a2a',
      border: '#404040',
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
        muted: '#737373',
      },
      accent: '#e50914', // Netflix red
    },
    // Light theme colors
    light: {
      bg: '#ffffff',
      surface: '#f8f9fa',
      card: '#ffffff',
      border: '#e5e7eb',
      text: {
        primary: '#111827',
        secondary: '#4b5563',
        muted: '#9ca3af',
      },
      accent: '#e50914',
    },
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  typography: {
    fonts: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Netflix Sans', 'Inter', 'system-ui', 'sans-serif'],
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    netflix: '0 4px 16px rgba(0, 0, 0, 0.75)', // Netflix-style shadow
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      netflix: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Netflix-style easing
    },
  },
} as const;

export type Theme = typeof theme;
