# Deployment Guide

This guide covers deploying Gen Elevate to production environments.

## Overview

Gen Elevate uses a multi-service architecture:

- **Frontend**: Next.js app deployed to Vercel
- **Backend**: Firebase Cloud Functions
- **Database**: Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Payments**: Stripe

## Prerequisites

- Firebase project set up
- Vercel account connected to GitHub
- Stripe account configured
- Domain name (optional)

## Environment Setup

### Production Environment Variables

#### Vercel (Frontend)

Set these environment variables in your Vercel dashboard:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=prod_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=genelevate-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=genelevate-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=genelevate-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=prod_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=prod_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret

# App
NEXT_PUBLIC_APP_URL=https://genelevate.app
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://genelevate.app

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### Firebase Functions

Set environment variables for Firebase functions:

```bash
firebase functions:config:set \
  stripe.secret_key="sk_live_your_live_key" \
  stripe.webhook_secret="whsec_your_live_webhook_secret" \
  smtp.host="smtp.gmail.com" \
  smtp.port="587" \
  smtp.user="noreply@genelevate.app" \
  smtp.pass="your_app_password"
```

## Deployment Process

### 1. Frontend Deployment (Vercel)

#### Automatic Deployment

The frontend automatically deploys when you push to the `main` branch. The GitHub Actions workflow handles:

1. Building the application
2. Running tests
3. Deploying to Vercel

#### Manual Deployment

```bash
cd apps/web
vercel --prod
```

#### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### 2. Backend Deployment (Firebase)

#### Deploy All Services

```bash
firebase deploy --project production
```

#### Deploy Specific Services

```bash
# Functions only
firebase deploy --only functions --project production

# Firestore rules only
firebase deploy --only firestore:rules --project production

# Storage rules only
firebase deploy --only storage --project production
```

#### Production Configuration

Create a production Firebase project:

```bash
firebase projects:create genelevate-prod
firebase use genelevate-prod
```

### 3. Database Setup

#### Firestore Production Setup

1. Enable Firestore in production mode
2. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules --project production
   ```
3. Create indexes:
   ```bash
   firebase deploy --only firestore:indexes --project production
   ```

#### Data Migration

If migrating from staging:

```bash
# Export from staging
gcloud firestore export gs://staging-backup-bucket/export-folder

# Import to production
gcloud firestore import gs://staging-backup-bucket/export-folder
```

### 4. Authentication Setup

1. Configure OAuth providers in Firebase Console
2. Add authorized domains:
   - `genelevate.app`
   - `www.genelevate.app`
3. Set up email templates for:
   - Email verification
   - Password reset
   - Welcome emails

### 5. Storage Setup

1. Configure CORS for Firebase Storage:
   ```json
   [
     {
       "origin": ["https://genelevate.app"],
       "method": ["GET", "POST", "PUT", "DELETE"],
       "maxAgeSeconds": 3600
     }
   ]
   ```

2. Deploy storage rules:
   ```bash
   firebase deploy --only storage --project production
   ```

## Monitoring and Analytics

### 1. Firebase Monitoring

Enable monitoring in Firebase Console:
- Performance monitoring
- Crashlytics
- Analytics

### 2. Vercel Analytics

Enable Vercel Analytics in your dashboard for:
- Page views
- Performance metrics
- Error tracking

### 3. Stripe Monitoring

Set up Stripe webhooks for production:
- Payment succeeded
- Payment failed
- Subscription created
- Subscription cancelled

### 4. Custom Monitoring

Set up alerts for:
- High error rates
- Slow response times
- Failed payments
- User registration issues

## Security Checklist

### Frontend Security

- [ ] Environment variables properly configured
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] XSS protection enabled
- [ ] CSRF protection implemented

### Backend Security

- [ ] Firestore security rules tested
- [ ] Function authentication verified
- [ ] API rate limiting configured
- [ ] Input validation implemented
- [ ] Error messages sanitized

### Infrastructure Security

- [ ] Firebase project permissions reviewed
- [ ] Service account keys secured
- [ ] Webhook endpoints secured
- [ ] Database access restricted
- [ ] Backup strategy implemented

## Performance Optimization

### Frontend Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Implement lazy loading
   - Optimize image formats

2. **Code Splitting**
   - Dynamic imports for large components
   - Route-based code splitting
   - Bundle analysis

3. **Caching Strategy**
   - Static asset caching
   - API response caching
   - CDN configuration

### Backend Optimization

1. **Function Optimization**
   - Cold start reduction
   - Memory allocation tuning
   - Connection pooling

2. **Database Optimization**
   - Query optimization
   - Index management
   - Data denormalization

## Backup and Recovery

### 1. Database Backups

Set up automated Firestore backups:

```bash
# Create backup schedule
gcloud firestore export gs://backup-bucket/$(date +%Y-%m-%d)
```

### 2. Code Backups

- GitHub repository (primary)
- Automated backups to secondary location
- Version tags for releases

### 3. Recovery Procedures

Document procedures for:
- Database restoration
- Function rollback
- Frontend rollback
- Configuration recovery

## Scaling Considerations

### Traffic Scaling

- Vercel automatically scales frontend
- Firebase Functions auto-scale
- Monitor quotas and limits

### Database Scaling

- Monitor read/write operations
- Optimize queries for scale
- Consider data partitioning

### Cost Optimization

- Monitor Firebase usage
- Optimize function execution time
- Review Stripe transaction fees
- Implement usage alerts

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check environment variables
   - Verify dependencies
   - Review build logs

2. **Function Deployment Errors**
   - Check function syntax
   - Verify permissions
   - Review Firebase logs

3. **Database Connection Issues**
   - Verify security rules
   - Check network connectivity
   - Review authentication

### Rollback Procedures

1. **Frontend Rollback**
   ```bash
   vercel rollback --url=genelevate.app
   ```

2. **Function Rollback**
   ```bash
   firebase functions:delete functionName
   firebase deploy --only functions
   ```

3. **Database Rollback**
   - Restore from backup
   - Apply data migrations

## Maintenance

### Regular Tasks

- [ ] Monitor error rates
- [ ] Review performance metrics
- [ ] Update dependencies
- [ ] Security patches
- [ ] Backup verification

### Monthly Reviews

- [ ] Cost analysis
- [ ] Performance review
- [ ] Security audit
- [ ] User feedback analysis
- [ ] Feature usage metrics
