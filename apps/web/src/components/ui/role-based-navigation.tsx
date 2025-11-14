'use client';

import { useState } from 'react';
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
  Sparkles,
  LogOut,
  UserCircle,
  GraduationCap,
  BarChart3,
  FileText,
  MessageSquare,
  Zap,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from './button';
import { Badge } from './badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  roles: string[];
  badge?: string;
  description?: string;
  isNew?: boolean;
  isPremium?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Your learning overview'
  },
  {
    name: 'Courses',
    href: '/courses',
    icon: BookOpen,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Browse and take courses'
  },
  {
    name: 'Live Webinars',
    href: '/webinars',
    icon: Video,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Join live learning sessions',
    isNew: true
  },
  {
    name: 'AI Assistant',
    href: '/ai',
    icon: Sparkles,
    roles: ['student', 'admin'],
    description: 'Get personalized help',
    isPremium: true
  },
  {
    name: 'Progress',
    href: '/dashboard/progress',
    icon: TrendingUp,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Track your learning journey'
  },
  {
    name: 'Achievements',
    href: '/dashboard/achievements',
    icon: Trophy,
    roles: ['student', 'parent', 'admin'],
    description: 'View your accomplishments'
  },
  {
    name: 'Life Skills',
    href: '/life-skills',
    icon: Heart,
    roles: ['student', 'parent', 'admin'],
    description: 'Essential life skills training'
  },
  {
    name: 'Careers',
    href: '/careers',
    icon: Briefcase,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Explore career paths'
  },
  {
    name: 'Debates',
    href: '/debates',
    icon: MessageSquare,
    roles: ['student', 'admin'],
    description: 'Join academic discussions'
  },
  {
    name: 'DNA Tracking',
    href: '/dna',
    icon: Zap,
    roles: ['student', 'parent', 'admin'],
    description: 'Track your learning DNA',
    isPremium: true
  },
  {
    name: 'Events',
    href: '/dashboard/events',
    icon: Calendar,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Upcoming events and workshops',
    isPremium: true
  },
  {
    name: 'Wellbeing',
    href: '/wellbeing',
    icon: Heart,
    roles: ['student', 'parent', 'admin'],
    description: 'Mental health resources'
  },
  {
    name: 'Add-Ons',
    href: '/addons',
    icon: ShoppingBag,
    roles: ['student', 'parent', 'institution', 'admin'],
    description: 'Premium features and tools'
  },
  // Institution specific
  {
    name: 'Institution Dashboard',
    href: '/institution',
    icon: Building2,
    roles: ['institution', 'admin'],
    description: 'Manage your institution'
  },
  {
    name: 'Students',
    href: '/institution/students',
    icon: Users,
    roles: ['institution', 'admin'],
    description: 'Manage student accounts'
  },
  {
    name: 'Analytics',
    href: '/institution/analytics',
    icon: BarChart3,
    roles: ['institution', 'admin'],
    description: 'View detailed analytics'
  },
  // Content Creator specific
  {
    name: 'Creator Dashboard',
    href: '/creator-dashboard',
    icon: GraduationCap,
    roles: ['content-creator', 'admin'],
    description: 'Manage your content'
  },
  {
    name: 'Content Library',
    href: '/creator-dashboard/content',
    icon: FileText,
    roles: ['content-creator', 'admin'],
    description: 'Your created content'
  },
  // Admin specific
  {
    name: 'Admin Panel',
    href: '/admin',
    icon: Shield,
    roles: ['admin'],
    description: 'System administration'
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Users,
    roles: ['admin'],
    description: 'Manage all users'
  },
  {
    name: 'Content Moderation',
    href: '/admin/moderation',
    icon: FileText,
    roles: ['admin'],
    description: 'Review and approve content'
  },
  // Common items
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    roles: ['student', 'parent', 'institution', 'admin', 'content-creator'],
    description: 'Manage your profile'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['student', 'parent', 'institution', 'admin', 'content-creator'],
    description: 'Account preferences'
  },
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
    roles: ['student', 'parent', 'institution'],
    description: 'Manage subscription'
  },
  {
    name: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
    roles: ['student', 'parent', 'institution', 'admin', 'content-creator'],
    description: 'Get help and support'
  }
];

