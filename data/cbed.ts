export interface SpaceEvent {
  id: string | number
  title?: string
  date?: string
  endDate?: string
  time?: string
  location?: string
  type?: string
  difficulty?: string
  organizer?: string
  isPartner?: boolean | string
  capacity?: string | number
  speaker?: string
  description?: string
  link?: string
  lat?: number
  lng?: number
  isRecommend?: boolean
}

const CBED_CSV_URL = process.env.NEXT_PUBLIC_CBED_CSV_URL ?? ""

function parseCSV(csvText: string): SpaceEvent[] {
  const arr: string[][] = []
  let quote = false
  let col = 0,
    row = 0

  for (let c = 0; c < csvText.length; c++) {
    const cc = csvText[c],
      nc = csvText[c + 1]
    arr[row] = arr[row] || []
    arr[row][col] = arr[row][col] || ""

    if (cc === '"' && quote && nc === '"') {
      arr[row][col] += cc
      ++c
      continue
    }
    if (cc === '"') {
      quote = !quote
      continue
    }
    if (cc === "," && !quote) {
      ++col
      continue
    }
    if (cc === "\r" && nc === "\n" && !quote) {
      ++row
      col = 0
      ++c
      continue
    }
    if (cc === "\n" && !quote) {
      ++row
      col = 0
      continue
    }
    if (cc === "\r" && !quote) {
      ++row
      col = 0
      continue
    }
    arr[row][col] += cc
  }

  if (arr.length < 2) return []
  const headers = arr[0].map((h) => h.trim())
  const events: SpaceEvent[] = []

  for (let r = 1; r < arr.length; r++) {
    const rowData = arr[r]
    if (!rowData.some((val) => val.trim() !== "")) continue

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event: any = {}
    headers.forEach((header, index) => {
      let value = rowData[index] || ""
      value = value.trim()

      if (header === "lat" || header === "lng") {
        event[header] = value ? parseFloat(value) : undefined
      } else if (header === "isRecommend") {
        event[header] = value.toUpperCase() === "TRUE" || value === "1"
      } else if (header === "isPartner") {
        event[header] =
          value.toUpperCase() === "TRUE" || value === "1" || value
      } else {
        event[header] = value
      }
    })

    if (!event.id && !event.title) continue
    if (!event.id) event.id = `fallback-${r}`
    event.id = String(event.id).trim()
    events.push(event as SpaceEvent)
  }
  return events
}

export async function fetchEventsData(): Promise<SpaceEvent[]> {
  try {
    const res = await fetch(CBED_CSV_URL, { cache: "force-cache" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    return parseCSV(text)
  } catch (error) {
    console.error("CBED fetch error:", error)
    return []
  }
}
