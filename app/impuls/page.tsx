'use client'

import EnhancedWaves from '@/components/EnhancedWaves'
import GalaxyBackground from '../components/GalaxyBackground'


export default function ImpulsPage() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Background src="/assets/rooms/Impuls/Impuls.jpg" alt="Impuls" />
            <AudioPlayer src="/assets/rooms/Impuls/Impuls.mp3" />
            <EnhancedWaves room="main" bars={64} intensity={1.0} />
        </div>
    )
}
