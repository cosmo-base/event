import { orgData } from "@/data/org-data"
import { monoK26Data } from "@/data/events/monoK26"
import { SpaceType } from "@/components/space-type"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"

export default function MonoK26SpaceTypeContentPage() {
  const data = { ...orgData, ...monoK26Data }
  return (
    <div className="min-h-dvh bg-[#0B0F19]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <div className="pt-14">
        <SpaceType
          eventId="monoK26"
          backHref="/monoK26"
          backLabel="monoK26 イベントページに戻る"
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
