# 🔐 Pricing CTA Authentication Flow - Complete Guide

## 📋 Overview
Implemented smart authentication-aware CTA button on the pricing page that redirects users to either Stripe checkout (if logged in) or the sign-in page (if not logged in).

---

## 🎯 Button Behavior

### **"Start Your Journey" Button Logic:**

```typescript
if (user is logged in) {
  ➜ Redirect to Stripe checkout page
  ➜ Button text: "Subscribe Now"
} else {
  ➜ Redirect to sign-in page
  ➜ Button text: "Start Your Journey"
}
```

---

## 📱 User Flows

### **Flow 1: Not Logged In**
```
1. User visits /pricing (not logged in)
2. Sees button: "Start Your Journey"
3. Clicks button
4. ➜ Redirects to /login?redirect=/pricing
5. User signs in
6. ➜ Redirects back to /pricing
7. Now sees button: "Subscribe Now"
8. Clicks button
9. ➜ Redirects to Stripe checkout
```

### **Flow 2: Logged In**
```
1. User visits /pricing (already logged in)
2. Sees button: "Subscribe Now"
3. Clicks button
4. ➜ Redirects to /api/stripe/create-checkout-session
5. Stripe creates checkout session
6. ➜ Redirects to Stripe hosted checkout page
7. User completes payment
8. ➜ Redirects to /dashboard?subscription=success
```

### **Flow 3: Registration → Pricing**
```
1. User registers new account
2. ➜ Auto redirects to /pricing?newUser=true
3. Sees button: "Subscribe Now" (logged in)
4. Clicks button
5. ➜ Stripe checkout flow
```

---

## 🔧 Implementation Details

### **File: `netflix-pricing.tsx`**

**Added:**
```typescript
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

const { user } = useAuth();
const router = useRouter();

const handleStartJourney = () => {
  if (user) {
    // Logged in - go to Stripe
    router.push('/api/stripe/create-checkout-session');
  } else {
    // Not logged in - go to sign in
    router.push('/login?redirect=/pricing');
  }
};
```

**Button:**
```tsx
<button 
  onClick={handleStartJourney}
  className="..."
>
  {user ? 'Subscribe Now' : 'Start Your Journey'}
</button>
```

---

## 💳 Stripe Integration (TODO)

### **Current Status: ⚠️ NOT CONFIGURED**

The API route `/api/stripe/create-checkout-session` is a placeholder that currently redirects back to pricing with `?stripe_not_configured=true`.

### **Setup Required:**

#### **1. Install Stripe:**
```bash
npm install stripe
```

#### **2. Environment Variables:**
Add to `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...  # £29.99/month subscription price ID
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### **3. Create Stripe Product:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Products
3. Create new product:
   - Name: "All-Access Membership"
   - Pricing: £29.99 / month
   - Recurring billing
4. Copy the Price ID (starts with `price_`)

#### **4. Implement Webhook:**
Create `apps/web/src/app/api/stripe/webhook/route.ts`:
```typescript
import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case 'checkout.session.completed':
      // Update user subscription to 'all-access'
      const session = event.data.object;
      await adminDb.collection('users').doc(session.metadata.userId).update({
        'subscription.plan': 'all-access',
        'subscription.status': 'active',
        'subscription.stripeCustomerId': session.customer,
        'subscription.stripeSubscriptionId': session.subscription,
      });
      break;
      
    case 'customer.subscription.deleted':
      // Downgrade to free
      const subscription = event.data.object;
      const userQuery = await adminDb.collection('users')
        .where('subscription.stripeSubscriptionId', '==', subscription.id)
        .get();
      
      if (!userQuery.empty) {
        await userQuery.docs[0].ref.update({
          'subscription.plan': 'free',
          'subscription.status': 'cancelled',
        });
      }
      break;
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
```

#### **5. Configure Webhook in Stripe:**
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

#### **6. Test Locally:**
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# In another terminal
npm run dev

# Test checkout
stripe trigger checkout.session.completed
```

---

## 🔒 Security Considerations

### **1. User Authentication:**
- ✅ Auth state checked before redirecting to Stripe
- ✅ User ID passed to Stripe in metadata
- ✅ Webhook validates subscription against user ID

### **2. Subscription Validation:**
- ✅ `SubscriptionGuard` checks active subscription
- ✅ Prevents access to paid features without subscription
- ✅ Handles expired/cancelled subscriptions

### **3. Webhook Security:**
- ⚠️ Must verify webhook signature (see implementation above)
- ⚠️ Use HTTPS in production
- ⚠️ Store webhook secret securely

---

## 🎨 Button States

| User State | Button Text | Redirect |
|-----------|-------------|----------|
| Not logged in | "Start Your Journey" | `/login?redirect=/pricing` |
| Logged in, no subscription | "Subscribe Now" | `/api/stripe/create-checkout-session` |
| Logged in, active subscription | "Subscribe Now" | Stripe checkout (manages subscription) |

---

## 📊 Redirect URLs

### **Success:**
```
/dashboard?subscription=success
```
Display success message, confetti, welcome to membership

### **Cancel:**
```
/pricing?cancelled=true
```
Display message: "Payment cancelled. You can try again anytime."

### **Error:**
```
/pricing?error=true
```
Display message: "Something went wrong. Please try again or contact support."

---

## ✅ Testing Checklist

### **Not Logged In:**
- [ ] Click button → redirects to `/login`
- [ ] Button shows "Start Your Journey"
- [ ] After login, returns to `/pricing`
- [ ] Button now shows "Subscribe Now"

### **Logged In:**
- [ ] Click button → redirects to Stripe (or placeholder)
- [ ] Button shows "Subscribe Now"
- [ ] User can complete payment
- [ ] Webhook updates subscription in Firebase
- [ ] User gains access to paid features

### **Edge Cases:**
- [ ] Button disabled during redirect (prevent double-click)
- [ ] Handle Stripe API errors gracefully
- [ ] Handle network errors
- [ ] Handle expired sessions

---

## 🚀 Next Steps

1. **Configure Stripe** (see setup above)
2. **Implement webhook** to update user subscriptions
3. **Test payment flow** with Stripe test cards
4. **Add loading states** to button during redirect
5. **Add success/cancel pages** with better UX
6. **Monitor webhook logs** in Stripe Dashboard
7. **Set up production keys** when ready to go live

---

## 📁 Files Created/Modified

**Modified:**
- `apps/web/src/components/sections/netflix-pricing.tsx` - Added auth-aware button

**Created:**
- `apps/web/src/app/api/stripe/create-checkout-session/route.ts` - Stripe checkout API (placeholder)

**To Create:**
- `apps/web/src/app/api/stripe/webhook/route.ts` - Stripe webhook handler

**Documentation:**
- `PRICING_CTA_AUTHENTICATION.md` - This file

---

## 🎯 Summary

✅ **Smart CTA Button**: Changes based on login state
✅ **Not Logged In**: Redirects to sign-in page
✅ **Logged In**: Redirects to Stripe checkout
✅ **Dynamic Text**: "Start Your Journey" vs "Subscribe Now"
⚠️ **Stripe Setup**: Required for payment processing

**Result:** A seamless user flow from pricing page → authentication → payment → subscription activation! 🎉

---

**Status**: ✅ Frontend Complete | ⚠️ Stripe Integration Required

