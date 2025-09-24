'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NavigationProps {
  currentRoom: string
}

export default function Navigation({ currentRoom }: NavigationProps) {
  const rooms = [
    { id: 'impuls', name: 'Impuls', path: '/', image: '/impuls-raum.png', color: '#4f46e5' },
    { id: 'erde', name: 'Erde', path: '/erde', image: '/element-erde.png', color: '#22c55e' },
    { id: 'wasser', name: 'Wasser', path: '/wasser', image: '/element-wasser.png', color: '#06b6d4' },
    { id: 'feuer', name: 'Feuer', path: '/feuer', image: '/element-feuer.png', color: '#f97316' },
    { id: 'wind', name: 'Wind', path: '/wind', image: '/element-wind.png', color: '#10b981' },
    { id: 'aether', name: 'Äther', path: '/aether', image: '/element-aether.png', color: '#8b5cf6' },
  ]

  return (
    <>
      <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {rooms.map(room => (
            <Link
              key={room.id}
              href={room.path}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition duration-300
                ${currentRoom === room.id
                  ? `scale-110 bg-white/20 shadow-[0_0_16px_${room.color}] animate-pulse-glow`
                  : `hover:scale-125 hover:shadow-[0_0_12px_${room.color}] active:scale-95`
                }
              `}
            >
              <Image src={room.image} width={32} height={32} alt={room.name} />
            </Link>
          ))}
        </div>
      </nav>

      {/* Puls-Glow Keyframes */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 22px currentColor;
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>
    </>
  )
}
