'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/auth-context';
import { useNotifications } from '@/contexts/notification-context';
import { NotificationDropdown } from '@/components/ui/notification-dropdown';

export function NetflixHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Life Skills', href: '/life-skills' },
    { name: 'Careers', href: '/careers' },
    { name: 'Add-Ons', href: '/addons', highlight: true },
    { name: 'Pricing', href: '#pricing' },
  ];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium ${
                  item.highlight
                    ? 'text-primary hover:text-primary/80 font-bold'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on mobile */}
            <button className="hidden sm:flex p-2 text-foreground/80 hover:text-foreground transition-colors duration-200 tap-highlight-transparent min-h-touch min-w-touch items-center justify-center">
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <div className="tap-highlight-transparent">
              <ThemeToggle />
            </div>

            {/* Notifications - Only show for authenticated users */}
            {user && (
              <div className="relative hidden sm:block">
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
            <div className="relative hidden md:block">
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
                            router.push('/');
                          } catch (error) {
                            console.error('Logout error:', error);
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
                          router.push('/register');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors duration-200 tap-highlight-transparent min-h-touch min-w-touch flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 animate-slide-in-from-top safe-area-bottom bg-black/95 backdrop-blur-md">
            <nav className="py-3 space-y-1">
              {user && userProfile && (
                <div className="px-4 py-3 border-b border-white/10 mb-2">
                  <p className="font-semibold text-white">{userProfile.displayName}</p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">
                    {userProfile.subscription?.plan || 'Free'} Plan
                  </span>
                </div>
              )}
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 hover:bg-white/10 rounded-md transition-colors duration-200 min-h-touch tap-highlight-transparent ${
                    item.highlight
                      ? 'text-red-400 hover:text-red-300 font-bold'
                      : 'text-gray-200 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-white/10 my-2"></div>
              
              {user && userProfile ? (
                // Authenticated user options
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 min-h-touch tap-highlight-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 min-h-touch tap-highlight-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/progress"
                    className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 min-h-touch tap-highlight-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Progress
                  </Link>
                  <button
                    onClick={async () => {
                      setIsMobileMenuOpen(false);
                      try {
                        await logout();
                        router.push('/');
                      } catch (error) {
                        console.error('Logout error:', error);
                      }
                    }}
                    className="w-full text-left px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center gap-2 min-h-touch tap-highlight-transparent"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                // Guest user options
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 min-h-touch tap-highlight-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 min-h-touch tap-highlight-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close profile menu */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </header>
  );
}
