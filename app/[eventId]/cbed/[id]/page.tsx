import { fetchEventsData } from "@/data/cbed"
import { fetchPublishedEventIds } from "@/lib/gas-public"
import { EVENT_STATIC_ROUTES } from "@/lib/event-static-params"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams(): Promise<{ eventId: string; id: string }[]> {
  try {
    const [eventIds, events] = await Promise.all([
      fetchPublishedEventIds(),
      fetchEventsData(),
    ])
    const filtered = eventIds.filter((id) => !EVENT_STATIC_ROUTES.has(id))
    if (!filtered.length || !events.length) {
      return [{ eventId: "__placeholder__", id: "_placeholder" }]
    }

    const seen = new Set<string>()
    const eventParams: { id: string }[] = []
    events.forEach((e) => {
      const id = String(e.id).trim()
      if (id && !seen.has(id)) { seen.add(id); eventParams.push({ id }) }
    })
    if (!eventParams.length) return [{ eventId: "__placeholder__", id: "_placeholder" }]

    const results: { eventId: string; id: string }[] = []
    filtered.forEach((eventId) => {
      eventParams.forEach(({ id }) => results.push({ eventId, id }))
    })
    return results
  } catch {
    return [{ eventId: "__placeholder__", id: "_placeholder" }]
  }
}

export { default } from "@/app/cbed/[id]/page"
