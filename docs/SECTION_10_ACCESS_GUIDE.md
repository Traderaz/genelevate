# 🔑 Section 10: Access Guide

## Quick Access Links

### Institution Portal
- **URL**: `http://localhost:3000/institution` (or `https://genelevate.com/institution`)
- **Who Can Access**: Users with role `institution` or `admin`
- **Features**: Cohorts, Referral Links, Leaderboards, Analytics, Rewards

### Parent Portal
- **URL**: `http://localhost:3000/parent` (or `https://genelevate.com/parent`)
- **Who Can Access**: Users with role `parent` or `admin`
- **Features**: Student Progress, Schedule, Achievements (Read-Only)

---

## Setting Up User Roles

### In Firebase Console:

1. **Go to Authentication** → Select a user
2. **Set custom claims** (requires Admin SDK or Cloud Function):

```javascript
// For Institution Admin
admin.auth().setCustomUserClaims(uid, { 
  role: 'institution',
  institutionId: 'springfield-academy'
});

// For Parent
admin.auth().setCustomUserClaims(uid, { 
  role: 'parent',
  studentIds: ['student-uid-1', 'student-uid-2']
});
```

### In Firestore:

Update the user's profile document:

```javascript
// Institution Admin
await db.collection('users').doc(uid).update({
  role: 'institution',
  institutionId: 'springfield-academy'
});

// Parent
await db.collection('users').doc(uid).update({
  role: 'parent',
  linkedStudents: ['student-uid-1', 'student-uid-2']
});
```

---

## Testing the Portals

### Test Institution Portal:

1. Create a test user with role `institution`
2. Navigate to `/institution`
3. Test features:
   - ✅ View dashboard overview
   - ✅ Create a cohort
   - ✅ Generate referral link
   - ✅ Award points to students
   - ✅ View analytics

### Test Parent Portal:

1. Create a test user with role `parent`
2. Link to a student account
3. Navigate to `/parent`
4. Test features:
   - ✅ Select student
   - ✅ View progress
   - ✅ View schedule
   - ✅ View achievements
   - ✅ Verify read-only access

---

## Common Issues

### "Redirected to dashboard"
- **Cause**: User doesn't have correct role
- **Fix**: Set custom claims or update user profile role

### "No students linked"
- **Cause**: Parent account has no linked students
- **Fix**: Add student IDs to parent's profile

### "Permission denied"
- **Cause**: Firestore rules blocking access
- **Fix**: Check that user has correct role and institution ID

---

## Production Deployment

### Environment Variables:
```bash
# No additional env vars needed for portals
# Uses existing Firebase config
```

### Firestore Rules Deployment:
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### Testing in Production:
1. Deploy to Vercel/Firebase Hosting
2. Create test institution and parent accounts
3. Verify role-based access
4. Test all features end-to-end

---

## User Journey

### Institution Admin Journey:
1. Sign up / Log in
2. Admin sets role to `institution`
3. Access `/institution`
4. Create cohorts
5. Generate referral links
6. Share with prospective students
7. Monitor enrollments and performance
8. Award points to high performers

### Parent Journey:
1. Receive invitation email (future feature)
2. Sign up / Log in
3. Link to student account (approval workflow)
4. Access `/parent`
5. Select child
6. View progress and schedule
7. Monitor learning insights
8. Celebrate achievements

---

## Support & Documentation

- **Full Documentation**: `SECTION_10_SUMMARY.md`
- **Firestore Rules**: `firestore.rules` (lines 398-454)
- **Firestore Indexes**: `firestore.indexes.json` (lines 812-933)
- **Issue Tracking**: Check console for errors

---

**For questions or support, refer to the main documentation!** 🚀

