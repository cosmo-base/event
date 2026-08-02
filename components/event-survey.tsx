"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { sendToGas } from "@/lib/gas-queue"

interface Props {
  eventId: string
  eventName: string
  questions: string[]
}

export function EventSurvey({ eventId, eventName, questions }: Props) {
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ""))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const setAnswer = (i: number, v: string) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? v : a)))

  const submit = async () => {
    if (submitting) return
    setSubmitting(true)
    await sendToGas({
      type: "survey",
      eventId,
      eventName,
      responses: questions.map((question, i) => ({ question, answer: answers[i] })),
    }).catch(() => {})
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle2 className="w-12 h-12 text-primary" />
        <p className="font-bold text-lg text-foreground">ご回答ありがとうございました！</p>
        <p className="text-sm text-muted-foreground">アンケートへのご協力に感謝します。</p>
      </div>
    )
  }

  const canSubmit = answers.some((a) => a.trim() !== "")

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        イベント名: <span className="text-foreground font-medium">{eventName}</span>
      </div>

      {questions.map((q, i) => (
        <div key={i} className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Q{i + 1}. {q}
          </label>
          <textarea
            rows={3}
            value={answers[i]}
            onChange={(e) => setAnswer(i, e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder="ご自由にお書きください"
          />
        </div>
      ))}

      <button
        onClick={submit}
        disabled={submitting || !canSubmit}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {submitting ? "送信中..." : "アンケートを送信"}
      </button>
    </div>
  )
}
