"use client"

import type { EventPageData } from "@/data/event-page-data"
import { socialIconMap, socialLabelMap, type SocialKey } from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { trackEvent } from "@/lib/analytics"

const ORDER: SocialKey[] = ["x", "instagram", "youtube", "tiktok", "note", "facebook", "discord"]

export function SocialLinksSection({ socialLinks }: { socialLinks: EventPageData["socialLinks"] }) {
  // URL が空文字・未設定の SNS は非表示
  const active = ORDER.filter((key) => {
    const url = socialLinks[key]
    return typeof url === "string" && url.trim().length > 0
  })

  if (active.length === 0) return null

  return (
    <section id="social" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Follow us"
          title="SNS・公式リンク"
          description="最新のコンテンツやイベント情報は、各SNSでも発信しています。"
          align="center"
        />

        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
          {active.map((key) => {
            const Icon = socialIconMap[key]
            const label = socialLabelMap[key]
            return (
              <li key={key}>
                <a
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("click_social_link", { platform: key })}
                  aria-label={`${label}（新しいタブで開きます）`}
                  className="flex min-h-11 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Icon className="size-5 text-primary" />
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
