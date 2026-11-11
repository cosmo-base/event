// Build-time utility: fetch public event data from GAS (no auth required).
// GAS doGet ?action=publicEvent&id=<eventId> returns the flat event row.
// Returns null on failure so event pages gracefully fall back to static data.

export interface GasEventPublicData {
  eventId: string
  name?: string
  shortName?: string
  date?: string
  venue?: string
  participationType?: string
  exhibitorName?: string
  boothNumber?: string
  pitchTime?: string
  message?: string
  announcementText?: string
  reportUrl?: string
  websiteUrl?: string
  registrationUrl?: string
  twitterUrl?: string
  heroTitle?: string
  heroDescription?: string
  heroGradient?: string
  heroButtonLabel?: string
  heroButtonHref?: string
  presentationTitle?: string
  presentationDescription?: string
  speakerName?: string
  presentationDate?: string
  slideUrl?: string
  pdfUrl?: string
  embedUrl?: string
  poster1Title?: string
  poster1PdfUrl?: string
  poster1EmbedUrl?: string
  poster2Title?: string
  poster2PdfUrl?: string
  surveyQ1?: string
  surveyQ2?: string
  surveyQ3?: string
  pageTitle?: string
  pageDescription?: string
  accentColor?: string
  noindex?: boolean | string
  published?: boolean | string
  // quiz fields (options are pipe-separated)
  quizIntro?: string
  quizQuestion?: string
  quizOptions?: string
  quizCorrectIndex?: number | string
  quizExplanation?: string
  quizLinkLabel?: string
  quizLinkHref?: string
  quizLinkDescription?: string
  // contents selection (pipe-separated content IDs; empty = show all)
  selectedContentIds?: string
  // CBMD per-event configuration
  cbmdPrefectures?: string  // pipe-separated prefecture names, e.g. "東京都|神奈川県"
  cbmdRegion?: string       // region name instead of prefectures, e.g. "北信越"
  cbmdMapLat?: number | string
  cbmdMapLng?: number | string
  cbmdMapZoom?: number | string
  cbmdExpiryDate?: string   // ISO date string "YYYY-MM-DD", gates CBMD and limited content
}

// ─── Full structured event data (?action=event&id=) ────────────────────────

export interface GasCarouselSlide {
  id: string
  order?: number
  title: string
  description: string
  buttonLabel?: string
  href?: string
  external?: boolean
  gradient?: string
  centered?: boolean
  label?: string
  imageUrl?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export interface GasQuickLink {
  id: string
  order?: number
  title: string
  description: string
  href: string
  icon: string
  external: boolean
  featured?: boolean
  event?: string
}

export interface GasCommunityCta {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLinks?: Array<{ label: string; href: string; event?: string; anchor?: boolean }>
}

export interface GasContentItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  duration?: string
  audience?: string
  labels?: string[]
  status?: string
  external?: boolean
  icon?: string
}

export interface GasLimitedContentItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  duration?: string
  labels?: string[]
  status?: string
  external?: boolean
  availableFrom?: string
  availableUntil?: string
  requiresPassword?: boolean
}

export interface GasEventFullData {
  carousel?: GasCarouselSlide[]
  quickLinks?: GasQuickLink[]
  communityCta?: GasCommunityCta | null
  contents?: GasContentItem[]
  limitedContents?: GasLimitedContentItem[]
}

export async function fetchFullGasEvent(eventId: string): Promise<GasEventFullData | null> {
  const url = process.env.NEXT_PUBLIC_GAS_URL
  if (!url) return null
  try {
    const res = await fetch(`${url}?action=event&id=${encodeURIComponent(eventId)}`, {
      cache: "no-store",
    })
    if (!res.ok) return null
    const json = await res.json()
    if (!json || json.error) return null
    return json as GasEventFullData
  } catch {
    return null
  }
}

export async function fetchPublishedEventIds(): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_GAS_URL
  if (!url) {
    console.warn("[fetchPublishedEventIds] NEXT_PUBLIC_GAS_URL is not set")
    return []
  }
  console.log("[fetchPublishedEventIds] fetching from:", url)
  try {
    const res = await fetch(`${url}?action=publishedEventIds`, { cache: "no-store" })
    if (!res.ok) {
      console.warn("[fetchPublishedEventIds] HTTP error:", res.status, res.statusText)
      return []
    }
    const json = await res.json()
    if (!Array.isArray(json)) {
      console.warn("[fetchPublishedEventIds] unexpected response (not array):", JSON.stringify(json).slice(0, 200))
      return []
    }
    console.log("[fetchPublishedEventIds] result:", json)
    return json as string[]
  } catch (err) {
    console.warn("[fetchPublishedEventIds] fetch error:", err)
    return []
  }
}

export async function fetchPublicGasEvent(eventId: string): Promise<GasEventPublicData | null> {
  const url = process.env.NEXT_PUBLIC_GAS_URL
  if (!url) {
    console.warn("[fetchPublicGasEvent] NEXT_PUBLIC_GAS_URL is not set")
    return null
  }
  console.log(`[fetchPublicGasEvent] fetching eventId=${eventId} from:`, url)
  try {
    const res = await fetch(`${url}?action=publicEvent&id=${encodeURIComponent(eventId)}`, {
      cache: "no-store",
    })
    if (!res.ok) {
      console.warn(`[fetchPublicGasEvent] HTTP error for ${eventId}:`, res.status, res.statusText)
      return null
    }
    const json = await res.json()
    if (json?.error) {
      console.warn(`[fetchPublicGasEvent] GAS error for ${eventId}:`, JSON.stringify(json).slice(0, 200))
      return null
    }
    console.log(`[fetchPublicGasEvent] success for ${eventId}, published=${json?.published}, quizQuestion=${JSON.stringify(json?.quizQuestion ?? null)}`)
    return json as GasEventPublicData
  } catch (err) {
    console.warn(`[fetchPublicGasEvent] fetch error for ${eventId}:`, err)
    return null
  }
}
