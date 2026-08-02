"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { getRockets, Rocket, RocketStats } from "@/data/CMrockets"
import { Zap, Clock, Rocket as RocketIcon, Loader2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { sendToGas } from "@/lib/gas-queue"

const QUESTIONS = [
  {
    id: 1,
    title: "一番ワクワクするのは？",
    choices: [
      { text: "圧倒的な迫力やスケール", score: { power: 2, ace: 1 } },
      { text: "「どうやって実現したの？」と思う技術", score: { technology: 2, individuality: 1 } },
      { text: "長い歴史や受け継がれてきた物語", score: { history: 2, trust: 1 } },
      { text: "新しい時代を切り開く挑戦", score: { challenge: 2, future: 1 } }
    ]
  },
  {
    id: 2,
    title: "応援したくなるのは？",
    choices: [
      { text: "頼れる王道の存在", score: { ace: 2, trust: 1 } },
      { text: "失敗しても挑み続ける存在", score: { challenge: 2, future: 1 } },
      { text: "独自の道を進む個性派", score: { individuality: 2, technology: 1 } },
      { text: "長い間活躍してきたベテラン", score: { history: 2, trust: 1 } }
    ]
  },
  {
    id: 3,
    title: "もし打ち上げを見に行くなら？",
    choices: [
      { text: "誰もが注目する大型ミッション", score: { power: 2, ace: 1 } },
      { text: "新型ロケットの初飛行", score: { future: 2, challenge: 1 } },
      { text: "特別な技術が使われたミッション", score: { technology: 2, individuality: 1 } },
      { text: "歴史に残る名機の活躍", score: { history: 2, trust: 1 } }
    ]
  },
  {
    id: 4,
    title: "宇宙開発で一番大事だと思うのは？",
    choices: [
      { text: "信頼性と実績の積み重ね", score: { trust: 2, history: 1 } },
      { text: "コストを下げて誰でも使えること", score: { future: 2, challenge: 1 } },
      { text: "技術の限界に挑むこと", score: { technology: 2, individuality: 1 } },
      { text: "国の威信をかけた力強さ", score: { power: 2, ace: 1 } }
    ]
  },
  {
    id: 5,
    title: "あなたが惹かれるのは？（二択）",
    choices: [
      { text: "積み重ねてきた長い実績", score: { history: 2, trust: 2 } },
      { text: "前例のない未知への挑戦", score: { challenge: 2, future: 2 } }
    ]
  },
  {
    id: 6,
    title: "直感的にどちらが好き？（二択）",
    choices: [
      { text: "みんなに愛される王道", score: { ace: 2, power: 1 } },
      { text: "唯一無二の尖った個性", score: { individuality: 2, technology: 1 } }
    ]
  },
  {
    id: 7,
    title: "好きなストーリーは？",
    choices: [
      { text: "幾多の失敗を乗り越えた逆転劇", score: { challenge: 2, history: 1 } },
      { text: "誰も真似できない技術を磨き続けた職人技", score: { technology: 2, individuality: 1 } },
      { text: "時代を超えて愛され続ける不朽の名作", score: { trust: 2, history: 1 } },
      { text: "世界を驚かせた大きすぎる夢の実現", score: { future: 2, power: 1 } }
    ]
  },
  {
    id: 8,
    title: "ロケットに例えるなら、あなたは？",
    choices: [
      { text: "黙々と使命を果たす縁の下の力持ち", score: { trust: 2, ace: 1 } },
      { text: "誰よりも高く、誰よりも速く", score: { power: 2, future: 1 } },
      { text: "新しい道を誰よりも先に切り開く先駆者", score: { challenge: 2, individuality: 1 } },
      { text: "長年培った技と知恵で挑む熟練者", score: { history: 2, technology: 1 } }
    ]
  }
]

const STAT_KEYS = ['power', 'technology', 'history', 'ace', 'challenge', 'individuality', 'future', 'trust'] as const

export default function RocketDiagnosePage() {
  const router = useRouter()
  const [rockets, setRockets] = useState<Rocket[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [userStats, setUserStats] = useState<RocketStats>({
    power: 0, technology: 0, history: 0, ace: 0, challenge: 0, individuality: 0, future: 0, trust: 0
  })
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    getRockets().then((data) => {
      setRockets(data)
      setIsDataLoaded(true)
    })
  }, [])

  const handleChoice = (score: Partial<RocketStats>, choiceText: string) => {
    const updatedStats = { ...userStats }
    Object.keys(score).forEach((key) => {
      const k = key as keyof RocketStats
      updatedStats[k] = (updatedStats[k] || 0) + (score[k] || 0)
    })
    setUserStats(updatedStats)
    setUserAnswers(prev => ({ ...prev, [currentStep + 1]: choiceText }))
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCalculating(true)
    }
  }

  useEffect(() => {
    if (isCalculating && isDataLoaded) {
      setTimeout(() => executeMatching(), 2200)
    }
  }, [isCalculating, isDataLoaded])

  const executeMatching = async () => {
    if (rockets.length === 0) return
    let bestRocket = rockets[0]
    let minDistance = Infinity
    rockets.forEach((rocket) => {
      const w = rocket.appearance ?? 1
      let distance = 0
      STAT_KEYS.forEach((key) => {
        distance += Math.pow((userStats[key] || 0) - (rocket.stats[key] || 0), 2)
      })
      const weightedDistance = Math.sqrt(distance) / w
      if (weightedDistance < minDistance) {
        minDistance = weightedDistance
        bestRocket = rocket
      }
    })
    const totalDiff = STAT_KEYS.reduce((acc, key) => acc + Math.abs(userStats[key] - bestRocket.stats[key]), 0)
    const matchPercent = Math.max(78, Math.min(98, Math.round(100 - totalDiff * 2.5)))
    const payload: Record<string, any> = { type: "rocket", eventId: "CMrocket", rocket: bestRocket.name, matchPercent, ...userStats }
    for (let i = 1; i <= QUESTIONS.length; i++) payload[`q${i}`] = userAnswers[i] || ""
    await sendToGas(payload).catch(() => {})
    const encodedStats = STAT_KEYS.map(k => Math.min(35, userStats[k] || 0).toString(36)).join('')
    setTimeout(() => {
      router.push(`/cosmomatch/rocket/result?r=${encodeURIComponent(bestRocket.slug)}&s=${encodedStats}`)
    }, 500)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setIsCalculating(false)
    } else {
      setStarted(false)
    }
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 text-center py-12 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center p-5 bg-primary/20 rounded-full mb-6 border border-primary/30 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
          <RocketIcon className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">
          Cosmo Match ～日本のロケット編～
        </h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed mb-8">
          直感で答えるだけ。専門知識は一切不要！<br />
          あなたが心の奥で惹かれる「運命の1機」を見つけよう。
        </p>
        <GlassCard className="p-6 mb-8 max-w-sm mx-auto bg-secondary/10 border-border/40">
          <div className="flex items-center justify-around text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Clock className="w-4 h-4 text-accent" /> 約1分
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Zap className="w-4 h-4 text-primary" /> 全8問
            </span>
          </div>
        </GlassCard>
        <div className="flex flex-col items-center gap-6">
          <Button
            onClick={() => setStarted(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow h-14 px-12 rounded-full font-bold text-lg transition-transform active:scale-95"
          >
            診断を始める
          </Button>
          <Link
            href="/cosmomatch/rocket/dictionary"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 opacity-70 hover:opacity-100"
          >
            <BookOpen className="w-4 h-4" />
            <span>図鑑だけを見る</span>
          </Link>
        </div>
      </div>
    )
  }

  if (isCalculating) {
    return (
      <div className="max-w-md mx-auto px-4 text-center py-24 flex flex-col items-center justify-center animate-in fade-in duration-300">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <h3 className="text-2xl font-bold text-foreground mb-2">推しロケットを分析中...</h3>
        <p className="text-sm text-muted-foreground tracking-wide">
          {isDataLoaded ? "あなたのワクワクの原動力にシンクロする機体を探しています" : "最新のロケットデータを読み込んでいます..."}
        </p>
      </div>
    )
  }

  const currentQuestion = QUESTIONS[currentStep]
  const progressPercent = ((currentStep + 1) / QUESTIONS.length) * 100

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={handleBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          戻る
        </button>
        <div className="text-sm font-bold text-muted-foreground bg-secondary/40 px-3 py-1 rounded-full border border-border/40">
          Q {currentQuestion.id} / {QUESTIONS.length}
        </div>
      </div>
      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mb-10">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-400">
        <h3 className="text-2xl font-bold text-foreground text-center mb-8 leading-snug">
          {currentQuestion.title}
        </h3>
        <div className="space-y-4">
          {currentQuestion.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice.score, choice.text)}
              className="w-full text-left p-5 rounded-2xl border border-border/60 bg-secondary/20 hover:bg-primary/10 hover:border-primary/50 text-foreground font-semibold text-base transition-all active:scale-[0.99] shadow-sm backdrop-blur-sm group"
            >
              <div className="flex items-center justify-between">
                <span>{choice.text}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform translate-x-2 group-hover:translate-x-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
