"use client"

import Link from "next/link"
import Image from "next/image"

interface ImpulseRoomButtonProps {
  currentRoom: string
}

export default function ImpulseRoomButton({ currentRoom }: ImpulseRoomButtonProps) {
  if (currentRoom === "main") return null

  return (
    <Link
      href="/"
      className="absolute top-8 left-8 z-[20] flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group hover:scale-110"
      style={{
        boxShadow: "0 0 20px rgba(74, 144, 226, 0.4), 0 0 40px rgba(74, 144, 226, 0.2)",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Image
        src="/impuls-raum.png"
        alt="Zurück zum Impuls Raum"
        width={40}
        height={40}
        className="opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Impuls Raum
      </div>
    </Link>
  )
}
