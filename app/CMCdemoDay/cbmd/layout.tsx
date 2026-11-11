import Link from "next/link"
import { notFound } from "next/navigation"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"
import { CbmdContextProvider } from "@/components/cbmd-region-context"
import { ContentExpiryGate } from "@/components/content-expiry-gate"
import { fetchPublicGasEvent } from "@/lib/gas-public"
import { parseGasCbmdConfig } from "@/lib/merge-gas-event"

const navLinks = [
  { href: "/CMCdemoDay/cbmd", label: "TOP" },
  { href: "/CMCdemoDay/cbmd/map", label: "マップ" },
  { href: "/CMCdemoDay/cbmd/search", label: "検索" },
  { href: "/CMCdemoDay/cbmd/database", label: "データベース" },
]

const DEFAULT_CENTER: [number, number] = [35.681, 139.767]
const DEFAULT_ZOOM = 10
const DEFAULT_PREFECTURES = ["東京都", "神奈川県", "埼玉県", "千葉県"]

export default async function CMCdemoDayCbmdLayout({ children }: { children: React.ReactNode }) {
  const gas = await fetchPublicGasEvent("CMCdemoDay")
  const cbmd = parseGasCbmdConfig(gas)
  const expiryDate = cbmd.expiryDate ?? "2026-12-31"
  if (new Date() >= new Date(expiryDate)) notFound()
  return (
    <ContentExpiryGate expiryDate={expiryDate} discordUrl="https://discord.gg/X78w86XE3v">
    <CbmdContextProvider
      lockedPrefectures={cbmd.lockedPrefectures ?? DEFAULT_PREFECTURES}
      lockedRegion={cbmd.lockedRegion}
      mapCenter={cbmd.mapCenter ?? DEFAULT_CENTER}
      mapZoom={cbmd.mapZoom ?? DEFAULT_ZOOM}
      basePath="/CMCdemoDay/cbmd"
    >
      <div
          className="min-h-dvh bg-[#000033] dark"
          data-cbmd-gas={gas ? "ok" : "null"}
          data-cbmd-prefectures={cbmd.lockedPrefectures?.join(",") ?? "null"}
        >
        <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/CMCdemoDay"
                className="text-xs text-white/50 hover:text-white/80 transition-colors"
                aria-label="CMC Demo Day 2026 イベントページに戻る"
              >
                ← CMC Demo Day 2026
              </Link>
              <Link href="/CMCdemoDay/cbmd" className="text-white font-bold text-sm">
                📚 CBMD
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
