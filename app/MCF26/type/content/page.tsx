import { orgData } from "@/data/org-data"
import { MCF26Data } from "@/data/events/MCF26"
import { SpaceType } from "@/components/space-type"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"

export default function MCF26SpaceTypeContentPage() {
  const data = { ...orgData, ...MCF26Data }
  return (
    <div className="min-h-dvh bg-[#0B0F19]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <div className="pt-14">
        <SpaceType
          eventId="MCF26"
          backHref="/MCF26"
          backLabel="MIRAI CREATOR'Z FES イベントページに戻る"
        />
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
