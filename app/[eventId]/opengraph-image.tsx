import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'
import { fetchPublicGasEvent } from '@/lib/gas-public'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export async function generateStaticParams() {
  return []
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
