import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TagBadgeProps {
  children: ReactNode
  className?: string
  variant?: "default" | "primary" | "accent"
}

export function TagBadge({ children, className, variant = "default" }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
        variant === "default" && "bg-white/10 text-white/70",
        variant === "primary" && "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        variant === "accent" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        className
      )}
    >
      {children}
    </span>
  )
}
