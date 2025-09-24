export type RoomType = 'impuls' | 'erde' | 'wasser' | 'feuer' | 'wind' | 'aether'

export interface RoomConfig {
    displayName: string
    bgCandidates: string[]
    audioFile?: string
    elementIcon?: string
    buttonOffset: { top: string; left: string; translateY: string }
    wave?: { baseHue: number; accentHue: number; glow: number; allowEnhance?: boolean }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const roomsConfig: Record<RoomType, RoomConfig> = {
    impuls: {
        displayName: 'Impuls',
        bgCandidates: [
            '/assets/rooms/impuls/impuls.jpg',
            '/assets/rooms/impuls/Impuls.jpg',
            '/assets/rooms/impuls/Impuls.png'
        ],
        audioFile: '/assets/rooms/impuls/Impuls.mp3',
        elementIcon: '/element-impuls.png',
        buttonOffset: { top: '58%', left: '50%', translateY: '-40%' },
        wave: { baseHue: 185, accentHue: 260, glow: 26, allowEnhance: true },
    },
    erde: {
        displayName: 'Erde',
        bgCandidates: [
            '/assets/rooms/erde/erde.jpg',
            '/assets/rooms/erde/Erde.jpg',
            '/assets/rooms/erde/Erde.png'
        ],
        audioFile: '/assets/rooms/erde/Erde.mp3',
        elementIcon: '/element-erde.png',
        buttonOffset: { top: '58%', left: '48%', translateY: '-40%' },
        wave: { baseHue: 120, accentHue: 45, glow: 18, allowEnhance: true },
    },
    wasser: {
        displayName: 'Wasser',
        bgCandidates: [
            '/assets/rooms/wasser/wasser.jpg',
            '/assets/rooms/wasser/Wasser.jpg',
            '/assets/rooms/wasser/Wasser.png'
        ],
        audioFile: '/assets/rooms/wasser/Wasser.mp3',
        elementIcon: '/element-wasser.png',
        buttonOffset: { top: '58%', left: '52%', translateY: '-40%' },
        wave: { baseHue: 200, accentHue: 180, glow: 14, allowEnhance: true },
    },
    feuer: {
        displayName: 'Feuer',
        bgCandidates: [
            '/assets/rooms/feuer/feuer.jpg',
            '/assets/rooms/feuer/Feuer.jpg',
            '/assets/rooms/feuer/Feuer.png'
        ],
        audioFile: '/assets/rooms/feuer/Feuer.mp3',
        elementIcon: '/element-feuer.png',
        buttonOffset: { top: '58%', left: '50%', translateY: '-40%' },
        wave: { baseHue: 14, accentHue: 40, glow: 18, allowEnhance: true },
    },
    wind: {
        displayName: 'Wind',
        bgCandidates: [
            '/assets/rooms/wind/wind.jpg',
            '/assets/rooms/wind/Wind-Raum.jpg',
            '/assets/rooms/wind/Wind.jpg',
            '/assets/rooms/wind/Wind.png'
        ],
        audioFile: '/assets/rooms/wind/Wind.mp3',
        elementIcon: '/element-wind.png',
        buttonOffset: { top: '58%', left: '51%', translateY: '-40%' },
        wave: { baseHue: 210, accentHue: 150, glow: 12, allowEnhance: true },
    },
    aether: {
        displayName: 'Äther',
        bgCandidates: [
            '/assets/rooms/aether/aether.jpg',
            '/assets/rooms/aether/Aether.jpg',
            '/assets/rooms/aether/Aether.png'
        ],
        audioFile: '/assets/rooms/aether/Aether.mp3',
        elementIcon: '/element-aether.png',
        buttonOffset: { top: '58%', left: '49%', translateY: '-40%' },
        wave: { baseHue: 275, accentHue: 220, glow: 16, allowEnhance: true },
    },
}
