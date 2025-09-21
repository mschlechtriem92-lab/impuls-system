'use client'

import { useRef, useState } from 'react'
import ErdeBackground from '../../components/ErdeBackground'
import ErdeSphere from '../../components/ErdeSphere'
import ErdeImpulseButton from '../../components/ErdeImpulseButton'
import Navigation from '../../components/Navigation'
import KICompanion from '../../components/KICompanion'
import EnhancedWaves from '../../components/EnhancedWaves'

export default function ErdePage() {
  const [companionVisible, setCompanionVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleImpulseClick = () => {
    // Audio starten
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => console.warn("Audio konnte nicht abgespielt werden:", err))
      }
    }
    // KI-Begleiter öffnen
    setCompanionVisible(true)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Hintergrund + Partikel */}
      <ErdeBackground />

      {/* Frequenzanimation für Erde */}
      <EnhancedWaves room="erde" />

      {/* Navigation */}
      <Navigation currentRoom="erde" />

      {/* Kugel */}
      <section className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <ErdeSphere />
      </section>

      {/* Impuls-Button */}
      <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 pointer-events-auto z-20">
        <ErdeImpulseButton onClick={handleImpulseClick} />
      </section>

      {/* KI-Begleiter Erde horizontal */}
      <section className="absolute top-4 left-4 z-30">
        <KICompanion
          mode="erde"
          isVisible={companionVisible}
          onToggle={setCompanionVisible}
        />
      </section>

      {/* Audio Erde */}
      <audio
        ref={audioRef}
        src="/assets/rooms/erde/Erde.mp3"
        preload="auto"
        className="hidden"
      />
    </main>
  )
}
