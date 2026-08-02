"use client"

import type { EventPageData } from "@/data/event-page-data"
import { socialIconMap, socialLabelMap, type SocialKey } from "@/components/icons"
import { trackEvent } from "@/lib/analytics"

const ORDER: SocialKey[] = ["x", "instagram", "youtube", "tiktok", "note", "facebook", "discord"]

export function SocialFooter({
  cosmoBase,
  fsif,
  socialLinks,
  legalLinks,
}: {
  cosmoBase: EventPageData["cosmoBase"]
  fsif: EventPageData["fsif"]
  socialLinks: EventPageData["socialLinks"]
  legalLinks: EventPageData["legalLinks"]
}) {
  const activeSocials = ORDER.filter((key) => {
    const url = socialLinks[key]
    return typeof url === "string" && url.trim().length > 0
  })

  const links: { label: string; href?: string; external?: boolean }[] = [
    { label: "公式サイト", href: cosmoBase.websiteUrl, external: true },
    { label: "問い合わせ", href: legalLinks.contact, external: true },
    { label: "プライバシーポリシー", href: legalLinks.privacyPolicy, external: true },
    { label: "利用規約", href: legalLinks.terms, external: true },
  ]
  const visibleLinks = links.filter((l) => l.href && l.href.trim().length > 0)

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <img src="/event/CB_logo.png" alt="Cosmo Base" className="w-max h-10" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{fsif.name}</p>
            <p className="text-xs text-white/50">{fsif.englishName}</p>
          </div>

          <nav aria-label="フッターリンク" className="flex flex-col gap-2">
            {visibleLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm text-white/75 transition-colors hover:text-white focus-visible:underline focus-visible:outline-none"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {activeSocials.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {activeSocials.map((key) => {
              const Icon = socialIconMap[key]
              return (
                <a
                  key={key}
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("click_social_link", { platform: key })}
                  aria-label={`${socialLabelMap[key]}（新しいタブで開きます）`}
                  className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/50 focus-visible:outline-none"
                >
                  <Icon className="size-5" />
                </a>
              )
            })}
          </div>
        ) : null}

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50">
          © 2026 Future Space Industrial Forum / Cosmo Base
        </div>
      </div>
    </footer>
  )
}
