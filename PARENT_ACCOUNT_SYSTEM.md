# 🔐 Parent Account System - Complete Guide

## 📋 Overview
Implemented a comprehensive **parent/guardian account system** that allows parents to monitor their children's progress with read-only access.

---

## 🎯 Key Features

### **1. Two Account Types**
- **Student Accounts**: Full access, requires paid subscription
- **Parent Accounts**: Read-only access, FREE, must be linked to child

### **2. Parent Account Requirements** ✅
- ✅ Must provide child's email address
- ✅ Child must have ACTIVE paid subscription
- ✅ Maximum 2 parent accounts per child
- ✅ Parent accounts are completely FREE
- ✅ Parent cannot be the same email as child

### **3. Parent Account Access** 🔒
- ✅ **READ-ONLY** access to child's:
  - Course progress
  - Grade tracker
  - Achievements
  - Study schedule
  - Time spent learning
  - Webinar attendance
  
- ❌ **CANNOT**:
  - Complete assignments
  - Take quizzes
  - Submit work
  - Change settings
  - Make purchases
  - Access AI tools for coursework

---

## 📱 Registration Flow

### **Student Registration:**
```
1. Select "🎓 Student"
2. Enter name, email, password
3. Click "Create Account" OR "Continue with Google"
4. Redirected to /pricing
5. Subscribe (£29.99/month)
6. Full access granted
```

### **Parent Registration:**
```
1. Select "👨‍👩‍👧‍👦 Parent/Guardian"
2. See info: "Parent accounts are free and provide read-only access"
3. Google Sign-Up button becomes DISABLED (must use email registration)
4. Enter CHILD'S email address
   ↓
5. System validates:
   - Does child account exist? ✓
   - Does child have paid subscription? ✓
   - Are there already 2 parents? ✗
   ↓
6. Enter parent's name, email, password
7. Click "Create Account" (email only)
8. Redirected to /dashboard?newParent=true
9. Free read-only access granted
```

### **⚠️ Google Sign-Up for Parents:**
**DISABLED** - Parent accounts cannot use Google Sign-Up because:
- Must provide child's email BEFORE account creation
- OAuth flow doesn't allow custom fields
- Would bypass subscription validation

**Solution:** Parents MUST use email registration.

---

## 🔐 Validation Rules

### **API Endpoint:** `/api/auth/validate-parent-signup`

**Checks:**
1. ✅ Child account exists (by email)
2. ✅ Child has `subscription.status === 'active'`
3. ✅ Child has `subscription.plan !== 'free'`
4. ✅ Child subscription not expired
5. ✅ Less than 2 parent accounts already linked
6. ✅ Parent email ≠ child email

**Response:**
```json
{
  "childExists": true,
  "childId": "abc123",
  "hasActiveSubscription": true,
  "parentCount": 1,
  "childName": "John Smith"
}
```

---

## 💾 Database Structure

### **Student Profile:**
```typescript
{
  uid: "student-123",
  email: "student@example.com",
  role: "student",
  subscription: {
    plan: "all-access",
    status: "active",
    expiresAt: "2025-12-31"
  },
  linkedParentEmails: [
    "parent1@example.com",
    "parent2@example.com"
  ]
}
```

### **Parent Profile:**
```typescript
{
  uid: "parent-123",
  email: "parent@example.com",
  role: "parent",
  linkedChildEmail: "student@example.com",
  subscription: {
    plan: "free",
    status: "active"
  }
}
```

---

## 🚫 Error Messages

| Scenario | Error Message |
|----------|---------------|
| Child email not provided | "Please enter your child's email address to link your parent account." |
| Parent email same as child | "Your email cannot be the same as your child's email." |
| Child account doesn't exist | "No account found with that email address. Please check and try again." |
| Child has no subscription | "Your child must have an active paid subscription before you can create a parent account." |
| 2 parents already exist | "Maximum of 2 parent accounts per child has been reached." |
| Parent tries Google Sign-Up | "Parent accounts must use email registration to link to your child's account." |

---

## 🎨 UI Components

