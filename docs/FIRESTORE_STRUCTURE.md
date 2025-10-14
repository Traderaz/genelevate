# Firestore Multi-Tenant Structure

## Overview

Gen Elevate uses a **single Firestore database** with **institutionId scoping** for multi-tenancy. This approach provides:

- Cost efficiency (single database)
- Simplified management
- Strong data isolation through security rules
- Flexible access patterns

## Collection Structure

### Core Collections

#### `users`
**Purpose**: All user accounts across all tenants
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable) - null for global admins
- `role` (string) - 'admin', 'institution', 'student', 'parent'
- `email`, `firstName`, `lastName`, `displayName`
- `cohortIds` (array) - cohorts the user belongs to
- `parentIds` (array) - linked parent accounts
- `studentIds` (array) - linked student accounts
- `referralCode` (string) - for institutions
- `referredBy` (string) - user who referred this user
- `isActive`, `emailVerified`
- `createdAt`, `updatedAt`, `lastLoginAt`

#### `institutions`
**Purpose**: School/organization accounts
**Key Fields**:
- `id` (document ID)
- `name`, `type`, `address`, `postcode`
- `subscriptionTier`, `maxStudents`, `currentStudents`
- `referralCode` (string) - unique institution code
- `referralLinks` (array) - active referral links
- `adminIds` (array) - institution admin users
- `settings` (object) - institution preferences
- `stats` (object) - usage statistics
- `isActive`
- `createdAt`, `updatedAt`

#### `cohorts`
**Purpose**: Groups of students within institutions
**Key Fields**:
- `id` (document ID)
- `institutionId` (string) - tenant scoping
- `name`, `description`
- `yearGroup`, `subject`
- `studentIds` (array), `teacherIds` (array)
- `academicYear`, `term`
- `isActive`, `isPublic`
- `averageProgress`, `completionRate`
- `createdAt`, `updatedAt`

#### `courses`
**Purpose**: Learning content
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable) - null for global courses
- `title`, `description`, `subject`
- `yearGroups` (array), `difficulty`
- `status`, `isPublic`, `isFeatured`
- `accessLevel`, `allowedCohortIds` (array)
- `instructor` (object)
- `enrollmentCount`, `completionRate`
- `isPremium`, `price`
- `createdAt`, `updatedAt`

#### `progress`
**Purpose**: User progress tracking
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `userId`, `contentType`, `contentId`
- `status`, `progressPercentage`
- `timeSpent`, `score`, `maxScore`
- `cohortId`
- `startedAt`, `completedAt`, `lastAccessedAt`

#### `webinars`
**Purpose**: Live and recorded sessions
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `title`, `description`, `subject`
- `scheduledAt`, `duration`, `timezone`
- `type`, `status`
- `accessLevel`, `allowedCohortIds` (array)
- `maxAttendees`, `currentAttendees`
- `requiresRegistration`
- `createdAt`, `updatedAt`

#### `attendance`
**Purpose**: Event attendance tracking
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `userId`, `eventType`, `eventId`
- `status`, `registrationSource`
- `joinedAt`, `leftAt`, `duration`
- `cohortId`
- `interactionScore`
- `createdAt`

#### `careers`
**Purpose**: Career information and pathways
**Key Fields**:
- `id` (document ID)
- `title`, `category`, `level`
- `requiredSubjects` (array), `recommendedSubjects` (array)
- `averageSalary` (object), `demandLevel`
- `isActive`, `isFeatured`
- `slug`, `tags` (array)
- `createdAt`, `updatedAt`

#### `industryNews`
**Purpose**: Career-related news and updates
**Key Fields**:
- `id` (document ID)
- `title`, `content`, `category`
- `relatedCareers` (array), `relatedSubjects` (array)
- `publishedAt`, `isPublished`, `isFeatured`
- `views`, `likes`, `shares`
- `slug`
- `createdAt`, `updatedAt`

#### `events`
**Purpose**: Institution-specific events
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `title`, `description`, `type`
- `startDate`, `endDate`, `timezone`
- `targetYearGroups` (array), `targetSubjects` (array)
- `cohortIds` (array)
- `maxAttendees`, `currentAttendees`
- `status`
- `createdAt`, `updatedAt`

