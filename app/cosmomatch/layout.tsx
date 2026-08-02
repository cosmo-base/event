import Link from "next/link"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"

export default function CosmoMatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#000033] dark">
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          <Link href="/cosmomatch" className="text-white font-bold text-sm shrink-0">
            💫 Cosmo Match
          </Link>
          <nav className="flex gap-1">
            <Link href="/cosmomatch/rocket" className="px-3 py-1.5 rounded-full text-xs border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              ロケット編
            </Link>
            <Link href="/cosmomatch/constellation" className="px-3 py-1.5 rounded-full text-xs border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              星座編
            </Link>
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
  )
}
