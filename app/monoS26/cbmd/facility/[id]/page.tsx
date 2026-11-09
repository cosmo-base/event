import { fetchFacilitiesData } from "@/data/CBMD"
import { fetchPublicGasEvent } from "@/lib/gas-public"
import { parseGasCbmdConfig } from "@/lib/merge-gas-event"

const FALLBACK_REGION = "北信越"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const [facilities, gas] = await Promise.all([fetchFacilitiesData(), fetchPublicGasEvent("monoS26")])
    const cbmd = parseGasCbmdConfig(gas)
    const filtered = cbmd.lockedPrefectures
      ? facilities.filter((f) => cbmd.lockedPrefectures!.includes(f.prefecture))
      : facilities.filter((f) => f.region === (cbmd.lockedRegion ?? FALLBACK_REGION))
    if (!filtered.length) return [{ id: "_placeholder" }]
    return filtered.map((f) => ({ id: String(f.id).trim() }))
  } catch {
    return [{ id: "_placeholder" }]
  }
}

export { default } from "@/app/cbmd/facility/[id]/page"