#### `addons`
**Purpose**: Additional services and resources
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `name`, `description`, `type`
- `providerId`, `providerName`
- `pricing` (object)
- `targetYearGroups` (array), `targetSubjects` (array)
- `isActive`
- `averageRating`, `reviewCount`
- `createdAt`, `updatedAt`

#### `purchases`
**Purpose**: Transaction records
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `userId`, `itemType`, `itemId`
- `amount`, `currency`, `finalAmount`
- `paymentStatus`
- `accessGranted`, `accessExpiresAt`
- `createdAt`, `updatedAt`

#### `rewards`
**Purpose**: Badges, points, and achievements
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `userId`, `type`, `name`
- `pointsAwarded`
- `sourceType`, `sourceId`, `cohortId`
- `isVisible`, `isRevoked`
- `createdAt`

#### `leaderboards`
**Purpose**: Competition and ranking data
**Key Fields**:
- `id` (document ID)
- `institutionId` (string, nullable)
- `name`, `type`, `scope`, `scopeId`
- `period`, `startDate`, `endDate`
- `entries` (array) - user rankings
- `isActive`, `isPublic`
- `lastCalculated`
- `createdAt`, `updatedAt`

## Required Firestore Indexes

### Composite Indexes

```javascript
// Users by institution and role
{
  "collectionGroup": "users",
  "fields": [
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "role", "order": "ASCENDING"},
    {"fieldPath": "isActive", "order": "ASCENDING"},
    {"fieldPath": "createdAt", "order": "DESCENDING"}
  ]
}

// Users by cohort
{
  "collectionGroup": "users",
  "fields": [
    {"fieldPath": "cohortIds", "arrayConfig": "CONTAINS"},
    {"fieldPath": "role", "order": "ASCENDING"},
    {"fieldPath": "isActive", "order": "ASCENDING"}
  ]
}

// Courses by institution and access
{
  "collectionGroup": "courses",
  "fields": [
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "status", "order": "ASCENDING"},
    {"fieldPath": "accessLevel", "order": "ASCENDING"},
    {"fieldPath": "createdAt", "order": "DESCENDING"}
  ]
}

// Courses by year group and subject
{
  "collectionGroup": "courses",
  "fields": [
    {"fieldPath": "yearGroups", "arrayConfig": "CONTAINS"},
    {"fieldPath": "subject", "order": "ASCENDING"},
    {"fieldPath": "status", "order": "ASCENDING"},
    {"fieldPath": "isFeatured", "order": "DESCENDING"}
  ]
}

// Progress by user and institution
{
  "collectionGroup": "progress",
  "fields": [
    {"fieldPath": "userId", "order": "ASCENDING"},
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "contentType", "order": "ASCENDING"},
    {"fieldPath": "lastAccessedAt", "order": "DESCENDING"}
  ]
}

// Progress by cohort
{
  "collectionGroup": "progress",
  "fields": [
    {"fieldPath": "cohortId", "order": "ASCENDING"},
    {"fieldPath": "contentType", "order": "ASCENDING"},
    {"fieldPath": "status", "order": "ASCENDING"},
    {"fieldPath": "completedAt", "order": "DESCENDING"}
  ]
}

// Webinars by institution and schedule
{
  "collectionGroup": "webinars",
  "fields": [
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "status", "order": "ASCENDING"},
    {"fieldPath": "scheduledAt", "order": "ASCENDING"}
  ]
}

// Attendance by user and event type
{
  "collectionGroup": "attendance",
  "fields": [
    {"fieldPath": "userId", "order": "ASCENDING"},
    {"fieldPath": "eventType", "order": "ASCENDING"},
    {"fieldPath": "status", "order": "ASCENDING"},
    {"fieldPath": "createdAt", "order": "DESCENDING"}
  ]
}

// Attendance by institution and cohort
{
  "collectionGroup": "attendance",
  "fields": [
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "cohortId", "order": "ASCENDING"},
    {"fieldPath": "eventType", "order": "ASCENDING"},
    {"fieldPath": "createdAt", "order": "DESCENDING"}
  ]
}

// Careers by category and level
{
  "collectionGroup": "careers",
  "fields": [
    {"fieldPath": "category", "order": "ASCENDING"},
    {"fieldPath": "level", "order": "ASCENDING"},
    {"fieldPath": "isActive", "order": "ASCENDING"},
    {"fieldPath": "isFeatured", "order": "DESCENDING"}
  ]
}

// Industry news by category and publication
{
  "collectionGroup": "industryNews",
  "fields": [
    {"fieldPath": "category", "order": "ASCENDING"},
    {"fieldPath": "isPublished", "order": "ASCENDING"},
    {"fieldPath": "publishedAt", "order": "DESCENDING"}
  ]
}

// Events by institution and date
{
  "collectionGroup": "events",
  "fields": [
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "status", "order": "ASCENDING"},
    {"fieldPath": "startDate", "order": "ASCENDING"}
  ]
}

// Rewards by user and institution
{
  "collectionGroup": "rewards",
  "fields": [
    {"fieldPath": "userId", "order": "ASCENDING"},
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "type", "order": "ASCENDING"},
    {"fieldPath": "createdAt", "order": "DESCENDING"}
  ]
}

// Leaderboards by institution and scope
{
  "collectionGroup": "leaderboards",
  "fields": [
    {"fieldPath": "institutionId", "order": "ASCENDING"},
    {"fieldPath": "scope", "order": "ASCENDING"},
    {"fieldPath": "period", "order": "ASCENDING"},
    {"fieldPath": "isActive", "order": "ASCENDING"}
  ]
}
```

