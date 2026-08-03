"use client"

import { useEffect } from "react"

export function OperatorModeSetter() {
  useEffect(() => {
    try { sessionStorage.setItem("operator_mode", "1") } catch { /* ignore */ }
  }, [])
  return null
}
