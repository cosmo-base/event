import { readFileSync } from 'fs'
import { join } from 'path'
import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

export interface EventOgImageParams {
  eventName: string
  date?: string
  venue?: string
  accent?: string
}

export function generateEventOgImage({ eventName, date, venue, accent = '#f59e0b' }: EventOgImageParams) {
  const jpFont = readFileSync(join(process.cwd(), 'node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff'))
  const latinFont = readFileSync(join(process.cwd(), 'node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-latin-700-normal.woff'))
  const logo = readFileSync(join(process.cwd(), 'public/CB_logo.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`
  const fontSize = eventName.length > 24 ? 50 : eventName.length > 16 ? 60 : 68

  return new ImageResponse(
    (
      <div style={{ width: '1200px', height: '630px', background: 'linear-gradient(145deg,#000020 0%,#00001a 60%,#000030 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: '"Noto Sans JP"', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: `linear-gradient(90deg,transparent 0%,${accent} 40%,${accent} 60%,transparent 100%)` }} />
        <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle,${accent}18 0%,transparent 70%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} style={{ height: '44px', marginBottom: '28px', opacity: 0.9 }} alt="" />
        <div style={{ fontSize: `${fontSize}px`, fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.3, maxWidth: '1000px', padding: '0 60px' }}>
          {eventName}
        </div>
        {(date || venue) && (
          <div style={{ display: 'flex', gap: '36px', marginTop: '28px', color: 'rgba(255,255,255,0.5)', fontSize: '22px' }}>
            {date && <span>{date}</span>}
            {date && venue && <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>}
            {venue && <span>{venue}</span>}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '32px', right: '48px', fontSize: '15px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
          Cosmo Base
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Noto Sans JP', data: toArrayBuffer(jpFont), weight: 700, style: 'normal' },
        { name: 'Noto Sans JP', data: toArrayBuffer(latinFont), weight: 700, style: 'normal' },
      ],
    }
  )
}
