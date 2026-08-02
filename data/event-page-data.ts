// ============================================================================
// 型定義 + くらわくトーク#2 用 eventPageData の組み立て
//
// 各コンポーネントはここから型・データをインポートしてください。
// 新しいイベントを追加するときは:
//   1. data/events/<event-id>.ts を作成（EventSpecificData を満たす）
//   2. app/<event-id>/ 以下でそのデータと orgData を組み合わせて使う
// ============================================================================

import { orgData } from "@/data/org-data"
import { kurawaku2Data } from "@/data/events/kurawaku2"

export type { OrgData } from "@/data/org-data"

// ─────────────────────────────────────────────
// 共通の型
// ─────────────────────────────────────────────

export type ContentStatus = "available" | "limited" | "coming-soon" | "ended"

export type IconName =
  | "presentation"
  | "rocket"
  | "building"
  | "file"
  | "sparkles"
  | "help"
  | "users"
  | "message"
  | "external"
  | "quiz"

export interface CarouselSlide {
  id: string
  label?: string
  title: string
  description: string
  imageUrl?: string
  href?: string
  buttonLabel?: string
  secondaryLabel?: string
  secondaryHref?: string
  external?: boolean
  gradient?: string
  centered?: boolean
}

export interface QuickLink {
  id: string
  title: string
  description: string
  href: string
  icon: IconName
  external: boolean
  featured?: boolean
  event?: string
}

export interface PitchData {
  title: string
  presentationTitle: string
  description: string
  speakerName: string
  presentationDate: string
  presentationTime?: string
  thumbnailUrl?: string
  slideUrl: string
  embedUrl?: string
  pdfUrl?: string
  supplementaryUrl?: string
}

export interface ContentItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  duration?: string
  audience?: string
  labels: string[]
  status: ContentStatus
  external: boolean
  icon?: IconName
}

export interface LimitedContentItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  duration?: string
  labels: string[]
  status: ContentStatus
  availableFrom?: string
  availableUntil?: string
  requiresPassword?: boolean
  external: boolean
}

export interface SpaceTypeFeature {
  badges: string[]
  title: string
  description: string
  duration: string
  questionCount: string
  requirement: string
  buttonLabel: string
  href: string
  imageUrl?: string
}

// ─────────────────────────────────────────────
// イベント固有データの型
// ─────────────────────────────────────────────

export interface EventSpecificData {
  site: {
    pageTitle: string
    pageDescription: string
    siteName: string
    url: string
    logoUrl: string
    fsifLogoUrl?: string
    accentColor: string
    ogImage: string
    noindex: boolean
  }

  event: {
    name: string
    shortName: string
    date: string
    venue: string
    boothNumber?: string
    pitchTime?: string
    participationType: string
    exhibitorName: string
    message: string
    reportUrl?: string
  }

  carousel: CarouselSlide[]
  quickLinks: QuickLink[]
  pitch: PitchData
  spaceType: SpaceTypeFeature
  contents: ContentItem[]
  limitedContents: LimitedContentItem[]

  communityCta: {
    title: string
    description: string
    primaryLabel: string
    primaryHref: string
    secondaryLinks: { label: string; href: string; event?: string; anchor?: boolean }[]
  }
}

// ─────────────────────────────────────────────
// 合成型（後方互換）
// ─────────────────────────────────────────────

export type EventPageData = EventSpecificData & {
  cosmoBase: {
    description: string[]
    features: string[]
    stats: { label: string; value: string }[]
    websiteUrl: string
    communityUrl: string
    contentsAnchor: string
  }
  fsif: {
    name: string
    englishName: string
    description: string[]
    mission: string
    vision: string
    purpose: string
    websiteUrl: string
  }
  socialLinks: {
    x?: string
    instagram?: string
    facebook?: string
    youtube?: string
    tiktok?: string
    note?: string
    discord?: string
  }
  legalLinks: {
    contact?: string
    privacyPolicy?: string
    terms?: string
  }
}

// ─────────────────────────────────────────────
// くらわくトーク#2 用（既存インポートとの後方互換）
// ─────────────────────────────────────────────

export const eventPageData: EventPageData = {
  ...orgData,
  ...kurawaku2Data,
}

export default eventPageData
