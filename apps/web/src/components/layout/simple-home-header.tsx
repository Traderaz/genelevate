'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/auth-context';
import { useNotifications } from '@/contexts/notification-context';
import { NotificationDropdown } from '@/components/ui/notification-dropdown';

export function SimpleHomeHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const router = useRouter();
  const { user, userProfile, logout } = useAuth();
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsProfileMenuOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">Gen</span>
              <span className="text-2xl font-bold" style={{ 
                background: 'linear-gradient(90deg, #FFEAEA 0%, #FFB3B3 25%, #FF6B6B 50%, #E50914 75%, #E50914 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Elevate</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <div className="tap-highlight-transparent">
              <ThemeToggle />
            </div>

            {/* Notifications - Only show for authenticated users */}
            {user && (
              <div className="relative" data-dropdown>
                <button 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="flex p-2 text-foreground/80 hover:text-foreground transition-colors duration-200 relative tap-highlight-transparent min-h-touch min-w-touch items-center justify-center"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-netflix-red text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                
                <NotificationDropdown 
                  isOpen={isNotificationOpen} 
                  onClose={() => setIsNotificationOpen(false)} 
                />
              </div>
            )}

            {/* Profile Menu */}
            <div className="relative" data-dropdown>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 text-foreground/80 hover:text-foreground transition-colors duration-200 tap-highlight-transparent min-h-touch"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  {user && userProfile ? (
                    <span className="text-primary-foreground font-semibold text-sm">
                      {userProfile.firstName?.[0] || userProfile.displayName?.[0] || 'U'}
                    </span>
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-netflix animate-scale-in z-50">
                  {user && userProfile ? (
                    // Authenticated user menu
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-semibold text-foreground">{userProfile.displayName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          {userProfile.subscription?.plan || 'Free'} Plan
                        </span>
                      </div>
                      
                      {/* Menu Items */}
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/dashboard/profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/courses');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        My Courses
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/dashboard/progress');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Progress
                      </button>
                      
                      <div className="border-t border-border my-2"></div>
                      
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/settings');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Settings
                      </button>
                      <button
                        onClick={async () => {
                          setIsProfileMenuOpen(false);
                          try {
                            await logout();
                          } catch (error) {
                            console.error('Logout failed:', error);
                          }
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    // Guest user menu
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/signup');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Create Account
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/pricing');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        View Pricing
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
