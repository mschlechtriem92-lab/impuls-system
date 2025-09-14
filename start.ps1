[Console]::OutputEncoding = [System.Text.Encoding]::UTF8


# ─────────────────────────────────────────────
# Impuls-System Startskript – Integration & Prüfung
# ─────────────────────────────────────────────

Write-Host "`n🔄 Starte vollständige Integration des Impuls-Systems..." -ForegroundColor Cyan

# Räume definieren – UTF-8 kompatibel
$rooms = @("Erde", "Feuer", "Impuls", "Wasser", "Wind", "Aether")

# Zielstruktur vorbereiten
foreach ($room in $rooms) {
    New-Item -ItemType Directory -Path ".\public\assets\rooms\$room" -Force
}

# Assets verschieben
foreach ($room in $rooms) {
    $sourcePath = ".\Impuls-Dateien\Räume\$room"
    $targetPath = ".\public\assets\rooms\$room"

    Get-ChildItem -Path $sourcePath -Filter *.mp3 -ErrorAction SilentlyContinue | ForEach-Object {
        Copy-Item $_.FullName -Destination "$targetPath\$room.mp3" -Force
    }

    Get-ChildItem -Path $sourcePath -Filter *.png -ErrorAction SilentlyContinue | ForEach-Object {
        Copy-Item $_.FullName -Destination "$targetPath\$room.png" -Force
    }

    Get-ChildItem -Path $sourcePath -Filter *.jpg -ErrorAction SilentlyContinue | ForEach-Object {
        Copy-Item $_.FullName -Destination "$targetPath\$room.jpg" -Force
    }
}

# KI-Module generieren
New-Item -ItemType Directory -Path ".\src\ai" -Force

foreach ($room in $rooms) {
    $filePath = ".\src\ai\$room" + "AI.ts"
    $content = @"
export const ${room}AI = {
  greeting: \"Willkommen im Raum ${room}.\",
  impulseQuestion: \"Was entfacht dein inneres ${room}?\",
  style: \"${room}\",
  assets: {
    image: \"/assets/rooms/${room}/${room}.png\",
    sound: \"/assets/rooms/${room}/${room}.mp3\"
  }
};
"@
    $escapedContent = $content -replace '\$', '`$'
    $escapedContent | Out-File -FilePath $filePath -Encoding UTF8
}



$readmeLines | Out-File -FilePath ".\docs\Raum-Assets.md" -Encoding UTF8

# Prüfskript – poetische Resonanzkontrolle
function Test-RaumAssets {
    param([string]$room)

    $basePath = ".\public\assets\rooms\$room"
    $image = Test-Path "$basePath\$room.png"
    $sound = Test-Path "$basePath\$room.mp3"

    if ($image -and $sound) {
        Write-Host "✅ Raum ${room}: Bild und Klang vorhanden." -ForegroundColor Green
    } elseif ($image -or $sound) {
        Write-Host "⚠️ Raum ${room}: Teilweise vorhanden." -ForegroundColor Yellow
    } else {
        Write-Host "❌ Raum ${room}: Keine Assets gefunden." -ForegroundColor Red
    }
}

Write-Host "`n🧪 Prüfe Raum-Assets..." -ForegroundColor Cyan
foreach ($room in $rooms) {
    Test-RaumAssets -room $room
}

# Optional: Browser öffnen
Start-Process "https://impuls-system.vercel.app"

Write-Host "`n✅ Startimpuls abgeschlossen. Die Räume sind bereit zur Resonanz." -ForegroundColor Green
pause
