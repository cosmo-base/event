import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'
import { MCF26Data } from '@/data/events/MCF26'
import { fetchPublicGasEvent } from '@/lib/gas-public'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const gas = await fetchPublicGasEvent('MCF26')
  return generateEventOgImage({
    eventName: gas?.name ?? MCF26Data.event.name,
    date: gas?.date ?? MCF26Data.event.date,
    venue: gas?.venue ?? MCF26Data.event.venue,
    accent: gas?.accentColor ?? MCF26Data.site.accentColor,
  })
}
