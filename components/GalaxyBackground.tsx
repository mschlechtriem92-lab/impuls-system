'use client'

import { useEffect, useRef, useState } from 'react'

interface RoomBackgroundProps {
  roomImage?: string // optional, Standard auf Impuls
}

export default function RoomBackground({ roomImage = '/assets/rooms/Impuls/Impuls.jpg' }: RoomBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [impulseActive, setImpulseActive] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
      setTimeout(() => setIsLoaded(true), 200)
    }
    img.onerror = () => {
      console.warn('[RoomBackground] Bild konnte nicht geladen werden:', roomImage)
      setImageLoaded(false)
      setTimeout(() => setIsLoaded(true), 200)
    }
    img.src = roomImage

    const handleImpulsActivated = () => {
      setImpulseActive(true)
      setTimeout(() => setImpulseActive(false), 3000)
    }

    window.addEventListener('impuls-activated', handleImpulsActivated)

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

    // Partikel-Setup
    const particles: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = []
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${particle.opacity * 0.6})`
        ctx.fill()
        particle.y -= particle.speed
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.x = Math.random() * canvas.width
        }
      })
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('impuls-activated', handleImpulsActivated)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [roomImage])

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {/* Fallback-Gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: imageLoaded
            ? 'transparent'
            : 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        }}
      />

      {/* Hintergrundbild mit Start-Zoom */}
      <div
        ref={backgroundRef}
        className={`
          absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat
          transition-all duration-[4000ms] ease-out
          ${isLoaded ? 'scale-100' : 'scale-150'}
          ${impulseActive ? 'scale-110 brightness-110' : ''}
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          backgroundImage: `url(${roomImage})`,
          filter: `brightness(0.7) contrast(1.1) ${impulseActive ? 'hue-rotate(15deg)' : ''}`,
          transformOrigin: 'center center',
        }}
      />

      {/* Partikel */}
      <canvas
        ref={canvasRef}
        className={`
          absolute inset-0 w-full h-full
          transition-opacity duration-[4000ms] ease-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Sanfte Lichtüberlagerung */}
      <div
        className={`
          absolute inset-0 w-full h-full
          bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent
          transition-all duration-[3000ms] ease-out
          ${impulseActive ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
        `}
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  )
}
