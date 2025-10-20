# 💳 Gen Elevate Payment Flow

## Complete Payment Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CUSTOMER PAYMENT FLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘

1. BROWSE ADD-ONS
   ┌──────────────────┐
   │   Student visits │
   │  /addons page    │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │  Views 6 premium │
   │    services      │
   │  with pricing    │
   └────────┬─────────┘
            │
            ▼
2. SELECT SERVICE
   ┌──────────────────┐
   │ Clicks "Purchase │
   │      Now"        │
   └────────┬─────────┘
            │
            ▼
3. CREATE CHECKOUT SESSION
   ┌──────────────────────────────────────┐
   │  Frontend calls API route:           │
   │  POST /api/create-checkout-session   │
   │                                      │
   │  Body: {                             │
   │    priceId: "price_cv_help_2999",   │
   │    addOnId: "cv-help",              │
   │    userId: "user123"                │
   │  }                                   │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │  API Route calls Stripe SDK:         │
   │  stripe.checkout.sessions.create()   │
   │                                      │
   │  Returns: {                          │
   │    url: "https://checkout.stripe..." │
   │  }                                   │
   └────────┬─────────────────────────────┘
            │
            ▼
4. REDIRECT TO STRIPE
   ┌──────────────────────────────────────┐
   │  Browser redirects to Stripe         │
   │  Checkout page (hosted by Stripe)    │
   │                                      │
   │  ┌────────────────────────────────┐ │
   │  │  🔒 Secure Stripe Checkout     │ │
   │  │                                │ │
   │  │  CV Writing Service            │ │
   │  │  £29.99                        │ │
   │  │                                │ │
   │  │  Card Number: [____________]   │ │
   │  │  Expiry: [__/__]  CVC: [___]  │ │
   │  │                                │ │
   │  │  [Pay £29.99]                  │ │
   │  └────────────────────────────────┘ │
   └────────┬─────────────────────────────┘
            │
            ▼
5. CUSTOMER ENTERS PAYMENT
   ┌──────────────────┐
   │  Customer enters │
   │   card details   │
   │  Clicks "Pay"    │
   └────────┬─────────┘
            │
            ▼
6. STRIPE PROCESSES PAYMENT
   ┌──────────────────────────────────────┐
   │  Stripe validates card               │
   │  Charges the card                    │
   │  Creates payment_intent              │
   │  Completes checkout_session          │
   └────────┬─────────────────────────────┘
            │
            ▼
7. STRIPE SENDS WEBHOOK
   ┌──────────────────────────────────────┐
   │  Stripe POSTs to webhook:            │
   │  POST /api/webhooks/stripe           │
   │                                      │
   │  Event: checkout.session.completed   │
   │  Data: {                             │
   │    id: "cs_123...",                 │
   │    payment_intent: "pi_456...",     │
   │    amount_total: 2999,              │
   │    metadata: {                       │
   │      addOnId: "cv-help",            │
   │      userId: "user123"              │
   │    }                                 │
   │  }                                   │
   └────────┬─────────────────────────────┘
            │
            ▼
8. WEBHOOK PROCESSES EVENT
   ┌──────────────────────────────────────┐
   │  Webhook handler:                    │
   │  1. Verifies Stripe signature        │
   │  2. Extracts metadata                │
   │  3. Fetches add-on details           │
   │  4. Creates purchase record          │
   │  5. Updates user's purchasedAddOns   │
   │  6. Sends confirmation email         │
   │  7. Returns 200 OK to Stripe         │
   └────────┬─────────────────────────────┘
            │
            ▼
9. FIRESTORE UPDATED
   ┌──────────────────────────────────────┐
   │  purchases/abc123                    │
   │  {                                   │
   │    userId: "user123",               │
   │    addOnId: "cv-help",              │
   │    amount: 29.99,                   │
   │    status: "completed",             │
   │    paymentStatus: "paid",           │
   │    stripeSessionId: "cs_123...",    │
   │    purchasedAt: "2024-03-15..."     │
   │  }                                   │
   │                                      │
   │  users/user123                       │
   │  {                                   │
   │    purchasedAddOns: ["cv-help"],    │
   │    ...                               │
   │  }                                   │
   └────────┬─────────────────────────────┘
            │
            ▼
10. REDIRECT TO SUCCESS
   ┌──────────────────────────────────────┐
   │  Stripe redirects customer to:       │
   │  /addons/success?session_id=cs_123   │
   │                                      │
   │  ┌────────────────────────────────┐ │
   │  │  ✅ Purchase Successful!       │ │
   │  │                                │ │
   │  │  CV Writing Service            │ │
   │  │  £29.99                        │ │
   │  │                                │ │
   │  │  What happens next:            │ │
   │  │  • Email confirmation sent     │ │
   │  │  • Team will contact you       │ │
   │  │  • Access from dashboard       │ │
   │  │                                │ │
   │  │  [Go to Dashboard]             │ │
   │  └────────────────────────────────┘ │
   └────────┬─────────────────────────────┘
            │
            ▼
