import { orgData } from "@/data/org-data"
import { MCF26Data } from "@/data/events/MCF26"
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"

export default function MCF26SpaceTypePage() {
  const data = { ...orgData, ...MCF26Data }
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <div className="pt-14">
        <SpaceTypeDiagnosis contentHref="/MCF26/type/content" />
      </div>
      <SocialFooter
        cosmoBase={data.cosmoBase}
        fsif={data.fsif}
        socialLinks={data.socialLinks}
        legalLinks={data.legalLinks}
      />
    </div>
  )
}
