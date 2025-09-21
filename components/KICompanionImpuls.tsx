'use client'

import { useState } from 'react'

interface Props {
    isVisible: boolean
    onToggle: (visible: boolean) => void
}

export default function KICompanionImpuls({ isVisible, onToggle }: Props) {
    const [reflection, setReflection] = useState('')

    return (
        <div className="absolute top-4 left-4 z-30 flex flex-row space-x-2 max-w-md">
            {isVisible && (
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 animate-in slide-in-from-left duration-300 flex flex-row items-center">
                    <p className="text-white/90 text-sm">{`Willkommen im Impulsraum! Welcher Impuls ruft dich?`}</p>
                </div>
            )}
        </div>
    )
}
