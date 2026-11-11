import { orgData } from "@/data/org-data"
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
import { PitchMaterialSection, PosterSection } from "@/components/pitch-material-section"
import { EventQuiz } from "@/components/event-quiz"
import type { QuizData } from "@/components/event-quiz"
import { LimitedContentSection } from "@/components/limited-content-section"
import { PageViewTracker } from "@/components/page-view-tracker"
import { SurveySection } from "@/components/event-survey"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { ExpiryHide } from "@/components/expiry-hide"
import { notFound } from "next/navigation"
import { fetchPublicGasEvent, fetchFullGasEvent, fetchPublishedEventIds } from "@/lib/gas-public"
import { mergeGasEvent, mergeFullGasEvent, mergeGasSurveyQuestions, mergeGasQuiz, parseGasCbmdConfig } from "@/lib/merge-gas-event"
import type { EventSpecificData } from "@/data/event-page-data"

// Allow cache: "no-store" fetches in output: "export" mode (Next.js 15+ defaults to dynamic="error")
export const dynamic = "force-static"

// Known static routes — dynamic route must not shadow them
const STATIC_ROUTES = new Set([
  "MCF26", "SDF26", "StEX26", "monoK26", "monoS26",
  "cbed", "cbmd", "cosmomatch", "feedback", "gacha", "kurawaku2", "list", "type",
])

// Minimal stub so mergeGasEvent has something to work with
const BASE_EVENT_DATA: EventSpecificData = {
  site: {
    pageTitle: "Cosmo Base イベント特設ページ",
    pageDescription: "Cosmo Base のイベント特設ページ。宇宙タイプ診断などのコンテンツを、その場で体験できます。",
    siteName: "Cosmo Base",
    url: "https://cosmo-base.example.com",
    logoUrl: "/CB_logo.png",
    fsifLogoUrl: "/FSIF_logo.png",
    accentColor: "#f59e0b",
    ogImage: "/images/hero-event.png",
    noindex: true,
  },
  event: {
    name: "",
    shortName: "",
    date: "",
    venue: "",
    participationType: "",
    exhibitorName: "",
    message: "",
  },
  carousel: [
    {
      id: "slide-main",
      title: "",
      description: "Cosmo Base のコンテンツを、この会場でそのまま体験できます。",
      buttonLabel: "コンテンツを見る",
      href: "#contents",
      gradient: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)",
      centered: true,
    },
  ],
  quickLinks: [],
  pitch: {
    title: "発表・ポスター",
    presentationTitle: "",
    description: "",
    speakerName: "",
    presentationDate: "",
    slideUrl: "",
  },
  spaceType: {
    badges: [],
    title: "",
    description: "",
    duration: "",
    questionCount: "",
    requirement: "",
    buttonLabel: "",
    href: "",
  },
  contents: [],
  limitedContents: [],
  communityCta: {
    title: "宇宙コミュニティへようこそ",
    description: "Cosmo Base は宇宙好きが集まるコミュニティです。",
    primaryLabel: "コミュニティに参加する",
    primaryHref: "https://discord.gg/X78w86XE3v",
    secondaryLinks: [],
  },
}

const DEFAULT_SURVEY_QUESTIONS = [
  "本日のブースはいかがでしたか？",
  "Cosmo Baseを知ったきっかけを教えてください。",
  "今後、どんなコンテンツや活動に期待しますか？",
]

export async function generateStaticParams() {
  const ids = await fetchPublishedEventIds()
  const filtered = ids
    .filter(id => !STATIC_ROUTES.has(id))
    .map(id => ({ eventId: id }))
  // output: export requires at least one param; use a placeholder when GAS returns nothing
  return filtered.length > 0 ? filtered : [{ eventId: "__placeholder__" }]
}

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params

  if (STATIC_ROUTES.has(eventId)) notFound()

  const [gas, gasFull] = await Promise.all([
    fetchPublicGasEvent(eventId),
    fetchFullGasEvent(eventId),
  ])

  if (gas && (gas.published === false || gas.published === "FALSE")) notFound()
  if (!gas) console.warn(`[page] gas null for eventId=${eventId}, rendering with defaults`)

  const data = mergeFullGasEvent(mergeGasEvent({ ...orgData, ...BASE_EVENT_DATA }, gas), gasFull)
  const surveyQuestions = mergeGasSurveyQuestions(DEFAULT_SURVEY_QUESTIONS, gas)
  const { expiryDate } = parseGasCbmdConfig(gas)
  const EMPTY_QUIZ: QuizData = { question: "", options: [], correctIndex: 0, explanation: "" }
  // GAS CacheService can serve stale quizQuestion; list events where quiz is confirmed disabled.
  const QUIZ_DISABLED_EVENTS = new Set(["CMCdemoDay"])
  const quiz = !QUIZ_DISABLED_EVENTS.has(eventId) && gas?.quizQuestion?.trim() ? mergeGasQuiz(EMPTY_QUIZ, gas) : null

  const accentStyle = data.site.accentColor
    ? ({ "--color-primary": data.site.accentColor } as React.CSSProperties)
    : undefined

  return (
    <div className="min-h-dvh bg-background" style={accentStyle}>
      <PageViewTracker eventId={eventId} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        本文へスキップ
      </a>

      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName || data.event.name} />

      <main id="main">
        <AnnouncementBanner text={gas?.announcementText} />
        <EventInformation event={data.event} />

        <section aria-label="お知らせ" className="mx-auto max-w-6xl px-4 pb-4">
          <HeroCarousel slides={data.carousel} />
        </section>

        {data.quickLinks.length > 0 && (
          <section aria-labelledby="quick-access-heading" className="py-10">
            <div className="mx-auto max-w-6xl px-4">
              <QuickAccessGrid links={data.quickLinks} />
            </div>
          </section>
        )}

        {data.spaceType?.title && <SpaceTypeDiagnosisFeature feature={data.spaceType} />}

        {data.contents.length > 0 && <ContentExperienceSection contents={data.contents} />}

        {(data.limitedContents.length > 0 || quiz) && (
          expiryDate ? (
            <ExpiryHide expiryDate={expiryDate}>
              <LimitedContentSection items={data.limitedContents} eventId={eventId} quiz={quiz ?? undefined} />
            </ExpiryHide>
          ) : (
            <LimitedContentSection items={data.limitedContents} eventId={eventId} quiz={quiz ?? undefined} />
          )
        )}

        {data.pitch?.presentationTitle && (data.pitch.embedUrl || data.pitch.slideUrl) && (
          <PitchMaterialSection pitch={data.pitch} />
        )}

        {data.pitch?.posters && data.pitch.posters.length > 0 && (
          <PosterSection pitch={data.pitch} />
        )}

        <CosmoBaseIntroduction cosmoBase={data.cosmoBase} />

        <FsifIntroduction fsif={data.fsif} />

        <SurveySection eventId={eventId} eventName={data.event.name} questions={surveyQuestions} />

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
