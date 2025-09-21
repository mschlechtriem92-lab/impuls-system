'use client'

import { useEffect, useRef, useState } from 'react'

interface EnhancedWavesProps {
  room?: 'main' | 'erde' | 'wasser' | 'feuer' | 'luft' | 'aether' | string
  bars?: number
  intensity?: number
}

interface Pulse {
  radius: number
  alpha: number
  speed?: number
  glowMultiplier?: number
  colorOffset?: number
}

export default function EnhancedWaves({
  room = 'main',
  bars = 96,
  intensity = 1.0,
}: EnhancedWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const freqDataRef = useRef<Uint8Array | null>(null)

  const [targetExpansion, setTargetExpansion] = useState(0.3)
  const [targetAlpha, setTargetAlpha] = useState(0.4)

  const expansionRef = useRef(0.3)
  const alphaRef = useRef(0.4)
  const pulsesRef = useRef<Pulse[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

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
      main: { baseHue: 200, accentHue: 280, glow: 20 },
      erde: { baseHue: 120, accentHue: 45, glow: 18 },
      wasser: { baseHue: 200, accentHue: 180, glow: 18 },
      feuer: { baseHue: 14, accentHue: 40, glow: 22 },
      luft: { baseHue: 210, accentHue: 150, glow: 16 },
      aether: { baseHue: 275, accentHue: 220, glow: 20 },
    }
    const cfg = roomConfig[room] ?? roomConfig['main']

    // Audio Setup
    const audioEl = document.getElementById(`audio-${room}`) as HTMLAudioElement | null
    if (audioEl) {
      const AuCtx = (window as any).AudioContext || (window as any).webkitAudioContext
      if (AuCtx) {
        const audioCtx = new AuCtx() as AudioContext
        audioCtxRef.current = audioCtx
        const source = audioCtx.createMediaElementSource(audioEl)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 512 // höhere Auflösung für organische Frequenzanimation
        source.connect(analyser)
        analyser.connect(audioCtx.destination)
        analyserRef.current = analyser
        freqDataRef.current = new Uint8Array(analyser.frequencyBinCount)
      }
    }

    const handleClick = () => {
      if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume().catch(() => { })

      // Mehrere dynamische Pulswellen gleichzeitig
      for (let i = 0; i < 5; i++) {
        pulsesRef.current.push({
          radius: 0,
          alpha: 1,
          speed: 2 + Math.random() * 3,
          glowMultiplier: 1 + Math.random(),
          colorOffset: Math.random() * 60,
        })
      }

      // Temporäre Verstärkung der Frequenzen
      setTargetExpansion(1)
      setTargetAlpha(1)
      setTimeout(() => {
        setTargetExpansion(0.3)
        setTargetAlpha(0.4)
      }, 4000)
    }
    window.addEventListener('click', handleClick)

    let rotation = 0

    const draw = (time: number) => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const cx = w / 2
      const cy = h / 2
      ctx.clearRect(0, 0, w, h)

      // Smooth Übergänge
      expansionRef.current += (targetExpansion - expansionRef.current) * 0.05
      alphaRef.current += (targetAlpha - alphaRef.current) * 0.05
      const expansion = expansionRef.current
      const alpha = alphaRef.current

      const minDim = Math.min(w, h)
      const baseRadius = minDim * (0.18 + 0.04 * expansion)

      // Frequenzdaten
      let barsData: number[] = []
      if (analyserRef.current) {
        const analyser = analyserRef.current
        if (!freqDataRef.current || freqDataRef.current.length !== analyser.frequencyBinCount) {
          freqDataRef.current = new Uint8Array(analyser.frequencyBinCount)
        }
        const tempArray = new Uint8Array(freqDataRef.current.length)
        analyser.getByteFrequencyData(tempArray)
        freqDataRef.current.set(tempArray)

        barsData = Array.from({ length: bars }, (_, i) => {
          const idx = Math.floor((i / bars) * freqDataRef.current!.length)
          return freqDataRef.current![idx] / 255
        })
      }

      // Pulswellen rendern (organisch & dynamisch)
      pulsesRef.current.forEach((p, i) => {
        p.radius += p.speed ?? 2.5
        p.alpha -= 0.012
        if (p.alpha <= 0) pulsesRef.current.splice(i, 1)
        else {
          ctx.beginPath()
          ctx.arc(cx, cy, p.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${cfg.baseHue + (p.colorOffset ?? 0)},100%,60%,${p.alpha * 0.5})`
          ctx.lineWidth = 2 + Math.sin(p.radius / 20) * 4
          ctx.shadowColor = `hsla(${cfg.accentHue},100%,80%,${p.alpha * 0.8})`
          ctx.shadowBlur = (cfg.glow * (p.glowMultiplier ?? 1)) + Math.sin(p.radius / 10) * 20
          ctx.stroke()
        }
      })

      // Frequenz-Bars mit organischer Oszillation
      ctx.globalAlpha = alpha
      const gap = (Math.PI * 2) / bars
      for (let i = 0; i < bars; i++) {
        const angle = i * gap + rotation + Math.sin(time / 1000 + i) * 0.01
        const amp = (barsData[i] || 0) * intensity + 0.25 * Math.sin(time / 300 + i)
        const innerR = baseRadius * (0.65 + 0.05 * Math.sin(time / 500 + i))
        const outerR = innerR + amp * (minDim * (0.18 + 0.15 * expansion))

        const x1 = cx + Math.cos(angle) * innerR
        const y1 = cy + Math.sin(angle) * innerR
        const x2 = cx + Math.cos(angle) * outerR
        const y2 = cy + Math.sin(angle) * outerR

        ctx.save()
        ctx.strokeStyle = `hsla(${cfg.baseHue + amp * 80 + Math.sin(i) * 20},100%,60%,0.9)`
        ctx.lineWidth = 1 + amp * 6
        ctx.shadowColor = `hsla(${cfg.accentHue},100%,70%,0.7)`
        ctx.shadowBlur = cfg.glow * (1 + expansion)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()
      }
      ctx.globalAlpha = 1

      rotation += 0.003
      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)
    setTargetAlpha(0.4)
    setTargetExpansion(0.3)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
    }
  }, [room, bars, intensity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  )
}
