"use client"

import { useEffect } from "react"

const REDIRECT_URL = "https://fsifofficial.github.io/CosmoBase/"

export default function Home() {
  useEffect(() => {
    window.location.replace(REDIRECT_URL)
  }, [])

  return (
    <meta httpEquiv="refresh" content={`0;url=${REDIRECT_URL}`} />
  )
}
