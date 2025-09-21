'use client'

import { useEffect, useRef, useState } from 'react'

export default function ErdeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: ['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'][Math.floor(Math.random() * 5)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      requestAnimationFrame(animate)
    }
    animate()

    // Start-Zoom nachladen
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.src = '/assets/rooms/erde/Erde.jpg'

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <>
      <div
        ref={backgroundRef}
        className={`
          absolute inset-0 bg-cover bg-center z-0
          transition-transform duration-[4000ms] ease-out
          ${isLoaded ? 'scale-100' : 'scale-150'}
        `}
        style={{ backgroundImage: `url('/assets/rooms/erde/Erde.jpg')`, transformOrigin: 'center center' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </>
  )
}
