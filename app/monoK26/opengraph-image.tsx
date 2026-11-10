import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'
import { monoK26Data } from '@/data/events/monoK26'
import { fetchPublicGasEvent } from '@/lib/gas-public'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const gas = await fetchPublicGasEvent('monoK26')
  return generateEventOgImage({
    eventName: gas?.name ?? monoK26Data.event.name,
    date: gas?.date ?? monoK26Data.event.date,
    venue: gas?.venue ?? monoK26Data.event.venue,
    accent: gas?.accentColor ?? monoK26Data.site.accentColor,
  })
}
