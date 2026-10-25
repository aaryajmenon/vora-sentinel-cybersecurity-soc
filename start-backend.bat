@echo off
title VORA Sentinel REST API Server (Level 5 Cybersecurity Project)
cd /d "%~dp0backend"
echo ==========================================================
echo Starting VORA Sentinel Cybersecurity Backend Server...
echo Live Port: 5000
echo API Documentation: http://localhost:5000/
echo Health Check:     http://localhost:5000/api/health
echo ==========================================================
python app.py
pause
