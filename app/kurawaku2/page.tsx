import { eventPageData } from "@/data/event-page-data"
import { EventHeader } from "@/components/event-header"
import { EventInformation } from "@/components/event-information"
import { HeroCarousel } from "@/components/hero-carousel"
import { QuickAccessGrid } from "@/components/quick-access-grid"
import { PitchMaterialSection } from "@/components/pitch-material-section"
import { ContentExperienceSection } from "@/components/content-experience-section"
import { SpaceTypeDiagnosisFeature } from "@/components/space-type-diagnosis-feature"
import { LimitedContentSection } from "@/components/limited-content-section"
import { CosmoBaseIntroduction } from "@/components/cosmo-base-introduction"
import { FsifIntroduction } from "@/components/fsif-introduction"
import { CommunityCta } from "@/components/community-cta"
import { SocialLinksSection } from "@/components/social-links-section"
import { SocialFooter } from "@/components/social-footer"

export default function Page() {
  const data = eventPageData

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        本文へスキップ
      </a>

      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />

      <main id="main">
        {/* イベント情報 */}
        <EventInformation event={data.event} />

        {/* メインビジュアル（カルーセル） */}
        <section aria-label="お知らせ" className="mx-auto max-w-6xl px-4 pb-4">
          <HeroCarousel slides={data.carousel} />
        </section>

        {/* クイックアクセス */}
        <section aria-labelledby="quick-access-heading" className="py-10">
          <div className="mx-auto max-w-6xl px-4">
            <QuickAccessGrid links={data.quickLinks} />
          </div>
        </section>

        {/* ピッチ資料 */}
        <PitchMaterialSection pitch={data.pitch} />

        {/* 宇宙タイプ診断 */}
        <SpaceTypeDiagnosisFeature feature={data.spaceType} />

        {/* 宇宙コンテンツ体験 */}
        <ContentExperienceSection contents={data.contents} />

        {/* 限定コンテンツ */}
        <LimitedContentSection items={data.limitedContents} eventId="kurawaku2" />

        {/* Cosmo Base 紹介 */}
        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        {/* FSIF 紹介 */}
        <FsifIntroduction fsif={data.fsif} />

        {/* コミュニティ参加 CTA */}
        <CommunityCta cta={data.communityCta} reportUrl={data.event.reportUrl} />

        {/* SNS リンク */}
        <SocialLinksSection socialLinks={data.socialLinks} />
      </main>

      {/* フッター */}
      <SocialFooter
        cosmoBase={data.cosmoBase}
        fsif={data.fsif}
        socialLinks={data.socialLinks}
        legalLinks={data.legalLinks}
      />
    </div>
  )
}
