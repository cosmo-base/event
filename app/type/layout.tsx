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
  title: 'あなたの宇宙タイプは？ | Cosmo Base',
  description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000033',
  width: 'device-width',
  initialScale: 1,
}

export default function TypeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${rounded.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
