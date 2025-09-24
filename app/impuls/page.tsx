'use client'

import React, { useRef } from 'react'
import GalaxyBackground from '../../components/GalaxyBackground'
import EnhancedWaves from '../../components/EnhancedWaves'
import ImpulseButton from '../../components/ImpulseButton'

export default function ImpulsPage() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleImpulse = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => {
                console.warn('Audio konnte nicht abgespielt werden. Benutzerinteraktion notwendig.')
            })
        }

        // Event auslösen für Hintergrund + Waves
        const event = new Event('impuls-activated')
        window.dispatchEvent(event)
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Hintergrund */}
            <GalaxyBackground room="impuls" placeholderColor="bg-blue-900" />

            {/* Audio */}
            <audio
                ref={audioRef}
                id="impuls-audio"
                src="/assets/audio/impuls.mp3"
                preload="auto"
            />

            {/* Visualisierung */}
            <EnhancedWaves
                room="impuls"
                bars={64}
                intensity={0.5}
                triggerButtonId="impuls-button"
            />

            {/* Button */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <ImpulseButton room="impuls" size={90} onClick={handleImpulse} />
            </div>
        </div>
    )
}
