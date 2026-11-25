import CbedSearchPage from "@/app/cbed/search/page"
import { eventStaticParams } from "@/lib/event-static-params"
export const dynamic = "force-static"
export async function generateStaticParams() { return eventStaticParams() }
export default CbedSearchPage
