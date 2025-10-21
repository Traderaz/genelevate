'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Video, 
  Trophy, 
  User, 
  Settings, 
  Search,
  Bell,
  Menu,
  X,
  Play,
  TrendingUp,
  Calendar,
  Star,
  Briefcase,
  Heart,
  Award,
  ShoppingBag,
  Building2,
  Users,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/auth-context';
import { AIFloatingDock } from '@/components/ai/ai-floating-dock';

interface NetflixDashboardLayoutProps {
  children: React.ReactNode;
}

export function NetflixDashboardLayout({ children }: NetflixDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { userProfile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base navigation for all users
  const baseNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Courses', href: '/courses', icon: BookOpen },
    { name: 'Live Webinars', href: '/webinars', icon: Video },
    { name: 'Life Skills', href: '/life-skills', icon: Heart },
    { name: 'Careers', href: '/careers', icon: Briefcase },
    { name: 'Gen Elevate AI', href: '/ai', icon: Sparkles, highlight: true }, // NEW: AI Assistant
    { name: 'Add-Ons', href: '/addons', icon: ShoppingBag },
    { name: 'Wellbeing', href: '/wellbeing', icon: Heart },
    { name: 'Rewards', href: '/rewards', icon: Award },
    { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Achievements', href: '/dashboard/achievements', icon: Trophy },
  ];

  // Add role-specific navigation items
  const roleNavigation = [];
  if (userProfile?.role === 'institution' || userProfile?.role === 'admin') {
    roleNavigation.push({ name: 'Institution Portal', href: '/institution', icon: Building2 });
  }
  if (userProfile?.role === 'parent' || userProfile?.role === 'admin') {
    roleNavigation.push({ name: 'Parent Portal', href: '/parent', icon: Users });
  }

  const navigation = [...baseNavigation, ...roleNavigation];

  const quickActions = [
    { name: 'Continue Learning', icon: Play, color: 'bg-primary', href: '/courses' },
    { name: 'Browse Courses', icon: BookOpen, color: 'bg-blue-500', href: '/courses' },
    { name: 'Join Webinar', icon: Video, color: 'bg-green-500', href: '/webinars' },
    { name: 'View Progress', icon: TrendingUp, color: 'bg-purple-500', href: '/dashboard/progress' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar - Mobile Optimized */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
          {/* Left Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-foreground/80 hover:text-foreground transition-colors tap-highlight-transparent min-h-touch min-w-touch flex items-center justify-center"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold netflix-text-gradient hidden sm:block">
                Gen Elevate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-3 ml-8">
              {navigation.slice(0, 7).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : item.highlight
                      ? 'text-primary hover:text-primary/80 bg-primary/5'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side - Mobile Optimized */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search - Hidden on mobile */}
            <button className="hidden sm:flex p-2 text-foreground/80 hover:text-foreground transition-colors tap-highlight-transparent min-h-touch min-w-touch items-center justify-center">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-foreground/80 hover:text-foreground transition-colors relative tap-highlight-transparent min-h-touch min-w-touch flex items-center justify-center">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* Theme Toggle - Hidden on small mobile */}
            <div className="hidden xs:block tap-highlight-transparent">
              <ThemeToggle />
            </div>

            {/* Profile */}
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 p-2 text-foreground/80 hover:text-foreground transition-colors tap-highlight-transparent min-h-touch"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar - Optimized */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-card border-r border-border transform transition-transform duration-300 lg:hidden safe-area-left safe-area-top safe-area-bottom scroll-smooth-mobile ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link href="/" className="flex items-center space-x-2 tap-highlight-transparent" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold netflix-text-gradient">Gen Elevate</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-foreground/80 hover:text-foreground transition-colors tap-highlight-transparent min-h-touch min-w-touch flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-73px)]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-touch tap-highlight-transparent ${
                pathname === item.href
                  ? 'text-primary bg-primary/10'
                  : item.highlight
                  ? 'text-primary bg-primary/5 hover:bg-primary/10'
                  : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors tap-highlight-transparent min-h-[80px]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-center">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content - Mobile Optimized */}
      <main className="pt-14 sm:pt-16 min-h-screen-safe safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* AI Floating Dock */}
      <AIFloatingDock />
    </div>
  );
}
