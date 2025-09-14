"use client"

import Link from "next/link"
import Image from "next/image"

interface NavigationProps {
  currentRoom: string
}

export default function Navigation({ currentRoom }: NavigationProps) {
  const rooms = [
    {
      id: "erde",
      name: "Erde",
      path: "/erde",
      image: "/element-erde.png",
      color: "#22c55e",
    },
    {
      id: "wasser",
      name: "Wasser",
      path: "/wasser",
      disabled: true,
      image: "/element-wasser.png",
      color: "#06b6d4",
    },
    {
      id: "feuer",
      name: "Feuer",
      path: "/feuer",
      disabled: true,
      image: "/element-feuer.png",
      color: "#f97316",
    },
    {
      id: "luft",
      name: "Luft",
      path: "/luft",
      disabled: true,
      image: "/element-wind.png",
      color: "#10b981",
    },
    {
      id: "aether",
      name: "Äther",
      path: "/aether",
      disabled: true,
      image: "/element-aether.png",
      color: "#8b5cf6",
    },
  ]

  return (
    <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[20]">
      <div className="flex items-center space-x-4">
        {currentRoom !== "main" && (
          <Link
            href="/"
            className="relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group hover:scale-110"
            style={{
              boxShadow: "0 0 20px rgba(74, 144, 226, 0.4), 0 0 40px rgba(74, 144, 226, 0.2)",
            }}
          >
            <Image
              src="/impuls-raum.png"
              alt="Impuls Raum"
              width={48}
              height={48}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Impuls Raum
            </div>
          </Link>
        )}

        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={room.disabled ? "#" : room.path}
              className={`
                relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group
                ${
                  currentRoom === room.id
                    ? "bg-white/20 scale-110"
                    : room.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-white/10 hover:scale-105"
                }
              `}
              style={{
                boxShadow: currentRoom === room.id ? `0 0 20px ${room.color}40, 0 0 40px ${room.color}20` : "none",
              }}
            >
              <Image
                src={room.image || "/placeholder.svg"}
                alt={room.name}
                width={32}
                height={32}
                className={`transition-opacity ${
                  currentRoom === room.id
                    ? "opacity-100"
                    : room.disabled
                      ? "opacity-30"
                      : "opacity-70 group-hover:opacity-100"
                }`}
              />
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {room.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