interface RoleBasedNavigationProps {
  variant?: 'sidebar' | 'mobile' | 'compact';
  className?: string;
}

export function RoleBasedNavigation({ variant = 'sidebar', className }: RoleBasedNavigationProps) {
  const { userProfile } = useAuth();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  if (!userProfile) return null;

  const userRole = userProfile.role;
  const isAdmin = userRole === 'admin';
  const isPremiumUser = userProfile.subscription?.plan !== 'free';

  // Filter navigation items based on user role
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole) || isAdmin
  );

  // Group items by category
  const groupedItems = {
    main: filteredItems.filter(item => 
      ['Dashboard', 'Courses', 'Live Webinars', 'AI Assistant'].includes(item.name)
    ),
    learning: filteredItems.filter(item => 
      ['Progress', 'Achievements', 'Life Skills', 'Careers', 'Debates', 'DNA Tracking', 'Wellbeing'].includes(item.name)
    ),
    tools: filteredItems.filter(item => 
      ['Add-Ons', 'Help & Support'].includes(item.name)
    ),
    institution: filteredItems.filter(item => 
      ['Institution Dashboard', 'Students', 'Analytics'].includes(item.name)
    ),
    creator: filteredItems.filter(item => 
      ['Creator Dashboard', 'Content Library'].includes(item.name)
    ),
    admin: filteredItems.filter(item => 
      ['Admin Panel', 'User Management', 'Content Moderation'].includes(item.name)
    ),
    account: filteredItems.filter(item => 
      ['Profile', 'Settings', 'Billing'].includes(item.name)
    )
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    const canAccess = !item.isPremium || isPremiumUser || isAdmin;
    const Icon = item.icon;

    const content = (
      <div className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
        isActive 
          ? "bg-primary/10 text-primary border-l-2 border-primary" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        !canAccess && "opacity-50 cursor-not-allowed",
        variant === 'compact' && "px-2 py-1.5"
      )}
    >
      <Icon className={cn(
        "flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
        variant === 'compact' ? "w-4 h-4" : "w-5 h-5",
        isActive && "text-primary"
      )} />
      
      {variant !== 'compact' && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{item.name}</span>
            {item.isNew && (
              <Badge variant="netflix" className="text-xs px-1.5 py-0.5">
                New
              </Badge>
            )}
            {item.isPremium && !isPremiumUser && !isAdmin && (
              <Badge variant="warning" className="text-xs px-1.5 py-0.5">
                Pro
              </Badge>
            )}
          </div>
          {item.description && variant === 'sidebar' && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {item.description}
            </p>
          )}
        </div>
      )}

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg" />
      )}
    </div>
    );

    if (!canAccess) {
      return (
        <TooltipProvider key={item.href}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{content}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upgrade to Pro to access this feature</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <TooltipProvider key={item.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item.href} className="block">
              {content}
            </Link>
          </TooltipTrigger>
          {item.description && variant === 'compact' && (
            <TooltipContent>
              <p>{item.description}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderSection = (title: string, items: NavigationItem[], sectionKey: string) => {
    if (items.length === 0) return null;

    const isExpanded = expandedSections.includes(sectionKey);

    return (
      <div key={sectionKey} className="space-y-1">
        {variant === 'sidebar' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection(sectionKey)}
            className="w-full justify-between px-3 py-1.5 h-auto text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            {title}
            <X className={cn(
              "w-3 h-3 transition-transform duration-200",
              isExpanded ? "rotate-45" : "rotate-0"
            )} />
          </Button>
        )}
        
        {(variant !== 'sidebar' || isExpanded) && (
          <div className="space-y-1">
            {items.map(renderNavigationItem)}
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <nav className={cn("space-y-2", className)}>
        {renderSection("Main", groupedItems.main, "main")}
        {renderSection("Learning", groupedItems.learning, "learning")}
        {renderSection("Tools", groupedItems.tools, "tools")}
        {renderSection("Institution", groupedItems.institution, "institution")}
        {renderSection("Creator", groupedItems.creator, "creator")}
        {renderSection("Admin", groupedItems.admin, "admin")}
        {renderSection("Account", groupedItems.account, "account")}
      </nav>
    </TooltipProvider>
  );
}