## Access Patterns

### 1. Global Admin Access
- **Pattern**: Access all data across all institutions
- **Query**: No institutionId filter
- **Security**: Custom claims role = 'admin'

### 2. Institution Admin Access
- **Pattern**: Access all data within their institution
- **Query**: `institutionId == user.institutionId`
- **Security**: Custom claims role = 'institution' + institutionId match

### 3. Student Access
- **Pattern**: Access their own data + institution/cohort content
- **Queries**:
  - Own data: `userId == user.uid`
  - Institution content: `institutionId == user.institutionId && accessLevel in ['public', 'institution']`
  - Cohort content: `cohortIds array-contains user.cohortId`

### 4. Parent Access (Read-only)
- **Pattern**: Access linked student data
- **Query**: `userId in user.studentIds`
- **Security**: Read-only access to student progress and attendance

### 5. Multi-Cohort Queries
- **Pattern**: Students in multiple cohorts
- **Query**: `cohortIds array-contains-any [cohortId1, cohortId2]`

### 6. Cross-Institution Content
- **Pattern**: Global courses/webinars available to all
- **Query**: `institutionId == null && accessLevel == 'public'`

## Security Rules Summary

```javascript
// Users: Own data + institution admins + parents
match /users/{userId} {
  allow read: if isOwner(userId) || isInstitutionAdmin() || isLinkedParent(userId);
  allow write: if isOwner(userId) || isInstitutionAdmin();
}

// Institution-scoped collections
match /{collection}/{docId} {
  allow read, write: if belongsToSameInstitution() || isGlobalAdmin();
}

// Public content
match /courses/{courseId} {
  allow read: if resource.data.accessLevel == 'public' || 
                 belongsToSameInstitution() ||
                 isInAllowedCohort();
}
```

## Performance Considerations

1. **Batch Operations**: Use batch writes for multi-document updates
2. **Pagination**: Implement cursor-based pagination for large result sets
3. **Caching**: Cache frequently accessed institution settings and user roles
4. **Denormalization**: Store computed values (stats, counts) to avoid aggregation queries
5. **Offline Support**: Use Firestore offline persistence for mobile apps

## Data Migration Strategy

1. **Phase 1**: Create new collections with institutionId fields
2. **Phase 2**: Migrate existing data with appropriate scoping
3. **Phase 3**: Update security rules for multi-tenant access
4. **Phase 4**: Deploy client-side changes with new query patterns
5. **Phase 5**: Remove old collections and indexes
