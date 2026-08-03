"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from "lucide-react"

interface PdfSlideViewerProps {
  url: string
  title?: string
}

export function PdfSlideViewer({ url, title }: PdfSlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fullscreenCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfRef = useRef<any>(null)
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null)

  useEffect(() => {
    let cancelled = false
    async function loadPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist")
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.mjs",
          import.meta.url
        ).toString()
        const pdf = await pdfjsLib.getDocument({ url }).promise
        if (cancelled) return
        pdfRef.current = pdf
        setTotalPages(pdf.numPages)
        setLoading(false)
      } catch {
        if (!cancelled) setError(true)
      }
    }
    loadPdf()
    return () => { cancelled = true }
  }, [url])

  const renderPage = useCallback(async (pageNum: number, targetCanvas: HTMLCanvasElement | null) => {
    if (!pdfRef.current || !targetCanvas) return
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
      renderTaskRef.current = null
    }
    const page = await pdfRef.current.getPage(pageNum)
    const container = targetCanvas.parentElement
    if (!container) return
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const viewport = page.getViewport({ scale: 1 })
    const scaleW = containerWidth / viewport.width
    const scaleH = containerHeight / viewport.height
    const scale = Math.min(scaleW, scaleH)
    const scaled = page.getViewport({ scale })
    const ctx = targetCanvas.getContext("2d")!
    targetCanvas.width = scaled.width
    targetCanvas.height = scaled.height
    const task = page.render({ canvasContext: ctx, viewport: scaled })
    renderTaskRef.current = task
    try {
      await task.promise
    } catch {
      // cancelled — ignore
    }
  }, [])

  useEffect(() => {
    if (!loading && !error) {
      renderPage(currentPage, canvasRef.current)
      if (isFullscreen) renderPage(currentPage, fullscreenCanvasRef.current)
    }
  }, [currentPage, loading, error, isFullscreen, renderPage])

  // Re-render fullscreen canvas when entering fullscreen
  useEffect(() => {
    if (isFullscreen && !loading && !error) {
      renderPage(currentPage, fullscreenCanvasRef.current)
    }
  }, [isFullscreen, currentPage, loading, error, renderPage])

  // Close fullscreen on Escape
  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false)
      if (e.key === "ArrowLeft") setCurrentPage((p) => Math.max(1, p - 1))
      if (e.key === "ArrowRight") setCurrentPage((p) => Math.min(totalPages, p + 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isFullscreen, totalPages])

  // Prevent body scroll when fullscreen
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isFullscreen])

  const prev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const next = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  const Controls = ({ large = false }: { large?: boolean }) => (
    <div className={`flex items-center justify-between ${large ? "px-6 py-3" : "px-4 py-2"} bg-black/80 shrink-0`}>
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className={`${large ? "p-2" : "p-1.5"} rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors`}
        aria-label="前のページ"
      >
        <ChevronLeft className={large ? "w-7 h-7" : "w-5 h-5"} />
      </button>

      <span className={`${large ? "text-sm" : "text-xs"} text-white/60 tabular-nums select-none`}>
        {currentPage} / {totalPages}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={next}
          disabled={currentPage === totalPages}
          className={`${large ? "p-2" : "p-1.5"} rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors`}
          aria-label="次のページ"
        >
          <ChevronRight className={large ? "w-7 h-7" : "w-5 h-5"} />
        </button>
        {large ? (
          <button
            onClick={() => setIsFullscreen(false)}
            className="p-2 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-2"
            aria-label="全画面を閉じる"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="全画面表示"
            title="全画面表示"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  if (error) return (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
      スライドを読み込めませんでした
    </div>
  )

  return (
    <>
      {/* Normal viewer */}
      <div ref={containerRef} className="absolute inset-0 flex flex-col bg-black">
        <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
          {loading && (
            <span className="text-xs text-white/40 animate-pulse">読み込み中…</span>
          )}
          <canvas
            ref={canvasRef}
            className={`max-w-full max-h-full object-contain ${loading ? "hidden" : ""}`}
            aria-label={title}
          />
        </div>
        {!loading && <Controls />}
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          {/* Close button top-right */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          {title && (
            <div className="px-6 pt-4 pb-2 text-xs text-white/40 shrink-0">{title}</div>
          )}

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0 px-4">
            <canvas
              ref={fullscreenCanvasRef}
              className="max-w-full max-h-full object-contain"
              aria-label={title}
            />
          </div>

          <Controls large />
        </div>
      )}
    </>
  )
}
