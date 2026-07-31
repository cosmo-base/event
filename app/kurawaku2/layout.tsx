import type { Metadata, Viewport } from 'next'
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from 'next/font/google'
import '../globals.css'

const rounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-rounded',
  display: 'swap',
})

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'くらわくトーク#2',
  description:
    '宇宙好きが集まるコミュニティ「Cosmo Base」のイベント特設ページ。ピッチ資料、宇宙コンテンツ、宇宙タイプ診断を体験して、コミュニティに参加しよう。',
  openGraph: {
    title: 'くらわくトーク#2',
    description:
      '宇宙好きが集まるコミュニティ「Cosmo Base」のイベント特設ページ。ピッチ資料や宇宙タイプ診断を体験しよう。',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000033',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`dark bg-[#000033] ${rounded.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
