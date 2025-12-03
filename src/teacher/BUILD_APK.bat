@echo off
echo ========================================
echo   LetsBunk Teacher - APK Builder
echo ========================================
echo.

echo [1/4] Checking prerequisites...
if not exist "android\" (
    echo ERROR: android folder not found!
    echo Please ensure you're in the teacher directory.
    pause
    exit /b 1
)

echo [2/4] Cleaning previous builds...
cd android
call gradlew clean
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Clean failed!
    cd ..
    pause
    exit /b 1
)

echo.
echo [3/4] Building release APK...
echo This may take 2-3 minutes...
call gradlew assembleRelease
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo   BUILD SUCCESSFUL!
echo ========================================
echo.
echo APK Location:
echo teacher\android\app\build\outputs\apk\release\app-release.apk
echo.
echo [4/4] Install Instructions:
echo 1. Connect your Android device via USB
echo 2. Enable USB debugging
echo 3. Run: adb install -r android\app\build\outputs\apk\release\app-release.apk
echo.
echo Or copy the APK to your device and install manually.
echo.
pause
