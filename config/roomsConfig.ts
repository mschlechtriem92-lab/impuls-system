// D:\Impuls-local\config\roomsConfig.ts
export interface RoomConfig {
    id: string
    name: string
    audio: string
    image: string
    background: string
    color: string
}

export const roomsConfig: Record<string, RoomConfig> = {
    impuls: {
        id: "impuls",
        name: "Impuls",
        audio: "/assets/rooms/Impuls/Impuls.mp3",
        image: "/impuls-raum.png",
        background: "/assets/rooms/Impuls/Impuls.jpg",
        color: "#4f46e5",
    },
    erde: {
        id: "erde",
        name: "Erde",
        audio: "/assets/rooms/erde/Erde.mp3",
        image: "/element-erde.png",
        background: "/assets/rooms/erde/Erde.jpg",
        color: "#22c55e",
    },
    wasser: {
        id: "wasser",
        name: "Wasser",
        audio: "/assets/rooms/wasser/Wasser.mp3",
        image: "/element-wasser.png",
        background: "/assets/rooms/wasser/Wasser.jpg",
        color: "#06b6d4",
    },
    feuer: {
        id: "feuer",
        name: "Feuer",
        audio: "/assets/rooms/feuer/Feuer.mp3",
        image: "/element-feuer.png",
        background: "/assets/rooms/feuer/Feuer.jpg",
        color: "#f97316",
    },
    wind: {
        id: "wind",
        name: "Wind",
        audio: "/assets/rooms/wind/Wind.mp3",
        image: "/element-wind.png",
        background: "/assets/rooms/wind/Wind.jpg",
        color: "#10b981",
    },
    aether: {
        id: "aether",
        name: "Äther",
        audio: "/assets/rooms/Aether/Aether.mp3",
        image: "/element-aether.png",
        background: "/assets/rooms/Aether/Aether.jpg",
        color: "#8b5cf6",
    },
}
