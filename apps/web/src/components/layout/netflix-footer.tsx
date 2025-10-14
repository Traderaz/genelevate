'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ThemeToggleWithLabel } from '@/components/ui/theme-toggle';

export function NetflixFooter() {
  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { name: 'Courses', href: '/courses' },
        { name: 'Live Webinars', href: '/webinars' },
        { name: 'AI Tutoring', href: '/ai-tutor' },
        { name: 'Mobile App', href: '/mobile' },
        { name: 'Pricing', href: '/pricing' },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Student Guide', href: '/guide' },
        { name: 'Teacher Resources', href: '/teachers' },
        { name: 'API Documentation', href: '/api' },
        { name: 'Status', href: '/status' },
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Accessibility', href: '/accessibility' },
      ]
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/genelevate' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/genelevate' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/genelevate' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/genelevate' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/genelevate' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-netflix-red rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="text-2xl font-bold netflix-text-gradient">
                  Gen Elevate
                </span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-sm">
                Empowering students worldwide with premium education technology. 
                Join the learning revolution and unlock your potential.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@genelevate.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">London, UK</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground hover:bg-netflix-red hover:text-white transition-all duration-300 netflix-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest news, updates, and learning tips delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 md:min-w-96">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all duration-200"
              />
              <button className="px-6 py-3 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg netflix-button whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Gen Elevate. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Theme:</span>
              <ThemeToggleWithLabel />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
