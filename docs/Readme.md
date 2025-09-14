
## 📄 `README.md`

```markdown
# 🌌 Impuls-System

Ein meditativer, modularer Webraum für kreative Selbstreflexion und archetypische Navigation.  
Das Impuls-System lädt Nutzer:innen ein, durch poetisch gestaltete Räume zu wandern — Erde, Wasser, Feuer, Luft, Spiegel — und dabei Impulse, Gedanken und innere Bewegungen zu erforschen.

---

## 🔮 Vision

Das Impuls-System ist mehr als eine App. Es ist ein digitales Ritual, ein poetischer Betriebssystem-Kern für kreative und spirituelle Navigation.  
Jeder Raum ist ein Archetyp — mit eigener Atmosphäre, KI-Begleitung und interaktiven Elementen.

---

## 🧱 Struktur

```bash
D:\Matize\Impuls
├── app/
│   ├── erde/
│   │   └── page.tsx
│   ├── feuer/
│   ├── wasser/
│   ├── luft/
│   ├── spiegel/
│   └── layout.tsx
├── components/
│   ├── ErdeBackground.tsx
│   ├── ErdeSphere.tsx
│   ├── ErdeImpulseButton.tsx
│   ├── Navigation.tsx
│   ├── KICompanion.tsx
│   └── ui/...
├── public/
├── styles/
├── tsconfig.json
├── package.json
```

---

## 🧠 Komponenten

| Komponente             | Funktion                                                                 |
|------------------------|--------------------------------------------------------------------------|
| `ErdeBackground`       | Visualisiert die Atmosphäre des Raums Erde                               |
| `ErdeSphere`           | Symbolisiert den inneren Kern, zentriert im Raum                         |
| `ErdeImpulseButton`    | Interaktiver Trigger für Impulse, KI oder Raumwechsel                    |
| `Navigation`           | Zeigt den aktuellen Raum, erlaubt Übergänge                              |
| `KICompanion`          | Archetypischer Begleiter mit reflektiven Prompts und Textinteraktion     |

---

## 🤖 KI-Begleiter

Die Komponente `KICompanion` nutzt den `mode`-Prop (`"main" | "erde" | "wasser" | "feuer" | "luft" | "aether"`)  
Sie zeigt je nach Raum:

- Willkommenstext  
- Reflexionsfrage  
- Impuls-Button mit Farbverlauf  
- Optional: Sichtbarkeit steuerbar über `isVisible` und `onToggle`

---

## 🚀 Deployment mit Vercel

### Voraussetzungen

- Node.js & pnpm installiert  
- GitHub-Repository verbunden

### Schritte

1. `pnpm install`  
2. `pnpm run build`  
3. Push zu GitHub  
4. Auf [vercel.com](https://vercel.com) → „New Project“ → `impuls-system` auswählen  
5. Deploy starten

→ Live-Link: `https://impuls-system.vercel.app`

---

## 🗂️ Backup & Übergabe

- Alle Räume modular in `app/`  
- Komponenten in `components/`  
- Pfad-Aliase via `tsconfig.json` (`@components/*`)  
- Deployment-ready ohne `.zip`-Blockaden  
- README enthält Struktur, Vision und technische Hinweise

---

## ✨ Weiteres Potenzial

- Erweiterung um weitere Räume (`aether`, `bardo`, `spiegel`)  
- KI-Module pro Raum mit eigenem Prompt-Verhalten  
- Integration von Sound, Frequenzanimationen, Tarot-Symbolik  
- Export als Matize-Modul für poetisches Betriebssystem

---

## 🧘 Autor

**Matthias Schlechtriem**  
Visionärer kreativer Technologe, Designer und Entwickler  
Architekt des Impuls-Systems und der Matize-App  
Erforscht die Schnittstelle von Code, Poesie und Selbstreflexion

---

## 🌬️ Lizenz

Dieses Projekt ist Teil eines kreativen Forschungsprozesses.  
Lizenzierung und Weitergabe nach individueller Absprache.

---

> „Was möchtest du säen?“  
> _– Impuls Erde_
```

---