# Gen Elevate - Learning Platform Monorepo

A global learning and personal development platform helping students from Year 6 – Year 13 reach their academic, professional, and wellbeing potential.

## 🏗️ Architecture

This monorepo contains:

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Firebase Auth, Firestore, Cloud Functions
- **Shared**: Common types, schemas, and utilities
- **Payments**: Stripe integration
- **CI/CD**: GitHub Actions with Vercel deployment

## 📁 Project Structure

```
gen-elevate-monorepo/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── functions/           # Firebase Cloud Functions
├── packages/
│   ├── shared/              # Shared types, schemas, utilities
│   ├── ui/                  # shadcn/ui components
│   └── config/              # Shared configuration
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
└── docs/                    # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Firebase CLI
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gen-elevate-monorepo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy environment templates
cp apps/web/.env.example apps/web/.env.local
cp apps/functions/.env.example apps/functions/.env
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Firebase Emulators: http://localhost:4000

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages and apps
- `npm run lint` - Lint all code
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run all tests
- `npm run format` - Format code with Prettier

### Firebase Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase project:
```bash
firebase init
```

4. Start emulators:
```bash
firebase emulators:start
```

## 🚢 Deployment

### Frontend (Vercel)

The frontend is automatically deployed to Vercel on push to main branch.

### Backend (Firebase)

Deploy Cloud Functions:
```bash
cd apps/functions
npm run deploy
```

## 📦 Packages

### @gen-elevate/shared
Common types, schemas, and utilities shared across the monorepo.

### @gen-elevate/ui
Reusable UI components built with shadcn/ui and Tailwind CSS.

### @gen-elevate/config
Shared configuration files and constants.

## 🧪 Testing

Run tests across all packages:
```bash
npm run test
```

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

Private - All rights reserved
