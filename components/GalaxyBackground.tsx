'use client'

import { useEffect, useRef, useState } from 'react'
import { RoomType } from './types'

interface RoomBackgroundProps {
  room?: RoomType
  roomImage?: string
  placeholderColor?: string
}

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export default function GalaxyBackground({ room = 'impuls', roomImage, placeholderColor = 'bg-gray-900' }: RoomBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [impulseActive, setImpulseActive] = useState(false)

  useEffect(() => {
    // Bildquellen
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
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = `url(${candidates[idx]})`
      }
    }
    img.onerror = () => {
      idx++
      if (idx < candidates.length) {
        img.src = candidates[idx]
      } else {
        console.warn('[GalaxyBackground] Kein Bild gefunden für', room)
      }
    }
    img.src = candidates[idx]

    const handleImpulsActivated = () => {
      setImpulseActive(true)
      setTimeout(() => setImpulseActive(false), 3000)
    }

    window.addEventListener('impuls-activated', handleImpulsActivated)

    // Partikel
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

    const particles: Particle[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
    }))

    let raf = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.6})`
        ctx.fill()
        p.y -= p.speed
        if (p.y < 0) {
          p.y = canvas.height
          p.x = Math.random() * canvas.width
        }
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('impuls-activated', handleImpulsActivated)
      window.removeEventListener('resize', resizeCanvas)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [room, roomImage])

  return (
    <div className={`fixed inset-0 w-full h-full z-0 ${placeholderColor}`}>
      <div
        ref={backgroundRef}
        className={`
          absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat
          transition-all duration-[2000ms] ease-out
          ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
          ${impulseActive ? 'brightness-125 scale-105' : ''}
        `}
        style={{ transformOrigin: 'center center' }}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-out`}
      />
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent transition-all duration-[1000ms] ease-out ${impulseActive ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
