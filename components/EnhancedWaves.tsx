// components/EnhancedWaves.tsx
'use client'

import { useEffect, useRef } from 'react'

interface EnhancedWavesProps {
  room?: 'main' | 'erde' | 'wasser' | 'feuer' | 'wind' | 'aether' | 'impuls' | string
  bars?: number
  intensity?: number
  triggerKey?: string
  triggerButtonId?: string
}

interface Pulse {
  radius: number
  alpha: number
  speed: number
  glowMultiplier: number
  colorOffset: number
  decay: number
}

export default function EnhancedWaves({
  room = 'main',
  bars = 96,
  intensity = 1.0,
  triggerKey,
  triggerButtonId,
}: EnhancedWavesProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const pulsesRef = useRef<Pulse[]>([])
  const dynamicBarsRef = useRef<number[] | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const mountedRef = useRef(false)
  const firstFrameDoneRef = useRef(false)
  const allowEnhanceRef = useRef(false) // only true while enhancement effects should render

  // visual state
  const rotationRef = useRef(0)
  const expansionRef = useRef(0.20)
  const alphaRef = useRef(0.50)
  const barsRef = useRef<number[]>(Array.from({ length: bars }, () => 0.14))

  const targetRef = useRef({
    rotation: 0,
    expansion: 0.20,
    alpha: 0.50,
    bars: Array.from({ length: bars }, () => 0.14),
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // keep canvas invisible until first controlled frame -> prevents prepaint artefacts
    canvas.style.opacity = '0'
    canvas.style.transition = 'opacity 220ms ease-out'

    mountedRef.current = true
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const roomConfig: Record<string, { baseHue: number; accentHue: number; glow: number }> = {
      main: { baseHue: 200, accentHue: 280, glow: 14 },
      impuls: { baseHue: 185, accentHue: 260, glow: 26 },
      erde: { baseHue: 120, accentHue: 45, glow: 18 },
      wasser: { baseHue: 200, accentHue: 180, glow: 14 },
      feuer: { baseHue: 14, accentHue: 40, glow: 18 },
      wind: { baseHue: 210, accentHue: 150, glow: 12 },
      aether: { baseHue: 275, accentHue: 220, glow: 16 },
    }

    const getRoomCfg = () => roomConfig[room] ?? roomConfig['main']

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      timeoutsRef.current.push(id)
      return id
    }

    // Initial visual bump — NO pulses, and keep bars below the "beam threshold".
    const initialBump = () => {
      targetRef.current = {
        rotation: 0.055,
        expansion: 0.30,
        alpha: 0.82,
        bars: Array.from({ length: bars }, () => 0.15 + Math.random() * 0.02),
      }

      schedule(() => {
        if (!mountedRef.current) return
        targetRef.current = {
          rotation: 0,
          expansion: 0.20,
          alpha: 0.50,
          bars: Array.from({ length: bars }, () => 0.14),
        }
      }, 360)
    }

    // Actual enhance pulses & effect — only invoked after first frame by user action
    const handleImpulsCore = () => {
      allowEnhanceRef.current = true

      for (let i = 0; i < 6; i++) {
        pulsesRef.current.push({
          radius: 0,
          alpha: 1.0,
          speed: 1.6 + Math.random() * 0.9,
          glowMultiplier: 0.95 + Math.random() * 0.6,
          colorOffset: Math.random() * 60,
          decay: 0.004 + Math.random() * 0.008,
        })
      }

      if (!dynamicBarsRef.current) {
        dynamicBarsRef.current = Array.from({ length: bars }, () => 0.28 + Math.random() * 0.52)
      } else {
        dynamicBarsRef.current = dynamicBarsRef.current.map(v => Math.max(v, 0.28 + Math.random() * 0.52))
      }

      targetRef.current = {
        rotation: rotationRef.current + Math.PI * 1.12,
        expansion: 0.98,
        alpha: 0.96,
        bars: Array.from({ length: bars }, () => 0.36 + Math.random() * 0.44),
      }

      schedule(() => {
        if (!mountedRef.current) return
        targetRef.current = {
          rotation: 0,
          expansion: 0.20,
          alpha: 0.50,
          bars: Array.from({ length: bars }, () => 0.14),
        }
        schedule(() => {
          pulsesRef.current = []
          dynamicBarsRef.current = null
          allowEnhanceRef.current = false
        }, 900)
      }, 4500)
    }

    const handleImpuls = () => {
      if (!firstFrameDoneRef.current) {
        return
      }
      handleImpulsCore()
    }

    const effectiveTriggerKey = triggerButtonId ? undefined : (triggerKey ?? `${room}-activated`)

    let btnEl: HTMLElement | null = null
    if (triggerButtonId) {
      btnEl = document.getElementById(triggerButtonId)
      if (btnEl) btnEl.addEventListener('click', handleImpuls)
    } else if (effectiveTriggerKey) {
      window.addEventListener(effectiveTriggerKey, handleImpuls as EventListener)
    }

    let initialBumpScheduled = false

    const draw = (time: number) => {
      const cfg = getRoomCfg()
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const cx = w / 2
      const cy = h / 2
      ctx.clearRect(0, 0, w, h)

      if (!firstFrameDoneRef.current) {
        firstFrameDoneRef.current = true
        canvas.style.opacity = '1'
        if (!initialBumpScheduled) {
          initialBumpScheduled = true
          schedule(() => initialBump(), 40)
        }
      }

      const ease = 0.020
      rotationRef.current += (targetRef.current.rotation - rotationRef.current) * ease
      expansionRef.current += (targetRef.current.expansion - expansionRef.current) * ease
      alphaRef.current += (targetRef.current.alpha - alphaRef.current) * ease

      for (let i = 0; i < bars; i++) {
        const tVal = targetRef.current.bars[i] ?? 0.14
        barsRef.current[i] = (barsRef.current[i] ?? 0.14) + (tVal - (barsRef.current[i] ?? 0.14)) * ease
      }

      const expansion = expansionRef.current
      const alpha = alphaRef.current
      const rotation = rotationRef.current
      const minDim = Math.min(w, h)
      const baseRadius = minDim * (0.12 + 0.045 * expansion)

      pulsesRef.current = pulsesRef.current.filter(p => p.alpha > 0)
      pulsesRef.current.forEach(p => {
        p.radius += p.speed
        p.alpha -= p.decay
        ctx.beginPath()
        ctx.arc(cx, cy, p.radius, 0, Math.PI * 2)
        ctx.strokeStyle =
          `hsla(${cfg.baseHue + p.colorOffset},88%,66%,${Math.max(0, p.alpha)})`
        ctx.lineWidth = 1.6 + Math.sin(p.radius / 20) * 3.0
        ctx.shadowColor = `hsla(${cfg.accentHue},100%,80%,${Math.max(0, p.alpha)})`
        ctx.shadowBlur = cfg.glow * p.glowMultiplier + Math.abs(Math.sin(p.radius / 10)) * 10
        ctx.stroke()
      })

      const gap = (Math.PI * 2) / bars
      ctx.globalAlpha = Math.max(0.06, alpha)
      for (let i = 0; i < bars; i++) {
        const angle = i * gap + rotation + Math.sin(time / 1000 + i) * 0.013
        const barSource = dynamicBarsRef.current ? (dynamicBarsRef.current[i] ?? 0) : (barsRef.current[i] ?? 0.14)
        const amp = (barSource * intensity + 0.08 * Math.sin(time / 300 + i)) * 1.05
        const innerR = baseRadius * (0.64 + 0.045 * Math.sin(time / 450 + i))
        const outerR = innerR + amp * (minDim * (0.14 + 0.095 * expansion))
        const x1 = cx + Math.cos(angle) * innerR
        const y1 = cy + Math.sin(angle) * innerR
        const x2 = cx + Math.cos(angle) * outerR
        const y2 = cy + Math.sin(angle) * outerR

        ctx.save()
        ctx.strokeStyle =
          `hsla(${cfg.baseHue + Math.sin(i * 0.5) * 30},94%,60%,0.88)`
        ctx.lineWidth = 0.85 + amp * 3.6
        ctx.shadowColor = `hsla(${cfg.accentHue},100%,78%,0.78)`
        ctx.shadowBlur = cfg.glow * (0.85 + expansion * 0.5)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()
      }
      ctx.globalAlpha = 1

      const barsActive = (dynamicBarsRef.current ?? barsRef.current).some(v => v > 0.18)
      if (allowEnhanceRef.current && barsActive) {
        renderRadialBeams(ctx, cx, cy, baseRadius, time)
        renderWebbGlow(ctx, cx, cy, baseRadius, time)
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      mountedRef.current = false
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      if (btnEl) btnEl.removeEventListener('click', handleImpuls)
      else if (effectiveTriggerKey) window.removeEventListener(effectiveTriggerKey, handleImpuls as EventListener)
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
      timeoutsRef.current = []
    }
  }, [room, bars, intensity, triggerKey, triggerButtonId])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  )
}

