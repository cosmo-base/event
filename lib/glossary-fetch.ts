import type {
  GlossaryTerm,
  DifficultyLevel,
  CategoryLarge,
  GlossaryStatus,
} from "@/data/glossary"

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vREYAYZ8Rj2WMeCdvOleh8xoWlPlA5UZ5Ijr3SVxhxe_FAafTUHkQiPfWpHDGYM6rsahZOio82umrY6/pub?gid=0&single=true&output=csv"

function parseDifficulty(val: string): DifficultyLevel {
  if (val.startsWith("★★★")) return 3
  if (val.startsWith("★★")) return 2
  return 1
}

// RFC-4180 compliant CSV line parser
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function splitList(val: string): string[] {
  return val
    ? val
        .split(/[,、]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []
}

function col(cols: string[], idx: number): string {
  return cols[idx]?.trim() || ""
}

let cachedTerms: GlossaryTerm[] | null = null

export async function fetchGlossaryTerms(): Promise<GlossaryTerm[]> {
  if (cachedTerms) return cachedTerms

  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "force-cache" })
    if (!res.ok) {
      console.warn(`[glossary] CSV fetch failed: ${res.status}`)
      return []
    }

    const text = await res.text()
    // Strip BOM if present
    const cleanText = text.startsWith("﻿") ? text.slice(1) : text
    const lines = cleanText.split(/\r?\n/).filter((l) => l.trim())
    if (lines.length < 2) return []

    // Parse header row to locate columns by name (resilient to column reordering)
    const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase())
    const idx = (name: string) => headers.indexOf(name)

    const iId           = idx("id")
    const iTerm         = idx("term")
    const iKana         = idx("kana")
    const iEnglish      = idx("english")
    const iCatLarge     = idx("category_large")
    const iCatMedium    = idx("category_medium")
    const iCatSmall     = idx("category_small")
    const iDifficulty   = idx("difficulty")
    const iTextLv1      = idx("text_lv1")
    const iTextLv2      = idx("text_lv2")
    const iTextLv3      = idx("text_lv3")
    const iStatus       = idx("status")
    const iCredit       = idx("credit")
    const iAliases      = idx("aliases")
    const iInternal     = idx("internal")
    const iRelated      = idx("related")
    const iOpposite     = idx("antonyms")

    if (iTerm === -1) {
      console.warn("[glossary] 'term' column not found in header:", headers)
      return []
    }

    const terms: GlossaryTerm[] = []

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i])
      const termStr = col(cols, iTerm)
      if (!termStr) continue

      const idStr   = iId !== -1 ? col(cols, iId) : ""
      const kanaStr = iKana !== -1 ? col(cols, iKana) : ""
      // Prefer id as slug (now that the column is filled); fall back to kana, then term
      const slug = idStr || kanaStr || termStr

      terms.push({
        slug,
        term: termStr,
        kana: kanaStr,
        english:        iEnglish    !== -1 ? col(cols, iEnglish)    : "",
        aliases:        iAliases    !== -1 ? splitList(col(cols, iAliases))   : [],
        categoryLarge:  (iCatLarge  !== -1 ? col(cols, iCatLarge)   : "宇宙輸送・ロケット") as CategoryLarge,
        categoryMedium: iCatMedium  !== -1 ? col(cols, iCatMedium)  : "",
        categorySmall:  iCatSmall   !== -1 ? col(cols, iCatSmall)   : "",
        difficulty:     parseDifficulty(iDifficulty !== -1 ? col(cols, iDifficulty) : ""),
        textLv1:        iTextLv1    !== -1 ? col(cols, iTextLv1)  || undefined : undefined,
        textLv2:        iTextLv2    !== -1 ? col(cols, iTextLv2)  || undefined : undefined,
        textLv3:        iTextLv3    !== -1 ? col(cols, iTextLv3)  || undefined : undefined,
        internal:       iInternal   !== -1 ? splitList(col(cols, iInternal))  : [],
        related:        iRelated    !== -1 ? splitList(col(cols, iRelated))   : [],
        opposite:       iOpposite   !== -1 ? splitList(col(cols, iOpposite))  : [],
        status:         (iStatus    !== -1 ? col(cols, iStatus)    : "未着手") as GlossaryStatus,
        credit:         iCredit     !== -1 ? col(cols, iCredit) || "Cosmo Base運営" : "Cosmo Base運営",
      })
    }

    console.log(`[glossary] Loaded ${terms.length} terms from CSV`)
    cachedTerms = terms
    return terms
  } catch (err) {
    console.warn("[glossary] Failed to fetch CSV:", err)
    return []
  }
}

export function getTermBySlug(
  terms: GlossaryTerm[],
  slug: string
): GlossaryTerm | undefined {
  return terms.find((t) => t.slug === slug)
}

function resolveTermRefs(
  terms: GlossaryTerm[],
  refs: string[],
  excludeSlug: string
): GlossaryTerm[] {
  const set = new Set(refs)
  return terms.filter(
    (t) =>
      t.slug !== excludeSlug &&
      (set.has(t.term) || set.has(t.slug) || t.aliases?.some((a) => set.has(a)))
  )
}

export interface RelatedTermGroups {
  related: GlossaryTerm[]
  opposite: GlossaryTerm[]
}

export function getRelatedTermGroups(
  terms: GlossaryTerm[],
  term: GlossaryTerm
): RelatedTermGroups {
  const allRefs = [
    ...(term.related ?? []),
    ...(term.internal ?? []),
  ]
  return {
    related: resolveTermRefs(terms, allRefs, term.slug),
    opposite: resolveTermRefs(terms, term.opposite ?? [], term.slug),
  }
}

export function getRelatedTerms(
  terms: GlossaryTerm[],
  term: GlossaryTerm
): GlossaryTerm[] {
  const { related, opposite } = getRelatedTermGroups(terms, term)
  const seen = new Set<string>()
  return [...related, ...opposite].filter((t) => {
    if (seen.has(t.slug)) return false
    seen.add(t.slug)
    return true
  })
}
