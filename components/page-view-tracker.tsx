"use client"

import { useEffect } from "react"
import { sendToGas, flushGasQueue } from "@/lib/gas-queue"

export function PageViewTracker({ eventId }: { eventId: string }) {
  useEffect(() => {
    // Retry any previously queued items from other pages/sessions
    flushGasQueue().catch(() => {})

    const ref = new URLSearchParams(window.location.search).get("ref")
    if (ref === "list" || ref === "preview") {
      try { sessionStorage.setItem("operator_mode", "1") } catch { /* ignore */ }
      return
    }
    const key = `pv_${eventId}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")
    sendToGas({ type: "pageview", eventId }).catch(() => {})
  }, [eventId])

  return null
}
