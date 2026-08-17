"use client"

import { useEffect } from "react"
import { sendToGas } from "@/lib/gas-queue"

export function CbedViewTracker({ cbedId, eventTitle }: { cbedId: string; eventTitle: string }) {
  useEffect(() => {
    const segments = window.location.pathname.split("/")
    const cbedIdx = segments.indexOf("cbed")
    const ctx = cbedIdx > 0 ? segments[cbedIdx - 1] : "unknown"
    const eventId = ctx === "event" ? "standalone" : ctx
    sendToGas({ type: "cbed_view", eventId, cbedId, eventTitle }).catch(() => {})
  }, [cbedId, eventTitle])
  return null
}
