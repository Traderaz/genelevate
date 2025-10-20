'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';

interface Purchase {
  id: string;
  addOnTitle: string;
  addOnId: string;
  price: number;
  currency: string;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  purchasedAt: Date;
  expiresAt?: Date;
  sessionInfo?: string;
}

export function MyPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - In production, fetch from Firestore
    const mockPurchases: Purchase[] = [
      {
        id: '1',
        addOnTitle: 'Mock Interview Session',
        addOnId: 'mock-interview',
        price: 49.99,
        currency: 'GBP',
        status: 'completed',
        purchasedAt: new Date('2024-03-10'),
        sessionInfo: 'Scheduled for March 25, 2024 at 2:00 PM'
      },
      {
        id: '2',
        addOnTitle: 'CV Writing Service',
        addOnId: 'cv-help',
        price: 29.99,
        currency: 'GBP',
        status: 'completed',
        purchasedAt: new Date('2024-03-05')
      }
    ];

    setPurchases(mockPurchases);
    setIsLoading(false);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'refunded':
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'refunded':
        return 'Refunded';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'refunded':
      case 'failed':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-card animate-pulse rounded-xl" />
      </div>
    );
  }

  if (purchases.length === 0) {
    return null; // Don't show section if no purchases
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">My Purchases</h2>
      </div>

      {/* Purchases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-card border border-border rounded-xl p-6 netflix-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {purchase.addOnTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Purchased {purchase.purchasedAt.toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(purchase.status)}`}>
                {getStatusIcon(purchase.status)}
                {getStatusText(purchase.status)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-foreground">
                  £{purchase.price.toFixed(2)}
                </span>
              </div>

              {purchase.sessionInfo && (
                <div className="mt-4 p-3 bg-secondary rounded-lg">
                  <p className="text-sm text-foreground">{purchase.sessionInfo}</p>
                </div>
              )}

              {purchase.status === 'completed' && (
                <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg netflix-button text-sm font-medium flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Access Service
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
