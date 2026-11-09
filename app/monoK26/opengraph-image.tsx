import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return generateEventOgImage({
    eventName: '全日本学生ものづくりExpo@関東',
    date: '2026年8月28日',
    venue: '東京都立産業貿易センター台東館',
  })
}
