# Events System Guide

## Overview
The Events system allows administrators to create and manage events such as webinars, workshops, seminars, career fairs, and more. Students can view upcoming events in a calendar view and see detailed information about each event.

## Features

### For Students (Behind Paywall)
- **Interactive Calendar View** - Visual monthly calendar showing all events
- **Upcoming Events Sidebar** - Quick view of events in the next 7 days
- **Event Filtering** - Filter by event type (webinar, workshop, seminar, etc.)
- **Detailed Event Cards** - View all event information including:
  - Date and time
  - Location (physical or virtual)
  - Event description
  - Registration count
  - Tags and categories
  - Meeting links for virtual events

### For Admins
- Manual event creation and management via Firestore
- Support for multiple event types
- Flexible scheduling with start/end dates
- Virtual and physical event support
- Participant tracking

## Firestore Structure

### Collection: `events`

Each event document should have the following structure:

```javascript
{
  // Required fields
  "title": "Introduction to Web Development",
  "description": "Learn the fundamentals of web development including HTML, CSS, and JavaScript",
  "type": "workshop", // See event types below
  "startDate": Timestamp,
  "endDate": Timestamp,
  "status": "upcoming", // upcoming | ongoing | completed | cancelled
  "isVirtual": true,
  "organizer": "Dr. Jane Smith",
  "registeredCount": 0,
  
  // Optional fields
  "location": "Room 301, Main Building", // For physical events
  "meetingLink": "https://meet.google.com/abc-defg-hij", // For virtual events
  "organizerEmail": "jane.smith@example.com",
  "maxParticipants": 50,
  "imageUrl": "https://example.com/event-image.jpg",
  "tags": ["programming", "beginner", "career"],
  "yearGroups": ["year-10", "year-11", "year-12"],
  "subjects": ["Computer Science", "IT"],
  
  // Timestamps
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

## Event Types

The system supports the following event types:

- `webinar` - Online seminars and presentations
- `workshop` - Interactive learning sessions
- `seminar` - Educational talks and lectures
- `conference` - Large-scale educational conferences
- `open-day` - School/institution open days
- `exam-prep` - Exam preparation sessions
- `social` - Social and networking events
- `competition` - Academic competitions
- `other` - Other event types

## Color Coding

Events are automatically color-coded based on type:
- **Webinars**: Blue (`bg-blue-500`)
- **Workshops**: Purple (`bg-purple-500`)
- **Seminars**: Orange (`bg-orange-500`)
- **Conferences**: Cyan (`bg-cyan-500`)
- **Open Days**: Green (`bg-green-500`)
- **Exam Prep**: Red (`bg-red-500`)
- **Competitions**: Yellow (`bg-yellow-500`)
- **Social Events**: Pink (`bg-pink-500`)

### Customizing Event Types

To add or modify event types, update the `eventTypes` array in the events page component. Each type requires:
- `value`: The event type identifier (must match Firestore data)
- `label`: Display name for the filter button
- `color`: Primary color class (e.g., `bg-blue-500`)
- `bgColor`: Background color for unselected state (e.g., `bg-blue-500/10`)
- `textColor`: Text color (e.g., `text-blue-400`)

## How to Add an Event (Admin)

### Using Firebase Console:

1. Navigate to Firestore Database in Firebase Console
2. Go to the `events` collection (create it if it doesn't exist)
3. Click "Add Document"
4. Set a unique document ID or let Firebase auto-generate one
5. Add the following fields:

**Required Fields:**
- `title` (string): Event name
- `description` (string): Event description
- `type` (string): One of the event types listed above
- `startDate` (timestamp): Event start date and time
- `endDate` (timestamp): Event end date and time
- `status` (string): Usually "upcoming"
- `isVirtual` (boolean): true for online, false for in-person
- `organizer` (string): Organizer name
- `registeredCount` (number): Start with 0
- `createdAt` (timestamp): Current timestamp
- `updatedAt` (timestamp): Current timestamp

**Optional but Recommended:**
- `meetingLink` (string): For virtual events
- `location` (string): For physical events
- `maxParticipants` (number): Maximum attendees
- `tags` (array): Categories/keywords
- `imageUrl` (string): Event banner image

### Example Event Creation:

```javascript
{
  title: "Year 11 GCSE Maths Workshop",
  description: "Intensive workshop covering algebra, geometry, and exam techniques for GCSE Mathematics",
  type: "workshop",
  startDate: Timestamp.fromDate(new Date("2024-12-15T14:00:00")),
  endDate: Timestamp.fromDate(new Date("2024-12-15T16:00:00")),
  status: "upcoming",
  isVirtual: true,
  meetingLink: "https://meet.google.com/abc-defg-hij",
  organizer: "Mr. John Davis",
  organizerEmail: "john.davis@school.edu",
  registeredCount: 0,
  maxParticipants: 30,
  tags: ["GCSE", "Mathematics", "Exam Prep"],
  yearGroups: ["year-11"],
  subjects: ["Mathematics"],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now()
}
```

## Features on the Events Page

### 1. Calendar View
- Monthly calendar display
- Color-coded event indicators
- Click on dates to view events
- Navigate between months

### 2. Upcoming Events Panel
- Shows next 5 events within 7 days
- Time until event countdown
- Quick access to event details
- Participant count display

### 3. Event Type Filters
- Filter by specific event type
- "All Events" to see everything
- Visual filtering with colored badges

### 4. All Events List
- Grid layout of all upcoming events
- Detailed event cards with:
  - Event type badge
  - Time countdown
  - Full description
  - Date, time, location
  - Tags and categories
  - Registration information
  - Meeting links (for virtual events)

## Access Control

- **Location**: `/dashboard/events`
- **Access**: Behind paywall (requires active subscription)
- **Roles**: Available to students, parents, institutions, and admins
- **Navigation**: Accessible via dashboard navigation menu (marked as Premium)

## Best Practices

### For Event Creation:
1. **Always set realistic dates** - Ensure startDate < endDate
2. **Include clear descriptions** - Help students understand the event value
3. **Set appropriate participant limits** - Consider resource capacity
4. **Use meaningful tags** - Helps with discovery and filtering
5. **Update status regularly** - Change to "ongoing", "completed", or "cancelled" as needed

### For Virtual Events:
- Always include a `meetingLink`
- Set `isVirtual: true`
- Test meeting links before the event
- Consider time zones if relevant

### For Physical Events:
- Include detailed `location` information
- Set `isVirtual: false`
- Consider accessibility information in description
- Include directions or building information

## Maintenance

### Regular Tasks:
1. **Archive past events** - Move completed events or update their status
2. **Monitor registration counts** - Check against maxParticipants
3. **Update event links** - Ensure meeting links are valid
4. **Review upcoming events** - Verify all information is accurate

### Automated Features:
- Events are automatically sorted by date
- Past events are filtered out from the main view
- Color coding is applied automatically
- Calendar updates in real-time

## Troubleshooting

### Events not showing up:
- Check `startDate` is in the future
- Verify `status` is set to "upcoming"
- Ensure Firestore security rules allow read access
- Check the events collection exists

### Calendar not updating:
- Refresh the page
- Check browser console for errors
- Verify Firebase connection

### Wrong times displayed:
- Ensure timestamps are created correctly
- Consider timezone settings in your region

## Future Enhancements

Potential features to add:
- Event registration system
- Email notifications for upcoming events
- Calendar export (iCal/Google Calendar)
- Recurring events support
- Event reminders
- Attendance tracking
- Post-event feedback forms

## Support

For technical issues or questions about the Events system, please contact the development team.

