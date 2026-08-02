"use client"

import { useEffect } from "react"
import { sendToGas, flushGasQueue } from "@/lib/gas-queue"

export function PageViewTracker({ eventId }: { eventId: string }) {
  useEffect(() => {
    // Retry any previously queued items from other pages/sessions
    flushGasQueue().catch(() => {})

    if (new URLSearchParams(window.location.search).get("ref") === "list") return
    const key = `pv_${eventId}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")
    sendToGas({ type: "pageview", eventId }).catch(() => {})
  }, [eventId])

  return null
}
