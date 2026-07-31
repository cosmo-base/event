import { cn } from "@/lib/utils"

type BadgeTone = "default" | "accent" | "sky" | "purple" | "muted" | "live"

const toneMap: Record<BadgeTone, string> = {
  default: "bg-secondary text-secondary-foreground",
  accent: "bg-[color-mix(in_srgb,var(--event-accent)_18%,white)] text-[#8a5a00]",
  sky: "bg-[color-mix(in_srgb,var(--event-secondary)_16%,white)] text-[#0369a1]",
  purple: "bg-[color-mix(in_srgb,var(--event-accent-2)_15%,white)] text-[#5b21b6]",
  muted: "bg-muted text-muted-foreground",
  live: "bg-[color-mix(in_srgb,var(--event-accent)_22%,white)] text-[#8a5a00]",
}

// ラベル文字列からトーンを推定（色だけに依存せず、テキストでも区別可能）
function toneForLabel(label: string): BadgeTone {
  if (label.includes("限定")) return "accent"
  if (label.includes("人気")) return "purple"
  if (label.includes("準備中") || label.includes("終了")) return "muted"
  if (label.includes("期間")) return "sky"
  return "default"
}

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string
  tone?: BadgeTone
  className?: string
}) {
  const resolved = tone ?? toneForLabel(label)
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        toneMap[resolved],
        className,
      )}
    >
      {label}
    </span>
  )
}
