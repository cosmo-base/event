import Image from "next/image"
import { Clock3, Users } from "lucide-react"
import type { ContentItem, ContentStatus } from "@/data/event-page-data"
import { QuickIcon } from "@/components/icons"
import { StatusBadge } from "@/components/status-badge"
import { ExternalLinkButton } from "@/components/external-link-button"

const gradients = [
  "linear-gradient(135deg,#1e3a8a,#2563eb 65%,#0ea5e9)",
  "linear-gradient(135deg,#2563eb,#6d5ee6 60%,#7c3aed)",
  "linear-gradient(135deg,#0ea5e9,#2563eb 70%,#1e3a8a)",
  "linear-gradient(135deg,#1e3a8a,#0369a1 60%,#0ea5e9)",
]

function buttonForStatus(status: ContentStatus): {
  label: string
  disabled: boolean
} {
  switch (status) {
    case "coming-soon":
      return { label: "準備中", disabled: true }
    case "ended":
      return { label: "公開終了", disabled: true }
    case "limited":
      return { label: "限定コンテンツを見る", disabled: false }
    default:
      return { label: "体験する", disabled: false }
  }
}

export function ContentCard({
  content,
  index = 0,
  event,
}: {
  content: ContentItem
  index?: number
  event?: string
}) {
  const btn = buttonForStatus(content.status)
  const gradient = gradients[index % gradients.length]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* サムネイル */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {content.imageUrl ? (
          <Image
            src={content.imageUrl || "/placeholder.svg"}
            alt={`${content.title} のイメージ`}
            fill
            sizes="(max-width: 640px) 100vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0" style={{ background: gradient }}>
            <div className="cb-stars absolute inset-0 opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <QuickIcon name={content.icon ?? "rocket"} className="size-7" />
              </span>
            </div>
          </div>
        )}
        {content.status === "limited" ? (
          <div className="absolute left-3 top-3">
            <StatusBadge label="イベント限定" tone="accent" className="shadow-sm" />
          </div>
        ) : null}
      </div>

      {/* 本文 */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-balance">{content.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{content.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {content.duration ? (
            <span className="inline-flex items-center gap-1">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {content.duration}
            </span>
          ) : null}
          {content.audience ? (
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" aria-hidden="true" />
              {content.audience}
            </span>
          ) : null}
        </div>

        {content.labels.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {content.labels.map((label) => (
              <StatusBadge key={label} label={label} />
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex-1" />

        <ExternalLinkButton
          href={content.href}
          external={content.external && !btn.disabled}
          disabled={btn.disabled}
          variant={content.status === "limited" ? "secondary" : "primary"}
          size="sm"
          block
          event={event}
        >
          {btn.label}
        </ExternalLinkButton>
      </div>
    </article>
  )
}
