# 🚀 APK Build Instructions - LetsBunk Teacher App

## ✅ Prerequisites Checklist

Before building, ensure you have:

- [ ] **Node.js** installed (v16 or higher)
- [ ] **Java JDK** installed (JDK 11 or 17)
- [ ] **Android Studio** installed (with Android SDK)
- [ ] **Android SDK** (API Level 33 or higher)
- [ ] **Gradle** (comes with Android Studio)
- [ ] **ANDROID_HOME** environment variable set

---

## 📋 Step-by-Step Build Process

### **Step 1: Install Dependencies**

```bash
# Navigate to teacher folder
cd teacher

# Install npm packages
npm install
```

**Expected Output:**
```
added 1234 packages in 45s
```

---

### **Step 2: Build APK**

#### **Option A: Using BUILD_APK.bat (Windows - RECOMMENDED)**

```bash
# Simply double-click BUILD_APK.bat
# OR run from command prompt:
BUILD_APK.bat
```

#### **Option B: Using build-apk.sh (Linux/Mac)**

```bash
# Make script executable
chmod +x build-apk.sh

# Run build script
./build-apk.sh
```

#### **Option C: Manual Build**

```bash
# Navigate to android folder
cd android

# Clean previous builds
gradlew clean

# Build release APK
gradlew assembleRelease

# Go back to teacher folder
cd ..
```

#### **Option D: Using npm scripts**

```bash
# Build release APK
npm run build:android

# OR build debug APK
npm run build:debug
```

---

### **Step 3: Locate APK**

After successful build, find your APK at:

```
teacher/android/app/build/outputs/apk/release/app-release.apk
```

**APK Size:** ~30-50 MB

---

### **Step 4: Install APK on Device**

#### **Option A: Using ADB (Recommended)**

```bash
# Check connected devices
adb devices

# Should show:
# List of devices attached
# ABC123456789    device

# Install APK
adb install -r android/app/build/outputs/apk/release/app-release.apk

# OR use npm script
npm run install:apk
```

#### **Option B: Manual Installation**

1. Copy `app-release.apk` to your Android device
2. Open file manager on device
3. Navigate to Downloads folder
4. Tap `app-release.apk`
5. Click "Install" (enable "Unknown Sources" if prompted)

#### **Option C: Share via Cloud**

1. Upload APK to Google Drive/Dropbox
2. Share link with testers
3. Download on device
4. Install from Downloads

---

## 🧪 Testing After Installation

### **1. Launch App**

Find "LetsBunk Teacher" icon in app drawer and tap to open.

### **2. Test Login**

```
Employee ID: TEACH001
Password: aditya
```

**Expected:** Should navigate to dashboard with student list

### **3. Test All Features**

- [ ] **Login/Logout** - Authentication works
- [ ] **Home Tab** - Student list loads
- [ ] **Calendar Tab** - Calendar displays with holidays
- [ ] **Timetable Tab** - Shows placeholder
- [ ] **Search** - Filters students by name/roll number
- [ ] **Filter Buttons** - All/Active/Present/Absent/Left
- [ ] **Status Toggle** - Tap student card to change status
- [ ] **Random Ring** - Bell icon opens modal
- [ ] **Profile** - Teacher profile displays
- [ ] **Menu Items** - View Records, Updates, Help, Feedback
- [ ] **Dark Mode** - Theme toggle works
- [ ] **Pull to Refresh** - Updates student list

### **4. Check Logs (If Issues)**

```bash
# View error logs
adb logcat *:E ReactNative:V

# OR use npm script
npm run logcat
```

---

## 🔧 Troubleshooting

### **Problem: "ANDROID_HOME not set"**

**Solution:**

**Windows:**
```cmd
setx ANDROID_HOME "C:\Users\YourName\AppData\Local\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools"
```

**Linux/Mac:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

Add to `.bashrc` or `.zshrc` to make permanent.

---

### **Problem: "gradlew: command not found"**

**Solution:**

**Windows:**
```bash
# Use gradlew.bat instead
android\gradlew.bat assembleRelease
```

**Linux/Mac:**
```bash
# Make gradlew executable
chmod +x android/gradlew
./android/gradlew assembleRelease
```

---

### **Problem: Build fails with "OutOfMemoryError"**

**Solution:**

Edit `android/gradle.properties`:

```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=1024m
```

---

### **Problem: "SDK location not found"**

**Solution:**

Create `android/local.properties`:

```properties
sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk
```

Replace with your actual SDK path.

---

### **Problem: "React Native not found"**

**Solution:**

```bash
# Install dependencies again
cd teacher
rm -rf node_modules
npm install
```

---

### **Problem: APK installs but crashes on launch**

**Solution:**

```bash
# Check error logs
adb logcat *:E ReactNative:V

# Common issues:
# 1. Server URL incorrect - Check services/api.js
# 2. Missing permissions - Check AndroidManifest.xml
# 3. Network issues - Ensure device has internet
```

---

### **Problem: "Unable to connect to server"**

**Solution:**

1. **Check server is running:**
   ```bash
   curl https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net/api/health
   ```

2. **Verify server URL in code:**
   ```javascript
   // teacher/services/api.js
   const API_BASE_URL = 'https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net';
   ```

3. **Check device internet connection**

---

## 🎯 Build Time Estimates

| Step | Time | Size |
|------|------|------|
| Install Dependencies | 1-2 min | ~500 MB |
| Clean Build | 10 sec | - |
| Assemble Release | 2-3 min | ~30-50 MB APK |
| **Total** | **3-5 min** | **~30-50 MB** |

---

## 📦 What's Included in APK

### **Features:**
✅ Full authentication system  
✅ Student management dashboard  
✅ Real-time Socket.IO updates  
✅ Calendar with holidays API  
✅ Date details modal  
✅ Random ring functionality  
✅ Student search & filters  
✅ Profile management  
✅ Menu options (Records, Updates, Help, Feedback)  
✅ Dark mode theme  
✅ Pull to refresh  
✅ Azure server integration  

### **Components: 21/21 ✅**
All components converted to React Native

---

## 🌐 Server Configuration

**Base URL:** `https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net`

**Endpoints Used:**
- `/api/login` - Teacher authentication
- `/api/teachers/:id/current-class-students` - Get students
- `/api/students/:id/status` - Update student status
- `/api/random-ring` - Trigger random ring
- `/api/holidays/range` - Get holidays
- WebSocket for real-time updates

---

## 📱 App Information

**Package Name:** `com.letsbunk.teacher`  
**App Name:** `LetsBunk Teacher`  
**Version:** `1.0.0`  
**Version Code:** `1`  
**Min SDK:** `21` (Android 5.0)  
**Target SDK:** `33` (Android 13)  

---

## 🚀 Quick Build Command

```bash
# One command to build everything
cd teacher && npm install && npm run build:android
```

---

## ✅ Success Indicators

Build successful when you see:

```
BUILD SUCCESSFUL in 2m 34s
48 actionable tasks: 48 executed

APK Location:
teacher\android\app\build\outputs\apk\release\app-release.apk
```

---

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review error logs: `adb logcat *:E ReactNative:V`
3. Verify all prerequisites are installed
4. Ensure internet connection for dependencies
5. Check server is accessible

---

## 🎉 Ready to Build!

Your app is 100% ready for APK build. Just run:

```bash
cd teacher
BUILD_APK.bat
```

Good luck! 🚀
