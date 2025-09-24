'use client'

import { useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import KICompanion from '@/components/KICompanion'
import ImpulseButton from '@/components/ImpulseButton'
import GalaxyBackground from '@/components/GalaxyBackground'
import EnhancedWaves from '@/components/EnhancedWaves'

export default function ErdePage() {
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

    window.dispatchEvent(new Event('erde-activated'))
    setCompanionVisible(true)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <GalaxyBackground roomImage="/assets/rooms/erde/Erde.jpg" />
      <EnhancedWaves room="erde" />

      <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <ImpulseButton room="erde" onClick={handleImpulseClick} />
      </section>

      <section className="absolute top-4 left-4 flex flex-row space-x-4 z-30">
        <KICompanion
          mode="erde"
          isVisible={companionVisible}
          onToggle={setCompanionVisible}
        />
      </section>

      <Navigation currentRoom="erde" />

      <audio
        ref={audioRef}
        src="/assets/rooms/erde/Erde.mp3"
        preload="auto"
        className="hidden"
      />
    </main>
  )
}
