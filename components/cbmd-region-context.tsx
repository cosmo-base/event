"use client"

import { createContext, useContext } from "react"

interface CbmdContextValue {
  lockedRegion: string | null
  lockedPrefectures: string[] | null
  mapCenter: [number, number] | null
  mapZoom: number | null
  basePath: string
}

const CbmdContext = createContext<CbmdContextValue>({
  lockedRegion: null,
  lockedPrefectures: null,
  mapCenter: null,
  mapZoom: null,
  basePath: "/cbmd",
})

export function CbmdContextProvider({
  lockedRegion = null,
  lockedPrefectures = null,
  mapCenter = null,
  mapZoom = null,
  basePath,
  children,
}: {
  lockedRegion?: string | null
  lockedPrefectures?: string[] | null
  mapCenter?: [number, number] | null
  mapZoom?: number | null
  basePath: string
  children: React.ReactNode
}) {
  return (
    <CbmdContext.Provider value={{ lockedRegion, lockedPrefectures, mapCenter, mapZoom, basePath }}>
      {children}
    </CbmdContext.Provider>
  )
}

export function useCbmdContext() {
  return useContext(CbmdContext)
}
