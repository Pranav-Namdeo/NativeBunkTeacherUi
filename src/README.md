# LetsBunk - Teacher Panel (React Native)

A comprehensive attendance management app for teachers built with React Native.

## Features

### ✅ Completed Features

#### Teacher Dashboard
- **Header**
  - Teacher profile photo (clickable for profile modal)
  - App name "LetsBunk" 
  - Theme toggle (Light/Dark mode)
  - Three-dot menu with options:
    - View Records
    - Notification
    - Updates
    - Help and Support
    - FAQs

- **Home Tab**
  - Search bar (filter by name or roll number)
  - Statistics cards (Total, Present, Absent, Late)
  - Today's attendance overview with progress bar
  - Student list with attendance status
  - Click student card to view detailed profile
  - Toggle attendance status (Present/Absent/Late)
  - Floating action button for Random Ring

- **Bottom Navigation**
  - Home
  - Calendar (placeholder)
  - Timetable (placeholder)

#### Student Management
- 12 pre-loaded students with mock data
- Each student shows:
  - Profile photo
  - Name and roll number
  - Attendance status badge
  - Quick toggle button
- Student detail modal with:
  - Large profile photo
  - Overall attendance percentage
  - Total classes count
  - Current status
  - Quick action buttons (Mark Present/Absent/Late)

#### Random Ring Feature
- Modal with two options:
  - Ring all students
  - Ring custom number of students
- Shows randomly selected students
- Visual list of students being rung

#### Theme Support
- Light and Dark mode
- Smooth transitions
- Consistent color scheme
- Proper contrast in both modes

## Installation

### Prerequisites
- Node.js (v14 or higher)
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)

### Dependencies

Install the required packages:

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-vector-icons
```

For iOS, also run:
```bash
cd ios && pod install && cd ..
```

### Setup react-native-vector-icons

#### Android
Add to `android/app/build.gradle`:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### iOS
Add to `Info.plist`:
```xml
<key>UIAppFonts</key>
<array>
  <string>Feather.ttf</string>
</array>
```

## Project Structure

```
native-bunk-main/
├── App.js                           # Main entry point
├── teacher/
│   ├── TeacherDashboard.js         # Main dashboard with tabs
│   ├── components/
│   │   ├── TeacherHeader.js        # Header with profile & menu
│   │   ├── StudentSearch.js        # Search bar component
│   │   ├── StudentCard.js          # Individual student card
│   │   ├── StudentListView.js      # Student list container
│   │   ├── RandomRingModal.js      # Random ring modal
│   │   └── TeacherStats.js         # Statistics cards
│   └── styles/
│       └── teacherStyles.js        # Shared styles & theme
└── README.md
```

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Components Overview

### TeacherDashboard
Main screen with bottom tab navigation and state management for:
- Theme switching (Light/Dark)
- Student data
- Search functionality
- Random ring modal

### TeacherHeader
- Displays teacher profile
- App branding
- Theme toggle button
- Menu with options
- Profile modal with teacher details

### StudentSearch
- Search input with icon
- Real-time filtering
- Clear button when typing

### StudentCard
- Student avatar and info
- Status badge
- Quick toggle button
- Opens detail modal on tap

### StudentListView
- FlatList of student cards
- Optimized rendering
- Hidden scrollbar

### TeacherStats
- 4 statistic cards (Total, Present, Absent, Late)
- Today's attendance card with progress bar
- Dynamic calculations
- Color-coded by status

### RandomRingModal
- Two selection modes:
  - All students
  - Custom number
- Shows selected students
- Ring confirmation

## Theme System

The app uses a comprehensive theme system with:
- Light and dark color palettes
- Consistent styling across components
- Smooth transitions
- Proper contrast ratios

Access theme:
```javascript
import { getStyles, colors } from './teacher/styles/teacherStyles';

const styles = getStyles(isDark);
const theme = isDark ? colors.dark : colors.light;
```

## Mock Data

The app includes 12 pre-loaded students:
- Aarav Sharma (CS001) - Present
- Diya Patel (CS002) - Present
- Arjun Singh (CS003) - Absent
- Ananya Verma (CS004) - Present
- Vihaan Kumar (CS005) - Late
- Isha Reddy (CS006) - Present
- Aditya Gupta (CS007) - Absent
- Saanvi Nair (CS008) - Present
- Reyansh Joshi (CS009) - Present
- Myra Kapoor (CS010) - Late
- Kabir Mehta (CS011) - Present
- Anika Roy (CS012) - Present

## Future Enhancements

### Calendar Tab
- Monthly calendar view
- Mark holidays (red)
- Show class days (green for past, gray for future)
- Click to view attendance for specific dates
- Search students in attendance dialog

### Timetable Tab
- Branch and semester selection
- Weekly schedule view
- Edit timetable functionality
- Subject and time management

### Additional Features
- Backend integration
- Real-time notifications
- Attendance reports
- Export functionality
- Multi-class support

## Customization

### Colors
Edit `teacher/styles/teacherStyles.js` to customize:
- Primary color
- Success/Error/Warning colors
- Background colors
- Text colors

### Mock Data
Edit student data in `teacher/TeacherDashboard.js`:
```javascript
const [students, setStudents] = useState([
  // Add or modify students here
]);
```

## Troubleshooting

### Icons not showing
Make sure you've properly installed and linked react-native-vector-icons:
```bash
npm install react-native-vector-icons
npx react-native link react-native-vector-icons
```

### Navigation issues
Ensure all navigation dependencies are installed:
```bash
npm install @react-navigation/native react-native-screens react-native-safe-area-context
```

### Build errors
Clean and rebuild:
```bash
# Android
cd android && ./gradlew clean && cd ..
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
```

## License

MIT License - Feel free to use this project for your needs.

## Support

For issues or questions, please refer to:
- React Native Documentation: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/
- React Native Vector Icons: https://github.com/oblador/react-native-vector-icons