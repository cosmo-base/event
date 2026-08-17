"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Download, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react"

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

  // Refs for event listeners (avoid stale closures)
  const zoomRef = useRef(1)
  const panRef = useRef({ x: 0, y: 0 })
  const baseDisplaySizeRef = useRef({ w: 0, h: 0 })
  useEffect(() => { zoomRef.current = zoom }, [zoom])
  useEffect(() => { panRef.current = pan }, [pan])

  // Drag state
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const panAtDragStart = useRef({ x: 0, y: 0 })

  // Pinch state
  const pinchStartDist = useRef<number | null>(null)
  const pinchStartZoom = useRef(1)

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
    const vp = page.getViewport({ scale: 1 })
    const baseScale = Math.min(container.clientWidth / vp.width, container.clientHeight / vp.height)
    const scaled = page.getViewport({ scale: baseScale * zoomLevel })
    const ctx = canvas.getContext("2d")!
    canvas.width = scaled.width
    canvas.height = scaled.height
    canvas.style.width = `${baseScale * vp.width}px`
    canvas.style.height = `${baseScale * vp.height}px`
    baseDisplaySizeRef.current = { w: baseScale * vp.width, h: baseScale * vp.height }
    const task = page.render({ canvasContext: ctx, viewport: scaled })
    renderTaskRef.current = task
    try { await task.promise } catch { /* cancelled */ }
  }, [])

  useEffect(() => {
    if (!loading && !error) renderPage(currentPage, zoom)
  }, [currentPage, zoom, loading, error, renderPage])

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [currentPage])

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

  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentPage((p) => Math.max(1, p - 1))
      if (e.key === "ArrowRight") setCurrentPage((p) => Math.min(totalPages, p + 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isFullscreen, totalPages])

  // Touch: pinch-to-zoom + drag (registered passive:false to allow preventDefault)
  useEffect(() => {
    const el = contentAreaRef.current
    if (!el) return

    const getDist = (a: Touch, b: Touch) =>
      Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 2) {
        isDragging.current = false
        pinchStartDist.current = getDist(e.touches[0], e.touches[1])
        pinchStartZoom.current = zoomRef.current
      } else if (e.touches.length === 1) {
        pinchStartDist.current = null
        isDragging.current = true
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        panAtDragStart.current = { ...panRef.current }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 2 && pinchStartDist.current != null) {
        const d = getDist(e.touches[0], e.touches[1])
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM,
          pinchStartZoom.current * (d / pinchStartDist.current)))
        zoomRef.current = next
        setZoom(parseFloat(next.toFixed(2)))
        if (next <= 1) { panRef.current = { x: 0, y: 0 }; setPan({ x: 0, y: 0 }) }
      } else if (e.touches.length === 1 && isDragging.current) {
        const raw = {
          x: panAtDragStart.current.x + (e.touches[0].clientX - dragStart.current.x),
          y: panAtDragStart.current.y + (e.touches[0].clientY - dragStart.current.y),
        }
        const newPan = clampPan(raw, zoomRef.current)
        panRef.current = newPan
        setPan(newPan)
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchStartDist.current = null
      if (e.touches.length === 0) {
        isDragging.current = false
      } else if (e.touches.length === 1) {
        // Pinch released to single finger — resume drag
        isDragging.current = true
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        panAtDragStart.current = { ...panRef.current }
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: false })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("touchend", onTouchEnd, { passive: false })
    return () => {
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
    }
  }, []) // refs only — no deps needed

  // Mouse/stylus drag via pointer events
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return
    if (zoomRef.current <= 1) return
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    panAtDragStart.current = { ...panRef.current }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return
    if (!isDragging.current) return
    const raw = {
      x: panAtDragStart.current.x + (e.clientX - dragStart.current.x),
      y: panAtDragStart.current.y + (e.clientY - dragStart.current.y),
    }
    const newPan = clampPan(raw, zoomRef.current)
    panRef.current = newPan
    setPan(newPan)
  }

  const stopDrag = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return
    isDragging.current = false
  }

  const clampPan = (p: { x: number; y: number }, z: number) => {
    const { w, h } = baseDisplaySizeRef.current
    const mx = w * z / 2
    const my = h * z / 2
    return {
      x: Math.max(-mx, Math.min(mx, p.x)),
      y: Math.max(-my, Math.min(my, p.y)),
    }
  }

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, parseFloat((z + ZOOM_STEP).toFixed(2))))
  const zoomOut = () => setZoom((z) => {
    const next = Math.max(MIN_ZOOM, parseFloat((z - ZOOM_STEP).toFixed(2)))
    if (next <= 1) setPan({ x: 0, y: 0 })
    return next
  })

  const prev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const next = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) viewerRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }

  if (error) return (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
      スライドを読み込めませんでした
    </div>
  )

  // Button size: larger on mobile-friendly targets (min 44px touch target)
  const ib = "flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 active:bg-white/25 transition-colors touch-manipulation disabled:opacity-30 disabled:pointer-events-none"
  const btn = `${ib} ${isFullscreen ? "p-3" : "p-2.5"}`
  const iconSz = isFullscreen ? "w-7 h-7" : "w-5 h-5"
  const navSz = isFullscreen ? "w-8 h-8" : "w-6 h-6"

  return (
    <div ref={viewerRef} className="absolute inset-0 flex flex-col bg-black">
      {/* Fullscreen close — top-right overlay */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black/90 transition-colors touch-manipulation"
          aria-label="全画面を閉じる"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Content area */}
      <div
        ref={contentAreaRef}
        className="flex-1 flex items-center justify-center overflow-hidden min-h-0 select-none"
        style={{ cursor: zoom > 1 ? "grab" : "default", touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
      >
        {loading && <span className="text-xs text-white/40 animate-pulse">読み込み中…</span>}
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

      {/* Bottom toolbar */}
      {!loading && (
        <div className={`flex items-center gap-0.5 ${isFullscreen ? "px-6 py-4" : "px-3 py-2"} bg-black/80 shrink-0`}>
          <button onClick={prev} disabled={currentPage === 1} className={btn} aria-label="前のページ">
            <ChevronLeft className={navSz} />
          </button>
          <span className={`${isFullscreen ? "text-sm" : "text-xs"} text-white/60 tabular-nums select-none px-2 min-w-[5ch] text-center`}>
            {currentPage}/{totalPages}
          </span>
          <button onClick={next} disabled={currentPage === totalPages} className={btn} aria-label="次のページ">
            <ChevronRight className={navSz} />
          </button>

          <div className="flex-1" />

          <button onClick={zoomOut} disabled={zoom <= MIN_ZOOM} className={btn} aria-label="縮小">
            <ZoomOut className={iconSz} />
          </button>
          <button onClick={zoomIn} disabled={zoom >= MAX_ZOOM} className={btn} aria-label="拡大">
            <ZoomIn className={iconSz} />
          </button>
          {downloadUrl && (
            <a href={downloadUrl} download={downloadName} className={btn} aria-label="ダウンロード">
              <Download className={iconSz} />
            </a>
          )}
          {!isFullscreen && (
            <button onClick={toggleFullscreen} className={btn} aria-label="全画面表示">
              <Maximize2 className={iconSz} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
