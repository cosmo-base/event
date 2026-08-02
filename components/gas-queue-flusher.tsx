"use client"

import { useEffect } from "react"
import { flushGasQueue } from "@/lib/gas-queue"

/** Mount on any page that uses GAS exports to retry previously failed sends. */
export function GasQueueFlusher() {
  useEffect(() => {
    flushGasQueue().catch(() => {})
  }, [])
  return null
}
