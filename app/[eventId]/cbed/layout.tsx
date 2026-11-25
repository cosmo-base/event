import Link from "next/link"
import { notFound } from "next/navigation"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"
import { EventHeader } from "@/components/event-header"
import { ContentExpiryGate } from "@/components/content-expiry-gate"
import { fetchPublicGasEvent } from "@/lib/gas-public"
import { parseGasCbmdConfig } from "@/lib/merge-gas-event"

export default async function EventCbedLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params
  const gas = await fetchPublicGasEvent(eventId)
  const cbmd = parseGasCbmdConfig(gas)

  // cbmdExpiryDate が未設定のイベントは CBED 非対応
  if (!cbmd.expiryDate) notFound()
  if (new Date() >= new Date(cbmd.expiryDate)) notFound()

  const eventName = gas?.shortName || gas?.name || eventId
  const basePath = `/${eventId}/cbed`
  const navLinks = [
    { href: basePath, label: "TOP" },
    { href: `${basePath}/calendar`, label: "カレンダー" },
    { href: `${basePath}/map`, label: "地図" },
    { href: `${basePath}/search`, label: "検索" },
  ]

  return (
    <ContentExpiryGate expiryDate={cbmd.expiryDate} discordUrl="https://discord.gg/X78w86XE3v">
      <div className="min-h-dvh bg-[#000033]">
        <EventHeader logoUrl="/CB_logo.png" eventName={eventName} />
        <main className="pt-14">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href={`/${eventId}`}
                className="text-sm text-white/50 hover:text-white transition-colors shrink-0"
              >
                ← {eventName} に戻る
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
          cosmoBase={orgData.cosmoBase}
          fsif={orgData.fsif}
          socialLinks={orgData.socialLinks}
          legalLinks={orgData.legalLinks}
        />
      </div>
    </ContentExpiryGate>
  )
}
