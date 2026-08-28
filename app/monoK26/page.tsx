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
import { SurveySection } from "@/components/event-survey"
import { PitchLockGate } from "@/components/pitch-lock-gate"
import type { QuizData } from "@/components/event-quiz"
import { ExpiryHide } from "@/components/expiry-hide"

const KANTO_QUIZ: QuizData = {
  intro: "今日のイベント会場・浅草橋から近い上野には、宇宙に関する展示も行う科学施設があります。どこでしょう？",
  question: "浅草がある東京都台東区には、宇宙に関係する展示も行う施設があります。それはどれでしょう？",
  options: [
    "国立科学博物館",
    "日本科学未来館",
    "多摩六都科学館",
  ],
  correctIndex: 0,
  explanation:
    "正解は「① 国立科学博物館」です！\n\n台東区上野にある国立科学博物館では、宇宙や天文学に関する資料も展示されています。地球館には隕石などの展示もあり、宇宙から地球まで幅広い科学を学ぶことができます。",
}

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

        <section aria-label="ガチャ" className="mx-auto max-w-6xl px-4 pt-6 pb-2">
          <a href="https://discord.gg/X78w86XE3v" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-1/2 mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/event/images/gacha.png"
              alt="コミュニティ参加で抽選券ゲット"
              className="w-full rounded-3xl"
            />
          </a>
        </section>

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

        <ExpiryHide expiryDate="2026-09-04">
          <LimitedContentSection items={data.limitedContents} eventId="monoK26" quiz={KANTO_QUIZ} />
        </ExpiryHide>

        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        <FsifIntroduction fsif={data.fsif} />

        <SurveySection eventId="monoK26" eventName={data.event.name} questions={SURVEY_QUESTIONS} />

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
