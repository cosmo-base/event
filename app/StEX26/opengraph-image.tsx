import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return generateEventOgImage({
    eventName: '学生宇宙探査カンファレンスStEX 2026',
    date: '2026年9月15日',
    venue: 'Tokyo Innovation Base',
  })
}
