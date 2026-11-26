import type { Metadata, Viewport } from 'next'
import { SpaceTypeDiagnosis } from "@/components/space-type-diagnosis"
import { EventHeader } from "@/components/event-header"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"

export const metadata: Metadata = {
  title: 'あなたの宇宙タイプは？ | Cosmo Base',
  description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。',
}

export default function SpaceTypePage() {
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl="/CB_logo.png" eventName="" />
      <div className="pt-14">
        <SpaceTypeDiagnosis />
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
