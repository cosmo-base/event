import { CalendarDays, MapPin, Store, Clock3, Mic2 } from "lucide-react"
import type { EventPageData } from "@/data/event-page-data"
import { StatusBadge } from "@/components/status-badge"

const statusConfig = {
  upcoming: { label: "開催予定", tone: "sky" as const },
  live: { label: "本日開催", tone: "live" as const },
  ended: { label: "イベントは終了しました", tone: "muted" as const },
}

export function EventInformation({ event }: { event: EventPageData["event"] }) {
  const status = statusConfig[event.status]

  const infoItems = [
    { icon: CalendarDays, label: "開催日", value: event.date },
    { icon: MapPin, label: "会場", value: event.venue },
    event.boothNumber
      ? { icon: Store, label: "ブース", value: event.boothNumber }
      : null,
    event.pitchTime
      ? { icon: Clock3, label: "イベント時間", value: event.pitchTime }
      : null,
  ].filter(Boolean) as { icon: typeof CalendarDays; label: string; value: string }[]

  return (
    <section
      aria-labelledby="event-info-heading"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/60 to-background pt-20 pb-8"
    >
      {/* 控えめな宇宙モチーフの背景装飾 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, color-mix(in srgb, var(--event-secondary) 22%, transparent), transparent 40%), radial-gradient(circle at 88% 12%, color-mix(in srgb, var(--event-accent-2) 16%, transparent), transparent 42%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge label="イベント限定ページ" tone="purple" />
          {event.status !== "live" && <StatusBadge label={status.label} tone={status.tone} />}
        </div>

        <h1
          id="event-info-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {event.name}
        </h1>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-primary">
          <Mic2 className="size-4" aria-hidden="true" />
          {event.participationType}
        </p>

        {event.message ? (
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {event.message}
          </p>
        ) : null}

        <dl className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-3 shadow-sm"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="truncate text-sm font-semibold text-foreground">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs text-muted-foreground">参加者：{event.exhibitorName}</p>
      </div>
    </section>
  )
}
