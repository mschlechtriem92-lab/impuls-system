# ─────────────────────────────────────────────
# Impuls-System Lokaler Start – Desktop-Version
# ─────────────────────────────────────────────

# UTF-8 Output für Konsole
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n🔄 Starte Impuls-System lokal..." -ForegroundColor Cyan

# Projektpfad anpassen
$projectPath = "D:\Impuls-local"

if (-not (Test-Path $projectPath)) {
    Write-Host "❌ Projektpfad existiert nicht: $projectPath" -ForegroundColor Red
    pause
    exit
}

# PowerShell in Projektordner wechseln
Set-Location $projectPath

# Node Modules prüfen, ggf. installieren
if (-not (Test-Path ".\node_modules")) {
    Write-Host "📦 node_modules fehlen, installiere Abhängigkeiten..." -ForegroundColor Yellow
    pnpm install
}

# URL des Servers
$localURL = "http://localhost:3000"

# Funktion zum Prüfen, ob Server läuft
function Wait-ForServer {
    Write-Host "`n⏳ Warte, bis der Server bereit ist..." -ForegroundColor Cyan
    do {
        Start-Sleep -Milliseconds 500
        try {
            Invoke-WebRequest -Uri $localURL -UseBasicParsing -TimeoutSec 1 | Out-Null
            $serverReady = $true
        }
        catch {
            $serverReady = $false
        }
    } until ($serverReady)
    Write-Host "`n🌐 Server ist live! Öffne lokale Seite: $localURL" -ForegroundColor Green
    Start-Process $localURL
}

# Dev-Server starten im aktuellen Fenster
Write-Host "`n🚀 Starte lokalen Dev-Server (Next.js)..." -ForegroundColor Cyan
Write-Host "Logs und Hot-Reload werden hier angezeigt. Drücke STRG+C zum Beenden." -ForegroundColor Yellow

# Dev-Server starten **im Hintergrund des aktuellen Fensters**
Start-Process powershell -ArgumentList "-NoExit", "-Command pnpm dev"

# Kurz warten und Browser öffnen, wenn Server bereit ist
Wait-ForServer

Write-Host "`n✅ Impuls-System gestartet." -ForegroundColor Green
Write-Host "Drücke eine Taste, um das Fenster zu schließen..." -ForegroundColor Cyan
[void][System.Console]::ReadKey($true)
