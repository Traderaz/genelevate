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
  CheckSquare,
  Briefcase,
  Heart,
  Award,
  ShoppingBag,
  Building2,
  Users,
  Sparkles,
  LogOut,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  Brain,
  Globe
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { EnhancedThemeToggle } from '@/components/ui/enhanced-theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/auth-context';
import { AIFloatingDock } from '@/components/ai/ai-floating-dock';
import { useNotifications } from '@/contexts/notification-context';
import { NotificationDropdown } from '@/components/ui/notification-dropdown';

interface NetflixDashboardLayoutProps {
  children: React.ReactNode;
}

export function NetflixDashboardLayout({ children }: NetflixDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const { userProfile, logout } = useAuth();
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdowns(prev => 
      prev.includes(dropdownId) 
        ? prev.filter(id => id !== dropdownId)
        : [...prev, dropdownId]
    );
  };

  // Smooth hover handlers with proper debouncing
  const handleDropdownEnter = (dropdownId: string) => {
    // Clear any existing timeout immediately
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    // Prevent rapid state changes during transitions
    if (isTransitioning) return;
    
    // If already showing this dropdown, do nothing
    if (hoveredDropdown === dropdownId) return;
    
    // Set transitioning state to prevent conflicts
    setIsTransitioning(true);
    
    // Show dropdown immediately
    setHoveredDropdown(dropdownId);
    
    // Clear transitioning state after a brief moment
    setTimeout(() => setIsTransitioning(false), 50);
  };

  const handleDropdownLeave = () => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Don't close if we're transitioning
    if (isTransitioning) return;
    
    // Add delay before hiding to allow mouse movement to dropdown
    const timeout = setTimeout(() => {
      setHoveredDropdown(null);
      setIsTransitioning(false);
    }, 200); // Increased to 200ms for more forgiving interaction
    
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);


  // Organized navigation with categories and dropdowns
  const navigationCategories = [
    {
      id: 'main',
      name: 'Dashboard',
      icon: Home,
      href: '/dashboard',
      type: 'single' as const
    },
    {
      id: 'learning',
      name: 'Learning',
      icon: BookOpen,
      type: 'dropdown' as const,
      items: [
        { name: 'My Courses', href: '/courses', icon: BookOpen },
        { name: 'Live Webinars', href: '/webinars', icon: Video },
        { name: 'Weekly To Do', href: '/todo', icon: CheckSquare },
        { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
        { name: 'Achievements', href: '/dashboard/achievements', icon: Trophy },
        { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
      ]
    },
    {
      id: 'skills',
      name: 'Life & Career',
      icon: Heart,
      type: 'dropdown' as const,
      items: [
        { name: 'Life Skills', href: '/life-skills', icon: Heart },
        { name: 'Career Explorer', href: '/careers', icon: Briefcase },
        { name: 'Wellbeing', href: '/wellbeing', icon: Heart },
        { name: 'Debate Room', href: '/debates', icon: Users },
      ]
    },
    {
      id: 'tools',
      name: 'AI & Tools',
      icon: Sparkles,
      type: 'dropdown' as const,
      items: [
        { name: 'Gen Elevate AI', href: '/ai', icon: Sparkles },
        { name: 'My DNA', href: '/dna', icon: Zap },
        { name: 'Add-Ons', href: '/addons', icon: ShoppingBag },
      ]
    },
    {
      id: 'rewards',
      name: 'Rewards',
      icon: Award,
      href: '/rewards',
      type: 'single' as const
    }
  ];

  // Add role-specific categories
  const roleCategories = [];
  if (userProfile?.role === 'institution' || userProfile?.role === 'admin') {
    roleCategories.push({
      id: 'institution',
      name: 'Institution',
      icon: Building2,
      href: '/institution',
      type: 'single' as const
    });
  }
  if (userProfile?.role === 'parent' || userProfile?.role === 'admin') {
    roleCategories.push({
      id: 'parent',
      name: 'Parent Portal',
      icon: Users,
      href: '/parent',
      type: 'single' as const
    });
  }
  if (userProfile?.role === 'content-creator') {
    // Content creators get their own navigation - redirect to creator dashboard
    return <div>Redirecting to creator dashboard...</div>;
  }

  const allCategories = [...navigationCategories, ...roleCategories];

  // Desktop navigation with dropdowns
  const desktopNavigation = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      type: 'single' as const
    },
    {
      id: 'learning',
      name: 'Learning',
      icon: BookOpen,
      type: 'dropdown' as const,
      items: [
        { name: 'My Courses', href: '/courses', icon: BookOpen },
        { name: 'Live Webinars', href: '/webinars', icon: Video },
        { name: 'Weekly Tasks', href: '/todo', icon: CheckSquare },
        { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
        { name: 'Achievements', href: '/dashboard/achievements', icon: Trophy },
      ]
    },
    {
      id: 'skills',
      name: 'Life & Career',
      icon: Heart,
      type: 'dropdown' as const,
      items: [
        { name: 'Life Skills', href: '/life-skills', icon: Heart },
        { name: 'Career Explorer', href: '/careers', icon: Briefcase },
        { name: 'Debates', href: '/debates', icon: Users },
      ]
    },
    {
      id: 'tools',
      name: 'AI & Tools',
      icon: Sparkles,
      type: 'dropdown' as const,
      highlight: true,
      items: [
        { name: 'AI Assistant', href: '/ai', icon: Sparkles },
        { name: 'DNA Tracking', href: '/dna', icon: Zap },
        { name: 'Add-Ons', href: '/addons', icon: ShoppingBag },
      ]
    },
    {
      id: 'rewards',
      name: 'Rewards',
      href: '/rewards',
      icon: Award,
      type: 'single' as const
    },
  ];

  const quickActions = [
    { name: 'Continue Learning', icon: Play, color: 'bg-primary', href: '/courses' },
    { name: 'Browse Courses', icon: BookOpen, color: 'bg-blue-500', href: '/courses' },
    { name: 'Join Webinar', icon: Video, color: 'bg-green-500', href: '/webinars' },
    { name: 'View Progress', icon: TrendingUp, color: 'bg-purple-500', href: '/dashboard/progress' },
  ];

  return (
    <TooltipProvider>
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

            {/* Desktop Navigation with Hover Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1 ml-4">
              {desktopNavigation.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => item.type === 'dropdown' && handleDropdownEnter(item.id)}
                  onMouseLeave={() => item.type === 'dropdown' && handleDropdownLeave()}
                >
                  {item.type === 'single' ? (
                    <Link
                      href={item.href!}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
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
                  ) : (
                    <>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          hoveredDropdown === item.id || item.items?.some(subItem => pathname === subItem.href)
                            ? 'text-primary bg-primary/10'
                            : item.highlight
                            ? 'text-primary hover:text-primary/80 bg-primary/5'
                            : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                        <ChevronDown className={`w-3 h-3 transition-transform ${
                          hoveredDropdown === item.id ? 'rotate-180' : ''
                        }`} />
                      </div>
                      
                      {/* Hover Dropdown Menu */}
                      {hoveredDropdown === item.id && (
                        <div 
                          className="absolute top-full left-0 mt-0 w-56 bg-card border border-border rounded-lg shadow-lg z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
                          onMouseEnter={() => handleDropdownEnter(item.id)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {/* Invisible bridge to prevent gap - larger for better UX */}
                          <div className="absolute -top-3 -left-2 -right-2 h-3 bg-transparent" />
                          <div className="py-2">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => {
                                  // Immediately close dropdown when clicking a link
                                  if (hoverTimeout) clearTimeout(hoverTimeout);
                                  setHoveredDropdown(null);
                                  setIsTransitioning(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent/50 ${
                                  pathname === subItem.href
                                    ? 'text-primary bg-primary/10'
                                    : 'text-foreground/80 hover:text-foreground'
                                }`}
                              >
                                <subItem.icon className="w-4 h-4" />
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Side - Mobile Optimized */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search - Hidden on mobile */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <Search className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search courses and content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Notifications */}
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications {unreadCount > 0 && `(${unreadCount} unread)`}</p>
                </TooltipContent>
              </Tooltip>
              
              <NotificationDropdown 
                isOpen={isNotificationOpen} 
                onClose={() => setIsNotificationOpen(false)} 
              />
            </div>

            {/* Enhanced Theme Toggle - Hidden on small mobile */}
            <div className="hidden xs:block tap-highlight-transparent">
              <EnhancedThemeToggle />
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 text-foreground/80 hover:text-foreground transition-colors tap-highlight-transparent min-h-touch rounded-lg hover:bg-accent/50"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  {userProfile?.photoURL ? (
                    <img 
                      src={userProfile.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {userProfile?.firstName || userProfile?.displayName || 'User'}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg z-50 py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                          {userProfile?.photoURL ? (
                            <img 
                              src={userProfile.photoURL} 
                              alt="Profile" 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {userProfile?.displayName || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {userProfile?.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {userProfile?.role}
                            </Badge>
                            <Badge variant={userProfile?.subscription?.plan === 'free' ? 'outline' : 'netflix'} className="text-xs">
                              {userProfile?.subscription?.plan || 'Free'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="w-4 h-4" />
                        View Profile
                      </Link>
                      
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      
                      {/* Logout Button */}
                      <button
                        onClick={async () => {
                          try {
                            await logout();
                            setIsUserMenuOpen(false);
                          } catch (error) {
                            console.error('Logout failed:', error);
                          }
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
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

        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-73px)]">
          {allCategories.map((category) => {
            const isOpen = openDropdowns.includes(category.id);
            const CategoryIcon = category.icon;
            
            if (category.type === 'single') {
              return (
                <Link
                  key={category.id}
                  href={category.href!}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-touch tap-highlight-transparent ${
                    pathname === category.href
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <CategoryIcon className="w-5 h-5 flex-shrink-0" />
                  {category.name}
                </Link>
              );
            }

            return (
              <div key={category.id} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleDropdown(category.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-touch tap-highlight-transparent ${
                    category.items?.some(item => pathname === item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="w-5 h-5 flex-shrink-0" />
                    {category.name}
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>

                {/* Dropdown Items */}
                {isOpen && category.items && (
                  <div className="ml-4 space-y-1 border-l border-border/50 pl-4">
                    {category.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors min-h-touch tap-highlight-transparent ${
                            pathname === item.href
                              ? 'text-primary bg-primary/10 font-medium'
                              : 'text-foreground/70 hover:text-foreground hover:bg-accent/30'
                          }`}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <ItemIcon className="w-4 h-4 flex-shrink-0" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-border">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              {userProfile?.photoURL ? (
                <img 
                  src={userProfile.photoURL} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {userProfile?.displayName || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userProfile?.email}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs capitalize">
                  {userProfile?.role}
                </Badge>
                <Badge variant={userProfile?.subscription?.plan === 'free' ? 'outline' : 'netflix'} className="text-xs">
                  {userProfile?.subscription?.plan || 'Free'}
                </Badge>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="space-y-2 mb-4">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/50 transition-colors rounded-lg tap-highlight-transparent min-h-touch"
              onClick={() => setIsSidebarOpen(false)}
            >
              <UserCircle className="w-4 h-4" />
              View Profile
            </Link>
            
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/50 transition-colors rounded-lg tap-highlight-transparent min-h-touch"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            
            {/* Mobile Logout Button */}
            <button
              onClick={async () => {
                try {
                  await logout();
                  setIsSidebarOpen(false);
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-lg w-full text-left tap-highlight-transparent min-h-touch"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Quick Actions */}
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
    </TooltipProvider>
  );
}
