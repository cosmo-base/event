import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { eventPageData } from "@/data/event-page-data"
import Link from "next/link"

const navLinks = [
  { href: "/kurawaku2/cbed", label: "TOP" },
  { href: "/kurawaku2/cbed/calendar", label: "カレンダー" },
  { href: "/kurawaku2/cbed/map", label: "地図" },
  { href: "/kurawaku2/cbed/search", label: "検索" },
]

export default function CbedLayout({ children }: { children: React.ReactNode }) {
  const data = eventPageData
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <main className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/kurawaku2"
              className="text-sm text-white/50 hover:text-white transition-colors shrink-0"
            >
              ← くらわくトーク#2 に戻る
            </Link>
            <nav className="flex gap-1 flex-wrap">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-1.5 rounded-full text-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          {children}
        </div>
      </main>
      <SocialFooter
        cosmoBase={data.cosmoBase}
        fsif={data.fsif}
        socialLinks={data.socialLinks}
        legalLinks={data.legalLinks}
      />
    </div>
  )
}
