import CbmdPage from "@/app/cbmd/page"
import { eventStaticParams } from "@/lib/event-static-params"
export const dynamic = "force-static"
export async function generateStaticParams() { return eventStaticParams() }
export default CbmdPage
