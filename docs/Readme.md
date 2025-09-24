
```markdown
# 🌟 Impuls-System

## **Projektvision**
Das Impuls-System ist ein **interaktives, inspirierendes Erlebnis**, das Nutzer*innen durch verschiedene „Räume“ navigiert, jeder Raum mit einem eigenen **Element, Impuls und emotionalen Schwerpunkt**. Ziel ist es, eine **vernetzende, flow-orientierte Erfahrung** zu schaffen, die **visuell, auditiv und interaktiv** wirkt.

- **Räume:** Erde, Wasser, Feuer, Luft (Wind), Äther, Impuls
- **Ziel:** Nutzer*innen Impulse geben, Reflexion ermöglichen und kreative Energie fördern.
- **Besonderheit:** Durch Navigation von Raum zu Raum entfaltet sich eine **Dynamik von Interaktion und Inspiration**.

---

## **Projektanalyse**
1. **Technologie-Stack:**
   - **Next.js 14.2+** – React-Framework für UI und Routing
   - **TailwindCSS** – Styling
   - **pnpm** – Paketmanager
   - **PowerShell** – Lokales Start-Skript für schnellen Entwicklungs-Start

2. **Besonderheiten:**
   - Hot-Reload / Dev-Server für schnellen Entwicklungs-Feedback
   - KI-Begleiter für jeden Raum (Reflexion & Impuls)
   - Element-spezifische Farbcodes, Texte, Buttons
   - Interaktive Eingabefelder (Textarea, Buttons)

3. **Erkenntnisse aus Prototyp-Test:**
   - Das **Raum-zu-Raum-Erlebnis** erzeugt bereits **Inspiration und Flow**.
   - **Element-spezifische UI** und **visuelle Signale** wirken, selbst in frühen Prototypen.
   - Nutzer*innen nehmen **emotionale Impulse** wahr.

---

## **Projektstruktur**

```

Impuls-local/
│
├─ components/
│  ├─ KICompanion.tsx
│  ├─ EnhancedWaves.tsx
│  └─ ImpulseButton.tsx
│
├─ pages/
│  ├─ erde.tsx
│  ├─ wasser.tsx
│  ├─ feuer.tsx
│  ├─ wind.tsx
│  ├─ aether.tsx
│  └─ impuls.tsx
│
├─ public/
├─ styles/
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.json
└─ start-impuls-local.ps1

````

---

## **Wichtige Code-Segmente**

### 1️⃣ KI-Begleiter (KICompanion.tsx)
```ts
const prompts: Record<
  RoomType,
  { welcome: string; reflection: string; impulse: string; color: string; hoverColor: string }
> = {
  wind: {
    welcome: 'Willkommen im Raum Wind. Welche Gedanken schweben?',
    reflection: 'Wohin trägt dich der Wind?',
    impulse: 'Welchem Impuls möchtest du folgen?',
    color: 'from-sky-600/80 to-indigo-500/80',
    hoverColor: 'hover:from-sky-500/80 hover:to-indigo-400/80',
  },
  ...
}

export default function KICompanion({ mode, isVisible = true }) {
  const [reflection, setReflection] = useState('')
  const currentPrompts = prompts[mode]

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <p>{currentPrompts.welcome}</p>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder={currentPrompts.reflection}
      />
      <button className={`bg-gradient-to-r ${currentPrompts.color} ${currentPrompts.hoverColor}`}>
        {currentPrompts.impulse}
      </button>
    </div>
  )
}
````

### 2️⃣ Lokales Start-Skript (start-impuls-local.ps1)

```powershell
Set-Location "D:\Impuls-local"

if (-not (Test-Path ".\node_modules")) { pnpm install }

$localURL = "http://localhost:3000"

function Wait-ForServer {
    do {
        Start-Sleep -Milliseconds 500
        try { Invoke-WebRequest $localURL -UseBasicParsing -TimeoutSec 1 | Out-Null; $serverReady=$true }
        catch { $serverReady=$false }
    } until ($serverReady)
    Start-Process $localURL
}

Write-Host "Starte Dev-Server..."
pnpm dev

Wait-ForServer
```

### 3️⃣ Enhanced Waves Animation (EnhancedWaves.tsx)

```ts
interface EnhancedWavesProps { room?: string; bars?: number; intensity?: number }
export default function EnhancedWaves({ room = 'main', bars = 32, intensity = 0.5 }: EnhancedWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    let animationFrame: number

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Zeichne Wellen je nach Raum
      animationFrame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [room, bars, intensity])

  return <canvas ref={canvasRef} className="w-full h-40" />
}
```

---

## **Besondere Features**

* Flow-Orientierte Navigation durch Räume 🌌
* Reflexion & Impuls-Mechanik 📝
* Interaktive Animationen & Soundeffekte 🔊
* Hot-Reload / Dev-Server für schnelles Testen ⚡
* Browser öffnet sich automatisch, sobald Server bereit ist 🌐

---

## **Nächste Schritte**

1. Weitere Räume gestalten und Impulse erweitern
2. Erweiterte Animationen & Soundeffekte implementieren
3. KI-Begleiter für **intelligente Reflexionen** ausbauen
4. Performance- und Stabilitätstests

---

## **Vision & Inspiration**

Das Impuls-System ist mehr als Code: Es ist ein **spielerisches Erlebnis**, das **Emotionen, Reflexion und kreative Energie** vermittelt. Jeder Raum, jede Interaktion und jede Animation trägt dazu bei, dass Nutzer\*innen **Flow und Inspiration spüren** – ein digitales Erlebnis, das man **wirklich erleben kann**.

```

