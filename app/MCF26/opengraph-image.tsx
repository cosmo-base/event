import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'

export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return generateEventOgImage({
    eventName: "MIRAI CREATOR'Z FES 2026",
    date: '2026年9月14日',
    venue: 'ベルサール半蔵門',
  })
}
