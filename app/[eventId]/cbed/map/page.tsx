import CbedMapPage from "@/app/cbed/map/page"
import { eventStaticParams } from "@/lib/event-static-params"
export const dynamic = "force-static"
export async function generateStaticParams() { return eventStaticParams() }
export default CbedMapPage
