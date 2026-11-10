import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'
import { monoS26Data } from '@/data/events/monoS26'
import { fetchPublicGasEvent } from '@/lib/gas-public'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const gas = await fetchPublicGasEvent('monoS26')
  return generateEventOgImage({
    eventName: gas?.name ?? monoS26Data.event.name,
    date: gas?.date ?? monoS26Data.event.date,
    venue: gas?.venue ?? monoS26Data.event.venue,
    accent: gas?.accentColor ?? monoS26Data.site.accentColor,
  })
}
