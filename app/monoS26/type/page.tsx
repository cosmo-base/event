import type { Metadata } from 'next'
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"
import { monoS26Data } from "@/data/events/monoS26"

export const metadata: Metadata = {
  title: 'あなたの宇宙タイプは？ | Cosmo Base',
  description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。',
}

export default function SpaceTypePage() {
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={monoS26Data.site.logoUrl} eventName={monoS26Data.event.shortName} />
      <div className="pt-14">
        <SpaceTypeDiagnosis contentHref="/monoS26/type/content" />
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
