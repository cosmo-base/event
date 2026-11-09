import type { EventSpecificData, CarouselSlide } from "@/data/event-page-data"
import type { GasEventPublicData } from "./gas-public"
import type { QuizData } from "@/components/event-quiz"
import { normalizeDocUrl, isDriveUrl } from "./drive-url"

/** Merge GAS-managed fields into the static event data object. Static data acts as fallback. */
export function mergeGasEvent<T extends EventSpecificData>(base: T, gas: GasEventPublicData | null): T {
  if (!gas) return base

  const merged = { ...base }

  // ─ event fields ─
  merged.event = {
    ...base.event,
    ...(gas.name           && { name:              gas.name }),
    ...(gas.shortName      && { shortName:          gas.shortName }),
    ...(gas.date           && { date:               gas.date }),
    ...(gas.venue          && { venue:              gas.venue }),
    ...(gas.participationType && { participationType: gas.participationType }),
    ...(gas.exhibitorName  && { exhibitorName:      gas.exhibitorName }),
    ...(gas.boothNumber    !== undefined && { boothNumber: gas.boothNumber }),
    ...(gas.pitchTime      !== undefined && { pitchTime:   gas.pitchTime }),
    ...(gas.message        && { message:            gas.message }),
    ...(gas.reportUrl      !== undefined && { reportUrl:   gas.reportUrl }),
  }

  // ─ site fields ─
  merged.site = {
    ...base.site,
    ...(gas.accentColor      && { accentColor:   gas.accentColor }),
    ...(gas.pageTitle        && { pageTitle:      gas.pageTitle }),
    ...(gas.pageDescription  && { pageDescription: gas.pageDescription }),
    ...(gas.noindex !== undefined && {
      noindex: gas.noindex === true || gas.noindex === "TRUE",
    }),
  }

  // ─ carousel hero slide (slide 0 only) ─
  if (gas.heroTitle || gas.heroDescription || gas.heroGradient || gas.heroButtonLabel || gas.heroButtonHref) {
    const heroSlide: CarouselSlide = { ...base.carousel[0] }
    if (gas.heroTitle)       heroSlide.title       = gas.heroTitle
    if (gas.heroDescription) heroSlide.description = gas.heroDescription
    if (gas.heroGradient)    heroSlide.gradient    = gas.heroGradient
    if (gas.heroButtonLabel) heroSlide.buttonLabel = gas.heroButtonLabel
    if (gas.heroButtonHref)  heroSlide.href        = gas.heroButtonHref
    merged.carousel = base.carousel.length > 0
      ? [heroSlide, ...base.carousel.slice(1)]
      : [heroSlide]
  }

  // ─ pitch / poster data ─
  if (
    gas.presentationTitle || gas.presentationDescription || gas.speakerName ||
    gas.presentationDate  || gas.slideUrl || gas.pdfUrl || gas.embedUrl ||
    gas.poster1Title      || gas.poster1PdfUrl || gas.poster1EmbedUrl ||
    gas.poster2Title      || gas.poster2PdfUrl
  ) {
    const basePitch  = base.pitch ?? { title: "", presentationTitle: "", description: "", speakerName: "", presentationDate: "", slideUrl: "" }
    const basePosters = basePitch.posters ?? []

    const p1EmbedRaw = gas.poster1EmbedUrl || gas.poster1PdfUrl || ""
    const p1Embed = p1EmbedRaw && isDriveUrl(p1EmbedRaw) ? normalizeDocUrl(p1EmbedRaw).embedUrl : p1EmbedRaw
    const p1Pdf   = gas.poster1PdfUrl && isDriveUrl(gas.poster1PdfUrl) ? normalizeDocUrl(gas.poster1PdfUrl).downloadUrl : gas.poster1PdfUrl

    const poster1 = (gas.poster1Title || gas.poster1PdfUrl || gas.poster1EmbedUrl)
      ? { ...(basePosters[0] ?? {}), ...(gas.poster1Title && { title: gas.poster1Title }), ...(p1Pdf && { pdfUrl: p1Pdf }), ...(p1Embed && { embedUrl: p1Embed }) }
      : basePosters[0]

    const p2Pdf = gas.poster2PdfUrl && isDriveUrl(gas.poster2PdfUrl) ? normalizeDocUrl(gas.poster2PdfUrl).downloadUrl : gas.poster2PdfUrl

    const poster2 = (gas.poster2Title || gas.poster2PdfUrl)
      ? { ...(basePosters[1] ?? {}), ...(gas.poster2Title && { title: gas.poster2Title }), ...(p2Pdf && { pdfUrl: p2Pdf }) }
      : basePosters[1]

    const newPosters = [poster1, poster2].filter((p): p is NonNullable<typeof p> => !!p)

    const pitchEmbedRaw = gas.embedUrl || gas.pdfUrl || ""
    const pitchEmbed = pitchEmbedRaw && isDriveUrl(pitchEmbedRaw) ? normalizeDocUrl(pitchEmbedRaw).embedUrl : pitchEmbedRaw
    const pitchPdf   = gas.pdfUrl && isDriveUrl(gas.pdfUrl) ? normalizeDocUrl(gas.pdfUrl).downloadUrl : gas.pdfUrl

    merged.pitch = {
      ...basePitch,
      ...(gas.presentationTitle       && { presentationTitle: gas.presentationTitle }),
      ...(gas.presentationDescription && { description:       gas.presentationDescription }),
      ...(gas.speakerName             && { speakerName:       gas.speakerName }),
      ...(gas.presentationDate        && { presentationDate:  gas.presentationDate }),
      ...(gas.slideUrl                && { slideUrl:          gas.slideUrl }),
      ...(pitchPdf                    && { pdfUrl:            pitchPdf }),
      ...(pitchEmbed                  && { embedUrl:          pitchEmbed }),
      posters: newPosters.length > 0 ? newPosters : basePosters,
    }
  }

  // ─ contents selection ─
  if (gas.selectedContentIds) {
    const ids = gas.selectedContentIds.split("|").map(s => s.trim()).filter(Boolean)
    if (ids.length > 0) {
      merged.contents = ids
        .map(id => base.contents.find(c => c.id === id))
        .filter((c): c is NonNullable<typeof c> => !!c)
    }
  }

  return merged
}

