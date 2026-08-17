"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react"

interface PdfSlideViewerProps {
  url: string
  title?: string
  downloadUrl?: string
  downloadName?: string
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

export function PdfSlideViewer({ url, title, downloadUrl, downloadName }: PdfSlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const contentAreaRef = useRef<HTMLDivElement>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const panAtDragStart = useRef({ x: 0, y: 0 })
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

  // Render the page at zoom resolution so CSS scale(zoom) stays 1:1 pixels → crisp text
  const renderPage = useCallback(async (pageNum: number, zoomLevel: number) => {
    if (!pdfRef.current || !canvasRef.current) return
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
      renderTaskRef.current = null
    }
    const page = await pdfRef.current.getPage(pageNum)
    const canvas = canvasRef.current
    const container = contentAreaRef.current
    if (!container) return
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const viewport = page.getViewport({ scale: 1 })
    const scaleW = containerWidth / viewport.width
    const scaleH = containerHeight / viewport.height
    const baseScale = Math.min(scaleW, scaleH)
    // Pixel dimensions at zoom resolution
    const scaled = page.getViewport({ scale: baseScale * zoomLevel })
    const ctx = canvas.getContext("2d")!
    canvas.width = scaled.width
    canvas.height = scaled.height
    // CSS display size stays at 1× — CSS transform scale(zoomLevel) expands it 1:1 pixel
    canvas.style.width = `${baseScale * viewport.width}px`
    canvas.style.height = `${baseScale * viewport.height}px`
    const task = page.render({ canvasContext: ctx, viewport: scaled })
    renderTaskRef.current = task
    try {
      await task.promise
    } catch {
      // cancelled — ignore
    }
  }, [])

  // Re-render whenever page or zoom changes (zoom triggers high-res re-render)
  useEffect(() => {
    if (!loading && !error) renderPage(currentPage, zoom)
  }, [currentPage, zoom, loading, error, renderPage])

  // Reset zoom and pan on page change
  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [currentPage])

  // Re-render on fullscreen transition (container size changes)
  useEffect(() => {
    if (loading || error) return
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement)
      setZoom(1)
      setPan({ x: 0, y: 0 })
      requestAnimationFrame(() => renderPage(currentPage, 1))
    }
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [currentPage, loading, error, renderPage])

  // Keyboard navigation in fullscreen
  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentPage((p) => Math.max(1, p - 1))
      if (e.key === "ArrowRight") setCurrentPage((p) => Math.min(totalPages, p + 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isFullscreen, totalPages])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    panAtDragStart.current = pan
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    setPan({
      x: panAtDragStart.current.x + (e.clientX - dragStart.current.x),
      y: panAtDragStart.current.y + (e.clientY - dragStart.current.y),
    })
  }

  const stopDrag = () => { isDragging.current = false }

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, parseFloat((z + ZOOM_STEP).toFixed(2))))
  const zoomOut = () => {
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, parseFloat((z - ZOOM_STEP).toFixed(2)))
      if (next <= 1) setPan({ x: 0, y: 0 })
      return next
    })
  }

  const prev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const next = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  if (error) return (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
      スライドを読み込めませんでした
    </div>
  )

  const btnSz = isFullscreen ? "p-2" : "p-1.5"
  const iconSz = isFullscreen ? "w-6 h-6" : "w-4 h-4"
  const btn = `${btnSz} rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors`

  return (
    <div ref={viewerRef} className="absolute inset-0 flex flex-col bg-black">
      <div
        ref={contentAreaRef}
        className="flex-1 flex items-center justify-center overflow-hidden min-h-0 select-none"
        style={{ cursor: zoom > 1 ? "grab" : "default" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
      >
        {loading && (
          <span className="text-xs text-white/40 animate-pulse">読み込み中…</span>
        )}
        <div
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: "center center",
            display: loading ? "none" : undefined,
          }}
        >
          <canvas ref={canvasRef} aria-label={title} />
        </div>
      </div>

      {!loading && (
        <div className={`flex items-center justify-between ${isFullscreen ? "px-6 py-3" : "px-4 py-2"} bg-black/80 shrink-0`}>
          <button onClick={prev} disabled={currentPage === 1} className={btn} aria-label="前のページ">
            <ChevronLeft className={isFullscreen ? "w-7 h-7" : "w-5 h-5"} />
          </button>

          <span className={`${isFullscreen ? "text-sm" : "text-xs"} text-white/60 tabular-nums select-none`}>
            {currentPage} / {totalPages}
          </span>

          <div className="flex items-center gap-1">
            <button onClick={next} disabled={currentPage === totalPages} className={btn} aria-label="次のページ">
              <ChevronRight className={isFullscreen ? "w-7 h-7" : "w-5 h-5"} />
            </button>
            <button onClick={zoomOut} disabled={zoom <= MIN_ZOOM} className={btn} aria-label="縮小" title="縮小">
              <ZoomOut className={iconSz} />
            </button>
            <button onClick={zoomIn} disabled={zoom >= MAX_ZOOM} className={btn} aria-label="拡大" title="拡大">
              <ZoomIn className={iconSz} />
            </button>
            {isFullscreen && downloadUrl && (
              <a
                href={downloadUrl}
                download={downloadName}
                className="p-2 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1"
                aria-label="ダウンロード"
                title="PDFをダウンロード"
              >
                <Download className="w-5 h-5" />
              </a>
            )}
            <button
              onClick={toggleFullscreen}
              className={`${isFullscreen ? "p-2" : "p-1.5"} rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1`}
              aria-label={isFullscreen ? "全画面を閉じる" : "全画面表示"}
              title={isFullscreen ? "全画面を閉じる" : "全画面表示"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
