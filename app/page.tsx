"use client"

import { useRef, useEffect, useState } from "react"
import ImpulsRoom from "../components/ImpulsRoom"
import FrequencyRing from "../components/FrequencyRing"
import GalaxyBackground from "../components/GalaxyBackground"
import ImpulseButton from "../components/ImpulseButton"
import Navigation from "../components/Navigation"
import KICompanion from "../components/KICompanion"
import ElementSymbols from "../components/ElementSymbols"
import EnhancedWaves from "../components/EnhancedWaves"


export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [companionVisible, setCompanionVisible] = useState(false)

  const playImpulse = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }
  }

  const handleCompanionOpen = () => {
    setCompanionVisible(true)
  }

  useEffect(() => {
    // Preload audio
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <GalaxyBackground />
      <EnhancedWaves room="main" />
      <ImpulsRoom />
      <FrequencyRing />
      <ImpulseButton onClick={playImpulse} onCompanionOpen={handleCompanionOpen} />
      <KICompanion mode="main" isVisible={companionVisible} onToggle={setCompanionVisible} />
      <Navigation currentRoom="main" />

      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/impuls-jtK3vdvo8RoFuhkJcpZa1dcLMbIOpM.mp3" preload="auto" className="hidden" />
    </div>
  )
}
