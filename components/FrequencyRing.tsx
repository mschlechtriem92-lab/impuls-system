"use client"

import { useEffect, useRef, useState } from "react"

export default function FrequencyRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [intensity, setIntensity] = useState(0.5)

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

    let rotation = 0
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      time += 0.016
      rotation += 0.005

      // Central glowing core
      const coreRadius = 8 + Math.sin(time * 2) * 3
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 3)
      gradient.addColorStop(0, `hsla(180, 100%, 80%, ${0.8 + intensity * 0.2})`)
      gradient.addColorStop(0.3, `hsla(200, 80%, 60%, ${0.6 + intensity * 0.4})`)
      gradient.addColorStop(1, `hsla(220, 60%, 40%, 0)`)

      ctx.beginPath()
      ctx.arc(centerX, centerY, coreRadius * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Radial frequency spikes (like in reference image)
      const spikeCount = 120
      const baseRadius = 80
      const maxSpikeLength = 60

      for (let i = 0; i < spikeCount; i++) {
        const angle = (i / spikeCount) * Math.PI * 2 + rotation
        const frequencyValue = Math.sin(time * 3 + i * 0.1) * 0.5 + 0.5
        const spikeLength = (frequencyValue * intensity + 0.2) * maxSpikeLength

        const startX = centerX + Math.cos(angle) * baseRadius
        const startY = centerY + Math.sin(angle) * baseRadius
        const endX = centerX + Math.cos(angle) * (baseRadius + spikeLength)
        const endY = centerY + Math.sin(angle) * (baseRadius + spikeLength)

        // Color gradient from cyan to pink like reference
        const hue = 180 + frequencyValue * 120 // Cyan to pink range
        const opacity = 0.4 + frequencyValue * intensity * 0.6

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${opacity})`
        ctx.lineWidth = 1.5 + frequencyValue * 2
        ctx.stroke()
      }

      // Concentric rings with subtle glow
      const rings = [
        { radius: 100, opacity: 0.6, width: 1 },
        { radius: 140, opacity: 0.4, width: 1.5 },
        { radius: 180, opacity: 0.3, width: 1 },
        { radius: 220, opacity: 0.2, width: 0.8 },
      ]

      rings.forEach((ring, index) => {
        const pulseOffset = Math.sin(time * 1.5 + index * 0.5) * 0.3 + 0.7
        const ringRadius = ring.radius + Math.sin(time + index) * 5

        ctx.beginPath()
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(200, 70%, 60%, ${ring.opacity * pulseOffset * (0.5 + intensity * 0.5)})`
        ctx.lineWidth = ring.width
        ctx.stroke()
      })

      // Orbital particles on rings
      const orbitalRings = [
        { radius: 120, particles: 8, speed: 1, size: 3 },
        { radius: 160, particles: 12, speed: -0.7, size: 2 },
        { radius: 200, particles: 16, speed: 0.5, size: 2.5 },
      ]

      orbitalRings.forEach((ring, ringIndex) => {
        for (let i = 0; i < ring.particles; i++) {
          const angle = (i / ring.particles) * Math.PI * 2 + rotation * ring.speed
          const x = centerX + Math.cos(angle) * ring.radius
          const y = centerY + Math.sin(angle) * ring.radius

          const particleIntensity = Math.sin(time * 2 + i * 0.3 + ringIndex) * 0.5 + 0.5
          const size = ring.size * (0.5 + particleIntensity * intensity)
          const opacity = 0.3 + particleIntensity * intensity * 0.7

          const hue = 180 + ringIndex * 30 + particleIntensity * 60

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity})`
          ctx.fill()

          // Particle glow
          ctx.beginPath()
          ctx.arc(x, y, size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity * 0.2})`
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Listen for impuls activation to increase intensity
    const handleImpulsActivation = () => {
      setIntensity(1)
      setTimeout(() => setIntensity(0.5), 2000)
    }

    window.addEventListener("impuls-activated", handleImpulsActivation)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("impuls-activated", handleImpulsActivation)
    }
  }, [intensity])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />
}
