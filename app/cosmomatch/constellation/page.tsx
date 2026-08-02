"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { Constellation, ConstellationStats, QUESTIONS, getConstellations } from "@/data/CMconstellation"
import { Zap, Clock, Stars as ConstellationIcon, Loader2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { sendToGas } from "@/lib/gas-queue"

const STAT_KEYS = ['origin', 'energy', 'role', 'bond', 'form', 'mood', 'presence'] as const

export default function ConstellationDiagnosePage() {
  const router = useRouter()
  const [constellations, setConstellations] = useState<Constellation[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [userChoices, setUserChoices] = useState<Record<number, Partial<ConstellationStats>>>({})
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    getConstellations().then((data) => { setConstellations(data); setIsDataLoaded(true) })
  }, [])

  const handleChoice = (score: Partial<ConstellationStats>, choiceText: string) => {
    setUserChoices(prev => ({ ...prev, [currentStep]: score }))
    setUserAnswers(prev => ({ ...prev, [currentStep + 1]: choiceText }))
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCalculating(true)
    }
  }

  useEffect(() => {
    if (isCalculating && isDataLoaded) {
      setTimeout(() => executeMatching(), 1500)
    }
  }, [isCalculating, isDataLoaded])

  const executeMatching = async () => {
    if (constellations.length === 0) return
    const finalStats = {} as ConstellationStats
    STAT_KEYS.forEach(key => {
      let currentScore = 5
      Object.values(userChoices).forEach(choiceScore => {
        if (choiceScore[key] !== undefined) currentScore += choiceScore[key] as number
      })
      finalStats[key] = Math.max(1, Math.min(9, currentScore))
    })

    let bestConstellation = constellations[0]
    let minDistance = Infinity
    constellations.forEach((constellation) => {
      const w = constellation.appearance ?? 1
      let distanceSum = 0
      STAT_KEYS.forEach((key) => {
        distanceSum += Math.pow(finalStats[key] - (constellation.stats[key] || 5), 2)
      })
      const actualDistance = Math.sqrt(distanceSum) / w
      if (actualDistance < minDistance) {
        minDistance = actualDistance
        bestConstellation = constellation
      }
    })

    const totalDiff = STAT_KEYS.reduce((acc, key) => acc + Math.abs(finalStats[key] - (bestConstellation.stats[key] || 5)), 0)
    const matchPercent = Math.max(60, Math.min(99, Math.round(100 - totalDiff * 1.2)))

    const payload: Record<string, any> = { type: "constellation", eventId: "CM星座", rocket: bestConstellation.name, matchPercent, ...finalStats }
    for (let i = 1; i <= QUESTIONS.length; i++) payload[`q${i}`] = userAnswers[i] || ""
    await sendToGas(payload).catch(() => {})

    const encodedStats = STAT_KEYS.map(k => Math.min(35, finalStats[k] || 5).toString(36)).join('')
    setTimeout(() => {
      router.push(`/cosmomatch/constellation/result?c=${bestConstellation.slug}&s=${encodedStats}`)
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
          <ConstellationIcon className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">
          Cosmo Match ～88星座編～
        </h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed mb-8">
          直感で答えるだけ。専門知識は一切不要！<br />
          あなたが心の奥で惹かれる「運命の星座」を見つけよう。
        </p>
        <GlassCard className="p-6 mb-8 max-w-sm mx-auto bg-secondary/10 border-border/40">
          <div className="flex items-center justify-around text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Clock className="w-4 h-4 text-accent" /> 約2分
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Zap className="w-4 h-4 text-primary" /> 全12問
            </span>
          </div>
        </GlassCard>
        <div className="flex flex-col items-center gap-6">
          <Button
            onClick={() => setStarted(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow h-14 px-12 rounded-full font-bold text-lg transition-transform active:scale-95"
          >
            マッチングを始める
          </Button>
          <Link
            href="/cosmomatch/constellation/dictionary"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 opacity-70 hover:opacity-100"
          >
            <BookOpen className="w-4 h-4" />
            <span>図鑑（星空マップ）だけを見る</span>
          </Link>
        </div>
      </div>
    )
  }

  if (isCalculating) {
    return (
      <div className="max-w-md mx-auto px-4 text-center py-24 flex flex-col items-center justify-center animate-in fade-in duration-300">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <h3 className="text-2xl font-bold text-foreground mb-2">推し星座を分析中...</h3>
        <p className="text-sm text-muted-foreground tracking-wide">
          {isDataLoaded ? "あなたのワクワクの原動力にシンクロする星々を探しています" : "最新の星座データを読み込んでいます..."}
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
