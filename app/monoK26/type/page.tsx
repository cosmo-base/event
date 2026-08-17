import { orgData } from "@/data/org-data"
import { monoK26Data } from "@/data/events/monoK26"
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"

export default function MonoK26SpaceTypePage() {
  const data = { ...orgData, ...monoK26Data }
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <div className="pt-14">
        <SpaceTypeDiagnosis contentHref="/monoK26/type/content" />
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
