# setup-clean-repo.ps1
# Erstellt ein sauberes Git-Repo und pusht es zu GitHub

# Wechsle in den Projektordner
Set-Location "D:\Matize\Impuls-clean"

# Initialisiere Git neu
git init

# Erstelle Branch 'main'
git checkout -b main

# Füge alle Dateien hinzu
git add .

# Erster Commit
git commit -m "Initial commit – clean version without backup zip"

# Remote hinzufügen (ersetze ggf. mit deinem Repo-Link)
git remote add origin https://github.com/mschlechtriem92-lab/impuls-system.git

# Push erzwingen
git push -u origin main --force

