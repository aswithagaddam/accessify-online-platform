# PowerShell script to upload only the admin folder to GitHub
# This script helps you initialize git in the admin folder and prepare for GitHub upload

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Admin Folder GitHub Upload Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
$adminPath = Join-Path $PSScriptRoot "admin"
if (-not (Test-Path $adminPath)) {
    Write-Host "ERROR: admin folder not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found admin folder at: $adminPath" -ForegroundColor Green
Write-Host ""

# Change to admin directory
Set-Location $adminPath

# Check if git is installed
try {
    $gitVersion = git --version 2>&1
    Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if already a git repository
if (Test-Path ".git") {
    Write-Host "Git repository already initialized." -ForegroundColor Yellow
    Write-Host ""
    
    $response = Read-Host "Do you want to continue anyway? (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "Git repository initialized!" -ForegroundColor Green
}

Write-Host ""

# Show what will be added
Write-Host "Checking files to be added..." -ForegroundColor Cyan
$filesToAdd = git ls-files --others --exclude-standard
$fileCount = ($filesToAdd | Measure-Object).Count

Write-Host "Files ready to add: $fileCount" -ForegroundColor Green
Write-Host ""

if ($fileCount -gt 100) {
    Write-Host "WARNING: More than 100 files detected!" -ForegroundColor Yellow
    Write-Host "This might cause issues with GitHub web upload." -ForegroundColor Yellow
    Write-Host ""
}

# Ask if user wants to proceed
$response = Read-Host "Do you want to add all files and create a commit? (y/n)"
if ($response -ne "y" -and $response -ne "Y") {
    Write-Host "Cancelled. You can run the git commands manually." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Creating commit..." -ForegroundColor Cyan
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: Admin panel"
}
git commit -m $commitMessage

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SUCCESS! Your admin folder is ready to push to GitHub." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub (https://github.com/new)" -ForegroundColor White
Write-Host "2. Don't initialize it with README, .gitignore, or license" -ForegroundColor White
Write-Host "3. Copy the repository URL from GitHub" -ForegroundColor White
Write-Host "4. Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""


