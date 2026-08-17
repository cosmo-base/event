"use client"

import { useState } from "react"
import { Send, CheckCircle2, ClipboardList } from "lucide-react"
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
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" />
        </span>
        <p className="text-xl font-bold text-foreground">ご回答ありがとうございました！</p>
        <p className="text-sm text-muted-foreground">アンケートへのご協力に感謝します。</p>
      </div>
    )
  }

  const canSubmit = answers.some((a) => a.trim() !== "")

  return (
    <div className="space-y-5">
      {questions.map((q, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
          <label className="block text-sm font-semibold text-foreground leading-snug">
            <span className="inline-block mr-2 text-xs font-bold text-primary bg-primary/10 rounded-md px-2 py-0.5">Q{i + 1}</span>
            {q}
          </label>
          <textarea
            rows={3}
            value={answers[i]}
            onChange={(e) => setAnswer(i, e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 resize-none transition-colors"
            placeholder="ご自由にお書きください"
          />
        </div>
      ))}

      <button
        onClick={submit}
        disabled={submitting || !canSubmit}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
      >
        <Send className="w-4 h-4" />
        {submitting ? "送信中…" : "アンケートを送信する"}
      </button>
    </div>
  )
}

export function SurveySection({
  eventId,
  eventName,
  questions,
}: Props) {
  return (
    <section
      id="survey"
      aria-labelledby="survey-heading"
      className="scroll-mt-16 border-t border-border py-14"
      style={{ background: "linear-gradient(180deg,color-mix(in srgb,var(--primary) 5%,transparent),transparent 240px)" }}
    >
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Survey
          </span>
          <h2 id="survey-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
            アンケート
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            ブースや発表への感想をお聞かせください。今後のコンテンツ改善に役立てます。
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <ClipboardList className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">対象イベント</p>
              <p className="text-sm font-semibold text-foreground">{eventName}</p>
            </div>
          </div>
          <EventSurvey eventId={eventId} eventName={eventName} questions={questions} />
        </div>
      </div>
    </section>
  )
}
