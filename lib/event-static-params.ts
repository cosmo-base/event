import { fetchPublishedEventIds } from "./gas-public"

// Routes that have dedicated static directories — [eventId] must not shadow them
export const EVENT_STATIC_ROUTES = new Set([
  "MCF26", "SDF26", "StEX26", "monoK26", "monoS26",
  "cbed", "cbmd", "cosmomatch", "feedback", "gacha", "kurawaku2", "list", "type",
])

export async function eventStaticParams(): Promise<{ eventId: string }[]> {
  const ids = await fetchPublishedEventIds()
  const filtered = ids.filter(id => !EVENT_STATIC_ROUTES.has(id))
  return filtered.length > 0 ? filtered.map(id => ({ eventId: id })) : [{ eventId: "__placeholder__" }]
}
