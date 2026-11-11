import { orgData } from "@/data/org-data"
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"

export default function CMCdemoDaySpaceTypePage() {
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl="/CB_logo.png" eventName="CMC Demo Day 2026" />
      <div className="pt-14">
        <SpaceTypeDiagnosis contentHref="/CMCdemoDay/type/content" />
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
