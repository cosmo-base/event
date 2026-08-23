export interface LaunchEvent {
  id: string
  title: string
  date: Date
  time: string
  location: string
  rocket: string
  description: string
  link?: string
  isLaunch: boolean
}

const LAUNCHES_CSV_URL = process.env.NEXT_PUBLIC_LAUNCHES_CSV_URL ?? ""

function parseSimpleCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return []
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""))
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""))
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => (obj[h] = vals[i] || ""))
    return obj
  })
}

export async function fetchLaunchesData(): Promise<LaunchEvent[]> {
  try {
    const res = await fetch(LAUNCHES_CSV_URL, { cache: "force-cache" })
    if (!res.ok) return []
    const text = await res.text()
    const records = parseSimpleCSV(text)
    return records
      .filter((r) => r.title && r.date)
      .map((r, i) => ({
        id: `launch-${i}`,
        title: r.title,
        date: new Date(r.date),
        time: r.time || "",
        location: r.location || "",
        rocket: r.rocket || "",
        description: r.description || "",
        link: r.link || undefined,
        isLaunch: true,
      }))
      .filter((e) => !isNaN(e.date.getTime()))
  } catch {
    return []
  }
}
