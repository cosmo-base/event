"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"

interface FacilityImageProps {
  src?: string
  alt: string
  sizes?: string
  priority?: boolean
  variant?: "card" | "detail"
}

export function FacilityImage({
  src,
  alt,
  sizes,
  priority = false,
  variant = "card"
}: FacilityImageProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [src])

  const isAvailable = src && src !== "/images/placeholder.jpg" && !error

  if (variant === "detail") {
    if (!isAvailable) return null

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-in fade-in duration-300">
        <div className="aspect-[21/9] rounded-3xl bg-secondary/30 overflow-hidden flex items-center justify-center glass relative">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            className="object-cover"
            onError={() => setError(true)}
          />
        </div>
      </div>
    )
  }

  if (!isAvailable) {
    return (
      <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-secondary/10 text-muted-foreground">
        <MapPin className="w-8 h-8 opacity-40" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
      priority={priority}
      className="object-cover"
      onError={() => setError(true)}
    />
  )
}
