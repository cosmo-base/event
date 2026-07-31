"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CarouselSlide } from "@/data/event-page-data"
import { ExternalLinkButton } from "@/components/external-link-button"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 6000

export function HeroCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // 自動再生（reduced-motion または一時停止時は無効）
  useEffect(() => {
    if (paused || count <= 1) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused, count])

  // スワイプ
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
    setPaused(true)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx > 40) prev()
    else if (dx < -40) next()
    touchX.current = null
  }

  return (
    <section aria-roledescription="カルーセル" aria-label="注目コンテンツ" className="mx-auto max-w-6xl px-4 pt-6">
      <div
        className="relative overflow-hidden rounded-3xl border border-border shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev()
          if (e.key === "ArrowRight") next()
        }}
        tabIndex={0}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="スライド"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== index}
              className="relative min-w-full"
            >
              <div
                className="relative flex min-h-[300px] flex-col justify-end p-6 sm:min-h-[380px] sm:p-10"
                style={{ background: slide.gradient ?? "linear-gradient(135deg,#1e3a8a,#2563eb)" }}
              >
                {slide.imageUrl ? (
                  <>
                    <Image
                      src={slide.imageUrl || "/placeholder.svg"}
                      alt=""
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 1152px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/45 to-navy/10" />
                  </>
                ) : (
                  <div aria-hidden="true" className="cb-stars absolute inset-0 opacity-70" />
                )}

                <div className="relative max-w-xl">
                  {slide.label ? (
                    <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {slide.label}
                    </span>
                  ) : null}
                  <h2 className="mt-3 text-2xl font-bold text-balance text-white sm:text-4xl">
                    {slide.title}
                  </h2>
                  <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
                    {slide.description}
                  </p>
                  {slide.buttonLabel ? (
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <ExternalLinkButton
                        href={slide.href ?? "#"}
                        external={slide.external}
                        variant="onDark"
                      >
                        {slide.buttonLabel}
                      </ExternalLinkButton>
                      {slide.secondaryLabel && slide.secondaryHref ? (
                        <ExternalLinkButton
                          href={slide.secondaryHref}
                          variant="onDarkOutline"
                        >
                          {slide.secondaryLabel}
                        </ExternalLinkButton>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 矢印 */}
        <button
          type="button"
          onClick={prev}
          aria-label="前のスライド"
          className="absolute left-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow-md backdrop-blur transition hover:bg-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="次のスライド"
          className="absolute right-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow-md backdrop-blur transition hover:bg-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>

        {/* ドット */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`スライド ${i + 1} を表示`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:ring-3 focus-visible:ring-white/70 focus-visible:outline-none",
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
