'use client'

import ErdeBackground from '@components/ErdeBackground'
import ErdeSphere from '@components/ErdeSphere'
import ErdeImpulseButton from '@components/ErdeImpulseButton'
import Navigation from '@components/Navigation'
import KICompanion from '@components/KICompanion'


export default function ErdePage() {
  const handleImpulseClick = () => {
    console.log('Impulse Erde aktiviert')
    // Optional: Trigger KI, Animation, Modal etc.
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <ErdeBackground />

      <Navigation currentRoom="erde" />

      <section className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <ErdeSphere />
      </section>

      <section className="absolute bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-auto z-10">
        <ErdeImpulseButton onClick={handleImpulseClick} />
      </section>

      <section className="absolute top-0 right-0 m-4 z-20">
        <KICompanion mode="erde" isVisible={true} />
      </section>
    </main>
  )
}
