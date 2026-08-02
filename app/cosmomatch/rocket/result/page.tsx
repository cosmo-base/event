"use client"

import { Suspense, useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getRockets, Rocket, RocketStats } from "@/data/CMrockets"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from "recharts"
import { Award, RefreshCw, BookOpen, Star, Sparkles, Loader2, ChevronRight } from "lucide-react"

const STAT_KEYS = ['power', 'technology', 'history', 'ace', 'challenge', 'individuality', 'future', 'trust'] as const

function ResultContent() {
  const searchParams = useSearchParams()
  const rocketSlug = decodeURIComponent(searchParams.get("r") || "")
  const encodedStats = searchParams.get("s") || "00000000"
  const [rockets, setRockets] = useState<Rocket[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getRockets().then((data) => { setRockets(data); setIsLoaded(true) }).catch(() => setIsLoaded(true))
  }, [])

  const userScores = useMemo(() => {
    const scores = {} as Record<keyof RocketStats, number>
    STAT_KEYS.forEach((key, index) => { scores[key] = parseInt(encodedStats[index] || "0", 36) })
    return scores
  }, [encodedStats])

  if (!isLoaded) {
    return (
      <div className="max-w-3xl mx-auto py-24 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-bold">ロケットデータを読み込み中...</p>
      </div>
    )
  }

  const rocket = rockets.find(r => r.slug === rocketSlug) || rockets[0]
  if (!rocket) return <div className="max-w-3xl mx-auto py-24 text-center text-muted-foreground">ロケットが見つかりませんでした。</div>

  const chartData = [
    { subject: "パワー", あなた: userScores.power, ロケット: rocket.stats.power },
    { subject: "技術", あなた: userScores.technology, ロケット: rocket.stats.technology },
    { subject: "歴史", あなた: userScores.history, ロケット: rocket.stats.history },
    { subject: "エース", あなた: userScores.ace, ロケット: rocket.stats.ace },
    { subject: "挑戦", あなた: userScores.challenge, ロケット: rocket.stats.challenge },
    { subject: "個性", あなた: userScores.individuality, ロケット: rocket.stats.individuality },
    { subject: "未来", あなた: userScores.future, ロケット: rocket.stats.future },
    { subject: "信頼", あなた: userScores.trust, ロケット: rocket.stats.trust },
  ]

  const totalDiff = STAT_KEYS.reduce((acc, key) => acc + Math.abs(userScores[key] - rocket.stats[key]), 0)
  const matchPercent = Math.max(78, Math.min(98, Math.round(100 - totalDiff * 2.5)))
  const candidates = rockets.filter(r => r.slug !== rocket.slug).slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <span className="px-3 py-1 text-xs font-bold bg-accent/20 text-accent rounded-full border border-accent/30 tracking-widest uppercase glow-sm mb-3 inline-block">
          BEST MATCH
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
          あなたの推しは <span className="text-primary">{rocket.name}</span> ！
        </h2>
        <p className="text-lg md:text-xl font-bold text-muted-foreground max-w-xl mx-auto leading-snug">
          「{rocket.catchCopy}」
        </p>
      </div>

      <div className="w-full relative aspect-[21/9] bg-gradient-to-b from-secondary/30 to-background rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center mb-8 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="text-7xl filter drop-shadow-[0_0_20px_rgba(0,242,254,0.5)] transform -rotate-12 animate-bounce duration-1000">
          {rocket.emoji}
        </div>
        <Sparkles className="absolute top-4 right-12 text-accent w-5 h-5 animate-pulse" />
      </div>

      <div className="grid md:grid-cols-5 gap-6 items-center mb-10">
        <div className="md:col-span-3 bg-secondary/10 border border-border/40 p-4 rounded-2xl h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#38bdf8" opacity={0.2} />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} fontWeight="bold" />
              <Radar name="あなた" dataKey="あなた" stroke="#ff007f" fill="#ff007f" fillOpacity={0.25} />
              <Radar name={rocket.name} dataKey="ロケット" stroke="#00f2fe" fill="#00f2fe" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 font-bold text-lg text-foreground bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
            <Award className="w-5 h-5 text-primary" />
            相性同調率: {matchPercent}%
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            あなたの「惹かれる重要ポイント」と、{rocket.name}が持つ設計思想・役割パラメータを重ね合わせました。
          </p>
        </div>
      </div>

      {rocket.highlights.length > 0 && (
        <div className="space-y-4 mb-12">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Star className="w-4 h-4 text-primary fill-primary" />
            ここがあなたの推しポイント！
          </h3>
          <div className="grid gap-3">
            {rocket.highlights.map((point, index) => (
              <div key={index} className="bg-secondary/20 border border-border/50 rounded-xl p-4 flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold mt-0.5 shrink-0">{index + 1}</span>
                <p className="text-sm text-foreground font-medium leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {candidates.length > 0 && (
        <div className="mb-12">
          <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-4">あなたに近い他のロケット候補</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {candidates.map((cand) => (
              <Link key={cand.slug} href={`/cosmomatch/rocket/result?r=${encodeURIComponent(cand.slug)}&s=${encodedStats}`} className="block group">
                <div className="bg-secondary/10 border border-border/40 rounded-xl p-4 flex items-center justify-between hover:border-primary/40 hover:bg-secondary/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cand.emoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{cand.name}</h4>
                      <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">{cand.catchCopy}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/cosmomatch/rocket/dictionary/${encodeURIComponent(rocket.slug)}`} className="w-full sm:w-auto">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow h-12 px-8 rounded-full font-bold">
            <BookOpen className="w-4 h-4 mr-2" />
            {rocket.name}の図鑑でもっと深掘りする
          </Button>
        </Link>
        <Link href="/cosmomatch/rocket" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full border-border/60 text-muted-foreground hover:text-foreground h-12 px-6 rounded-full font-bold">
            <RefreshCw className="w-4 h-4 mr-2" />
            もう一度診断する
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function RocketResultPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto py-24 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-bold">結果を生成中...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
