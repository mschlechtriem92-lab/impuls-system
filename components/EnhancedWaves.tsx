"use client"

import { useEffect, useRef, useState } from "react"

interface EnhancedWavesProps {
  room?: string
}

export default function EnhancedWaves({ room = "main" }: EnhancedWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [waveIntensity, setWaveIntensity] = useState(0.3)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const waveRings = [
        { radius: 150, thickness: 3, speed: 1, opacity: 0.6 },
        { radius: 200, thickness: 2, speed: 0.8, opacity: 0.5 },
        { radius: 250, thickness: 4, speed: 0.6, opacity: 0.4 },
        { radius: 300, thickness: 2, speed: 0.4, opacity: 0.3 },
        { radius: 350, thickness: 3, speed: 0.3, opacity: 0.25 },
        { radius: 400, thickness: 1, speed: 0.2, opacity: 0.2 },
      ]

      waveRings.forEach((ring, index) => {
        const pulse = Math.sin(time * ring.speed + index * 0.5) * 0.3 + 0.7
        const currentRadius = ring.radius + Math.sin(time * 0.5 + index) * 10
        const opacity = ring.opacity * pulse * (0.5 + waveIntensity)

        // Color based on room
        let color = "180, 100%, 70%" // Default cyan
        if (room === "erde")
          color = "120, 60%, 50%" // Green
        else if (room === "wasser")
          color = "200, 80%, 60%" // Blue
        else if (room === "feuer")
          color = "15, 90%, 60%" // Orange
        else if (room === "luft")
          color = "60, 70%, 70%" // Yellow-green
        else if (room === "aether") color = "280, 70%, 70%" // Purple

        // Outer glow
        ctx.beginPath()
        ctx.arc(centerX, centerY, currentRadius + ring.thickness, 0, Math.PI * 2)
        ctx.arc(centerX, centerY, currentRadius - ring.thickness, 0, Math.PI * 2, true)
        ctx.fillStyle = `hsla(${color}, ${opacity * 0.3})`
        ctx.fill()

        // Inner bright ring
        ctx.beginPath()
        ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${color}, ${opacity})`
        ctx.lineWidth = ring.thickness * 0.5
        ctx.stroke()

        // Sparkle particles on rings
        if (index % 2 === 0) {
          const particleCount = 8 + index * 2
          for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time * ring.speed * 0.5
            const x = centerX + Math.cos(angle) * currentRadius
            const y = centerY + Math.sin(angle) * currentRadius
            const particleSize = 1 + Math.sin(time * 3 + i) * 0.5

            ctx.beginPath()
            ctx.arc(x, y, particleSize, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${color}, ${opacity * 1.5})`
            ctx.fill()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Listen for impuls activation to increase wave intensity
    const handleImpulsActivation = () => {
      setWaveIntensity(1)
      setTimeout(() => setWaveIntensity(0.3), 3000)
    }

    window.addEventListener("impuls-activated", handleImpulsActivation)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("impuls-activated", handleImpulsActivation)
    }
  }, [room, waveIntensity])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }} />
}
