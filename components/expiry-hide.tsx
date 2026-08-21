"use client"

import { useEffect, useState } from "react"

export function ExpiryHide({ expiryDate, children }: { expiryDate: string; children: React.ReactNode }) {
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    setExpired(new Date() >= new Date(expiryDate))
  }, [expiryDate])
  if (expired) return null
  return <>{children}</>
}
