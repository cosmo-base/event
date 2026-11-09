import { OG_SIZE, generateEventOgImage } from '@/lib/og-event-image'

export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return generateEventOgImage({
    eventName: '全日本学生ものづくりExpo@信州',
    date: '2026年8月20日',
    venue: 'ホテルメトロポリタン長野',
  })
}
