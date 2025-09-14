"use client"

import { useState } from "react"

interface KICompanionProps {
  mode: "main" | "erde" | "wasser" | "feuer" | "luft" | "aether"
  isVisible?: boolean
  onToggle?: (visible: boolean) => void
}

const prompts = {
  main: {
    welcome: "Willkommen im Impuls-Raum. Welcher Impuls ruft dich?",
    reflection: "Was bewegt dich in diesem Moment?",
    impulse: "Welchen Raum möchtest du betreten?",
    color: "from-blue-600/80 to-purple-700/80",
    hoverColor: "hover:from-blue-500/80 hover:to-purple-600/80",
  },
  erde: {
    welcome: "Willkommen im Raum Erde. Was trägt dich heute?",
    reflection: "Welche Wurzeln spürst du gerade?",
    impulse: "Was möchtest du säen?",
    color: "from-green-600/80 to-emerald-700/80",
    hoverColor: "hover:from-green-500/80 hover:to-emerald-600/80",
  },
  wasser: {
    welcome: "Fließe mit dem Raum Wasser. Was bewegt dich?",
    reflection: "Welche Strömungen nimmst du wahr?",
    impulse: "Was möchtest du fließen lassen?",
    color: "from-cyan-600/80 to-teal-700/80",
    hoverColor: "hover:from-cyan-500/80 hover:to-teal-600/80",
  },
  feuer: {
    welcome: "Entfache den Raum Feuer. Was brennt in dir?",
    reflection: "Welche Leidenschaft lodert?",
    impulse: "Was möchtest du entzünden?",
    color: "from-red-600/80 to-orange-700/80",
    hoverColor: "hover:from-red-500/80 hover:to-orange-600/80",
  },
  luft: {
    welcome: "Atme im Raum Luft. Was trägt dich?",
    reflection: "Welche Gedanken schweben?",
    impulse: "Was möchtest du befreien?",
    color: "from-sky-600/80 to-indigo-700/80",
    hoverColor: "hover:from-sky-500/80 hover:to-indigo-600/80",
  },
  aether: {
    welcome: "Verbinde dich mit dem Raum Äther. Was ist möglich?",
    reflection: "Welche Visionen siehst du?",
    impulse: "Was möchtest du manifestieren?",
    color: "from-pink-600/80 to-violet-700/80",
    hoverColor: "hover:from-pink-500/80 hover:to-violet-600/80",
  },
}

export default function KICompanion({ mode, isVisible = false, onToggle }: KICompanionProps) {
  const [localVisible, setLocalVisible] = useState(isVisible)
  const [reflection, setReflection] = useState("")

  const currentPrompts = prompts[mode] || prompts.main
  const visible = onToggle ? isVisible : localVisible

  const handleToggle = () => {
    const newVisible = !visible
    if (onToggle) {
      onToggle(newVisible)
    } else {
      setLocalVisible(newVisible)
    }
  }

  return (
    <div className="absolute top-8 left-8 z-[15] max-w-md">
      {!onToggle && (
        <button
          onClick={handleToggle}
          className="mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-all duration-300"
        >
          {visible ? "Begleiter verbergen" : "Begleiter öffnen"}
        </button>
      )}

      {visible && (
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-in slide-in-from-left duration-300">
          <div className="space-y-4">
            <p className="text-white/90 text-sm leading-relaxed">{currentPrompts.welcome}</p>

            <div className="space-y-2">
              <label className="text-white/70 text-xs uppercase tracking-wide">{currentPrompts.reflection}</label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder-white/40 resize-none focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Deine Gedanken..."
              />
            </div>

            <button
              className={`w-full py-2 bg-gradient-to-r ${currentPrompts.color} text-white text-sm rounded-lg ${currentPrompts.hoverColor} transition-all duration-300`}
            >
              {currentPrompts.impulse}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
