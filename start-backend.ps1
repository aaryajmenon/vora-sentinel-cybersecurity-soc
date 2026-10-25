# VORA Sentinel - PowerShell Server Launcher
$backendDir = Join-Path $PSScriptRoot "backend"
Set-Location $backendDir

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " VORA Sentinel Cybersecurity REST Backend (Level 5)" -ForegroundColor Green
Write-Host " Local Endpoint: http://localhost:5000/" -ForegroundColor Yellow
Write-Host " API Health:     http://localhost:5000/api/health" -ForegroundColor Yellow
Write-Host " Threats Feed:   http://localhost:5000/api/threats" -ForegroundColor Yellow
Write-Host " Press Ctrl+C to terminate" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

python app.py
