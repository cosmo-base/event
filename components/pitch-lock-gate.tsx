"use client"

import { useState, useEffect } from "react"
import type { PitchData } from "@/data/event-page-data"
import { PdfSlideViewer } from "@/components/pdf-slide-viewer"

interface PitchLockGateProps {
  pitch: PitchData
  children: React.ReactNode
}

function isBeforeTime(hhmm: string): boolean {
  const [h, m] = hhmm.split(":").map(Number)
  const unlock = new Date()
  unlock.setHours(h, m, 0, 0)
  return new Date() < unlock
}

export function PitchLockGate({ pitch, children }: PitchLockGateProps) {
  const [locked, setLocked] = useState<boolean | null>(null)

  useEffect(() => {
    const { pitchLockUntil } = pitch
    if (!pitchLockUntil || !/^\d{2}:\d{2}$/.test(pitchLockUntil)) {
      setLocked(false)
      return
    }

    const check = () => {
      const before = isBeforeTime(pitchLockUntil)
      setLocked(before)
      if (!before) clearInterval(id)
    }
    check()
    const id = setInterval(check, 30_000)
    return () => clearInterval(id)
  }, [pitch])

  // not yet mounted — render nothing to avoid hydration mismatch
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
          {pitch.pitchLockUntil} からコンテンツ全体にアクセスできます
        </p>
      </div>
    </div>
  )
}
