"use client"

import { useEffect, useRef } from "react"

export default function ErdeSphere() {
  const sphereRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sphere = sphereRef.current
    if (!sphere) return

    // Breathing animation for the earth sphere
    const breathe = () => {
      sphere.style.transform = `scale(${1 + Math.sin(Date.now() * 0.001) * 0.05})`
    }

    const interval = setInterval(breathe, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center z-[5]">
      <div
        ref={sphereRef}
        className="relative w-64 h-64 rounded-full bg-gradient-radial from-green-400 via-green-500 to-green-700 shadow-2xl"
        style={{
          boxShadow: `
            0 0 60px rgba(34, 197, 94, 0.4),
            0 0 120px rgba(34, 197, 94, 0.2),
            inset 0 0 60px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        <div className="absolute inset-4 rounded-full bg-gradient-radial from-green-300/30 via-transparent to-transparent" />
        <div className="absolute inset-8 rounded-full bg-gradient-radial from-yellow-300/20 via-transparent to-transparent" />

        <div className="absolute -inset-4 rounded-full border border-green-400/30 animate-ping" />
        <div
          className="absolute -inset-8 rounded-full border border-green-500/20 animate-ping"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -inset-12 rounded-full border border-green-600/10 animate-ping"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  )
}
