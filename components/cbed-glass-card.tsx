import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6",
        hover && "transition-all duration-300 hover:scale-[1.02] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}
