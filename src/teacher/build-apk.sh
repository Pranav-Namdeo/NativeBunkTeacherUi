#!/bin/bash

echo "========================================"
echo "  LetsBunk Teacher - APK Builder"
echo "========================================"
echo ""

echo "[1/4] Checking prerequisites..."
if [ ! -d "android" ]; then
    echo "ERROR: android folder not found!"
    echo "Please ensure you're in the teacher directory."
    exit 1
fi

echo "[2/4] Cleaning previous builds..."
cd android
./gradlew clean
if [ $? -ne 0 ]; then
    echo "ERROR: Clean failed!"
    cd ..
    exit 1
fi

echo ""
echo "[3/4] Building release APK..."
echo "This may take 2-3 minutes..."
./gradlew assembleRelease
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    cd ..
    exit 1
fi

cd ..

echo ""
echo "========================================"
echo "  BUILD SUCCESSFUL!"
echo "========================================"
echo ""
echo "APK Location:"
echo "teacher/android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "[4/4] Install Instructions:"
echo "1. Connect your Android device via USB"
echo "2. Enable USB debugging"
echo "3. Run: adb install -r android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "Or copy the APK to your device and install manually."
echo ""
