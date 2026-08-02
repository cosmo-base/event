import { Rocket, ArrowRight, FileText } from "lucide-react"
import type { EventPageData } from "@/data/event-page-data"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"

export function CommunityCta({
  cta,
  reportUrl,
}: {
  cta: EventPageData["communityCta"]
  reportUrl?: string
}) {
  return (
    <section aria-labelledby="cta-heading" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-12 text-center shadow-lg sm:px-10 sm:py-16"
            style={{ background: "linear-gradient(135deg,#0f1e3d 0%,#1e3a8a 55%,#2563eb 100%)" }}
          >
            {/* 星・軌道の装飾 */}
            <div aria-hidden="true" className="cb-stars absolute inset-0 opacity-70" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Rocket className="size-3.5" aria-hidden="true" />
                Join Cosmo Base
              </span>
              <h2 id="cta-heading" className="mt-4 text-2xl font-bold text-balance text-white sm:text-4xl">
                {cta.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-white/85">
                {cta.description}
              </p>

              <div className="mt-8 flex flex-col items-center gap-3">
                <ExternalLinkButton
                  href={cta.primaryHref}
                  external
                  variant="onDark"
                  size="lg"
                  block
                  event="click_community_join"
                  className="sm:w-auto sm:min-w-72"
                >
                  {cta.primaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ExternalLinkButton>

                <div className="flex flex-wrap justify-center gap-2.5">
                  {cta.secondaryLinks.map((link) => (
                    <ExternalLinkButton
                      key={link.label}
                      href={link.href}
                      external={!link.anchor}
                      showIcon={!link.anchor}
                      variant="onDarkOutline"
                      size="sm"
                      event={link.event}
                    >
                      {link.label}
                    </ExternalLinkButton>
                  ))}
                  {reportUrl ? (
                    <ExternalLinkButton
                      href={reportUrl}
                      external
                      variant="onDarkOutline"
                      size="sm"
                    >
                      <FileText className="size-4" aria-hidden="true" />
                      イベントレポートを見る
                    </ExternalLinkButton>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
