import Link from "next/link"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"
import { CbmdContextProvider } from "@/components/cbmd-region-context"
import { ContentExpiryGate } from "@/components/content-expiry-gate"

const navLinks = [
  { href: "/StEX26/cbmd", label: "TOP" },
  { href: "/StEX26/cbmd/map", label: "マップ" },
  { href: "/StEX26/cbmd/search", label: "検索" },
  { href: "/StEX26/cbmd/database", label: "データベース" },
]

// Tokyo Innovation Base（千代田区丸の内3-8-3 SusHi Tech Square）付近
const VENUE_CENTER: [number, number] = [35.681, 139.767]
const VENUE_ZOOM = 10

export default function StEX26CbmdLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentExpiryGate expiryDate="2026-09-22" discordUrl="https://discord.gg/X78w86XE3v">
    <CbmdContextProvider
      lockedPrefectures={["東京都", "神奈川県", "埼玉県", "千葉県"]}
      mapCenter={VENUE_CENTER}
      mapZoom={VENUE_ZOOM}
      basePath="/StEX26/cbmd"
    >
      <div className="min-h-dvh bg-[#000033] dark">
        <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/StEX26"
                className="text-xs text-white/50 hover:text-white/80 transition-colors"
                aria-label="StEX 2026 イベントページに戻る"
              >
                ← StEX 2026
              </Link>
              <Link href="/StEX26/cbmd" className="text-white font-bold text-sm">
                📚 CBMD <span className="text-xs font-normal text-white/50">関東</span>
              </Link>
            </div>
            <nav className="flex gap-1 flex-wrap">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 rounded-full text-xs border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="pt-14">{children}</main>
        <SocialFooter
          cosmoBase={orgData.cosmoBase}
          fsif={orgData.fsif}
          socialLinks={orgData.socialLinks}
          legalLinks={orgData.legalLinks}
        />
      </div>
    </CbmdContextProvider>
    </ContentExpiryGate>
  )
}
