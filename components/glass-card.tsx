import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: "glass" | "glass-card"
}

export function GlassCard({ children, className, hover = false, variant = "glass" }: GlassCardProps) {
  return (
    <div
      className={cn(
        variant,
        "rounded-2xl p-6",
        hover && "transition-all duration-300 hover:scale-[1.02] hover:glow cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}
