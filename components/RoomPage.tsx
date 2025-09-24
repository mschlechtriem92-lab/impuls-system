// components/RoomPage.tsx
'use client'

import { useRef, useState } from 'react'
import KICompanion from './KICompanion'
import ImpulseButton from './ImpulseButton'
import GalaxyBackground from './GalaxyBackground'
import EnhancedWaves from './EnhancedWaves'

interface RoomPageProps {
    room: 'impuls' | 'erde' | 'wasser' | 'feuer' | 'wind' | 'aether'
}

export default function RoomPage({ room }: RoomPageProps) {
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
        window.dispatchEvent(new Event(`${room}-activated`))
        setCompanionVisible(true)
    }

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            <GalaxyBackground room={room} />
            <EnhancedWaves room={room} />

            {/* Impuls-Button einheitlich weiter unten */}
            <section
                className="absolute z-20"
                style={{
                    top: '65%',
                    left: '50%',
                    transform: 'translate(-50%, -40%)',
                }}
            >
                <ImpulseButton room={room} onClick={handleImpulseClick} size={70} />
            </section>

            {/* Elementensymbol */}
            <img
                src={`/element-${room}.png`}
                alt={`${room} symbol`}
                className="absolute z-30 top-6 left-1/2 -translate-x-1/2 w-14 h-14"
            />

            <KICompanion mode={room} isVisible={companionVisible} onToggle={setCompanionVisible} />

            <audio
                ref={audioRef}
                src={`/assets/rooms/${room}/${capitalize(room)}.mp3`}
                preload="auto"
                className="hidden"
            />
        </main>
    )
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}
