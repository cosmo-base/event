"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

// Seeded random number generator for consistent star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate stars with deterministic positions
function generateStars(): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < 100; i++) {
    stars.push({
      id: i,
      x: seededRandom(i * 1.1) * 100,
      y: seededRandom(i * 2.2) * 100,
      size: seededRandom(i * 3.3) * 2 + 1,
      delay: seededRandom(i * 4.4) * 5,
    })
  }
  return stars
}

const initialStars = generateStars()

export function StarBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90" />
      
      {/* Stars */}
      {mounted && initialStars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-foreground/60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Nebula effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-primary/3 blur-3xl" />
    </div>
  )
}