11. EMAIL SENT
   ┌──────────────────────────────────────┐
   │  📧 Confirmation email sent to:      │
   │  student@example.com                 │
   │                                      │
   │  Subject: Purchase Confirmation      │
   │                                      │
   │  Thank you for purchasing            │
   │  CV Writing Service!                 │
   │                                      │
   │  Amount: £29.99                      │
   │  Transaction ID: cs_123...           │
   │                                      │
   │  Next steps:                         │
   │  1. Upload your CV                   │
   │  2. Our expert will review           │
   │  3. Receive feedback in 48 hours     │
   └──────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            REFUND FLOW                                       │
└─────────────────────────────────────────────────────────────────────────────┘

1. ADMIN INITIATES REFUND
   ┌──────────────────┐
   │  Admin calls     │
   │  handleRefund()  │
   │  function        │
   └────────┬─────────┘
            │
            ▼
2. VALIDATE REQUEST
   ┌──────────────────────────────────────┐
   │  Cloud Function:                     │
   │  1. Verify admin role                │
   │  2. Fetch purchase details           │
   │  3. Check if already refunded        │
   │  4. Verify payment was successful    │
   └────────┬─────────────────────────────┘
            │
            ▼
3. PROCESS REFUND IN STRIPE
   ┌──────────────────────────────────────┐
   │  stripe.refunds.create({             │
   │    payment_intent: "pi_456...",     │
   │    amount: 2999,  // or partial     │
   │    reason: "requested_by_customer"  │
   │  })                                  │
   └────────┬─────────────────────────────┘
            │
            ▼
4. UPDATE FIRESTORE
   ┌──────────────────────────────────────┐
   │  purchases/abc123                    │
   │  {                                   │
   │    status: "refunded",              │
   │    paymentStatus: "refunded",       │
   │    refundedAmount: 29.99,           │
   │    refundedAt: "2024-03-20...",     │
   │    refundedBy: "admin456"           │
   │  }                                   │
   │                                      │
   │  users/user123                       │
   │  {                                   │
   │    purchasedAddOns: [],  // removed │
   │    ...                               │
   │  }                                   │
   └────────┬─────────────────────────────┘
            │
            ▼
5. STRIPE SENDS WEBHOOK
   ┌──────────────────────────────────────┐
   │  Event: charge.refunded              │
   │  Webhook confirms refund processed   │
   └────────┬─────────────────────────────┘
            │
            ▼
6. NOTIFY CUSTOMER
   ┌──────────────────────────────────────┐
   │  📧 Refund confirmation email        │
   │                                      │
   │  Your refund has been processed      │
   │  Amount: £29.99                      │
   │  Expected in 5-10 business days      │
   └──────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        SUBSCRIPTION FLOW                                     │
│                      (Monthly Mentorship)                                    │
└─────────────────────────────────────────────────────────────────────────────┘

1. INITIAL PURCHASE
   [Same as one-time payment above]
   Mode: 'subscription' instead of 'payment'

2. RECURRING BILLING
   ┌──────────────────────────────────────┐
   │  Every month, Stripe automatically:  │
   │  1. Charges the card                 │
   │  2. Creates invoice                  │
   │  3. Sends webhook                    │
   │     Event: invoice.payment_succeeded │
   └────────┬─────────────────────────────┘
            │
            ▼
3. WEBHOOK CREATES RECORD
   ┌──────────────────────────────────────┐
   │  New purchase record for each month: │
   │  {                                   │
   │    type: "subscription",            │
   │    billingPeriod: {                 │
   │      start: "2024-04-01",          │
   │      end: "2024-05-01"             │
   │    }                                 │
   │  }                                   │
   └──────────────────────────────────────┘

4. CANCELLATION
   ┌──────────────────────────────────────┐
   │  Customer cancels subscription       │
   │  → Access continues until period end │
   │  → No future charges                 │
   └──────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          SECURITY MEASURES                                   │
└─────────────────────────────────────────────────────────────────────────────┘

✅ Webhook Signature Verification
   - Prevents unauthorized webhook calls
   - Uses Stripe signing secret

✅ HTTPS Only
   - All communication encrypted
   - SSL certificates required

✅ PCI Compliance
   - Stripe handles all card data
   - Never touches our servers

✅ Firestore Security Rules
   - Users can only read own purchases
   - Only system can create purchases
   - Only admins can process refunds

✅ Authentication Required
   - Must be logged in to purchase
   - User ID verified in metadata

✅ Idempotency
   - Duplicate webhooks handled gracefully
   - Prevents double-processing

✅ Audit Trail
   - All transactions logged
   - Activity logs for refunds
   - Timestamps on all records

┌─────────────────────────────────────────────────────────────────────────────┐
│                          ERROR HANDLING                                      │
└─────────────────────────────────────────────────────────────────────────────┘

Payment Declined
   → Show error message
   → Allow retry
   → Log failure in Firestore

Webhook Timeout
   → Stripe retries automatically
   → Check webhook logs in dashboard
   → Manual reconciliation if needed

Network Error
   → User sees error message
   → Transaction not created
   → Safe to retry

Invalid Signature
   → Webhook rejected
   → Logged as security event
   → Alert admin

Duplicate Webhook
   → Check if purchase exists
   → Skip if already processed
   → Return 200 OK

---

**Flow Complete! 🎉**

This diagram shows the complete journey from browsing add-ons to successful purchase and refund handling.

