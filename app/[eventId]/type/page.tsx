import { orgData } from "@/data/org-data"
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { fetchPublicGasEvent } from "@/lib/gas-public"
import { EVENT_STATIC_ROUTES, eventStaticParams } from "@/lib/event-static-params"
import { notFound } from "next/navigation"

export const dynamic = "force-static"
export const generateStaticParams = eventStaticParams

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  if (EVENT_STATIC_ROUTES.has(eventId) || eventId === "__placeholder__") notFound()

  const gas = await fetchPublicGasEvent(eventId)
  if (!gas || gas.published === false || gas.published === "FALSE") notFound()

  const eventName = gas.shortName || gas.name || eventId

  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={orgData.cosmoBase.logoUrl} eventName={eventName} />
      <div className="pt-14">
        <SpaceTypeDiagnosis contentHref={`/${eventId}/type/content`} />
      </div>
      <SocialFooter
        cosmoBase={orgData.cosmoBase}
        fsif={orgData.fsif}
        socialLinks={orgData.socialLinks}
        legalLinks={orgData.legalLinks}
      />
    </div>
  )
}
