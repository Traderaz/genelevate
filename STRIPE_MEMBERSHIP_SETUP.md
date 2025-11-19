# 💳 Stripe Membership Configuration Guide

## 📋 Overview
Complete Stripe integration for the £29.99/month All-Access Membership subscription.

---

## ✅ What's Already Done

Your Stripe setup is already configured for add-ons! I've now added:

✅ **Checkout Session API** - `/api/stripe/create-checkout-session`
✅ **Webhook Handler** - Already exists at `/api/webhooks/stripe`
✅ **Firebase Admin Auth** - Added `adminAuth` export
✅ **User Authentication** - Session cookie verification
✅ **Customer Portal** - Redirect existing subscribers to manage billing
✅ **Metadata Tracking** - User ID and plan tracked in Stripe

---

## 🔧 Required Environment Variables

Add this to your `.env.local` file:

```env
# Existing Stripe variables (you should already have these)
STRIPE_SECRET_KEY=sk_live_...  # or sk_test_... for testing
STRIPE_PUBLISHABLE_KEY=pk_live_...  # or pk_test_... for testing
STRIPE_WEBHOOK_SECRET=whsec_...

# NEW: Membership subscription price ID
STRIPE_MEMBERSHIP_PRICE_ID=price_...  # Create this in Step 1 below

# Base URL (if not already set)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com  # or http://localhost:3000 for dev
```

---

## 📝 Step-by-Step Setup

### **Step 1: Create Membership Product in Stripe**

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)

2. Click **"+ Add product"**

3. Fill in details:
   ```
   Name: All-Access Membership
   Description: Everything you need to excel in your studies (11+, GCSE, A-Level)
   
   Pricing model: Recurring
   Price: £29.99
   Billing period: Monthly
   
   Optional:
   - Add images/logo
   - Set statement descriptor: "GENELEVATE MEMBERSHIP"
   ```

4. Click **"Save product"**

5. **Copy the Price ID** (starts with `price_...`)

6. Add to `.env.local`:
   ```env
   STRIPE_MEMBERSHIP_PRICE_ID=price_YOUR_PRICE_ID_HERE
   ```

---

### **Step 2: Verify Webhook Configuration**

Your webhook should already be configured, but verify these events are enabled:

**Required Events:**
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

**Webhook URL:**
```
https://yourdomain.com/api/webhooks/stripe
```

**For Local Testing:**
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# This will give you a webhook secret (whsec_...)
# Add it to your .env.local
```

---

### **Step 3: Test the Flow**

#### **Test Cards (Stripe Test Mode):**

**Successful Payment:**
```
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Requires Authentication (3D Secure):**
```
Card: 4000 0027 6000 3184
```

**Payment Fails:**
```
Card: 4000 0000 0000 0002
```

#### **Test Flow:**
1. Sign in to your app
2. Go to `/pricing`
3. Click "Subscribe Now"
4. Should redirect to Stripe Checkout
5. Complete payment with test card
6. Should redirect to `/dashboard?subscription=success`
7. Check Firestore - user's `subscription.plan` should be `all-access`
8. Check Stripe Dashboard - subscription should be active

---

## 🔄 How It Works

### **User Journey:**

```
1. User clicks "Subscribe Now" on pricing page
   ↓
2. Frontend calls: GET /api/stripe/create-checkout-session
   ↓
3. API verifies user authentication (session cookie)
   ↓
4. API checks if user already has subscription
   ├─ Yes → Redirect to Customer Portal (manage billing)
   └─ No → Create new Checkout Session
   ↓
5. User redirected to Stripe Checkout page
   ↓
6. User enters payment details
   ↓
7. Payment processed
   ↓
8. Stripe sends webhook: checkout.session.completed
   ↓
9. Webhook updates Firestore:
   - subscription.plan = 'all-access'
   - subscription.status = 'active'
   - subscription.stripeCustomerId = cus_...
   - subscription.stripeSubscriptionId = sub_...
   ↓
10. User redirected to: /dashboard?subscription=success
    ↓
11. User now has full access to all features!
```

---

## 📊 Firestore Updates

### **After Successful Subscription:**

```javascript
users/{userId}
{
  subscription: {
    plan: 'all-access',           // Changed from 'free'
    status: 'active',             // Changed from 'inactive'
    stripeCustomerId: 'cus_...',  // Stripe customer ID
    stripeSubscriptionId: 'sub_...', // Stripe subscription ID
    expiresAt: Timestamp(future date),
  },
  updatedAt: Timestamp(now),
}
```

### **After Subscription Cancellation:**

```javascript
users/{userId}
{
  subscription: {
    plan: 'free',                 // Downgraded
    status: 'inactive',           // No longer active
    stripeCustomerId: 'cus_...',  // Kept for history
    stripeSubscriptionId: null,   // Cleared
    expiresAt: null,
  },
  updatedAt: Timestamp(now),
}
```

---

## 🔒 Security Features

### **1. Authentication Required:**
```typescript
// Verifies session cookie before creating checkout
const sessionCookie = cookieStore.get('session')?.value;
if (!sessionCookie) {
  return redirect('/login?redirect=/pricing');
}
```

### **2. User Verification:**
```typescript
// Verifies user exists in Firestore
const userDoc = await adminDb.collection('users').doc(userId).get();
if (!userData) {
  return redirect('/login');
}
```

