"use client"

import { useState } from "react"
import { Gift, Sparkles } from "lucide-react"
import { sendToGas } from "@/lib/gas-queue"

export interface GachaPrize {
  name: string
  weight: number
  emoji?: string
  color?: string
}

interface Props {
  eventId: string
  prizes: GachaPrize[]
}

function draw(prizes: GachaPrize[]): GachaPrize {
  const total = prizes.reduce((s, p) => s + p.weight, 0)
  let r = Math.random() * total
  for (const p of prizes) {
    r -= p.weight
    if (r <= 0) return p
  }
  return prizes[prizes.length - 1]
}

export function EventGacha({ eventId, prizes }: Props) {
  const [result, setResult] = useState<GachaPrize | null>(null)
  const [spinning, setSpinning] = useState(false)

  const spin = async () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    await new Promise((r) => setTimeout(r, 1000))
    const prize = draw(prizes)
    setResult(prize)
    setSpinning(false)
    sendToGas({ type: "gacha", eventId, result: prize.name }).catch(() => {})
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* Prize table */}
      <div className="w-full max-w-xs">
        <p className="text-xs text-muted-foreground text-center mb-2">景品一覧</p>
        <div className="space-y-1">
          {prizes.map((p) => (
            <div key={p.name} className="flex items-center text-sm px-3 py-1.5 rounded-lg bg-muted/40">
              {p.emoji && <span className="mr-2">{p.emoji}</span>}
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="w-48 h-48 rounded-2xl border-2 border-border flex items-center justify-center bg-muted/20 relative overflow-hidden">
        {spinning ? (
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <Gift className="w-12 h-12 text-primary" />
            <span className="text-sm text-muted-foreground">抽選中...</span>
          </div>
        ) : result ? (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in-75 duration-300">
            <span className="text-5xl">{result.emoji ?? "🎁"}</span>
            <span className="text-base font-bold text-foreground text-center px-2">{result.name}</span>
            <Sparkles className="w-5 h-5 text-primary absolute top-3 right-3" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Gift className="w-12 h-12 opacity-30" />
            <span className="text-sm">ボタンを押して抽選</span>
          </div>
        )}
      </div>

      {/* Button */}
      {!result && (
        <div className="flex justify-center">
          <button
            onClick={spin}
            disabled={spinning}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Gift className="w-4 h-4" />
            {spinning ? "抽選中..." : "ガチャを引く"}
          </button>
        </div>
      )}
    </div>
  )
}
