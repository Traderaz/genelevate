/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        'xs': '475px',
        'touch': {'raw': '(hover: none) and (pointer: coarse)'},
        'mouse': {'raw': '(hover: hover) and (pointer: fine)'},
      },
      colors: {
        // Teal Gradient Theme
        teal: {
          // Gradient colors
          'blue-deep': '#0B5C9E',
          'blue-medium': '#1E88B8',
          'primary': '#2CA9B8',
          'light': '#5FC5C5',
          
          // Gold accents
          'gold': '#FFD166',
          'gold-dark': '#FFC247',
          
          // Text (white on gradient)
          'text': '#FFFFFF',
          'text-90': 'rgba(255, 255, 255, 0.9)',
          'text-70': 'rgba(255, 255, 255, 0.7)',
          
          // Card text (dark on white cards)
          'card-text': '#1A3D5C',
          'card-text-muted': '#4A6B82',
        },
        
        // Legacy brand colors
        brand: {
          'blue-deep': '#0B5C9E',
          'blue-medium': '#1E88B8',
          'teal': '#2CA9B8',
          'teal-light': '#5FC5C5',
          'gold': '#FFD166',
          'gold-dark': '#FFC247',
          'navy': '#1A3D5C',
          'navy-light': '#4A6B82',
          'bg-light': '#E8F4F8',
          'bg-lighter': '#F5FAFB',
          'glass': 'rgba(255, 255, 255, 0.15)',
          'glass-dark': 'rgba(26, 61, 92, 0.7)',
        },
        
        // Legacy netflix colors (keeping for gradual migration)
        netflix: {
          red: '#e50914',
          'red-dark': '#b20710',
          black: '#0f0f0f',
          'gray-dark': '#1a1a1a',
          'gray-medium': '#2a2a2a',
          'gray-light': '#404040',
          white: '#ffffff',
          'text-primary': '#ffffff',
          'text-secondary': '#b3b3b3',
          'text-muted': '#737373',
        },
        
        // CSS Custom Properties for dynamic theming
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'netflix': '0 4px 16px rgba(0, 0, 0, 0.75)',
        'netflix-hover': '0 8px 32px rgba(0, 0, 0, 0.9)',
        // Premium brand shadows
        'brand-sm': '0 2px 8px rgba(13, 74, 124, 0.1)',
        'brand-md': '0 4px 16px rgba(13, 74, 124, 0.15)',
        'brand-lg': '0 8px 32px rgba(13, 74, 124, 0.2)',
        'brand-xl': '0 16px 48px rgba(13, 74, 124, 0.25)',
        'gold-glow': '0 4px 20px rgba(255, 200, 87, 0.4)',
        'gold-glow-hover': '0 8px 32px rgba(255, 200, 87, 0.6)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Netflix Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'netflix': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'touch': '44px',
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function({ addUtilities }) {
      const newUtilities = {
        '.netflix-button': {
          '@apply transition-all duration-300 ease-netflix hover:scale-105 active:scale-95': {},
        },
        '.netflix-card': {
          '@apply transition-all duration-300 ease-netflix hover:scale-105 hover:shadow-netflix-hover': {},
        },
        '.netflix-gradient': {
          'background': 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
        },
        '.netflix-text-gradient': {
          'background': 'linear-gradient(135deg, #e50914 0%, #ff6b6b 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        // Gen Elevate Brand Gradients
        '.brand-gradient': {
          'background': 'linear-gradient(135deg, #0D4A7C 0%, #0F7C89 50%, #0CB1A2 100%)',
        },
        '.brand-gradient-radial': {
          'background': 'radial-gradient(circle at top right, #0D4A7C 0%, #0F7C89 50%, #0CB1A2 100%)',
        },
        '.brand-text-gradient': {
          'background': 'linear-gradient(135deg, #0D4A7C 0%, #0CB1A2 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.gold-gradient': {
          'background': 'linear-gradient(135deg, #FFC857 0%, #FFB627 100%)',
        },
        '.brand-glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        // Mobile-first utilities
        '.touch-action-none': {
          'touch-action': 'none',
        },
        '.touch-action-pan-y': {
          'touch-action': 'pan-y',
        },
        '.touch-action-pan-x': {
          'touch-action': 'pan-x',
        },
        '.tap-highlight-transparent': {
          '-webkit-tap-highlight-color': 'transparent',
        },
        // Smooth scrolling for mobile
        '.scroll-smooth-mobile': {
          '-webkit-overflow-scrolling': 'touch',
          'scroll-behavior': 'smooth',
        },
        // Prevent text size adjust on mobile
        '.text-size-adjust-none': {
          '-webkit-text-size-adjust': '100%',
          '-moz-text-size-adjust': '100%',
          'text-size-adjust': '100%',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
