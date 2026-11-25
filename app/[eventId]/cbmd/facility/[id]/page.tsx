import { fetchFacilitiesData } from "@/data/CBMD"
import { fetchPublicGasEvent, fetchPublishedEventIds } from "@/lib/gas-public"
import { parseGasCbmdConfig } from "@/lib/merge-gas-event"
import { EVENT_STATIC_ROUTES } from "@/lib/event-static-params"

const DEFAULT_PREFECTURES = ["東京都", "神奈川県", "埼玉県", "千葉県"]

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams(): Promise<{ eventId: string; id: string }[]> {
  try {
    const [eventIds, facilities] = await Promise.all([
      fetchPublishedEventIds(),
      fetchFacilitiesData(),
    ])
    const filtered = eventIds.filter((id) => !EVENT_STATIC_ROUTES.has(id))
    if (!filtered.length) return [{ eventId: "__placeholder__", id: "_placeholder" }]

    const results: { eventId: string; id: string }[] = []
    await Promise.all(
      filtered.map(async (eventId) => {
        try {
          const gas = await fetchPublicGasEvent(eventId)
          const cbmd = parseGasCbmdConfig(gas)
          if (!cbmd.expiryDate) return
          const prefectures = cbmd.lockedPrefectures ?? DEFAULT_PREFECTURES
          const subset = facilities.filter((f) => prefectures.includes(f.prefecture))
          if (!subset.length) return
          subset.forEach((f) => results.push({ eventId, id: String(f.id).trim() }))
        } catch {
          // skip this event
        }
      })
    )
    if (!results.length) return [{ eventId: "__placeholder__", id: "_placeholder" }]
    return results
  } catch {
    return [{ eventId: "__placeholder__", id: "_placeholder" }]
  }
}

export { default } from "@/app/cbmd/facility/[id]/page"
