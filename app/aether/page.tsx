'use client'

import { useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import KICompanion from '@/components/KICompanion'
import ImpulseButton from '@/components/ImpulseButton'
import GalaxyBackground from '@/components/GalaxyBackground'
import EnhancedWaves from '@/components/EnhancedWaves'

export default function AetherPage() {
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

        window.dispatchEvent(new Event('aether-activated'))
        setCompanionVisible(true)
    }

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            <GalaxyBackground roomImage="/assets/rooms/Aether/Aether.jpg" />
            <EnhancedWaves room="aether" />

            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <ImpulseButton room="aether" onClick={handleImpulseClick} />
            </section>

            <section className="absolute top-4 left-4 flex flex-row space-x-4 z-30">
                <KICompanion
                    mode="aether"
                    isVisible={companionVisible}
                    onToggle={setCompanionVisible}
                />
            </section>

            <Navigation currentRoom="aether" />

            <audio
                ref={audioRef}
                src="/assets/rooms/Aether/Aether.mp3"
                preload="auto"
                className="hidden"
            />
        </main>
    )
}
