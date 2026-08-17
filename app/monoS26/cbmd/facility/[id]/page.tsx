import { fetchFacilitiesData } from "@/data/CBMD"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const facilities = await fetchFacilitiesData()
    const filtered = facilities.filter((f) => f.region === "北信越")
    if (!filtered.length) return [{ id: "_placeholder" }]
    return filtered.map((f) => ({ id: String(f.id).trim() }))
  } catch {
    return [{ id: "_placeholder" }]
  }
}

export { default } from "@/app/cbmd/facility/[id]/page"
