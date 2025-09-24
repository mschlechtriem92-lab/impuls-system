'use client'

import React, { useEffect, useRef } from 'react'
import GalaxyBackground from '../../components/GalaxyBackground'
import EnhancedWaves from '../../components/EnhancedWaves'

// Optional: Wenn du einen AudioPlayer hast
// import AudioPlayer from '../../components/AudioPlayer'

export default function ImpulsPage() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleImpulse = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
        }

        // Trigger event für GalaxyBackground
        const event = new Event('impuls-activated')
        window.dispatchEvent(event)
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Hintergrund */}
            <GalaxyBackground room="impuls" />

            {/* Audio Player */}
            <audio ref={audioRef} id="impuls-audio" src="/assets/audio/impuls.mp3" preload="auto" />

            {/* Visualisierung */}
            <EnhancedWaves
                room="impuls"
                bars={64}
                intensity={0.5}
                triggerButtonId="impuls-button"
            />

            {/* Button zum Auslösen */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <button
                    id="impuls-button"
                    onClick={handleImpulse}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                >
                    Impuls auslösen
                </button>
            </div>
        </div>
    )
}
