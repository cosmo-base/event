import { orgData } from "@/data/org-data"
import { monoS26Data } from "@/data/events/monoS26"
import { EventHeader } from "@/components/event-header"
import { EventInformation } from "@/components/event-information"
import { HeroCarousel } from "@/components/hero-carousel"
import { QuickAccessGrid } from "@/components/quick-access-grid"
import { PitchMaterialSection, PosterSection } from "@/components/pitch-material-section"
import { ContentExperienceSection } from "@/components/content-experience-section"
import { SpaceTypeDiagnosisFeature } from "@/components/space-type-diagnosis-feature"
import { LimitedContentSection } from "@/components/limited-content-section"
import type { QuizData } from "@/components/event-quiz"
import { CosmoBaseIntroduction } from "@/components/cosmo-base-introduction"
import { FsifIntroduction } from "@/components/fsif-introduction"
import { CommunityCta } from "@/components/community-cta"
import { SocialLinksSection } from "@/components/social-links-section"
import { SocialFooter } from "@/components/social-footer"
import { PageViewTracker } from "@/components/page-view-tracker"
import { SurveySection } from "@/components/event-survey"
import { PitchLockGate } from "@/components/pitch-lock-gate"
import { ExpiryHide } from "@/components/expiry-hide"

const VOYAGER_QUIZ: QuizData = {
  intro: "今日、8月20日は宇宙開発の歴史にとって特別な日。\n1977年のこの日、NASAの惑星探査機「ボイジャー2号」が宇宙へ旅立ちました🚀\n\nでは、ボイジャー2号の打ち上げについて正しいものはどれでしょう？",
  question: "ボイジャー2号の打ち上げについて正しいものはどれでしょう？",
  options: [
    "ボイジャー1号より先に打ち上げられた",
    "ボイジャー1号と同じ日に打ち上げられた",
    "ボイジャー1号より後に打ち上げられた",
  ],
  correctIndex: 0,
  explanation:
    "正解は「① ボイジャー1号より先に打ち上げられた」です！🚀\n\nボイジャー2号は、1977年8月20日にアメリカ・フロリダ州のケープカナベラルから打ち上げられました。一方、ボイジャー1号が打ち上げられたのは、その約2週間後の1977年9月5日です。つまり、「2号」という名前ですが、実際にはボイジャー1号より先に宇宙へ旅立っています。\n\nでは、なぜ先に打ち上げられたのに「2号」なのでしょうか？\n\nボイジャー1号はボイジャー2号よりも速い経路で木星へ向かい、1977年12月にボイジャー2号を追い越しました。木星・土星へ先に到着する計画だったことが、「1号・2号」という名称の順番につながっています。\n\nさらにボイジャー2号は、その後、木星・土星だけでなく天王星と海王星にも接近探査し、現在まで天王星・海王星を訪れた唯一の探査機となっています。",
  link: {
    label: "もっとボイジャー2号について知りたい方はこちら👇",
    href: "https://science.nasa.gov/mission/voyager/voyager-2/",
    description: "NASAの「Voyager 2」公式ページでは、これまでの探査実績や現在のミッションについて詳しく紹介されています。",
  },
}

const SURVEY_QUESTIONS = [
  "本日のブースはいかがでしたか？",
  "Cosmo Baseを知ったきっかけを教えてください。",
  "今後、どんなコンテンツや活動に期待しますか？",
]

export default function Page() {
  const data = { ...orgData, ...monoS26Data }

  return (
    <PitchLockGate pitch={data.pitch}>
    <div className="min-h-dvh bg-background">
      <PageViewTracker eventId="monoS26" />
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

        <ExpiryHide expiryDate="2026-08-27">
          <LimitedContentSection items={data.limitedContents} eventId="monoS26" quiz={VOYAGER_QUIZ} />
        </ExpiryHide>

        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        <FsifIntroduction fsif={data.fsif} />

        <SurveySection eventId="monoS26" eventName={data.event.name} questions={SURVEY_QUESTIONS} />

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
