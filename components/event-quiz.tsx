"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { sendToGas } from "@/lib/gas-queue"

export interface QuizData {
  intro?: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  link?: { label: string; href: string }
}

const DEFAULT_QUIZ: QuizData = {
  question: "人工衛星やロケットの部品で、アルミニウム合金やチタン合金が多く使われる主な理由はどれでしょう？",
  options: [
    "電気を通さないため",
    "磁石に付きにくいため",
    "軽量で高い比強度（強度÷重量）を持つため",
  ],
  correctIndex: 2,
  explanation:
    "宇宙機では、重量をできるだけ抑えながら十分な強度を確保することが重要です。そのため、比強度の高いアルミニウム合金やチタン合金、さらに用途によってはCFRP（炭素繊維強化プラスチック）なども広く使用されています。",
}

export function EventQuiz({ eventId, quiz = DEFAULT_QUIZ }: { eventId: string; quiz?: QuizData }) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const correct = selected === quiz.correctIndex

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground ring-1 ring-inset ring-accent/30">
          イベント限定
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          宇宙クイズ
        </span>
      </div>

      {quiz.intro && (
        <p className="text-sm leading-relaxed text-muted-foreground mb-3 whitespace-pre-wrap">{quiz.intro}</p>
      )}

      <p className="text-sm font-semibold leading-relaxed mb-4">{quiz.question}</p>

      <ol className="flex flex-col gap-2">
        {quiz.options.map((option, i) => {
          const isSelected = selected === i
          const isCorrect = i === quiz.correctIndex
          let stateClass = "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60"
          if (answered) {
            if (isCorrect) stateClass = "border-green-500 bg-green-50 dark:bg-green-950/30"
            else if (isSelected && !isCorrect) stateClass = "border-red-400 bg-red-50 dark:bg-red-950/30"
            else stateClass = "border-border bg-muted/20 opacity-60"
          }

          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => {
                  setSelected(i)
                  sendToGas({
                    type: "quiz",
                    eventId,
                    question: quiz.question,
                    selected: quiz.options[i],
                    correctOption: quiz.options[quiz.correctIndex],
                  }).catch(() => {})
                }}
                className={cn(
                  "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-default",
                  stateClass,
                )}
              >
                <span className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  answered && isCorrect ? "border-green-500 bg-green-500 text-white" :
                  answered && isSelected ? "border-red-400 bg-red-400 text-white" :
                  "border-muted-foreground/40 text-muted-foreground",
                )}>
                  {i + 1}
                </span>
                <span className="flex-1">{option}</span>
                {answered && isCorrect && <CheckCircle2 className="size-4 text-green-500 shrink-0" />}
                {answered && isSelected && !isCorrect && <XCircle className="size-4 text-red-400 shrink-0" />}
              </button>
            </li>
          )
        })}
      </ol>

      {answered && (
        <div className={cn(
          "mt-4 rounded-xl border p-4 text-sm",
          correct
            ? "border-green-500/30 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-100"
            : "border-amber-400/30 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100",
        )}>
          <p className="font-bold mb-1">
            {correct ? "🎉 正解！" : "残念、不正解…"} 正解は {quiz.correctIndex + 1}「{quiz.options[quiz.correctIndex]}」です。
          </p>
          <p className="leading-relaxed text-xs mt-1 opacity-90 whitespace-pre-wrap">{quiz.explanation}</p>
          {quiz.link && (
            <a
              href={quiz.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium underline underline-offset-2 opacity-80 hover:opacity-100"
            >
              {quiz.link.label}
              <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