// subtle radial beams (used only during real enhance)
function renderRadialBeams(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  const beamCount = 48
  for (let i = 0; i < beamCount; i++) {
    const angle = (Math.PI * 2 * i) / beamCount + Math.sin(time / 500 + i) * 0.002
    const length = radius * 0.52 + Math.sin(time / 120 + i) * radius * 0.24
    const x1 = cx + Math.cos(angle) * radius
    const y1 = cy + Math.sin(angle) * radius
    const x2 = cx + Math.cos(angle) * (radius + length)
    const y2 = cy + Math.sin(angle) * (radius + length)

    ctx.save()
    ctx.strokeStyle = `hsla(${185 + Math.sin(i) * 28}, 78%, 74%, 0.72)`
    ctx.lineWidth = 0.98 + Math.sin(time / 200 + i) * 0.6
    ctx.shadowColor = `hsla(260, 80%, 86%, 0.62)`
    ctx.shadowBlur = 14
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.restore()
  }
}

// webb-like glow rings (subtle)
function renderWebbGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 6; i++) {
    const r = radius + i * 14 + Math.sin(time / 300 + i) * 5
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `hsla(185, 78%, ${58 + i * 5}%, ${0.14 + i * 0.01})`
    ctx.lineWidth = 1.6 + Math.sin(time / 100 + i) * 0.9
    ctx.shadowColor = `hsla(255, 78%, 88%, 0.38)`
    ctx.shadowBlur = 12 + i * 5
    ctx.stroke()
  }
  ctx.restore()
}
