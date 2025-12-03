# 📱 LetsBunk Teacher - React Native App

> Professional attendance management app for teachers with real-time updates and Azure integration

## 🚀 Quick Start (Fastest Way)

```bash
# Navigate to teacher folder
cd teacher

# Run quick start (Windows)
QUICK_START.bat
```

This will:
1. ✅ Install all dependencies
2. ✅ Build release APK
3. ✅ Install on your device

**Done in 5 minutes!** 🎉

---

## 📋 Manual Build (Step by Step)

### 1️⃣ Install Dependencies

```bash
cd teacher
npm install
```

### 2️⃣ Build APK

**Windows:**
```bash
BUILD_APK.bat
```

**Linux/Mac:**
```bash
./build-apk.sh
```

**Or manually:**
```bash
cd android
gradlew assembleRelease
```

### 3️⃣ Find Your APK

```
teacher/android/app/build/outputs/apk/release/app-release.apk
```

### 4️⃣ Install

```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 App Features

### ✅ Completed Features (21/21 Components)

#### **Authentication**
- ✅ Login with Employee ID & Password
- ✅ Session persistence (stay logged in)
- ✅ Secure logout

#### **Dashboard**
- ✅ Real-time student status updates
- ✅ Current class information banner
- ✅ Teacher statistics (present/absent counts)
- ✅ Student search (by name/roll number)
- ✅ Status filters (All/Active/Present/Absent/Left)
- ✅ Pull to refresh

#### **Calendar** ⭐ NEW
- ✅ Full month calendar view
- ✅ Attendance markers (present/absent/leave)
- ✅ Holiday indicators (🏖️📝🎓)
- ✅ Month statistics
- ✅ Date details modal
- ✅ Holidays API integration

#### **Student Management**
- ✅ Student list with cards
- ✅ Status toggle (tap to change)
- ✅ Student profiles
- ✅ Real-time sync via Socket.IO

#### **Random Ring**
- ✅ Select random students
- ✅ Configure count & criteria
- ✅ Send notifications

#### **Menu Options**
- ✅ View Records
- ✅ Updates
- ✅ Help & Support
- ✅ Feedback

#### **Theme**
- ✅ Dark mode
- ✅ Light mode
- ✅ Theme toggle in header

---

## 🎯 Test Credentials

```
Employee ID: TEACH001
Password: aditya
```

---

## 🌐 Server Integration

**Base URL:** `https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net`

**Features:**
- ✅ REST API integration
- ✅ Socket.IO real-time updates
- ✅ Authentication
- ✅ Student management
- ✅ Holidays API
- ✅ Random ring

---

## 📂 Project Structure

```
teacher/
├── android/                  # Android native project
│   ├── app/
│   │   ├── build.gradle     # App configuration
│   │   └── src/main/        # Java/Android resources
│   ├── build.gradle         # Project configuration
│   └── gradle.properties    # Gradle settings
├── components/              # React Native components
│   ├── DateDetailsModal.js
│   ├── Feedback.js
│   ├── FilterButtons.js
│   ├── HelpAndSupport.js
│   ├── RandomRingModal.js
│   ├── StudentCard.js
│   ├── StudentListView.js
│   ├── StudentProfileDialog.js
│   ├── StudentSearch.js
│   ├── TeacherHeader.js
│   ├── TeacherProfileDialog.js
│   ├── TeacherStats.js
│   ├── TimetableSelector.js
│   ├── Updates.js
│   └── ViewRecords.js
├── screens/                 # Screen components
│   ├── CalendarScreen.js
│   ├── ConnectionTestScreen.js
│   └── LoginScreen.js
├── services/                # API & Socket services
│   ├── api.js
│   ├── connectionTest.js
│   └── socket.js
├── styles/                  # Styling
│   └── teacherStyles.js
├── scripts/                 # Utility scripts
│   └── createTestAccounts.js
├── TeacherDashboard.js      # Main app component
├── index.js                 # App entry point
├── package.json             # Dependencies
├── app.json                 # App configuration
├── BUILD_APK.bat            # Build script (Windows)
├── build-apk.sh             # Build script (Linux/Mac)
├── QUICK_START.bat          # One-click setup
└── README.md                # This file
```

---

## 🛠️ Technologies Used

- **React Native** 0.72.0 - Mobile framework
- **React Navigation** - Tab navigation
- **AsyncStorage** - Local data persistence
- **Socket.IO Client** - Real-time updates
- **React Native Vector Icons** - Icons
- **Axios** - HTTP requests

---

## 📊 Build Information

**Package:** `com.letsbunk.teacher`  
**Version:** `1.0.0`  
**Min SDK:** 21 (Android 5.0)  
**Target SDK:** 33 (Android 13)  
**APK Size:** ~30-50 MB  

---

## 🐛 Troubleshooting

### Build Issues

**Problem:** "ANDROID_HOME not set"
```bash
# Windows
setx ANDROID_HOME "C:\Users\YourName\AppData\Local\Android\Sdk"

# Linux/Mac
export ANDROID_HOME=$HOME/Android/Sdk
```

**Problem:** Build fails
```bash
cd android
gradlew clean
gradlew assembleRelease --stacktrace
```

### Runtime Issues

**Problem:** App crashes
```bash
# Check logs
adb logcat *:E ReactNative:V
```

**Problem:** Can't connect to server
- Check internet connection
- Verify server URL in `services/api.js`
- Test: `curl https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net/api/health`

---

## 📝 Available Scripts

```json
{
  "android": "react-native run-android",
  "start": "react-native start",
  "build:android": "cd android && gradlew assembleRelease",
  "build:debug": "cd android && gradlew assembleDebug",
  "clean": "cd android && gradlew clean",
  "install:apk": "adb install -r android/app/build/outputs/apk/release/app-release.apk",
  "logcat": "adb logcat *:E ReactNative:V"
}
```

---

## 📚 Documentation

- **BUILD_INSTRUCTIONS.md** - Detailed build guide
- **BUILD_APK_GUIDE.md** - APK build reference
- **TEST_LOGIN.md** - Test credentials & scenarios

---

## ✅ Pre-Build Checklist

- [x] All components use React Native (no HTML)
- [x] All styling uses StyleSheet.create (no Tailwind)
- [x] No web libraries (Radix UI, etc.)
- [x] Server URL configured
- [x] Socket.IO setup
- [x] Authentication working
- [x] Dark mode implemented
- [x] Calendar integrated
- [x] Real-time updates working

---

## 🎉 Status: PRODUCTION READY!

**21/21 Components Converted** ✅  
**100% React Native** ✅  
**Azure Server Connected** ✅  
**Socket.IO Real-time** ✅  
**Calendar with Holidays** ✅  

---

## 🚀 Build Now!

```bash
cd teacher
BUILD_APK.bat
```

**That's it!** Your APK will be ready in 3-5 minutes! 📱✨

---

## 📞 Support

For issues or questions, check:
1. **BUILD_INSTRUCTIONS.md** - Detailed troubleshooting
2. **adb logcat** - Error logs
3. Server health: `curl https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net/api/health`

---

**Made with ❤️ for Teachers**
