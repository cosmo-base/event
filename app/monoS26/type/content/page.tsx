import { SpaceType } from "@/components/space-type"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"
import { monoS26Data } from "@/data/events/monoS26"

export default function SpaceTypeContentPage() {
  return (
    <div className="min-h-dvh bg-[#0B0F19]">
      <EventHeader logoUrl={monoS26Data.site.logoUrl} eventName={monoS26Data.event.shortName} />
      <div className="pt-14">
        <SpaceType eventId="monoS26" backHref="/monoS26" backLabel="ものづくりExpo信州 イベントページに戻る" />
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
