"use client"

import { useRef, useEffect, useState } from "react"
import ErdeBackground from "@/components/ErdeBackground"
import ErdeSphere from "@/components/ErdeSphere"
import ErdeImpulseButton from "@/components/ErdeImpulseButton"
import Navigation from "@/components/Navigation"
import KICompanion from "@/components/KICompanion"
import EnhancedWaves from "@/components/EnhancedWaves"

export default function ErdeRoom() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [companionVisible, setCompanionVisible] = useState(false)

  const playImpulse = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }

    window.dispatchEvent(new CustomEvent("impuls-activated"))
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
      <ErdeBackground />
      <EnhancedWaves room="erde" />
      <ErdeSphere />
      <ErdeImpulseButton onClick={playImpulse} onCompanionOpen={handleCompanionOpen} />
      <KICompanion mode="erde" isVisible={companionVisible} onToggle={setCompanionVisible} />
      <Navigation currentRoom="erde" />

      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erde-sound-7lodb4OAUGLY924lE794SJRbVbGX3f.mp3" preload="auto" className="hidden" />
    </div>
  )
}
