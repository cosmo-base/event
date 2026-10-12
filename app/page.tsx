"use client"

import { useEffect } from "react"

const REDIRECT_URL = "https://cosmobase.fsif.jp/"

export default function Home() {
  useEffect(() => {
    window.location.replace(REDIRECT_URL)
  }, [])

  return (
    <meta httpEquiv="refresh" content={`0;url=${REDIRECT_URL}`} />
  )
}
