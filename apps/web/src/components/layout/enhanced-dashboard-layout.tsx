'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bell,
  Menu,
  X,
  Search,
  LogOut,
  UserCircle,
  Settings,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useNotifications } from '@/contexts/notification-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EnhancedThemeToggle } from '@/components/ui/enhanced-theme-toggle';
import { RoleBasedNavigation } from '@/components/ui/role-based-navigation';
import { NotificationDropdown } from '@/components/ui/notification-dropdown';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface EnhancedDashboardLayoutProps {
  children: React.ReactNode;
}

export function EnhancedDashboardLayout({ children }: EnhancedDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const pathname = usePathname();
  const { userProfile, logout, loading } = useAuth();
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
      setIsNotificationOpen(false);
    };

    if (isUserMenuOpen || isNotificationOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserMenuOpen, isNotificationOpen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <div className="flex flex-col flex-grow bg-card border-r border-border">
              <div className="p-4">
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="flex-1 p-4 space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="lg:pl-64 flex flex-col flex-1">
            <header className="bg-background border-b border-border">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-6">
              <div className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-xl border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Gen Elevate
                </span>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  {userProfile.photoURL ? (
                    <img 
                      src={userProfile.photoURL} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-6 h-6 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile.displayName}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={userProfile.subscription?.plan === 'free' ? 'outline' : 'netflix'} className="text-xs">
                      {userProfile.subscription?.plan || 'Free'}
                    </Badge>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {userProfile.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <RoleBasedNavigation variant="sidebar" />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <EnhancedThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Header */}
          <header className={cn(
            "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-200",
            isScrolled && "shadow-sm"
          )}>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>

                  {/* Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <div className={cn(
                      "relative transition-all duration-200",
                      isSearchFocused ? "w-80" : "w-64"
                    )}>
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search courses, webinars..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </form>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-2">
                  {/* AI Assistant Quick Access */}
                  {(userProfile.role === 'student' || userProfile.role === 'admin') && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href="/ai">
                            <Sparkles className="h-5 w-5 text-primary" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AI Assistant</p>
                      </TooltipContent>
                    </Tooltip>
                  )}

                  {/* Notifications */}
                  <div className="relative">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsNotificationOpen(!isNotificationOpen);
                          }}
                          className="relative"
                        >
                          <Bell className="h-5 w-5" />
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
                        <p>Notifications {unreadCount > 0 && `(${unreadCount})`}</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <NotificationDropdown 
                      isOpen={isNotificationOpen} 
                      onClose={() => setIsNotificationOpen(false)} 
                    />
                  </div>

                  {/* Theme Toggle */}
                  <EnhancedThemeToggle />

                  {/* User Menu */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserMenuOpen(!isUserMenuOpen);
                      }}
                      className="flex items-center space-x-2 px-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                        {userProfile.photoURL ? (
                          <img 
                            src={userProfile.photoURL} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <UserCircle className="w-5 h-5 text-primary-foreground" />
                        )}
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                        <Card className="absolute right-0 top-full mt-2 w-64 z-50 p-0 overflow-hidden">
                          <div className="p-4 border-b border-border">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                                {userProfile.photoURL ? (
                                  <img 
                                    src={userProfile.photoURL} 
                                    alt="Profile" 
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <UserCircle className="w-6 h-6 text-primary-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {userProfile.displayName}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {userProfile.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="w-full justify-start"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Link href="/dashboard/profile">
                                <UserCircle className="w-4 h-4 mr-2" />
                                Profile
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="w-full justify-start"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Link href="/dashboard/settings">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={logout}
                              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Sign Out
                            </Button>
                          </div>
                        </Card>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
