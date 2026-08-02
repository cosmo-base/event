import Link from "next/link"

const NAV = [
  { href: "/cbed", label: "TOP" },
  { href: "/cbed/calendar", label: "カレンダー" },
  { href: "/cbed/map", label: "地図" },
  { href: "/cbed/search", label: "検索" },
]

export default function CbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#000033]">
      <div className="fixed inset-x-0 top-0 z-50 bg-[#000033]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/event/CBED_logo.png" alt="CBED" className="h-7 w-auto object-contain" />
          <nav className="flex gap-1 flex-wrap">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-full text-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <main className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