### **3. Webhook Signature Verification:**
```typescript
// Verifies webhook is actually from Stripe
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET!
);
```

### **4. Metadata Tracking:**
```typescript
// User ID stored in Stripe for audit trail
metadata: {
  userId: userId,
  plan: 'all-access',
}
```

---

## 🎯 Customer Portal

Users with existing subscriptions are redirected to Stripe's Customer Portal where they can:

- ✅ Update payment method
- ✅ View invoices
- ✅ Download receipts
- ✅ Cancel subscription
- ✅ Update billing address

**Portal URL:**
```typescript
const portalSession = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: '/dashboard',
});
```

---

## 💰 Pricing Details

**Plan:** All-Access Membership
**Price:** £29.99/month
**Currency:** GBP
**Billing:** Monthly recurring
**Features:** Everything (all courses, AI, webinars, etc.)

**Trial Period:** Not configured (optional - add `trial_period_days: 7` to checkout session)

---

## 🚨 Error Handling

### **Common Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| `STRIPE_MEMBERSHIP_PRICE_ID not found` | Missing env variable | Add price ID to `.env.local` |
| `No session cookie` | User not logged in | Redirect to `/login` |
| `Invalid signature` | Wrong webhook secret | Update `STRIPE_WEBHOOK_SECRET` |
| `Customer already exists` | Duplicate customer | Use existing customer ID |

### **Error Redirects:**

- **Checkout Failed:** `/pricing?error=checkout_failed`
- **Payment Cancelled:** `/pricing?cancelled=true`
- **Not Logged In:** `/login?redirect=/pricing`

---

## 📱 Success/Cancel Pages

### **Success:**
```
URL: /dashboard?subscription=success
```

Display:
- ✅ Welcome message
- 🎉 Confetti animation
- ✨ "You now have full access!"
- 📚 Quick links to courses

### **Cancelled:**
```
URL: /pricing?cancelled=true
```

Display:
- ℹ️ "Payment was cancelled"
- 💡 "You can try again anytime"
- 🔄 "Subscribe Now" button

---

## 🧪 Testing Checklist

### **Before Going Live:**

- [ ] Create product in Stripe Dashboard
- [ ] Copy price ID to `.env.local`
- [ ] Test checkout flow in test mode
- [ ] Verify webhook receives events
- [ ] Check Firestore updates correctly
- [ ] Test subscription cancellation
- [ ] Test customer portal access
- [ ] Test failed payment handling
- [ ] Verify email receipts sent
- [ ] Test promo codes (if enabled)

### **After Going Live:**

- [ ] Switch to live Stripe keys
- [ ] Update webhook URL to production
- [ ] Monitor Stripe Dashboard for issues
- [ ] Check webhook delivery logs
- [ ] Monitor Firestore for incorrect data
- [ ] Set up Stripe alerts for failed payments

---

## 📈 Monitoring

### **Stripe Dashboard:**
- Monitor: https://dashboard.stripe.com
- Check: Payments, Subscriptions, Customers
- Alerts: Failed payments, webhooks

### **Webhook Logs:**
- View: Stripe Dashboard → Developers → Webhooks
- Check: Delivery success rate
- Debug: Failed webhook events

### **Firestore:**
- Query users with `subscription.plan = 'all-access'`
- Monitor subscription status changes
- Track revenue via subscription data

---

## 🔄 Subscription Lifecycle

```
Free Account
    ↓
[User Subscribes] → Checkout → Payment Success
    ↓
Active Subscriber (all-access)
    ↓
    ├─→ [Renewal Success] → Stays Active
    ├─→ [Renewal Failed] → Status: Inactive → Retry Payment
    ├─→ [User Cancels] → Active until period end → Then Inactive → Free
    └─→ [Refund] → Immediate cancellation → Free
```

---

## 📁 Files Created/Modified

**Created:**
- `STRIPE_MEMBERSHIP_SETUP.md` - This documentation

**Modified:**
- `apps/web/src/app/api/stripe/create-checkout-session/route.ts` - Checkout API
- `apps/web/src/lib/firebase-admin.ts` - Added `adminAuth` export
- `apps/web/src/components/sections/netflix-pricing.tsx` - Button integration

**Already Exists:**
- `apps/web/src/app/api/webhooks/stripe/route.ts` - Webhook handler (already configured!)

---

## ✅ Summary

**Status:** 🟡 **90% Complete - Just need to add Price ID!**

**What You Need to Do:**
1. Create product in Stripe Dashboard (£29.99/month)
2. Copy price ID
3. Add to `.env.local` as `STRIPE_MEMBERSHIP_PRICE_ID`
4. Test the flow
5. Go live!

**Result:** A fully functional subscription system integrated with your existing Stripe setup! 🎉

---

## 🆘 Support

**Stripe Documentation:**
- [Subscriptions](https://stripe.com/docs/billing/subscriptions/overview)
- [Webhooks](https://stripe.com/docs/webhooks)
- [Testing](https://stripe.com/docs/testing)

**Need Help?**
- Check webhook logs in Stripe Dashboard
- Monitor Next.js console for errors
- Verify environment variables are set
- Test in Stripe test mode first

---

**Last Updated:** November 19, 2025
**Status:** Ready for Production (pending price ID)

