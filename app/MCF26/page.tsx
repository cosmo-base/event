import { orgData } from "@/data/org-data"
import { MCF26Data } from "@/data/events/MCF26"
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

const MCF26_QUIZ: QuizData = {
  question: "国際宇宙ステーション(ISS)で宇宙飛行士が飲んでいる水は、主に何をリサイクルして作られているでしょう？",
  options: [
    "汗や尿",
    "氷河の氷",
    "隕石の水分",
  ],
  correctIndex: 0,
  explanation:
    "ISSでは「水再生システム」により、宇宙飛行士の汗や尿、さらには呼気に含まれる水分までも蒸留・ろ過して飲料水として再利用しています。地球からの補給には限りがあるため、限られた資源を無駄なく循環させる仕組みが宇宙生活を支えています。",
}

const SURVEY_QUESTIONS = [
  "本日のブースはいかがでしたか？",
  "Cosmo Baseを知ったきっかけを教えてください。",
  "今後、どんなコンテンツや活動に期待しますか？",
]

export default function Page() {
  const data = { ...orgData, ...MCF26Data }

  return (
    <div className="min-h-dvh bg-background">
      <PageViewTracker eventId="MCF26" />
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

        <SpaceTypeDiagnosisFeature feature={data.spaceType} />

        <ContentExperienceSection contents={data.contents} />

        <LimitedContentSection items={data.limitedContents} eventId="MCF26" quiz={MCF26_QUIZ} />

        <PosterSection pitch={data.pitch} />

        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        <FsifIntroduction fsif={data.fsif} />

        <SurveySection eventId="MCF26" eventName={data.event.name} questions={SURVEY_QUESTIONS} />

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
