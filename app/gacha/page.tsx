import { EventGacha } from "@/components/event-gacha"
import type { GachaPrize } from "@/components/event-gacha"

const PRIZES: GachaPrize[] = [
  { name: "クリアファイル", weight: 10, emoji: "📄" },
  { name: "ステッカー",     weight: 90, emoji: "⭐" },
]

export default function GachaPage() {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-2">
          <p className="text-xs tracking-widest text-muted-foreground">コミュニティ参加で</p>
          <h1 className="text-2xl font-bold text-foreground mt-1">抽選券ゲット</h1>
        </div>
        <div className="rounded-3xl border border-border bg-card shadow-sm">
          <EventGacha eventId="monoS26" prizes={PRIZES} />
        </div>
      </div>
    </div>
  )
}
