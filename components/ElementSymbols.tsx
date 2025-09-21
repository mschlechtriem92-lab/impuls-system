'use client'

import { ArchetypeMode } from './KICompanion'
import { useState } from 'react'

interface ElementBarProps {
  mode: ArchetypeMode
  onSelect?: (mode: ArchetypeMode) => void
}

const elements: { mode: ArchetypeMode; label: string; icon: string }[] = [
  { mode: 'main', label: 'Main', icon: '⚡' },
  { mode: 'erde', label: 'Erde', icon: '🌱' },
  { mode: 'wasser', label: 'Wasser', icon: '💧' },
  { mode: 'feuer', label: 'Feuer', icon: '🔥' },
  { mode: 'luft', label: 'Luft', icon: '🌬️' },
  { mode: 'aether', label: 'Aether', icon: '✨' },
]

export default function ElementBar({ mode, onSelect }: ElementBarProps) {
  const [hovered, setHovered] = useState<ArchetypeMode | null>(null)

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      {/* Schwarzer, leicht transparenter Container */}
      <div className="flex space-x-4 bg-black/60 backdrop-blur-md rounded-3xl px-4 py-2 border border-white/20 shadow-xl transition-shadow duration-500 hover:shadow-2xl">
        {elements.map((el) => {
          const isActive = el.mode === mode
          return (
            <button
              key={el.mode}
              onClick={() => onSelect && onSelect(el.mode)}
              onMouseEnter={() => setHovered(el.mode)}
              onMouseLeave={() => setHovered(null)}
              className={`
                flex items-center justify-center
                w-14 h-14 md:w-16 md:h-16
                text-2xl md:text-3xl
                rounded-full
                transition-all duration-200
                ${isActive ? 'bg-white/20' : 'bg-white/10'}
                ${hovered === el.mode ? 'scale-110 shadow-lg' : 'scale-100'}
              `}
            >
              {el.icon}
            </button>
          )
        })}
      </div>
    </div>
  )
}
