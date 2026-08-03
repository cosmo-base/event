"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

interface PdfSlideViewerProps {
  url: string
  title?: string
}

export function PdfSlideViewer({ url, title }: PdfSlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
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

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfRef.current || !canvasRef.current) return
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
      renderTaskRef.current = null
    }
    const page = await pdfRef.current.getPage(pageNum)
    const canvas = canvasRef.current
    const container = canvas.parentElement
    if (!container) return
    const containerWidth = container.clientWidth
    const viewport = page.getViewport({ scale: 1 })
    const scale = containerWidth / viewport.width
    const scaled = page.getViewport({ scale })
    const ctx = canvas.getContext("2d")!
    canvas.width = scaled.width
    canvas.height = scaled.height
    const task = page.render({ canvasContext: ctx, viewport: scaled })
    renderTaskRef.current = task
    try {
      await task.promise
    } catch {
      // cancelled — ignore
    }
  }, [])

  useEffect(() => {
    if (!loading && !error) renderPage(currentPage)
  }, [currentPage, loading, error, renderPage])

  const prev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const next = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  if (error) return (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
      スライドを読み込めませんでした
    </div>
  )

  return (
    <div className="absolute inset-0 flex flex-col bg-black">
      {/* Canvas */}
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

      {/* Controls */}
      {!loading && (
        <div className="flex items-center justify-between px-4 py-2 bg-black/80 shrink-0">
          <button
            onClick={prev}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
            aria-label="前のページ"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs text-white/60 tabular-nums select-none">
            {currentPage} / {totalPages}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={next}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
              aria-label="次のページ"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href={url}
              download
              className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="PDFをダウンロード"
              title="PDFをダウンロード"
            >
              <Maximize2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
