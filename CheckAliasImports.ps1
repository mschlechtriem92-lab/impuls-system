# Projektpfad setzen
$projectRoot = "D:\Matize\Impuls"
$componentsPath = Join-Path $projectRoot "components"

# Alle .tsx-Dateien im Projekt durchsuchen
$tsxFiles = Get-ChildItem -Path $projectRoot -Recurse -Filter *.tsx

Write-Host ""
Write-Host "Prüfe Alias-Imports in .tsx-Dateien..." -ForegroundColor Cyan
Write-Host ""

foreach ($file in $tsxFiles) {
    $lines = Get-Content $file.FullName
    foreach ($line in $lines) {
        if ($line -like '*from "@/components/*') {
            $start = $line.IndexOf('@/components/') + 13
            $end = $line.IndexOf('"', $start)
            if ($start -ge 0 -and $end -gt $start) {
                $relativePath = $line.Substring($start, $end - $start)
                $fullPath = Join-Path $componentsPath "$relativePath.tsx"

                if (Test-Path $fullPath) {
                    Write-Host "OK: @/components/$relativePath" -ForegroundColor Green
                } else {
                    Write-Host "FEHLT in $($file.Name): @/components/$relativePath" -ForegroundColor Red
                }
            }
        }
    }
}
