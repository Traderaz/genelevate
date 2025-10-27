'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export function EnhancedThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4 text-gray-500" />;
    }
    return actualTheme === 'dark' ? 
      <Moon className="h-4 w-4 text-blue-400" /> : 
      <Sun className="h-4 w-4 text-yellow-500" />;
  };

  const getTooltipText = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="w-9 h-9 transition-all duration-300 hover:scale-105 hover:bg-accent/50"
            aria-label={getTooltipText()}
          >
            <div className="transition-all duration-300 hover:rotate-12">
              {getIcon()}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs font-medium">{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