### **Role Selector:**
```
┌────────────────────────────────────┐
│ I am signing up as:                │
│ ┌────────────────────────────────┐ │
│ │ 🎓 Student                 ▼  │ │
│ └────────────────────────────────┘ │
│                                    │
│ OR                                 │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ 👨‍👩‍👧‍👦 Parent/Guardian      ▼  │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

### **Parent Mode - Child Email Field:**
```
┌─────────────────────────────────────┐
│ ℹ️ Parent accounts are free and      │
│ provide read-only access            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Your Child's Email Address *        │
│ ┌─────────────────────────────────┐ │
│ │ 📧 Enter your child's email     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⚠️ Your child must have an active   │
│ paid subscription. Maximum 2        │
│ parents per child account.          │
└─────────────────────────────────────┘
```

---

## 🔒 Read-Only Implementation

### **Subscription Guard Updates:**
```typescript
// Parents bypass subscription checks (they're free)
if (userProfile?.role === 'parent') {
  // Allow access but enforce read-only
  return <ReadOnlyWrapper>{children}</ReadOnlyWrapper>;
}
```

### **Read-Only Wrapper:**
```typescript
// Disable all form submissions
// Disable all buttons except navigation
// Show "View Only - Parent Account" banner
// Display child's name prominently
```

### **Protected Actions:**
```typescript
// Before any write operation:
if (userProfile?.role === 'parent') {
  throw new Error('Parent accounts have read-only access');
}
```

---

## 📊 Linking System

### **When Parent Signs Up:**
1. Create parent account with `linkedChildEmail`
2. Query child account by email
3. Add parent's email to child's `linkedParentEmails` array
4. Both accounts now linked

### **When Child Cancels Subscription:**
1. Update child's `subscription.status` to `cancelled`
2. Parent accounts remain active (read-only)
3. Show warning: "Child's subscription has ended"
4. Parents can still view historical data

---

## 🎯 Use Cases

### **Use Case 1: New Parent Signup**
**Scenario:** Mother wants to monitor son's progress

**Steps:**
1. Son has active £29.99/month subscription
2. Mother goes to /register
3. Selects "Parent/Guardian"
4. Enters son's email
5. System validates ✓
6. Mother creates account
7. Gets free read-only access
8. Can view son's progress, grades, study time

---

### **Use Case 2: Second Parent**
**Scenario:** Father also wants access

**Steps:**
1. Father goes to /register
2. Selects "Parent/Guardian"  
3. Enters child's email (same as mother used)
4. System validates:
   - Child exists ✓
   - Has subscription ✓
   - Only 1 parent exists (< 2) ✓
5. Father creates account
6. Now 2 parents linked to child

---

### **Use Case 3: Limit Reached**
**Scenario:** Grandparent tries to create third account

**Steps:**
1. Grandparent goes to /register
2. Selects "Parent/Guardian"
3. Enters child's email
4. System validates:
   - Child exists ✓
   - Has subscription ✓
   - 2 parents already exist ✗
5. Error: "Maximum of 2 parent accounts per child has been reached."
6. Registration blocked

---

### **Use Case 4: No Subscription**
**Scenario:** Parent tries to link to child without subscription

**Steps:**
1. Parent goes to /register
2. Selects "Parent/Guardian"
3. Enters child's email
4. System validates:
   - Child exists ✓
   - No active subscription ✗
5. Error: "Your child must have an active paid subscription before you can create a parent account."
6. Registration blocked

---

## 🔄 Future Enhancements (Optional)

### **Parent Features to Add:**
- [ ] Email notifications for child's achievements
- [ ] Weekly progress reports
- [ ] Set study time reminders
- [ ] View detailed analytics
- [ ] Download progress reports
- [ ] Message child's tutors (if applicable)
- [ ] Approve course enrollments
- [ ] Set screen time limits

### **Admin Features:**
- [ ] Admin panel to view all parent-child links
- [ ] Manually link/unlink accounts
- [ ] Transfer parent account to different child
- [ ] Bulk import parent-child relationships

---

## ✅ Testing Checklist

### **Student Registration:**
- [ ] Can create student account
- [ ] Redirected to pricing page
- [ ] Must subscribe to access content

### **Parent Registration:**
- [ ] Can select parent role
- [ ] Child email field appears
- [ ] Validation works correctly
- [ ] Parent account created successfully
- [ ] Redirected to dashboard (not pricing)
- [ ] Has read-only access

### **Parent Validation:**
- [ ] Blocks if child doesn't exist
- [ ] Blocks if child has no subscription
- [ ] Blocks if 2 parents already exist
- [ ] Blocks if parent email = child email
- [ ] Allows if all conditions met

### **Parent Access:**
- [ ] Can view child's dashboard
- [ ] Cannot submit assignments
- [ ] Cannot take quizzes
- [ ] Cannot change settings
- [ ] Sees "Read-Only" indicators

---

## 📁 Files Modified/Created

**Created:**
- `apps/web/src/app/api/auth/validate-parent-signup/route.ts` - Validation API

**Modified:**
- `apps/web/src/components/auth/netflix-register-form.tsx` - Added role selector
- `apps/web/src/contexts/auth-context.tsx` - Added linked account fields

**Documentation:**
- `PARENT_ACCOUNT_SYSTEM.md` - This file

---

## 🚀 Summary

✅ **Students**: Pay £29.99/month, full access
✅ **Parents**: FREE, read-only access, monitor progress
✅ **Validation**: Child must have active subscription
✅ **Limit**: Maximum 2 parents per child
✅ **Security**: Proper validation and linking system

**Result:** A complete parent monitoring system that ensures child safety, parental oversight, and monetization integrity! 🎉

---

**Status**: ✅ Frontend Complete | ⚠️ Read-Only UI Components Pending

