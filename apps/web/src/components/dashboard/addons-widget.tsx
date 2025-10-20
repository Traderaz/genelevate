'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export function AddOnsWidget() {
  const featuredAddons = [
    { title: 'Mock Interview', price: '£49.99', icon: '🎤' },
    { title: 'CV Help', price: '£29.99', icon: '📄' },
    { title: '1-on-1 Tuition', price: '£39.99', icon: '👨‍🏫' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <ShoppingBag className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Premium Add-Ons</h3>
          <p className="text-sm text-gray-400">Boost your career with expert help</p>
        </div>
      </div>

      {/* Featured Services */}
      <div className="space-y-2 mb-4">
        {featuredAddons.map((addon, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{addon.icon}</span>
              <span className="text-white font-medium">{addon.title}</span>
            </div>
            <span className="text-purple-500 font-semibold">{addon.price}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href="/addons"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all group"
      >
        <Sparkles className="w-4 h-4" />
        <span>Browse All Services</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Note */}
      <p className="text-xs text-gray-500 text-center mt-3">
        Professional services to boost your applications
      </p>
    </div>
  );
}

