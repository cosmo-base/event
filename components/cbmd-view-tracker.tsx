"use client"

import { useEffect } from "react"
import { sendToGas } from "@/lib/gas-queue"

export function CbmdViewTracker({ facilityId, facilityName }: { facilityId: string; facilityName: string }) {
  useEffect(() => {
    const segments = window.location.pathname.split("/")
    const cbmdIdx = segments.indexOf("cbmd")
    const ctx = cbmdIdx > 0 ? segments[cbmdIdx - 1] : "unknown"
    const eventId = ctx === "event" ? "standalone" : ctx
    sendToGas({ type: "cbmd_view", eventId, facilityId, facilityName }).catch(() => {})
  }, [facilityId, facilityName])
  return null
}
