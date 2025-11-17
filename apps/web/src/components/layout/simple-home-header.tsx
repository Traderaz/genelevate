'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, User, ChevronDown, LogOut } from 'lucide-react';
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
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-baseline gap-1 group">
              <span className="text-2xl font-bold text-white group-hover:text-teal-gold transition-colors">Gen</span>
              <span className="text-2xl font-bold teal-text-gradient">Elevate</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Notifications - Only show for authenticated users */}
            {user && (
              <div className="relative" data-dropdown>
                <button 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="flex p-2 text-white hover:text-teal-gold transition-all duration-200 relative tap-highlight-transparent min-h-touch min-w-touch items-center justify-center hover:scale-110"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-teal-gold text-teal-card-text text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
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
                className="flex items-center space-x-2 p-2 text-brand-navy-light hover:text-brand-navy transition-colors duration-200 tap-highlight-transparent min-h-touch"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-brand-blue-medium to-brand-teal rounded-full flex items-center justify-center shadow-brand-sm">
                  {user && userProfile ? (
                    <span className="text-white font-semibold text-sm">
                      {userProfile.firstName?.[0] || userProfile.displayName?.[0] || 'U'}
                    </span>
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-brand-blue-deep/10 rounded-xl shadow-brand-lg animate-scale-in z-50">
                  {user && userProfile ? (
                    // Authenticated user menu
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-brand-blue-deep/10">
                        <p className="font-semibold text-brand-navy">{userProfile.displayName}</p>
                        <p className="text-sm text-brand-navy-light">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-brand-teal/10 text-brand-teal text-xs rounded-full font-medium">
                          {userProfile.subscription?.plan || 'Free'} Plan
                        </span>
                      </div>
                      
                      {/* Menu Items */}
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/dashboard/profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/courses');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
                      >
                        My Courses
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/dashboard/progress');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
                      >
                        Progress
                      </button>
                      
                      <div className="border-t border-brand-blue-deep/10 my-2"></div>
                      
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/settings');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
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
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors flex items-center gap-2"
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
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/signup');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
                      >
                        Create Account
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push('/pricing');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-brand-bg-light hover:text-brand-teal transition-colors"
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
