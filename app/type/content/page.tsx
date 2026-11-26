import { SpaceType } from "@/components/space-type"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"

export default function SpaceTypeContentPage() {
  return (
    <div className="min-h-dvh bg-[#0B0F19]">
      <EventHeader logoUrl="/CB_logo.png" eventName="" />
      <div className="pt-14">
        <SpaceType eventId="type" />
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
