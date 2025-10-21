# Firestore Security Rules for AI-Moderated Debate Room

Add these rules to your `firestore.rules` file:

```javascript
// ==========================================
// DEBATE TOPICS
// ==========================================
match /debateTopics/{topicId} {
  // Anyone can read topics
  allow read: if true;
  
  // Only admins can create/update/delete topics
  allow create, update, delete: if isAdmin();
}

// ==========================================
// DEBATES
// ==========================================
match /debates/{debateId} {
  // Anyone can read active debates
  allow read: if resource.data.status in ['active', 'voting', 'completed']
                  && (resource.data.isGlobal == true || resource.data.institutionId == getUserInstitution());
  
  // Admins can read all debates
  allow read: if isAdmin();
  
  // Only admins can create/update debates
  allow create, update: if isAdmin();
  
  // Only admins can delete debates
  allow delete: if isAdmin() && resource.data.status == 'archived';
}

// ==========================================
// DEBATE SUBMISSIONS
// ==========================================
match /debateSubmissions/{submissionId} {
  // Users can read their own submissions
  allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
  
  // Users can read public submissions
  allow read: if isAuthenticated() && resource.data.isPublic == true;
  
  // Admins and institution admins can read all submissions from their institution
  allow read: if isAdmin() || 
                (isInstitutionAdmin() && resource.data.institutionId == getUserInstitution());
  
  // Users can create their own submissions
  allow create: if isAuthenticated() 
                  && request.resource.data.userId == request.auth.uid
                  && debateIsActive(request.resource.data.debateId)
                  && !hasSubmittedToDebate(request.resource.data.debateId)
                  && validSubmissionData(request.resource.data);
  
  // Users can update their own unscored submissions
  allow update: if isAuthenticated() 
                  && resource.data.userId == request.auth.uid
                  && resource.data.status == 'submitted'
                  && request.resource.data.userId == resource.data.userId; // Can't change userId
  
  // Only admins can delete submissions
  allow delete: if isAdmin();
}

// ==========================================
// DEBATE SCORES
// ==========================================
match /debateScores/{scoreId} {
  // Users can read their own scores
  allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
  
  // Admins and institution admins can read scores from their institution
  allow read: if isAdmin() || 
                (isInstitutionAdmin() && resource.data.institutionId == getUserInstitution());
  
  // Only system (via admin SDK) can create/update scores
  allow create, update: if false; // Must use admin SDK
  
  // Only admins can delete scores
  allow delete: if isAdmin();
}

// ==========================================
// DEBATE LEADERBOARDS
// ==========================================
match /debateLeaderboards/{leaderboardId} {
  // Anyone authenticated can read leaderboards for their institution or global
  allow read: if isAuthenticated() 
                  && (resource.data.isGlobal == true || 
                      resource.data.institutionId == getUserInstitution());
  
  // Admins can read all leaderboards
  allow read: if isAdmin();
  
  // Only system (via admin SDK) can create/update leaderboards
  allow create, update: if false; // Must use admin SDK
  
  // Only admins can delete leaderboards
  allow delete: if isAdmin();
}

// ==========================================
// USER DEBATE STATS
// ==========================================
match /userDebateStats/{userId} {
  // Users can read their own stats
  allow read: if isAuthenticated() && userId == request.auth.uid;
  
  // Admins and institution admins can read stats from their institution
  allow read: if isAdmin() || 
                (isInstitutionAdmin() && resource.data.institutionId == getUserInstitution());
  
  // Only system (via admin SDK) can create/update stats
  allow create, update: if false; // Must use admin SDK
  
  // Only admins can delete stats
  allow delete: if isAdmin();
}

// ==========================================
// INSTITUTION DEBATE ANALYTICS
// ==========================================
match /institutionDebateAnalytics/{analyticsId} {
  // Institution admins can read their own analytics
  allow read: if isInstitutionAdmin() && resource.data.institutionId == getUserInstitution();
  
  // Admins can read all analytics
  allow read: if isAdmin();
  
  // Only system (via admin SDK) can create/update analytics
  allow create, update: if false; // Must use admin SDK
  
  // Only admins can delete analytics
  allow delete: if isAdmin();
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function isAuthenticated() {
  return request.auth != null;
}

function isAdmin() {
  return isAuthenticated() && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}

function isInstitutionAdmin() {
  return isAuthenticated() && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'institution';
}

function getUserInstitution() {
  return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.institutionId;
}

function debateIsActive(debateId) {
  let debate = get(/databases/$(database)/documents/debates/$(debateId));
  return debate.data.status == 'active' && 
         debate.data.submissionDeadline.toMillis() > request.time.toMillis();
}

function hasSubmittedToDebate(debateId) {
  // Check if user already has a submission for this debate
  return exists(/databases/$(database)/documents/debateSubmissions/$(request.auth.uid + '_' + debateId));
}

function validSubmissionData(data) {
  return data.keys().hasAll(['debateId', 'userId', 'type', 'position', 'content', 'status', 'isPublic'])
         && data.type in ['video', 'audio', 'text']
         && data.position in ['for', 'against', 'neutral']
         && data.status == 'submitted'
         && (data.type == 'text' ? data.content.size() >= 50 && data.content.size() <= 10000 : true);
}
```

## Collection Indexes

Add these indexes for optimal query performance:

### debateSubmissions
```
Collection: debateSubmissions
Fields: debateId (Ascending), status (Ascending), submittedAt (Descending)
Query scope: Collection

Collection: debateSubmissions
Fields: userId (Ascending), submittedAt (Descending)
Query scope: Collection

Collection: debateSubmissions
Fields: debateId (Ascending), scores.overall (Descending)
Query scope: Collection

Collection: debateSubmissions
Fields: institutionId (Ascending), debateId (Ascending), scores.overall (Descending)
Query scope: Collection
```

### debateScores
```
Collection: debateScores
Fields: debateId (Ascending), overall (Descending)
Query scope: Collection

Collection: debateScores
Fields: userId (Ascending), createdAt (Descending)
Query scope: Collection

Collection: debateScores
Fields: institutionId (Ascending), debateId (Ascending), overall (Descending)
Query scope: Collection
```

### debates
```
Collection: debates
Fields: status (Ascending), startDate (Descending)
Query scope: Collection

Collection: debates
Fields: institutionId (Ascending), status (Ascending), weekNumber (Descending)
Query scope: Collection

Collection: debates
Fields: isGlobal (Ascending), status (Ascending), startDate (Descending)
Query scope: Collection
```

## Notes

1. **Submission Limits**: Each user can only submit once per debate (enforced by document ID pattern: `userId_debateId`)
2. **AI Scoring**: All scoring operations must use Firebase Admin SDK (server-side)
3. **Privacy**: Students can choose to make submissions public or private
4. **Institution Scoping**: Debates can be global or institution-specific
5. **Time-based Access**: Submissions only allowed during active debate period

