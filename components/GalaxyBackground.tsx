'use client'

import { useEffect, useRef, useState } from 'react'

export type RoomType = 'impuls' | 'erde' | 'wasser' | 'feuer' | 'wind' | 'aether' | string

interface RoomBackgroundProps {
  room?: RoomType
  roomImage?: string
}

export default function GalaxyBackground({ room = 'impuls', roomImage }: RoomBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [impulseActive, setImpulseActive] = useState(false)

  useEffect(() => {
    const candidates = roomImage
      ? [roomImage]
      : [
        `/assets/rooms/${room}/${room}.jpg`,
        `/assets/rooms/${room}/${room}.png`,
        `/assets/rooms/${room}/${room}-Raum.jpg`,
        `/assets/rooms/${room}/${room}-Raum.png`,
        `/assets/rooms/${room}/${capitalize(room)}.jpg`,
        `/assets/rooms/${room}/${capitalize(room)}.png`,
      ]

    let idx = 0
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
      setTimeout(() => setIsLoaded(true), 200)
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = `url(${candidates[idx]})`
      }
    }
    img.onerror = () => {
      idx++
      if (idx < candidates.length) {
        img.src = candidates[idx]
      } else {
        console.warn('[GalaxyBackground] Keine passende Hintergrunddatei gefunden für', room, candidates)
        setImageLoaded(false)
        setTimeout(() => setIsLoaded(true), 200)
      }
    }
    img.src = candidates[idx]

    const handleImpulsActivated = () => {
      setImpulseActive(true)
      setTimeout(() => setImpulseActive(false), 3000)
    }

    const eventKey = `${room}-activated`
    window.addEventListener(eventKey, handleImpulsActivated)

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

    const particles: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = []
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }

    let raf = 0
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
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener(eventKey, handleImpulsActivated)
      window.removeEventListener('resize', resizeCanvas)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [room, roomImage])

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div className="absolute inset-0 w-full h-full" />
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
          filter: `brightness(0.7) contrast(1.1) ${impulseActive ? 'hue-rotate(15deg)' : ''}`,
          transformOrigin: 'center center',
        }}
      />
      <canvas
        ref={canvasRef}
        className={`
          absolute inset-0 w-full h-full
          transition-opacity duration-[4000ms] ease-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
