
Write-Host "Updating App to latest changes!!!"
git pull origin main
npm run build

Write-Host "Check Status..."
npx prisma db push

Write-Host "Check Status..."
pm2 delete cyborg-server 

Write-Host "Starting Application...."
pm2 start dist/main.js --name "cyborg-server"


Write-Host "Starting Chrome with specific profile and app ID..."
Start-Process "chrome.exe" -ArgumentList "--profile-directory=Default", "--app-id=lobmifadjcajdicnlfkojaoichaidnlb"


Write-Host "All processes started successfully. Press any key to exit."
Pause
