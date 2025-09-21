
'use client'

import { useEffect, useRef } from 'react'

export default function ErdeSphere() {
  const sphereRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sphere = sphereRef.current
    if (!sphere) return
    const interval = setInterval(() => {
      sphere.style.transform = `scale(${1 + Math.sin(Date.now() * 0.001) * 0.05})`
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div
        ref={sphereRef}
        className="relative w-64 h-64 rounded-full bg-gradient-radial from-green-400 via-green-500 to-green-700 shadow-2xl"
      />
    </div>
  )
}
