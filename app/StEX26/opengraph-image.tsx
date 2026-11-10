import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'
import { StEX26Data } from '@/data/events/StEX26'
import { fetchPublicGasEvent } from '@/lib/gas-public'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const gas = await fetchPublicGasEvent('StEX26')
  return generateEventOgImage({
    eventName: gas?.name ?? StEX26Data.event.name,
    date: gas?.date ?? StEX26Data.event.date,
    venue: gas?.venue ?? StEX26Data.event.venue,
    accent: gas?.accentColor ?? StEX26Data.site.accentColor,
  })
}
