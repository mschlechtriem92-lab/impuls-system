# ─────────────────────────────────────────────
# Impuls-System Lokaler Start – Startskript
# ─────────────────────────────────────────────

# UTF-8 Output für Konsole
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n🔄 Starte Impuls-System lokal..." -ForegroundColor Cyan

# Projektpfad (hier Pfad zum Impuls-Ordner anpassen)
$projectPath = "D:\Impuls-local"

# Prüfen, ob Projektpfad existiert
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

# Dev-Server starten (Next.js) in eigenem Fenster
Write-Host "`n🚀 Starte lokalen Dev-Server (Next.js)..." -ForegroundColor Cyan
Start-Process "powershell.exe" -ArgumentList "-NoExit", "-ExecutionPolicy Bypass", "-Command pnpm dev"

# Kurze Wartezeit, damit Server starten kann
Start-Sleep -Seconds 5

# Lokale Seite im Browser öffnen
$localURL = "http://localhost:3000"
Write-Host "`n🌐 Öffne lokale Seite: $localURL" -ForegroundColor Cyan
Start-Process $localURL

Write-Host "`n✅ Impuls-System ist gestartet. Das Dev-Server-Fenster bleibt geöffnet." -ForegroundColor Green
pause
