# Interview Lab Feature

## Overview

Interview Lab is a comprehensive video interview practice platform that allows students to practice their interview skills and receive personalized feedback from administrators/educators.

## Features

### For Students (`/life-career/interview-lab`)
- View active interview questions
- Upload video responses (max 500MB per video)
- View personalized feedback with ratings
- See response history
- Videos automatically expire after 60 days

### For Admins (`/admin/interview-lab`)
- Create and manage interview questions
- View all student responses
- Watch submitted videos
- Provide detailed feedback with ratings (1-5 stars)
- Track statistics (questions, responses, pending feedback)
- Filter responses by status

## Technical Implementation

### Database Structure

**Collections:**

1. **`interviewQuestions`**
   ```
   {
     id: string
     question: string
     description?: string
     createdBy: string (userId)
     createdAt: Timestamp
     active: boolean
     order: number
   }
   ```

2. **`interviewResponses`**
   ```
   {
     id: string
     questionId: string
     studentId: string
     studentName: string
     studentEmail: string
     videoUrl: string
     videoPath: string (for storage reference)
     submittedAt: Timestamp
     expiresAt: Timestamp (60 days from submission)
     viewed: boolean
     feedback?: {
       strengths: string
       improvements: string
       rating?: number (1-5)
       providedBy: string (adminId)
       providedAt: Timestamp
     }
   }
   ```

### Storage Structure

Videos are stored in Firebase Storage at:
```
/interview-responses/{userId}/{fileName}
```

### Security Rules

**Firestore** (`firestore.rules`):
- Students can create and read their own responses
- Admins and content creators can read all responses and provide feedback
- Only admins/creators can create/manage questions
- Users can only update their own responses

**Storage** (`storage.rules`):
- Students can upload videos up to 500MB
- Only authenticated users with matching userId can upload
- Admins and content creators can read/delete all videos
- Only video file types allowed

### Auto-Deletion

Videos are automatically deleted after 60 days via Cloud Function:

**Function:** `cleanupExpiredInterviewResponses`
- Runs daily at 2:00 AM (configurable)
- Queries responses where `expiresAt <= now`
- Deletes video from Storage
- Deletes Firestore document
- Manual cleanup available via `manualCleanupExpiredResponses` (admin-only)

## API Endpoints

### Questions
- `GET /api/interview-lab/questions` - List questions
- `POST /api/interview-lab/questions` - Create question (admin)
- `GET /api/interview-lab/questions/[id]` - Get single question
- `PATCH /api/interview-lab/questions/[id]` - Update question (admin)
- `DELETE /api/interview-lab/questions/[id]` - Delete question (admin)

### Responses
- `GET /api/interview-lab/responses` - List all responses (admin)
- `POST /api/interview-lab/responses` - Submit response (student)
- `GET /api/interview-lab/responses/[id]` - Get single response
- `DELETE /api/interview-lab/responses/[id]` - Delete response (admin)
- `POST /api/interview-lab/responses/[id]/feedback` - Add feedback (admin)

### Student-specific
- `GET /api/interview-lab/student-responses` - Get student's own responses

### Statistics
- `GET /api/interview-lab/statistics` - Get platform statistics (admin)

## Usage

### Deploy Cloud Function
```bash
cd functions
npm install
firebase deploy --only functions:cleanupExpiredInterviewResponses
firebase deploy --only functions:manualCleanupExpiredResponses
```

### Deploy Security Rules
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### Access Routes

**Student View:**
Navigate to: `/life-career/interview-lab`

**Admin Dashboard:**
Navigate to: `/admin/interview-lab`

**Response Viewer:**
Navigate to: `/admin/interview-lab/responses`

**Individual Response:**
Navigate to: `/admin/interview-lab/response/[id]`

## Permissions

### Required Roles

**Students:**
- Must be authenticated
- Can access their own responses

**Admins:**
- Role: `admin` or `content-creator`
- Full access to all features
- Can provide feedback
- Can manage questions

## File Limits

- **Video Upload:** 500MB maximum
- **Supported Formats:** MP4, MOV, WebM (all video/* MIME types)
- **Storage Duration:** 60 days from submission

## Future Enhancements

Potential features to add:
- In-browser video recording
- AI-powered feedback suggestions
- Mock interview scenarios
- Interview tips and resources
- Progress tracking over multiple attempts
- Email notifications for feedback
- Batch feedback capabilities
- Video transcription and analysis
- Interview question templates by industry

## Troubleshooting

**Video won't upload:**
- Check file size (must be < 500MB)
- Verify file type is video
- Ensure user is authenticated
- Check browser console for errors

**Feedback not saving:**
- Verify admin role
- Check both fields are filled
- Check browser console for API errors

**Videos not auto-deleting:**
- Check Cloud Function logs in Firebase Console
- Verify Cloud Scheduler is enabled
- Check function permissions

## Support

For issues or feature requests, contact the development team or open an issue in the repository.

