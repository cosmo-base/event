import { orgData } from "@/data/org-data"
import { monoK26Data } from "@/data/events/monoK26"
import { EventHeader } from "@/components/event-header"
import { EventInformation } from "@/components/event-information"
import { HeroCarousel } from "@/components/hero-carousel"
import { QuickAccessGrid } from "@/components/quick-access-grid"
import { PitchMaterialSection, PosterSection } from "@/components/pitch-material-section"
import { ContentExperienceSection } from "@/components/content-experience-section"
import { SpaceTypeDiagnosisFeature } from "@/components/space-type-diagnosis-feature"
import { LimitedContentSection } from "@/components/limited-content-section"
import { CosmoBaseIntroduction } from "@/components/cosmo-base-introduction"
import { FsifIntroduction } from "@/components/fsif-introduction"
import { CommunityCta } from "@/components/community-cta"
import { SocialLinksSection } from "@/components/social-links-section"
import { SocialFooter } from "@/components/social-footer"
import { PageViewTracker } from "@/components/page-view-tracker"
import { EventSurvey } from "@/components/event-survey"
import { PitchLockGate } from "@/components/pitch-lock-gate"

const SURVEY_QUESTIONS = [
  "本日のブースはいかがでしたか？",
  "Cosmo Baseを知ったきっかけを教えてください。",
  "今後、どんなコンテンツや活動に期待しますか？",
]

export default function Page() {
  const data = { ...orgData, ...monoK26Data }

  return (
    <PitchLockGate pitch={data.pitch}>
    <div className="min-h-dvh bg-background">
      <PageViewTracker eventId="monoK26" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        本文へスキップ
      </a>

      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />

      <main id="main">
        <EventInformation event={data.event} />

        <section aria-label="お知らせ" className="mx-auto max-w-6xl px-4 pb-4">
          <HeroCarousel slides={data.carousel} />
        </section>

        <section aria-labelledby="quick-access-heading" className="py-10">
          <div className="mx-auto max-w-6xl px-4">
            <QuickAccessGrid links={data.quickLinks} />
          </div>
        </section>

        <PitchMaterialSection pitch={data.pitch} />
        <PosterSection pitch={data.pitch} />

        <SpaceTypeDiagnosisFeature feature={data.spaceType} />

        <ContentExperienceSection contents={data.contents} />

        <LimitedContentSection items={data.limitedContents} eventId="monoK26" />

        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        <FsifIntroduction fsif={data.fsif} />

        <section id="survey" aria-labelledby="survey-heading" className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <h2 id="survey-heading" className="text-xl font-bold mb-6">アンケート</h2>
            <EventSurvey eventId="monoK26" eventName={data.event.name} questions={SURVEY_QUESTIONS} />
          </div>
        </section>

        <CommunityCta cta={data.communityCta} reportUrl={data.event.reportUrl} />

        <SocialLinksSection socialLinks={data.socialLinks} />
      </main>

      <SocialFooter
        cosmoBase={data.cosmoBase}
        fsif={data.fsif}
        socialLinks={data.socialLinks}
        legalLinks={data.legalLinks}
      />
    </div>
    </PitchLockGate>
  )
}
