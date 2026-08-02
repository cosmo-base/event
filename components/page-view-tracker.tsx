"use client"

import { useEffect } from "react"

const GAS_URL = "https://script.google.com/macros/s/AKfycbxdFwi6ip7Rf8Dr9q6BvoeXWVjAKRZtSy5oy7F7rZ1OvybDKfpNMAjzfHsJCtB3KUoqaQ/exec"

export function PageViewTracker({ eventId }: { eventId: string }) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("ref") === "list") return
    const key = `pv_${eventId}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")
    fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ type: "pageview", eventId }),
    }).catch(() => {})
  }, [eventId])

  return null
}
