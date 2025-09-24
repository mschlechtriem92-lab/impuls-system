
// components/roomsConfig.ts
export type RoomType = 'impuls' | 'erde' | 'wasser' | 'feuer' | 'wind' | 'aether';

export interface RoomConfig {
    imageJpg: string;
    imagePng?: string;
    audio?: string;
    elementImage?: string;
}

export const roomsConfig: Record<RoomType, RoomConfig> = {
    impuls: {
        imageJpg: '/assets/rooms/impuls/Impuls.jpg',
        audio: '/assets/rooms/impuls/Impuls.mp3',
        elementImage: '/element-impuls.png',
    },
    erde: {
        imageJpg: '/assets/rooms/erde/Erde.jpg',
        imagePng: '/assets/rooms/erde/Erde.png',
        audio: '/assets/rooms/erde/Erde.mp3',
        elementImage: '/element-erde.png',
    },
    wasser: {
        imageJpg: '/assets/rooms/wasser/Wasser.jpg',
        imagePng: '/assets/rooms/wasser/Wasser.png',
        audio: '/assets/rooms/wasser/Wasser.mp3',
        elementImage: '/element-wasser.png',
    },
    feuer: {
        imageJpg: '/assets/rooms/feuer/Feuer.jpg',
        imagePng: '/assets/rooms/feuer/Feuer.png',
        audio: '/assets/rooms/feuer/Feuer.mp3',
        elementImage: '/element-feuer.png',
    },
    wind: {
        imageJpg: '/assets/rooms/wind/Wind.jpg',
        imagePng: '/assets/rooms/wind/Wind.png',
        audio: '/assets/rooms/wind/Wind.mp3',
        elementImage: '/element-wind.png',
    },
    aether: {
        imageJpg: '/assets/rooms/aether/Aether.jpg',
        imagePng: '/assets/rooms/aether/Aether.png',
        audio: '/assets/rooms/aether/Aether.mp3',
        elementImage: '/element-aether.png',
    },
};
