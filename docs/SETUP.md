# Gen Elevate - Development Setup Guide

This guide will help you set up the Gen Elevate development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **npm 10+** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Firebase CLI** - Install with `npm install -g firebase-tools`
- **Vercel CLI** (optional) - Install with `npm install -g vercel`

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gen-elevate-monorepo
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo using npm workspaces.

### 3. Environment Configuration

#### Frontend Environment Variables

Copy the example environment file for the web app:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local` with your configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Firebase Functions Environment Variables

Copy the example environment file for Firebase functions:

```bash
cp apps/functions/.env.example apps/functions/.env
```

Edit `apps/functions/.env` with your configuration:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Firebase Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable the following services:
   - Authentication
   - Firestore Database
   - Cloud Functions
   - Cloud Storage

### 2. Configure Authentication

1. In the Firebase Console, go to Authentication > Sign-in method
2. Enable the following providers:
   - Email/Password
   - Google (optional)

### 3. Initialize Firebase in Your Project

```bash
firebase login
firebase init
```

Select the following features:
- Firestore
- Functions
- Hosting
- Storage

Choose your existing Firebase project when prompted.

### 4. Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore
```

## Development

### Start Development Servers

To start all development servers:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Firebase Emulators**: http://localhost:4000 (UI)
  - Auth: http://localhost:9099
  - Firestore: http://localhost:8080
  - Functions: http://localhost:5001
  - Storage: http://localhost:9199

### Individual Commands

You can also run individual services:

```bash
# Frontend only
cd apps/web && npm run dev

# Firebase emulators only
firebase emulators:start

# Build all packages
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Type check
npm run type-check
```

## Stripe Setup

### 1. Create a Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Switch to "Test mode" for development

### 2. Get API Keys

1. Go to Developers > API keys
2. Copy your Publishable key and Secret key
3. Add them to your environment variables

### 3. Set Up Webhooks (Optional)

1. Go to Developers > Webhooks
2. Add endpoint: `http://localhost:3000/api/webhooks/stripe`
3. Select events to listen for
4. Copy the webhook secret to your environment variables

## Database Schema

The application uses Firestore with the following main collections:

- `users` - User profiles and preferences
- `schools` - School information and settings
- `courses` - Course content and metadata
- `webinars` - Webinar information and scheduling
- `enrollments` - Course enrollments
- `webinar_registrations` - Webinar registrations
- `subscriptions` - User subscriptions
- `payments` - Payment records

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Firebase Emulator Testing

The project is configured to use Firebase emulators for testing. Tests will automatically connect to the emulators when running.

## Deployment

### Frontend Deployment (Vercel)

The frontend is automatically deployed to Vercel when you push to the main branch. For manual deployment:

```bash
cd apps/web
vercel --prod
```

### Backend Deployment (Firebase)

Deploy Firebase functions:

```bash
cd apps/functions
npm run deploy
```

Or deploy everything:

```bash
firebase deploy
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: If ports are in use, you can change them in `firebase.json`
2. **Permission errors**: Make sure you're logged into Firebase CLI
3. **Build errors**: Clear node_modules and reinstall dependencies
4. **Environment variables**: Double-check all required variables are set

### Getting Help

1. Check the [Firebase documentation](https://firebase.google.com/docs)
2. Check the [Next.js documentation](https://nextjs.org/docs)
3. Check the [Stripe documentation](https://stripe.com/docs)
4. Create an issue in the repository

## Development Workflow

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests and linting
4. Create a pull request
5. After review, merge to `develop`
6. Deploy to staging for testing
7. Merge to `main` for production deployment

## Architecture Overview

```
gen-elevate-monorepo/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── functions/           # Firebase Cloud Functions
├── packages/
│   ├── shared/              # Shared types and utilities
│   ├── ui/                  # UI components
│   └── config/              # Shared configuration
├── .github/
│   └── workflows/           # CI/CD pipelines
└── docs/                    # Documentation
```

The monorepo uses:
- **Turborepo** for build orchestration
- **npm workspaces** for dependency management
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **GitHub Actions** for CI/CD
