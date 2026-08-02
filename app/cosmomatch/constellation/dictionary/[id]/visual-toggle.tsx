"use client"

import { useState } from "react"
import { Image as ImageIcon, Sparkles } from "lucide-react"
import { ConstellationSVGs } from "@/data/CMconstellationSVG"

interface VisualToggleProps {
  slug: string
  name: string
  emoji: string
  imageUrl: string
  size?: 'default' | 'large'
}

export function VisualToggle({ slug, name, emoji, imageUrl, size = 'default' }: VisualToggleProps) {
  const [view, setView] = useState<'image' | 'svg'>('image')
  const svgContent = ConstellationSVGs[slug] || ConstellationSVGs["default"]

  const containerClasses = size === 'large'
    ? "w-full max-w-[320px] sm:max-w-[420px] aspect-square rounded-[2rem] sm:rounded-[3rem]"
    : "w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl sm:rounded-[2rem]"

  const emojiClasses = size === 'large'
    ? "text-[8rem] sm:text-[11rem]"
    : "text-7xl sm:text-8xl lg:text-9xl"

  return (
    <div className={`flex flex-col items-center gap-3 z-40 ${size === 'large' ? 'mx-auto' : 'sm:items-end'}`}>
      <div className="flex bg-background/80 backdrop-blur-sm rounded-full p-1.5 border border-border/50 shadow-sm">
        <button
          onClick={() => setView('image')}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${view === 'image' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> 画像
        </button>
        <button
          onClick={() => setView('svg')}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${view === 'svg' ? 'bg-accent text-accent-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Sparkles className="w-3.5 h-3.5" /> 星の並び
        </button>
      </div>

      <div className={`${containerClasses} bg-secondary/30 border border-border/50 flex items-center justify-center overflow-hidden relative shadow-2xl transition-all duration-300 group`}>
        {view === 'image' ? (
          imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover animate-in fade-in duration-500 group-hover:scale-105 transition-transform" />
          ) : (
            <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
              <ImageIcon className="w-10 h-10 opacity-50" />
              <span>No Image</span>
            </div>
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#000022] animate-in fade-in duration-500 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full p-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] relative z-20">
              {svgContent}
            </svg>
            <div className={`${emojiClasses} absolute opacity-10 filter blur-md pointer-events-none z-10`}>{emoji}</div>
            <Sparkles className="absolute top-6 right-6 text-accent w-6 h-6 opacity-40 animate-pulse z-10" />
            <Sparkles className="absolute bottom-8 left-8 text-primary w-5 h-5 opacity-30 animate-pulse delay-300 z-10" />
          </div>
        )}
      </div>
    </div>
  )
}
