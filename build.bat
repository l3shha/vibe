@echo off
cd /d "%~dp0"
set ComSpec=C:\Windows\System32\cmd.exe
call npm run electron:build
pause
