import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'
import { fetchPublicGasEvent, fetchPublishedEventIds } from '@/lib/gas-public'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

const STATIC_ROUTES = new Set([
  "MCF26", "SDF26", "StEX26", "monoK26", "monoS26",
  "cbed", "cbmd", "cosmomatch", "feedback", "gacha", "kurawaku2", "list", "type",
])

export async function generateStaticParams() {
  const ids = await fetchPublishedEventIds()
  return ids
    .filter(id => !STATIC_ROUTES.has(id))
    .map(id => ({ eventId: id }))
}

export default async function Image({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  const gas = await fetchPublicGasEvent(eventId)
  return generateEventOgImage({
    eventName: gas?.name ?? eventId,
    date: gas?.date ?? '',
    venue: gas?.venue ?? '',
    accent: gas?.accentColor,
  })
}
