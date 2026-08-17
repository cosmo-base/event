import { Clock3, Lock, CalendarClock } from "lucide-react"
import type { LimitedContentItem } from "@/data/event-page-data"
import { SectionHeading } from "@/components/section-heading"
import { StatusBadge } from "@/components/status-badge"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"
import { EventQuiz } from "@/components/event-quiz"

export function LimitedContentSection({
  items,
  eventId,
}: {
  items: LimitedContentItem[]
  eventId: string
}) {
  return (
    <section
      id="quiz"
      className="scroll-mt-16 border-t border-border py-14"
      style={{ background: "linear-gradient(180deg,color-mix(in srgb,var(--event-accent) 8%,transparent),transparent 220px)" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Quiz"
          title="イベント限定クイズ"
          description="イベント参加者だけが体験できる特別なクイズを公開しています。"
        />

        <div className="mt-8 mb-4">
          <Reveal>
            <EventQuiz eventId={eventId} />
          </Reveal>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const ended = item.status === "ended"
            return (
              <Reveal as="li" key={item.id} delay={(i % 2) * 80} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <StatusBadge label={ended ? "公開終了" : "イベント限定"} tone={ended ? "muted" : "accent"} />
                    {item.labels
                      .filter((l) => l !== "イベント限定")
                      .map((l) => (
                        <StatusBadge key={l} label={l} />
                      ))}
                  </div>

                  <h3 className="mt-3 text-base font-bold text-balance">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

                  <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    {item.availableUntil ? (
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock className="size-3.5 shrink-0" aria-hidden="true" />
                        公開期限：{item.availableUntil}まで
                      </span>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {item.duration ? (
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="size-3.5" aria-hidden="true" />
                          {item.duration}
                        </span>
                      ) : null}
                      {item.requiresPassword ? (
                        <span className="inline-flex items-center gap-1">
                          <Lock className="size-3.5" aria-hidden="true" />
                          合言葉が必要
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 flex-1" />

                  <ExternalLinkButton
                    href={item.href}
                    external={item.external && !ended}
                    disabled={ended}
                    variant="primary"
                    size="sm"
                    block
                    event="click_limited_content"
                  >
                    {ended ? "公開終了" : "コンテンツを開く"}
                  </ExternalLinkButton>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
