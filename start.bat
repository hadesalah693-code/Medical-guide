@echo off
chcp 65001 >nul
cd /d "%~dp0fallujah-medical-frontend"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)

echo.
echo ========================================
echo   دليل الفلوجة الطبي
echo   Open: http://localhost:3000
echo   Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev
pause
