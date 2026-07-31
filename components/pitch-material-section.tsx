import Image from "next/image"
import { Presentation, FileText, Paperclip, User, CalendarDays, Clock3 } from "lucide-react"
import type { PitchData } from "@/data/event-page-data"
import { SectionHeading } from "@/components/section-heading"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"

export function PitchMaterialSection({ pitch }: { pitch: PitchData }) {
  return (
    <section id="pitch" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Pitch"
          title={pitch.title}
          description="当日のピッチで使用した発表スライドと補足資料をご覧いただけます。発表時間内にご紹介できなかった内容も掲載しています。"
        />

        <Reveal className="mt-8">
          <div className="grid gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-[1.1fr_1fr]">
            {/* サムネイル */}
            <div className="relative aspect-video md:aspect-auto">
              {pitch.thumbnailUrl ? (
                <Image
                  src={pitch.thumbnailUrl || "/placeholder.svg"}
                  alt={`${pitch.presentationTitle} の発表スライド サムネイル`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb 60%,#0ea5e9)" }}
                >
                  <div className="cb-stars absolute inset-0 opacity-70" />
                </div>
              )}
            </div>

            {/* 情報 */}
            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-balance sm:text-xl">{pitch.presentationTitle}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{pitch.description}</p>

              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <dt className="sr-only">発表者</dt>
                  <dd>{pitch.speakerName}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <dt className="sr-only">発表日</dt>
                  <dd>{pitch.presentationDate}</dd>
                </div>
                {pitch.presentationTime ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <dt className="sr-only">発表時間</dt>
                    <dd>{pitch.presentationTime}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <ExternalLinkButton
                  href={pitch.slideUrl}
                  external
                  variant="primary"
                  event="click_pitch_slide"
                  className="sm:flex-1"
                >
                  <Presentation className="size-4" aria-hidden="true" />
                  発表スライドを見る
                </ExternalLinkButton>
                {pitch.pdfUrl ? (
                  <ExternalLinkButton
                    href={pitch.pdfUrl}
                    external
                    variant="outline"
                    event="click_pitch_pdf"
                  >
                    <FileText className="size-4" aria-hidden="true" />
                    PDFで見る
                  </ExternalLinkButton>
                ) : null}
                {pitch.supplementaryUrl ? (
                  <ExternalLinkButton
                    href={pitch.supplementaryUrl}
                    external
                    variant="ghost"
                  >
                    <Paperclip className="size-4" aria-hidden="true" />
                    補足資料を見る
                  </ExternalLinkButton>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
