

```markdown
# 🌌 Impuls-System – README Manifest

> _„Impuls ist kein Code. Es ist ein Raum für Resonanz.“_

## 🧭 Überblick

Das Impuls-System ist ein KI-gestütztes, visuell und atmosphärisch starkes Webinterface mit fünf archetypischen Räumen – Erde, Wasser, Feuer, Wind, Spiegel. Jeder Raum dient als meditativer Kreativraum und ist modular aufgebaut: intuitiv, poetisch und technisch effizient.

---

## 🔧 Technische Basis

- **Frameworks**: React + TypeScript + TailwindCSS
- **Build Tools**: Vite, tsconfig, vite.config.ts
- **Startskripte**: `Impuls.bat`, `start.ps1`
- **Struktur**:
  - `src/` → Hauptlogik  
  - `components/` → UI-Bausteine  
  - `layouts/`, `pages/`, `hooks/`, `utils/`  
  - `public/` → statische Dateien  
  - `assets/` → Bilder, Sounds  
  - `tests/`, `legacy/`, `docs/`, `Work - Flow/`

---

## 🌌 Impuls-Raum (Startscreen)

- Galaxy-Zoom beim Start
- Frequenzring-Animation (pulsierend)
- Sparkles (ruhig, bei Impuls beschleunigt)
- Impuls-Button mit Ripple-Effekt und Soundtrigger
- Zonen-System mit 5 interaktiven Portalen
- Emotionale Referenz: Gedicht „Freiheit“

**Komponentenstruktur:**
```plaintext
src/components/
├── GalaxyBackground.tsx
├── Sparkles.tsx
├── FrequencyRing.tsx
└── ImpulsButton.tsx

src/pages/
└── ImpulsRoom.tsx
```

---

## 🧩 Die 5 Räume

| Raum     | Element | Archetyp   | KI-Stil             | Atmosphäre           |
|----------|---------|------------|---------------------|----------------------|
| 🔥 Feuer | Wille   | Krieger    | Direkt, motivierend | Glut, Energie        |
| 🌊 Wasser| Gefühl  | Heiler     | Sanft, empathisch   | Tiefblau, Wellen     |
| 🌬️ Wind | Gedanke | Philosoph  | Weitdenkend         | Nebel, Bewegung      |
| 🌍 Erde | Körper  | Schöpfer   | Praktisch, stabil    | Moos, Stein          |
| 🪞 Spiegel| Selbst | Mystiker   | Reflektierend        | Licht, Tiefe         |

---

## 🤖 KI-Logik (in Planung)

- Zentrale KI, die sich je nach Raum archetypisch färbt
- Begrüßung, Impulsfragen, kreative Begleitung
- Modularer Aufbau: `fireAI.ts`, `waterAI.ts` etc.
- KI-Trigger über Impuls-Button und Rauminteraktionen

**Hooks-Vorschlag:**
```ts
useFireAI()
useWaterAI()
useWindAI()
useEarthAI()
useMirrorAI()
```

---

## 🎨 Design & Visualisierung

- **Figma AI** → Wireframes & Layouts
- **MidJourney / Leonardo AI** → Cinematic Artworks
- **Runway / Kaiber** → Animationen & Atmosphäre

---

## ✍️ Content & Text

- **ChatGPT** → Ideen, UI-Texte
- **Claude** → Storytelling, Dokumentation
- **Perplexity / Gemini** → Recherche & Fakten

---

## 🔊 Audio & Musik

- **Aiva AI** → Cinematic Intro-Track
- **Suno AI** → Rap/Poetry
- **ElevenLabs** → Voiceover (z. B. Begrüßung)
- **Soundraw** → Loops & Hintergrundmusik

---

## 📢 Marketing & Social Media

- **Canva AI** → Branding & Posts
- **Copy.ai** → Text für Ads & Launch
- **Opus Clip** → Short-Clips aus Videos
- **Metricool** → Planung & Analyse

---

## ✅ KI-Workflow (Zusammengefasst)

1. **Planung/Dokumentation** → Notion AI / Obsidian  
2. **Coding** → ChatGPT → Copilot/Cursor → Gemini  
3. **Design** → Figma AI → MidJourney → Runway  
4. **Content** → ChatGPT → Claude → Perplexity/Gemini  
5. **Audio/Visuals** → Aiva, Suno, ElevenLabs  
6. **Marketing** → Canva AI + Copy.ai

---

## 📚 Ordnerstruktur

> _„Jeder Pfad ist ein Fragment des Raumes.“_

Die vollständige Ordnerstruktur befindet sich in:  
`docs/Ordnerstruktur.txt`  
Sie wurde mit folgendem Befehl generiert:

```powershell
tree "D:\Matize\Impuls" /F /A > "D:\Matize\Impuls\docs\Ordnerstruktur.txt"
```

---

## 🧠 Erweiterungsideen

- Archetypische Sprachmuster pro Raum
- Dynamische KI-Resonanz basierend auf Nutzerinteraktion
- Poetische Transitions & visuelle Morphings
- `triggerAIResponse(room: 'fire', input: string)` als zentrale KI-Schnittstelle

---

## 🧭 UX & Flow-Optimierung

- Impuls-Button als emotionaler Kompass
- Mikrointeraktionen mit archetypischen Begriffen
- Onboarding mit poetischer Stimme

---

## ✨ Manifest

> _„Impuls ist ein System, das nicht nur reagiert – es reflektiert.“_  
> _„Es ist ein Raum, in dem Code zu Gefühl wird und KI zur Begleiterin.“_

---

