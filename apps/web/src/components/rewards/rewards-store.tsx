'use client';

import { useState } from 'react';
import { Gift, Star, Lock, CheckCircle } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'gift-card' | 'addon' | 'physical';
  available: boolean;
  redeemed: boolean;
  icon: string;
}

export function RewardsStore() {
  const [userPoints] = useState(1250); // Mock user points

  // Mock rewards - In production, fetch from Firestore
  const rewards: Reward[] = [
    {
      id: '1',
      title: '£10 Amazon Gift Card',
      description: 'Redeem for Amazon purchases',
      pointsCost: 1000,
      type: 'gift-card',
      available: true,
      redeemed: false,
      icon: '🎁'
    },
    {
      id: '2',
      title: '£5 Starbucks Gift Card',
      description: 'Enjoy your favorite coffee',
      pointsCost: 500,
      type: 'gift-card',
      available: true,
      redeemed: false,
      icon: '☕'
    },
    {
      id: '3',
      title: 'Premium Course Add-on',
      description: 'Unlock 1 premium course',
      pointsCost: 800,
      type: 'addon',
      available: true,
      redeemed: false,
      icon: '📚'
    },
    {
      id: '4',
      title: 'Webinar Recording Access',
      description: 'Access any past webinar recording',
      pointsCost: 300,
      type: 'addon',
      available: true,
      redeemed: false,
      icon: '🎥'
    },
    {
      id: '5',
      title: '£25 Amazon Gift Card',
      description: 'Redeem for Amazon purchases',
      pointsCost: 2500,
      type: 'gift-card',
      available: true,
      redeemed: false,
      icon: '🎁'
    },
    {
      id: '6',
      title: 'Gen Elevate T-Shirt',
      description: 'Limited edition merchandise',
      pointsCost: 1500,
      type: 'physical',
      available: false,
      redeemed: false,
      icon: '👕'
    }
  ];

  const canAfford = (cost: number) => userPoints >= cost;

  const handleRedeem = (reward: Reward) => {
    if (!canAfford(reward.pointsCost) || !reward.available) return;
    
    // In production, call Cloud Function to process redemption
    console.log('Redeeming reward:', reward.id);
    alert(`Redeeming ${reward.title}! (This is a demo - no actual redemption)`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-foreground">Rewards Store</h2>
        </div>
      </div>

      {/* Your Points */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your Points</p>
            <p className="text-2xl font-bold text-foreground">{userPoints.toLocaleString()}</p>
          </div>
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-4">
        {rewards.map((reward) => {
          const affordable = canAfford(reward.pointsCost);
          const disabled = !reward.available || !affordable;

          return (
            <div
              key={reward.id}
              className={`bg-card border rounded-xl p-4 transition-all ${
                disabled
                  ? 'border-border opacity-60'
                  : 'border-border hover:border-primary netflix-card'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{reward.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={`text-sm font-semibold ${
                        affordable ? 'text-foreground' : 'text-red-500'
                      }`}>
                        {reward.pointsCost.toLocaleString()} points
                      </span>
                    </div>

                    {reward.redeemed ? (
                      <span className="flex items-center gap-1 text-sm text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        Redeemed
                      </span>
                    ) : !reward.available ? (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        Unavailable
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={disabled}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          disabled
                            ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                            : 'bg-primary text-primary-foreground netflix-button'
                        }`}
                      >
                        Redeem
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Institution rewards:</span> Your school may add custom 
          rewards like gift cards or course credits. Check back regularly for new rewards!
        </p>
      </div>
    </div>
  );
}
