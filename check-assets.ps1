# check-assets.ps1
# Prüft, ob alle in roomsConfig referenzierten Dateien im public-Ordner existieren.
# Anpassen: $projectRoot falls nötig.

$projectRoot = "D:\Impuls-local"
$publicRoot = Join-Path $projectRoot "public"

# Liste hier anhand roomsConfig.ts pflegen (kopiere aus roomsConfig.ts wenn du anpasst)
$pathsToCheck = @(
    "/assets/rooms/impuls/impuls.jpg",
    "/assets/rooms/impuls/Impuls.jpg",
    "/assets/rooms/impuls/Impuls.png",
    "/assets/rooms/impuls/Impuls-Raum.jpg",
    "/assets/rooms/impuls/Impuls.mp3",
    "/assets/elements/element-impuls.png",

    "/assets/rooms/erde/erde.jpg",
    "/assets/rooms/erde/Erde.jpg",
    "/assets/rooms/erde/Erde.png",
    "/assets/rooms/erde/Erde.mp3",
    "/assets/elements/element-erde.png",

    "/assets/rooms/wasser/wasser.jpg",
    "/assets/rooms/wasser/Wasser.jpg",
    "/assets/rooms/wasser/Wasser.png",
    "/assets/rooms/wasser/Wasser.mp3",
    "/assets/elements/element-wasser.png",

    "/assets/rooms/feuer/feuer.jpg",
    "/assets/rooms/feuer/Feuer.jpg",
    "/assets/rooms/feuer/Feuer.png",
    "/assets/rooms/feuer/Feuer.mp3",
    "/assets/elements/element-feuer.png",

    "/assets/rooms/wind/wind.jpg",
    "/assets/rooms/wind/Wind-Raum.jpg",
    "/assets/rooms/wind/Wind.jpg",
    "/assets/rooms/wind/Wind.png",
    "/assets/rooms/wind/Wind.mp3",
    "/assets/elements/element-wind.png",

    "/assets/rooms/aether/aether.jpg",
    "/assets/rooms/aether/Aether.jpg",
    "/assets/rooms/aether/Aether.png",
    "/assets/rooms/aether/Aether.mp3",
    "/assets/elements/element-aether.png"
)

Write-Host "`nPrüfe Assets (case-sensitive Hinweis: Windows ist unempfindlich, Vercel ist case-sensitive)...`n"

$missing = @()
foreach ($p in $pathsToCheck) {
    # Transform to local path (remove leading slash)
    $relative = $p.TrimStart("/")
    $full = Join-Path $publicRoot $relative
    if (-not (Test-Path $full)) {
        $missing += $p
        Write-Host "MISSING: $p" -ForegroundColor Red
    }
    else {
        Write-Host "OK: $p" -ForegroundColor Green
    }
}

if ($missing.Count -eq 0) {
    Write-Host "`n✅ Alle referenzierten Assets sind vorhanden." -ForegroundColor Green
}
else {
    Write-Host "`n⚠️  Fehlende Dateien gefunden ($($missing.Count)). Bitte prüfe Groß-/Kleinschreibung oder verschiebe Dateien in public/ entsprechend." -ForegroundColor Yellow
    Write-Host "Beispiel: wenn deine Datei 'Wind.jpg' heißt, muss in roomsConfig exakt 'Wind.jpg' stehen (nicht 'wind.jpg')."
}
