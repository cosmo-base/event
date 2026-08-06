"use client"

import { useState, useEffect } from "react"
import type { PitchData } from "@/data/event-page-data"
import { PdfSlideViewer } from "@/components/pdf-slide-viewer"

interface PitchLockGateProps {
  pitch: PitchData
  children: React.ReactNode
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

function isLocked(from: string | undefined, until: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(until)) return false
  const now = new Date()
  const currentMin = now.getHours() * 60 + now.getMinutes()
  const untilMin = toMinutes(until)
  const fromMin = from && /^\d{2}:\d{2}$/.test(from) ? toMinutes(from) : 0
  return currentMin >= fromMin && currentMin < untilMin
}

export function PitchLockGate({ pitch, children }: PitchLockGateProps) {
  const [locked, setLocked] = useState<boolean | null>(null)

  useEffect(() => {
    const { pitchLockFrom, pitchLockUntil } = pitch
    if (!pitchLockUntil || !/^\d{2}:\d{2}$/.test(pitchLockUntil)) {
      setLocked(false)
      return
    }

    const check = () => {
      const active = isLocked(pitchLockFrom, pitchLockUntil)
      setLocked(active)
    }
    check()
    const id = setInterval(check, 30_000)
    return () => clearInterval(id)
  }, [pitch])

  if (locked === null) return null
  if (!locked) return <>{children}</>

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {pitch.embedUrl ? (
        <div className="relative flex-1 min-h-0">
          <PdfSlideViewer
            url={pitch.embedUrl}
            title={pitch.presentationTitle}
            downloadUrl={pitch.pdfUrl}
            downloadName={pitch.presentationTitle}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm">スライドを準備中です</p>
        </div>
      )}
      <div className="shrink-0 py-3 px-6 bg-black/70 text-center">
        <p className="text-white/40 text-xs">
          ピッチ終了後（{pitch.pitchLockUntil}〜）は、参加者限定の Cosmo Base コンテンツを特別に公開しています
        </p>
      </div>
    </div>
  )
}
