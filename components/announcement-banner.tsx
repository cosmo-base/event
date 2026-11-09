interface Props {
  text?: string | null
}

export function AnnouncementBanner({ text }: Props) {
  if (!text) return null
  return (
    <div className="sticky top-14 z-30 w-full border-b border-amber-500/30 bg-amber-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2.5 text-sm text-amber-200">
        <span className="shrink-0 text-amber-400" aria-hidden="true">📢</span>
        <span>{text}</span>
      </div>
    </div>
  )
}
