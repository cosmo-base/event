import Image from "next/image"
import { FileText, User, CalendarDays, Clock3 } from "lucide-react"
import type { PitchData } from "@/data/event-page-data"
import { SectionHeading } from "@/components/section-heading"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"
import { PdfSlideViewer } from "@/components/pdf-slide-viewer"

export function PitchMaterialSection({ pitch }: { pitch: PitchData }) {
  return (
    <section id="pitch" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow={pitch.eyebrow ?? "Presentation"}
          title={pitch.title}
          description={pitch.sectionDescription ?? "当日の発表スライドをご覧いただけます。"}
        />

        <Reveal className="mt-8">
          <div className="grid gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-[1.1fr_1fr]">
            {/* スライド埋め込み / サムネイル */}
            <div className="relative aspect-video md:aspect-auto">
              {pitch.embedUrl ? (
                pitch.embedUrl.endsWith(".pdf") ? (
                  <PdfSlideViewer url={pitch.embedUrl} title={pitch.presentationTitle} downloadUrl={pitch.pdfUrl} downloadName={pitch.pdfDownloadName ?? pitch.presentationTitle} />
                ) : (
                  <iframe
                    src={pitch.embedUrl}
                    title={pitch.presentationTitle}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                  />
                )
              ) : pitch.thumbnailUrl ? (
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
                {pitch.pdfUrl ? (
                  <ExternalLinkButton
                    href={pitch.pdfUrl}
                    external
                    variant="primary"
                    event="click_pitch_pdf"
                    download={pitch.pdfDownloadName ?? pitch.presentationTitle}
                  >
                    <FileText className="size-4" aria-hidden="true" />
                    PDFをダウンロード
                  </ExternalLinkButton>
                ) : null}
                {pitch.supplementaryUrl ? (
                  <ExternalLinkButton
                    href={pitch.supplementaryUrl}
                    external
                    variant="ghost"
                  >
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

export function PosterSection({ pitch }: { pitch: PitchData }) {
  if (!pitch.posters || pitch.posters.length === 0) return null
  return (
    <section id="posters" className="scroll-mt-16 border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Poster"
          title="ブース掲示ポスター"
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pitch.posters.map((poster, i) => (
            <Reveal key={i}>
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="px-6 pt-6 pb-3">
                  <p className="text-sm font-semibold text-primary">{poster.title}</p>
                </div>
                <div className="relative aspect-[3/4]">
                  <PdfSlideViewer
                    url={poster.embedUrl}
                    title={poster.title}
                    downloadUrl={poster.pdfUrl}
                    downloadName={poster.downloadName ?? poster.title}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
