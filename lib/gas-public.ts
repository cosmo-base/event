// Build-time utility: fetch public event data from GAS (no auth required).
// GAS must expose a "getPublicEventData" action that returns published event rows.
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
}

export async function fetchPublicGasEvent(eventId: string): Promise<GasEventPublicData | null> {
  const url = process.env.NEXT_PUBLIC_GAS_URL
  if (!url) return null
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "getPublicEventData", data: { eventId } }),
      cache: "no-store",
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.result ?? null
  } catch {
    return null
  }
}
