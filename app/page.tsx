// app/impuls/page.tsx
'use client'

import { useRef, useState } from 'react'
import Navigation from '../components/Navigation'
import KICompanion from '../components/KICompanion'
import ImpulseButton from '../components/ImpulseButton'
import GalaxyBackground from '../components/GalaxyBackground'
import EnhancedWaves from '../components/EnhancedWaves'

export default function ImpulsPage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [companionVisible, setCompanionVisible] = useState(false)

  const handleImpulseClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => console.warn("Audio konnte nicht abgespielt werden:", err))
      }
    }

    // Event für die Impuls-Animation oder andere Listener
    window.dispatchEvent(new Event("impuls-activated"))

    // KI-Begleiter anzeigen
    setCompanionVisible(true)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Hintergrund-Animation */}
      <GalaxyBackground room="impuls" />

      {/* Enhanced Waves Animation */}
      <EnhancedWaves room="impuls" />

      {/* Impuls Button mittig */}
      <section className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ImpulseButton room="impuls" onClick={handleImpulseClick} />
      </section>

      {/* KI-Begleiter oben links */}
      <section className="absolute top-4 left-4 flex flex-row space-x-4 z-30">
        <KICompanion mode="impuls" isVisible={companionVisible} onToggle={setCompanionVisible} />
      </section>

      {/* Navigation */}
      <Navigation currentRoom="impuls" />

      {/* Audio für den Impuls */}
      <audio
        ref={audioRef}
        src="/assets/rooms/impuls/Impuls.mp3"
        preload="auto"
        className="hidden"
      />
    </main>
  )
}
