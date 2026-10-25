@echo off
title VORA Platform Local Web Server
echo ========================================================
echo Starting VORA Platform on http://localhost:5050
echo Compatible with all browsers: Chrome, Edge, Firefox, Brave, Safari
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 5050
pause
