@echo off
title Push VORA Sentinel to GitHub
echo ==========================================================
echo Pushing VORA Sentinel to GitHub...
echo Target: https://github.com/aaryajmenon/vora-sentinel-cybersecurity-soc
echo ==========================================================
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Your repository is now LIVE at:
    echo https://github.com/aaryajmenon/vora-sentinel-cybersecurity-soc
) else (
    echo.
    echo [NOTE] If you got 'Repository not found', please make sure
    echo you created the repository on GitHub first by visiting:
    echo https://github.com/new?name=vora-sentinel-cybersecurity-soc
    echo and clicking the green 'Create repository' button!
)
echo.
pause
