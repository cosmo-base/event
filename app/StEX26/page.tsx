import { orgData } from "@/data/org-data"
import { StEX26Data } from "@/data/events/StEX26"
import { EventHeader } from "@/components/event-header"
import { EventInformation } from "@/components/event-information"
import { HeroCarousel } from "@/components/hero-carousel"
import { QuickAccessGrid } from "@/components/quick-access-grid"
import { ContentExperienceSection } from "@/components/content-experience-section"
import { SpaceTypeDiagnosisFeature } from "@/components/space-type-diagnosis-feature"
import { CosmoBaseIntroduction } from "@/components/cosmo-base-introduction"
import { FsifIntroduction } from "@/components/fsif-introduction"
import { CommunityCta } from "@/components/community-cta"
import { SocialLinksSection } from "@/components/social-links-section"
import { SocialFooter } from "@/components/social-footer"
import { PosterSection } from "@/components/pitch-material-section"
import { LimitedContentSection } from "@/components/limited-content-section"
import { PageViewTracker } from "@/components/page-view-tracker"
import { SurveySection } from "@/components/event-survey"
import type { QuizData } from "@/components/event-quiz"

const STEX26_QUIZ: QuizData = {
  intro: "火星の表面には昼と夜の寒暖差が激しく、砂嵐でソーラーパネルが汚れてしまうこともあります。そのため火星探査車の中には、太陽光に頼らず、放射性物質が崩壊するときに出す熱を利用して発電する仕組みを電源として採用しているものがあります。NASAの火星探査車「Curiosity(キュリオシティ)」もその一つで、この仕組みのおかげで昼夜を問わず安定した電力を確保できています。",
  question: "火星探査車「Curiosity」の電源として使われ、プルトニウム238の崩壊熱を利用して発電する装置の略称はどれでしょう？",
  options: [
    "MMRTG",
    "RTG-II",
    "SNAP-27",
  ],
  correctIndex: 0,
  explanation:
    "CuriosityはMMRTG(Multi-Mission Radioisotope Thermoelectric Generator、多目的放射性同位体熱電気転換器)を電源としています。約4.8kgの二酸化プルトニウム238を、150gずつのペレット32個に詰め込み、その自然崩壊で生じる熱を電気に変換する仕組みです。プルトニウム238の半減期は約87.7年と長いため、太陽光の有無や火星の季節・砂嵐による発電量の変動を気にせず、昼夜を問わず安定して電力を供給できるのが最大の特長です。\n\nちなみに③のSNAP-27は、アポロ計画で月面に設置された観測機器の電源として使われたRTGで、火星探査車の電源ではありません。②のRTG-IIは実在する装置名ではありません。",
}

const SURVEY_QUESTIONS = [
  "本日のブースはいかがでしたか？",
  "Cosmo Baseを知ったきっかけを教えてください。",
  "今後、どんなコンテンツや活動に期待しますか？",
]

export default function Page() {
  const data = { ...orgData, ...StEX26Data }

  return (
    <div className="min-h-dvh bg-background">
      <PageViewTracker eventId="StEX26" />
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

        <SpaceTypeDiagnosisFeature feature={data.spaceType} />

        <ContentExperienceSection contents={data.contents} />

        <LimitedContentSection items={data.limitedContents} eventId="StEX26" quiz={STEX26_QUIZ} />

        <PosterSection pitch={data.pitch} />

        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        <FsifIntroduction fsif={data.fsif} />

        <SurveySection eventId="StEX26" eventName={data.event.name} questions={SURVEY_QUESTIONS} />

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
  )
}
