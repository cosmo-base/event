import { orgData } from "@/data/org-data"
import { SpaceType } from "@/components/space-type"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"

export default function CMCdemoDaySpaceTypeContentPage() {
  return (
    <div className="min-h-dvh bg-[#0B0F19]">
      <EventHeader logoUrl="/CB_logo.png" eventName="CMC Demo Day 2026" />
      <div className="pt-14">
        <SpaceType
          eventId="CMCdemoDay"
          backHref="/CMCdemoDay"
          backLabel="CMC Demo Day 2026 イベントページに戻る"
        />
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
