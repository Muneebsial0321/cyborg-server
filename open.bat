@echo off
start chrome --profile-directory=Default --app-id=lobmifadjcajdicnlfkojaoichaidnlb
REM Restart all PM2 processes
pm2 restart all

echo Backend started.
echo.

REM Open installed PWA

echo PWA launched.
echo Can safely close this window if needed.
echo.
pause
