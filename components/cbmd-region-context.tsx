"use client"

import { createContext, useContext } from "react"

interface CbmdContextValue {
  lockedRegion: string | null
  basePath: string
}

const CbmdContext = createContext<CbmdContextValue>({ lockedRegion: null, basePath: "/cbmd" })

export function CbmdContextProvider({
  lockedRegion,
  basePath,
  children,
}: {
  lockedRegion: string | null
  basePath: string
  children: React.ReactNode
}) {
  return <CbmdContext.Provider value={{ lockedRegion, basePath }}>{children}</CbmdContext.Provider>
}

export function useCbmdContext() {
  return useContext(CbmdContext)
}
