import type { Metadata, Viewport } from 'next'
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { eventPageData } from "@/data/event-page-data"

export const metadata: Metadata = {
  title: 'あなたの宇宙タイプは？ | Cosmo Base',
  description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。',
}

export default function SpaceTypePage() {
  const data = eventPageData
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <div className="pt-14">
        <SpaceTypeDiagnosis />
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
