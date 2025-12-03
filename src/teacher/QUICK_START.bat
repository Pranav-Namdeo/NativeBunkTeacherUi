@echo off
echo ========================================
echo   LetsBunk Teacher - Quick Start
echo ========================================
echo.

echo This script will:
echo 1. Install dependencies
echo 2. Build release APK
echo 3. Install on connected device
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo.
echo [1/3] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Building APK...
call BUILD_APK.bat
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Installing on device...
echo Make sure your device is connected via USB...
pause

adb devices
adb install -r android\app\build\outputs\apk\release\app-release.apk

echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo Your app is installed and ready to use!
echo Open "LetsBunk Teacher" on your device.
echo.
echo Test Login:
echo   Employee ID: TEACH001
echo   Password: aditya
echo.
pause
