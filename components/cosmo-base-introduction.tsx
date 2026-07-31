import { Rocket, Check } from "lucide-react"
import type { EventPageData } from "@/data/event-page-data"
import { SectionHeading } from "@/components/section-heading"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"

export function CosmoBaseIntroduction({ cosmoBase }: { cosmoBase: EventPageData["cosmoBase"] }) {
  return (
    <section id="cosmo-base" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="About Cosmo Base" title="Cosmo Base とは" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <img src="/event/CB_icon.png" alt="CB" className="size-10" aria-hidden="true" />
              </span>
              <div>
                <p className="text-lg font-bold">Cosmo Base</p>
                <p className="text-sm text-muted-foreground">宇宙を身近にするコミュニティ</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              {cosmoBase.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
              <p className="text-sm font-semibold text-foreground">主なコンテンツ</p>
              <ul className="mt-2 space-y-1.5">
                {cosmoBase.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* 活動実績 */}
            <div className="grid grid-cols-2 gap-3">
              {cosmoBase.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm"
                >
                  <p className="text-xl font-bold text-primary sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              <ExternalLinkButton
                href={cosmoBase.communityUrl}
                external
                variant="primary"
                block
                event="click_community_join"
              >
                Cosmo Base に参加する
              </ExternalLinkButton>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <ExternalLinkButton
                  href={cosmoBase.websiteUrl}
                  external
                  variant="outline"
                  block
                  event="click_cosmo_base_website"
                >
                  もっと知る
                </ExternalLinkButton>
                <ExternalLinkButton href={cosmoBase.contentsAnchor} variant="secondary" block>
                  コンテンツを見る
                </ExternalLinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
