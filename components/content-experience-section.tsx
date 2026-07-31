import type { ContentItem } from "@/data/event-page-data"
import { SectionHeading } from "@/components/section-heading"
import { ContentCard } from "@/components/content-card"
import { Reveal } from "@/components/reveal"

export function ContentExperienceSection({ contents }: { contents: ContentItem[] }) {
  return (
    <section id="contents" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Contents"
          title="Cosmo Base を体験する"
          description="Cosmo Base では、宇宙の知識がなくても楽しめるさまざまなコンテンツを提供しています。気になるコンテンツから、実際に体験してみてください。"
        />

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map((content, i) => (
            <Reveal as="li" key={content.id} delay={(i % 3) * 80} className="h-full">
              <ContentCard content={content} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
