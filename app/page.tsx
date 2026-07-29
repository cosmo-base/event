import type { Metadata } from "next"
import EventHome from "@/components/home"

export const metadata: Metadata = {
  title: "Cosmo Base宇宙用語集",
  description: "「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ『Cosmo Base（コスモベース）』。初心者から宇宙産業に関心がある人まで、誰もが交流できる優しい場所です。",
}

export default async function Home() {
  return <EventHome />
}
