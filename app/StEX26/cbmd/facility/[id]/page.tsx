import { fetchFacilitiesData } from "@/data/CBMD"
import { fetchPublicGasEvent } from "@/lib/gas-public"
import { parseGasCbmdConfig } from "@/lib/merge-gas-event"


export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const [facilities, gas] = await Promise.all([fetchFacilitiesData(), fetchPublicGasEvent("StEX26")])
    const cbmd = parseGasCbmdConfig(gas)
    const prefectures = cbmd.lockedPrefectures ?? []
    const filtered = facilities.filter((f) => prefectures.includes(f.prefecture))
    if (!filtered.length) return [{ id: "_placeholder" }]
    return filtered.map((f) => ({ id: String(f.id).trim() }))
  } catch {
    return [{ id: "_placeholder" }]
  }
}

export { default } from "@/app/cbmd/facility/[id]/page"
