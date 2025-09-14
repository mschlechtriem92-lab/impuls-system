"use client"

import type React from "react"
import { useState } from "react"

interface ErdeImpulseButtonProps {
  onClick: () => void
  onCompanionOpen?: () => void
}

export default function ErdeImpulseButton({ onClick, onCompanionOpen }: ErdeImpulseButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [meditativeMode, setMeditativeMode] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    setIsPressed(true)
    setMeditativeMode(true)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }

    setRipples((prev) => [...prev, newRipple])

    window.dispatchEvent(new CustomEvent("impuls-activated"))

    onClick()

    if (onCompanionOpen) {
      setTimeout(() => onCompanionOpen(), 300)
    }

    setTimeout(() => {
      setIsPressed(false)
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    setTimeout(() => {
      setMeditativeMode(false)
    }, 3000)
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16" style={{ zIndex: 10 }}>
      <div
        className={`
        absolute inset-0 -m-6
        transition-all duration-[3000ms] ease-out
        ${meditativeMode ? "opacity-60 scale-150" : "opacity-0 scale-100"}
      `}
      >
        <div className="absolute inset-0 rounded-full border-2 border-green-400/20 animate-pulse" />
        <div
          className="absolute inset-2 rounded-full border border-emerald-400/15 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute inset-4 rounded-full border border-white/8 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <button
        onClick={handleClick}
        className={`
          relative overflow-hidden
          w-16 h-16 rounded-full
          bg-gradient-to-r from-green-600/70 via-emerald-600/70 to-green-700/70
          border border-white/15
          text-white font-bold text-xs tracking-wider
          transition-all duration-300 ease-out
          hover:scale-110 hover:border-white/30 hover:bg-opacity-90
          hover:shadow-lg hover:shadow-green-500/20
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-green-500/20
          ${isPressed ? "scale-95 shadow-inner" : ""}
          ${isPressed ? "wurzel-glow" : ""}
          ${meditativeMode ? "scale-125 shadow-2xl shadow-green-500/40" : ""}
          backdrop-blur-sm
        `}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-green-300/20 animate-ping"
            style={{
              left: ripple.x - 8,
              top: ripple.y - 8,
              width: 16,
              height: 16,
              animationDuration: "600ms",
            }}
          />
        ))}

        <span
          className={`
          relative z-10 transition-all duration-1000 text-[10px]
          ${meditativeMode ? "text-green-200 tracking-widest" : ""}
        `}
        >
          WURZELN
        </span>

        <div
          className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-green-400/50 to-emerald-500/50
          transition-all duration-[3000ms] ease-out
          ${isPressed ? "opacity-30" : ""}
          ${meditativeMode ? "opacity-40 scale-110" : "opacity-0"}
        `}
        />
      </button>
    </div>
  )
}
