import { fetchFacilitiesData } from "@/data/CBMD"

const LOCKED_PREFECTURES = ["東京都", "神奈川県", "埼玉県", "千葉県"]

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const facilities = await fetchFacilitiesData()
    const filtered = facilities.filter((f) => LOCKED_PREFECTURES.includes(f.prefecture))
    if (!filtered.length) return [{ id: "_placeholder" }]
    return filtered.map((f) => ({ id: String(f.id).trim() }))
  } catch {
    return [{ id: "_placeholder" }]
  }
}

export { default } from "@/app/cbmd/facility/[id]/page"
