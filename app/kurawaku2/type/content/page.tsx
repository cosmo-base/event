import { SpaceType } from "@/components/space-type"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { eventPageData } from "@/data/event-page-data"

export default function SpaceTypeContentPage() {
  const data = eventPageData
  return (
    <div className="min-h-dvh bg-[#0B0F19]">
      <EventHeader logoUrl={data.site.logoUrl} />
      <div className="pt-14">
        <SpaceType />
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
