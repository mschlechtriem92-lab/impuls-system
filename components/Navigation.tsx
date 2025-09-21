'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NavigationProps {
  currentRoom: string
}

export default function Navigation({ currentRoom }: NavigationProps) {
  const rooms = [
    { id: 'main', name: 'Impuls', path: '/', image: '/impuls-raum.png', color: '#4f46e5' },
    { id: 'erde', name: 'Erde', path: '/erde', image: '/element-erde.png', color: '#22c55e' },
    { id: 'wasser', name: 'Wasser', path: '/wasser', image: '/element-wasser.png', color: '#06b6d4', disabled: true },
    { id: 'feuer', name: 'Feuer', path: '/feuer', image: '/element-feuer.png', color: '#f97316', disabled: true },
    { id: 'luft', name: 'Luft', path: '/luft', image: '/element-wind.png', color: '#10b981', disabled: true },
    { id: 'aether', name: 'Äther', path: '/aether', image: '/element-aether.png', color: '#8b5cf6', disabled: true },
  ]

  return (
    <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-4">
        {rooms.map(room => (
          <Link
            key={room.id}
            href={room.disabled ? '#' : room.path}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${currentRoom === room.id ? 'scale-110 bg-white/20' : 'hover:bg-white/10'} transition-transform`}
          >
            <Image src={room.image} width={32} height={32} alt={room.name} />
          </Link>
        ))}
      </div>
    </nav>
  )
}
