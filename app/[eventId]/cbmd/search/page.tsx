import CbmdSearchPage from "@/app/cbmd/search/page"
import { eventStaticParams } from "@/lib/event-static-params"
export const dynamic = "force-static"
export async function generateStaticParams() { return eventStaticParams() }
export default CbmdSearchPage
