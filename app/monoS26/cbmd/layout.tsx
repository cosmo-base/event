import Link from "next/link"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"
import { CbmdContextProvider } from "@/components/cbmd-region-context"

const navLinks = [
  { href: "/monoS26/cbmd", label: "TOP" },
  { href: "/monoS26/cbmd/map", label: "マップ" },
  { href: "/monoS26/cbmd/search", label: "検索" },
  { href: "/monoS26/cbmd/database", label: "データベース" },
]

export default function MonoS26CbmdLayout({ children }: { children: React.ReactNode }) {
  return (
    <CbmdContextProvider lockedRegion="北信越" basePath="/monoS26/cbmd">
      <div className="min-h-dvh bg-[#000033] dark">
        <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
            <Link href="/monoS26/cbmd" className="text-white font-bold text-sm shrink-0">
              📚 CBMD <span className="text-xs font-normal text-white/50">北信越</span>
            </Link>
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
  )
}
