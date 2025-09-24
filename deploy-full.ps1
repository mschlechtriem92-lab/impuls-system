# ─────────────────────────────────────────────
# deploy-full.ps1 – Vollautomatisches Update & Deployment
# ─────────────────────────────────────────────

param(
    [string]$ProjectPath = "D:\Impuls-local",
    [string]$Branch = "main"
)

Write-Host "`n⚡ Starte Voll-Update & Deployment..." -ForegroundColor Cyan

# Alte Imports, die ersetzt werden sollen
$replacements = @{
    "import Background from '@/components/Background'"   = "import GalaxyBackground from '../components/GalaxyBackground'"
    "import AudioPlayer from '@/components/AudioPlayer'" = ""
}

# 1️⃣ Alte Imports automatisch korrigieren
Write-Host "`n1. Korrigiere alte Imports..." -ForegroundColor Cyan
$files = Get-ChildItem "$ProjectPath\app" -Recurse -Filter "page.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $modified = $false
    foreach ($oldImport in $replacements.Keys) {
        if ($content -match [regex]::Escape($oldImport)) {
            $newImport = $replacements[$oldImport]
            $content = $content -replace [regex]::Escape($oldImport), $newImport
            $modified = $true
            Write-Host "Korrigiert: $oldImport → $newImport in $($file.FullName)" -ForegroundColor Green
        }
    }
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}

# 2️⃣ Git Commit & Push
Write-Host "`n2. Git Commit & Push..." -ForegroundColor Cyan
Set-Location $ProjectPath
git add .
$commitMessage = "Auto: Fix imports & prepare deployment"
git commit -m "$commitMessage" -q
git push origin $Branch -q
Write-Host "✅ Git Push abgeschlossen." -ForegroundColor Green

# 3️⃣ Vercel Deployment
Write-Host "`n3. Starte Vercel Production Deployment..." -ForegroundColor Cyan
try {
    vercel --prod --confirm
    Write-Host "✅ Vercel Deployment erfolgreich." -ForegroundColor Green
}
catch {
    Write-Host "❌ Fehler beim Deployment: $_" -ForegroundColor Red
}

Write-Host "`n🎯 Alles abgeschlossen! Die Konsole bleibt geöffnet für Logs." -ForegroundColor Cyan
Pause