/**
 * Parse CBMD configuration fields from GAS data.
 * Returns the values to pass to CbmdContextProvider, or null if not set.
 */
export function parseGasCbmdConfig(gas: GasEventPublicData | null): {
  lockedPrefectures: string[] | null
  lockedRegion: string | null
  mapCenter: [number, number] | null
  mapZoom: number | null
} {
  const result = {
    lockedPrefectures: null as string[] | null,
    lockedRegion: null as string | null,
    mapCenter: null as [number, number] | null,
    mapZoom: null as number | null,
  }
  if (!gas) return result

  if (gas.cbmdPrefectures) {
    const prefs = gas.cbmdPrefectures.split("|").map(s => s.trim()).filter(Boolean)
    if (prefs.length > 0) result.lockedPrefectures = prefs
  }
  if (gas.cbmdRegion) result.lockedRegion = gas.cbmdRegion.trim()

  const lat = gas.cbmdMapLat !== undefined && gas.cbmdMapLat !== "" ? Number(gas.cbmdMapLat) : null
  const lng = gas.cbmdMapLng !== undefined && gas.cbmdMapLng !== "" ? Number(gas.cbmdMapLng) : null
  if (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) {
    result.mapCenter = [lat, lng]
  }
  if (gas.cbmdMapZoom !== undefined && gas.cbmdMapZoom !== "") {
    const z = Number(gas.cbmdMapZoom)
    if (!isNaN(z)) result.mapZoom = z
  }

  return result
}

/** Merge GAS quiz fields into the static QuizData. Static data acts as fallback. */
export function mergeGasQuiz(staticQuiz: QuizData, gas: GasEventPublicData | null): QuizData {
  if (!gas || !gas.quizQuestion) return staticQuiz

  const options = gas.quizOptions
    ? gas.quizOptions.split("|").map(s => s.trim()).filter(Boolean)
    : staticQuiz.options

  const correctIndex = gas.quizCorrectIndex !== undefined && gas.quizCorrectIndex !== ""
    ? Number(gas.quizCorrectIndex)
    : staticQuiz.correctIndex

  const link = (gas.quizLinkLabel || gas.quizLinkHref)
    ? {
        label: gas.quizLinkLabel || "",
        href: gas.quizLinkHref || "",
        description: gas.quizLinkDescription || "",
      }
    : staticQuiz.link

  return {
    ...staticQuiz,
    ...(gas.quizIntro !== undefined && { intro: gas.quizIntro || undefined }),
    question: gas.quizQuestion,
    options,
    correctIndex,
    ...(gas.quizExplanation && { explanation: gas.quizExplanation }),
    link,
  }
}

/** Merge GAS survey questions into the static default questions array. */
export function mergeGasSurveyQuestions(
  staticQuestions: string[],
  gas: GasEventPublicData | null,
): string[] {
  if (!gas || (!gas.surveyQ1 && !gas.surveyQ2 && !gas.surveyQ3)) return staticQuestions
  return [
    gas.surveyQ1 || staticQuestions[0] || "",
    gas.surveyQ2 || staticQuestions[1] || "",
    gas.surveyQ3 || staticQuestions[2] || "",
  ].filter(Boolean)
}
