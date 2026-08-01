// ============================================================================
// Cosmo Base / FSIF 恒常情報
// イベントをまたいで共通で使う組織・SNS・法的リンクのデータ。
// イベント固有のデータは data/events/<event-id>.ts に記載してください。
// ============================================================================

export interface OrgData {
  cosmoBase: {
    description: string[]
    features: string[]
    stats: { label: string; value: string }[]
    websiteUrl: string
    communityUrl: string
    contentsAnchor: string
  }

  fsif: {
    name: string
    englishName: string
    description: string[]
    mission: string
    vision: string
    purpose: string
    websiteUrl: string
  }

  socialLinks: {
    x?: string
    instagram?: string
    facebook?: string
    youtube?: string
    tiktok?: string
    note?: string
    discord?: string
  }

  legalLinks: {
    contact?: string
    privacyPolicy?: string
    terms?: string
  }
}

export const orgData: OrgData = {
  cosmoBase: {
    description: [
      "Cosmo Base は、宇宙をより身近な存在にすることを目的としたコミュニティーです。",
      "宇宙に興味を持つ人が集まり、学び、交流し、宇宙との接点を広げられる場所を提供しています。",
      "宇宙に詳しくない人でも楽しめるクイズや診断から、イベント情報、交流企画、データベース、学習コンテンツまで、関心度に合わせたさまざまなコンテンツを展開しています。",
    ],
    features: [
      "宇宙タイプ診断・毎日宇宙クイズ",
      "宇宙イベント・ミュージアムのデータベース",
      "週刊宇宙ニュース・交流企画",
    ],
    stats: [
      { label: "毎日宇宙クイズ参加者数", value: "1000人以上" },
      { label: "コンテンツ", value: "10種類以上" },
      { label: "コミュニティ参加者", value: "170人以上" },
      { label: "パートナー数", value: "2社・4団体" },
    ],
    websiteUrl: "https://fsifofficial.github.io/CosmoBase/",
    communityUrl: "https://discord.gg/X78w86XE3v",
    contentsAnchor: "#contents",
  },

  fsif: {
    name: "未来宇宙産業フォーラム",
    englishName: "Future Space Industrial Forum",
    description: [
      "未来宇宙産業フォーラムは、宇宙と人、企業、地域をつなぎ、すべての人に宇宙と関わる『選択肢』をつくる団体です。",
      "コミュニティ運営、イベント開催、ワーキンググループ、レポート作成などを通じて、宇宙に興味を持った人が学び、出会い、挑戦できる機会を提供しています。",
    ],
    mission: "すべての人に宇宙と関わる『選択肢』をつくる",
    vision: "宇宙をみんなのものにする",
    purpose: "一番身近な宇宙の専門家",
    websiteUrl: "https://fsifofficial.wixsite.com/future-space-industr",
  },

  socialLinks: {
    x: "https://x.com/CosmoBase",
    instagram: "https://www.instagram.com/cosmobase.official",
    facebook: "",
    youtube: "https://www.youtube.com/channel/UC3bcWCM6ccvsyQyiXLIwhkQ",
    tiktok: "",
    note: "https://note.com/cosmobase",
    discord: "https://discord.gg/X78w86XE3v",
  },

  legalLinks: {
    contact: "https://fsifofficial.github.io/CosmoBase/contact",
  },
}
