# 🔧 Stripe Setup Guide for Gen Elevate

## Overview
This guide walks you through setting up Stripe for the Gen Elevate add-ons marketplace.

## Prerequisites
- Stripe account (sign up at https://stripe.com)
- Access to Stripe Dashboard
- Firebase project with Cloud Functions deployed

## Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Sign up"
3. Complete registration
4. Verify your email
5. Complete business profile

## Step 2: Create Products & Prices

### In Stripe Dashboard:

1. Navigate to **Products** → **Add product**

2. **CV Writing Service**
   - Name: `CV Writing Service`
   - Description: `Professional CV review and optimization by career experts`
   - Price: `£29.99`
   - Billing: `One time`
   - Price ID: Copy this (e.g., `price_1234abcd`)

3. **Personal Statement Help**
   - Name: `Personal Statement Help`
   - Description: `Expert guidance for university and job applications`
   - Price: `£39.99`
   - Billing: `One time`
   - Price ID: Copy this

4. **Mock Interview Session**
   - Name: `Mock Interview Session`
   - Description: `1-hour practice interview with detailed feedback`
   - Price: `£49.99`
   - Billing: `One time`
   - Price ID: Copy this

5. **1-on-1 Tuition (Single)**
   - Name: `1-on-1 Tuition (Single Hour)`
   - Description: `One hour of personalized tutoring`
   - Price: `£39.99`
   - Billing: `One time`
   - Price ID: Copy this

6. **1-on-1 Tuition (5-Pack)**
   - Name: `1-on-1 Tuition (5-Hour Package)`
   - Description: `Five hours of tutoring at discounted rate`
   - Price: `£179.99`
   - Billing: `One time`
   - Price ID: Copy this

7. **Monthly Mentorship**
   - Name: `Monthly Mentorship`
   - Description: `Ongoing guidance from experienced mentor`
   - Price: `£99.99`
   - Billing: `Recurring` (Monthly)
   - Price ID: Copy this

## Step 3: Get API Keys

1. Navigate to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)
4. Store these securely

## Step 4: Configure Webhook

1. Navigate to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter endpoint URL:
   - Development: `http://localhost:5001/YOUR_PROJECT_ID/europe-west2/stripeWebhook`
   - Production: `https://europe-west2-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook`
4. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
   - ✅ `invoice.payment_succeeded`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

## Step 5: Update Environment Variables

### For Next.js (apps/web/.env.local):
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For Firebase Functions (apps/functions/.env):
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_URL=http://localhost:3000
```

### For Production (Firebase Console):
```bash
firebase functions:config:set \
  stripe.secret_key="sk_live_..." \
  stripe.webhook_secret="whsec_..." \
  app.url="https://genelevate.com"
```

## Step 6: Update Price IDs in Code

### In `apps/web/src/components/addons/addons-grid.tsx`:

Replace the `stripePriceId` values with your actual Stripe Price IDs:

```typescript
const addOns: AddOn[] = [
  {
    id: 'cv-help',
    // ... other fields
    stripePriceId: 'price_YOUR_ACTUAL_PRICE_ID_HERE' // ← Update this
  },
  // ... repeat for all add-ons
];
```

## Step 7: Install Stripe SDK

### In apps/web:
```bash
cd apps/web
npm install stripe @stripe/stripe-js
```

### In apps/functions:
```bash
cd apps/functions
npm install stripe
```

## Step 8: Uncomment Production Code

### In `apps/web/src/app/api/create-checkout-session/route.ts`:
Uncomment the Stripe initialization and checkout session creation code.

### In `apps/web/src/app/api/webhooks/stripe/route.ts`:
Uncomment the webhook signature verification code.

### In `apps/functions/src/payments/stripeWebhook.ts`:
Uncomment the Stripe event verification code.

### In `apps/functions/src/payments/createCheckoutSession.ts`:
Uncomment the Stripe checkout session creation code.

### In `apps/functions/src/payments/handleRefund.ts`:
Uncomment the Stripe refund creation code.

## Step 9: Test in Test Mode

1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Requires authentication: `4000 0025 0000 3155`

2. Test the flow:
   - Browse add-ons
   - Click "Purchase Now"
   - Complete checkout with test card
   - Verify webhook received
   - Check purchase created in Firestore
   - Verify service unlocked

3. Test refunds:
   - Create a purchase
   - Call refund function as admin
   - Verify refund in Stripe Dashboard
   - Verify service access revoked

## Step 10: Go Live

1. **Complete Stripe Onboarding**:
   - Verify business details
   - Add bank account
   - Complete tax information

2. **Switch to Live Mode**:
   - Get live API keys (pk_live_ and sk_live_)
   - Create live webhook endpoint
   - Update environment variables

3. **Update Frontend**:
   - Replace test keys with live keys
   - Update webhook URL to production

4. **Deploy**:
   ```bash
   # Deploy functions
   cd apps/functions
   firebase deploy --only functions
   
   # Deploy web app
   cd ../web
   vercel --prod
   ```

5. **Test with Real Card**:
   - Make a small test purchase
   - Verify entire flow works
   - Process a test refund

## Stripe Dashboard Overview

### Key Sections:
- **Home**: Overview of payments and activity
- **Payments**: View all transactions
- **Customers**: Manage customer records
- **Products**: Manage your services
- **Billing**: View invoices and subscriptions
- **Developers**: API keys, webhooks, logs

### Monitoring:
- **Logs**: View webhook delivery attempts
- **Events**: See all Stripe events
- **Webhooks**: Monitor webhook success/failure

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Verify webhook signatures** in production
4. **Use HTTPS** for all webhook endpoints
5. **Implement rate limiting** on API routes
6. **Log all payment events** for audit trail
7. **Monitor for suspicious activity** in Stripe Dashboard

## Troubleshooting

### Webhook Not Receiving Events
- Check webhook URL is correct
- Verify endpoint is publicly accessible
- Check Stripe Dashboard → Webhooks → Attempts
- Ensure webhook secret is correct

### Payment Fails
- Check Stripe Dashboard → Logs
- Verify API keys are correct
- Check card details are valid
- Review error messages in console

### Refund Not Processing
- Verify payment was successful first
- Check admin has correct permissions
- Review Cloud Function logs
- Ensure Stripe secret key is correct

## Support

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Gen Elevate Support**: support@genelevate.com

## Cost Estimate

### Stripe Fees:
- **UK/EU Cards**: 1.4% + 20p per transaction
- **Non-EU Cards**: 2.9% + 20p per transaction
- **Refunds**: Stripe fee is not refunded

### Example Costs:
- £29.99 CV service: £0.62 fee (2.1%)
- £49.99 interview: £0.90 fee (1.8%)
- £99.99 mentorship: £1.60 fee (1.6%)

---

**You're all set! 🎉**

Your Gen Elevate add-ons marketplace is now ready to accept payments securely through Stripe.

