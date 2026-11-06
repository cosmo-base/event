// Build-time data fetching from GAS web app
// Set NEXT_PUBLIC_GAS_URL in .env.local or GitHub Secrets

import type { EventSpecificData } from "@/data/event-page-data"

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL

export interface EventMeta {
  eventId: string
  published: boolean
  name: string
  shortName: string
  date: string
  venue: string
  participationType: string
}

export async function fetchPublishedEvents(): Promise<EventMeta[]> {
  if (!GAS_URL) return []
  try {
    const res = await fetch(`${GAS_URL}?action=events`, { next: { revalidate: 0 } })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export async function fetchEventData(eventId: string): Promise<EventSpecificData | null> {
  if (!GAS_URL) return null
  try {
    const res = await fetch(`${GAS_URL}?action=event&id=${encodeURIComponent(eventId)}`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchAllEventsData(): Promise<Record<string, EventSpecificData>> {
  if (!GAS_URL) return {}
  try {
    const res = await fetch(`${GAS_URL}?action=all`, { next: { revalidate: 0 } })
    if (!res.ok) return {}
    return await res.json()
  } catch {
    return {}
  }
}
