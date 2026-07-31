import { Target, Telescope, Orbit } from "lucide-react"
import type { EventPageData } from "@/data/event-page-data"
import { SectionHeading } from "@/components/section-heading"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"

export function FsifIntroduction({ fsif }: { fsif: EventPageData["fsif"] }) {
  const pillars = [
    { icon: Target, label: "Mission", value: fsif.mission },
    { icon: Telescope, label: "Vision", value: fsif.vision },
    { icon: Orbit, label: "Purpose", value: fsif.purpose },
  ]

  return (
    <section id="organization" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Organization" title="運営団体について" />

        <Reveal className="mt-8">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <p className="text-lg font-bold">{fsif.name}</p>
            <p className="text-sm text-muted-foreground">{fsif.englishName}</p>

            <div className="mt-4 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              {fsif.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.label} className="rounded-2xl border border-border bg-secondary/40 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <pillar.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
                    {pillar.label}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-foreground text-pretty">
                    {pillar.value}
                  </p>
                </div>
              ))}
            </div>

            <ExternalLinkButton
              href={fsif.websiteUrl}
              external
              variant="outline"
              event="click_fsif_website"
              className="mt-6 w-full sm:w-auto"
            >
              未来宇宙産業フォーラム公式サイトを見る
            </ExternalLinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
