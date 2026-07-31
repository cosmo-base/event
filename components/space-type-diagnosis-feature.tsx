import Image from "next/image"
import { Clock3, ListChecks, Sparkles, ArrowRight } from "lucide-react"
import type { SpaceTypeFeature } from "@/data/event-page-data"
import { StatusBadge } from "@/components/status-badge"
import { ExternalLinkButton } from "@/components/external-link-button"
import { Reveal } from "@/components/reveal"

export function SpaceTypeDiagnosisFeature({ feature }: { feature: SpaceTypeFeature }) {
  const infos = [
    { icon: Clock3, label: "所要時間", value: feature.duration },
    { icon: ListChecks, label: "質問数", value: feature.questionCount },
    { icon: Sparkles, label: "宇宙の知識", value: feature.requirement.replace("宇宙の知識：", "") },
  ]

  return (
    <section aria-labelledby="space-type-heading" className="py-4">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-primary/20 p-6 shadow-sm sm:p-10"
            style={{ background: "linear-gradient(135deg,#eef2ff 0%,#e6f0fe 45%,#f3e8ff 100%)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-40 blur-2xl"
              style={{ background: "radial-gradient(circle,#a5b4fc,transparent 70%)" }}
            />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <div className="flex flex-wrap gap-2">
                  {feature.badges.map((b) => (
                    <StatusBadge key={b} label={b} tone={b.includes("人気") ? "purple" : "sky"} />
                  ))}
                </div>
                <h2
                  id="space-type-heading"
                  className="mt-3 text-2xl font-bold text-balance sm:text-3xl text-slate-900"
                >
                  {feature.title}
                </h2>
                <p className="mt-2 text-pretty leading-relaxed text-slate-600">
                  {feature.description}
                </p>

                <dl className="mt-5 grid grid-cols-3 gap-2">
                  {infos.map((info) => (
                    <div
                      key={info.label}
                      className="rounded-2xl border border-border/70 bg-card/80 p-3 text-center backdrop-blur"
                    >
                      <info.icon className="mx-auto size-4 text-indigo-600" aria-hidden="true" />
                      <dt className="mt-1 text-[11px] text-slate-500">{info.label}</dt>
                      <dd className="text-sm font-bold text-slate-900">{info.value}</dd>
                    </div>
                  ))}
                </dl>

                <ExternalLinkButton
                  href={feature.href}
                  external
                  variant="primary"
                  size="lg"
                  block
                  event="click_space_type_diagnosis"
                  className="mt-6"
                >
                  {feature.buttonLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ExternalLinkButton>
              </div>

              {/* 診断結果カードが重なったモックアップ */}
              <div className="relative mx-auto hidden h-64 w-full max-w-sm md:block">
                {feature.imageUrl ? (
                  <div className="absolute inset-4 overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
                    <Image
                      src={feature.imageUrl || "/placeholder.svg"}
                      alt=""
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="absolute -left-2 top-2 w-40 -rotate-6 rounded-2xl border border-border bg-card p-3 shadow-lg">
                  <div className="h-2 w-16 rounded-full bg-primary/30" />
                  <div className="mt-2 h-2 w-24 rounded-full bg-muted" />
                  <div className="mt-1 h-2 w-20 rounded-full bg-muted" />
                </div>
                <div className="absolute -right-1 bottom-2 w-44 rotate-6 rounded-2xl border border-border bg-card p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Sparkles className="size-4" aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <div className="h-2 w-16 rounded-full bg-primary/30" />
                      <div className="mt-1 h-2 w-12 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
