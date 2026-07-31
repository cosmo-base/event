// ============================================================================
// Cosmo Base イベント特設ページ 設定データ
// ----------------------------------------------------------------------------
// このファイルの値を書き換えるだけで、イベントごとにページ内容を差し替えられます。
// 画像・URL が未確定の箇所は "placeholder" を含むダミー値を設定しています。
// 実際の値が決まったら、この 1 ファイルを編集してください。
// ============================================================================

export type EventStatus = "upcoming" | "live" | "ended"

export type ContentStatus = "available" | "limited" | "coming-soon" | "ended"

/** クイックアクセス / SNS などで使う Lucide アイコン名（kebab ではなく Pascal 相当の識別子） */
export type IconName =
  | "presentation"
  | "rocket"
  | "building"
  | "file"
  | "sparkles"
  | "help"
  | "users"
  | "message"
  | "external"
  | "quiz"

export interface CarouselSlide {
  id: string
  label?: string
  title: string
  description: string
  imageUrl?: string
  href?: string
  buttonLabel?: string
  /** サブボタン（任意） */
  secondaryLabel?: string
  secondaryHref?: string
  external?: boolean
  /** フォールバック用のグラデーション（imageUrl が無い場合に使用） */
  gradient?: string
}

export interface QuickLink {
  id: string
  title: string
  description: string
  href: string
  icon: IconName
  external: boolean
  featured?: boolean
  /** クリック計測用イベント名 */
  event?: string
}

export interface PitchData {
  title: string
  presentationTitle: string
  description: string
  speakerName: string
  presentationDate: string
  presentationTime?: string
  thumbnailUrl?: string
  slideUrl: string
  embedUrl?: string
  pdfUrl?: string
  supplementaryUrl?: string
}

export interface ContentItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  duration?: string
  audience?: string
  labels: string[]
  status: ContentStatus
  external: boolean
  icon?: IconName
}

export interface LimitedContentItem {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  duration?: string
  labels: string[]
  status: ContentStatus
  availableFrom?: string
  availableUntil?: string
  requiresPassword?: boolean
  external: boolean
}

export interface SpaceTypeFeature {
  badges: string[]
  title: string
  description: string
  duration: string
  questionCount: string
  requirement: string
  buttonLabel: string
  href: string
  imageUrl?: string
}

export interface EventPageData {
  site: {
    pageTitle: string
    pageDescription: string
    siteName: string
    url: string
    logoUrl: string
    fsifLogoUrl?: string
    accentColor: string
    ogImage: string
    noindex: boolean
  }

  event: {
    name: string
    shortName: string
    date: string
    venue: string
    boothNumber?: string
    pitchTime?: string
    participationType: string
    exhibitorName: string
    message: string
    status: EventStatus
    reportUrl?: string
  }

  carousel: CarouselSlide[]
  quickLinks: QuickLink[]
  pitch: PitchData
  spaceType: SpaceTypeFeature
  contents: ContentItem[]
  limitedContents: LimitedContentItem[]

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

  communityCta: {
    title: string
    description: string
    primaryLabel: string
    primaryHref: string
    secondaryLinks: { label: string; href: string; event?: string; anchor?: boolean }[]
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

// ============================================================================
// ダミーデータ（プレースホルダー）
// ============================================================================

export const eventPageData: EventPageData = {
  site: {
    pageTitle: "Cosmo Base イベント特設ページ｜くらわくトーク#2",
    pageDescription:
      "Cosmo Base のイベント特設ページ。発表スライド、宇宙タイプ診断、宇宙クイズなどのコンテンツを、その場で体験できます。",
    siteName: "Cosmo Base",
    // 本番の公開 URL に差し替えてください（canonical / OGP に使用）
    url: "https://cosmo-base.example.com",
    // ロゴ画像は未確定のためプレースホルダー（未設定時はテキストロゴを表示）
    logoUrl: "/logos/cosmo-base-placeholder.svg",
    fsifLogoUrl: "/logos/fsif-placeholder.svg",
    accentColor: "#f59e0b",
    ogImage: "/images/hero-event.png",
    // イベント限定ページを検索エンジンに載せたくない場合は true
    noindex: true,
  },

  event: {
    name: "くらわくトーク#2 変える力",
    shortName: "くらわくトーク#2",
    date: "2026年8月1日",
    venue: "クラフトワーク京島",
    boothNumber: "",
    pitchTime: "17:00〜18:00",
    participationType: "講演会",
    exhibitorName: "眞鍋 和士",
    message: "",
    // "upcoming" | "live" | "ended" を切り替えると表示が変わります
    status: "live",
    reportUrl: "https://example.com/placeholder-event-report",
  },

  carousel: [
    {
      id: "slide-main",
      label: "イベント出展中",
      title: "宇宙を、もっと身近に。",
      description: "Cosmo Base のコンテンツを、この会場でそのまま体験できます。",
      imageUrl: "/images/hero-event.png",
      buttonLabel: "コンテンツを見る",
      href: "#contents",
      secondaryLabel: "発表スライド",
      secondaryHref: "#pitch",
      external: false,
      gradient: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)",
    },
    {
      id: "slide-pitch",
      label: "ピッチ発表資料",
      title: "当日のピッチスライドを公開中",
      description: "発表時間内にご紹介できなかった内容も掲載しています。",
      buttonLabel: "発表資料を見る",
      href: "#pitch",
      external: false,
      gradient: "linear-gradient(135deg,#0f1e3d 0%,#1e3a8a 60%,#2563eb 100%)",
    },
    {
      id: "slide-diagnosis",
      label: "人気コンテンツ",
      title: "あなたはどんな宇宙タイプ？",
      description: "5つの質問に答えるだけ。宇宙の知識がなくても楽しめます。",
      buttonLabel: "宇宙タイプ診断を始める",
      href: "/event/kurawaku2/type",
      external: true,
      gradient: "linear-gradient(135deg,#2563eb 0%,#6d5ee6 55%,#7c3aed 100%)",
    },
    {
      id: "slide-limited",
      label: "イベント限定",
      title: "参加者だけの限定コンテンツ",
      description: "この会場に来た人だけが体験できる特別なコンテンツを公開中。",
      buttonLabel: "限定コンテンツを見る",
      href: "#limited",
      external: false,
      gradient: "linear-gradient(135deg,#1e3a8a 0%,#0ea5e9 60%,#38bdf8 100%)",
    },
    {
      id: "slide-community",
      label: "コミュニティ",
      title: "イベントの続きを、Cosmo Base で。",
      description: "宇宙好きが集まるコミュニティに参加しませんか？",
      buttonLabel: "Cosmo Base に参加する",
      href: "https://discord.gg/X78w86XE3v",
      external: true,
      gradient: "linear-gradient(135deg,#0f1e3d 0%,#312e81 55%,#7c3aed 100%)",
    },
  ],

  quickLinks: [
    {
      id: "ql-pitch",
      title: "発表スライドを見る",
      description: "当日のピッチ資料",
      href: "#pitch",
      icon: "presentation",
      external: false,
      featured: true,
      event: "click_pitch_slide",
    },
    {
      id: "ql-cosmo-site",
      title: "Cosmo Base 公式サイト",
      description: "コミュニティの詳細",
      href: "https://fsifofficial.github.io/CosmoBase/",
      icon: "rocket",
      external: true,
      event: "click_cosmo_base_website",
    },
    {
      id: "ql-fsif-site",
      title: "未来宇宙産業フォーラム",
      description: "運営団体の公式サイト",
      href: "https://fsifofficial.wixsite.com/future-space-industr",
      icon: "building",
      external: true,
      event: "click_fsif_website",
    },
    // {
    //   id: "ql-docs",
    //   title: "イベント配布資料",
    //   description: "ブースで配布した資料",
    //   href: "https://example.com/placeholder-documents",
    //   icon: "file",
    //   external: true,
    // },
    {
      id: "ql-diagnosis",
      title: "宇宙タイプ診断",
      description: "約2分・知識不要",
      href: "/event/kurawaku2/type",
      icon: "sparkles",
      external: true,
      event: "click_space_type_diagnosis",
    },
 //   {
//      id: "ql-quiz",
//      title: "毎日宇宙クイズ",
 //     description: "195問以上を公開中",
 //     href: "/event/quiz",
//      icon: "quiz",
//      external: true,
//    },
    {
      id: "ql-limited",
      title: "イベント限定コンテンツ",
      description: "参加者だけの特別版",
      href: "#limited",
      icon: "sparkles",
      external: false,
      event: "click_limited_content",
    },
    {
      id: "ql-join",
      title: "Cosmo Base に参加する",
      description: "コミュニティへ",
      href: "https://discord.gg/X78w86XE3v",
      icon: "users",
      external: true,
      event: "click_community_join",
    },
    {
      id: "ql-contact",
      title: "問い合わせ",
      description: "ご質問・ご相談はこちら",
      href: "https://fsifofficial.github.io/CosmoBase/contact",
      icon: "message",
      external: true,
    },
    {
      id: "ql-sns",
      title: "SNS",
      description: "最新情報をチェック",
      href: "#social",
      icon: "external",
      external: false,
    },
  ],

  pitch: {
    title: "ピッチ発表資料",
    presentationTitle: "ものづくりとは何なのか？",
    description:
      "ソフトやハードなど様々に関わった経験から見えてきたものづくりの本質",
    speakerName: "眞鍋 和士",
    presentationDate: "2026年8月1日",
    presentationTime: "17:00",
    thumbnailUrl: "/images/pitch-thumb.png",
    // すべてプレースホルダー URL（本番のスライド／PDF に差し替えてください）
    slideUrl: "https://docs.google.com/presentation/d/1agIQiMmx-KcgELP2k_GhZYXRjqoWXB4X/pub?start=false&loop=false&delayms=3000",
    embedUrl: "https://docs.google.com/presentation/d/1agIQiMmx-KcgELP2k_GhZYXRjqoWXB4X/embed?start=false&loop=false&delayms=3000",
    pdfUrl: "https://docs.google.com/presentation/d/1agIQiMmx-KcgELP2k_GhZYXRjqoWXB4X/export/pdf",
    supplementaryUrl: "",
  },

  spaceType: {
    badges: ["人気コンテンツ", "知識不要"],
    title: "あなたはどんな宇宙タイプ？",
    description:
      "簡単な質問に答えて、あなたに合った宇宙との関わり方を見つけましょう。宇宙の知識がなくても参加できます。",
    duration: "約2分",
    questionCount: "5問",
    requirement: "宇宙の知識：不要",
    buttonLabel: "宇宙タイプ診断を始める",
    href: "/event/kurawaku2/type",
    imageUrl: "/images/space-type.png",
  },

  contents: [
    {
      id: "c-space-type",
      title: "宇宙タイプ診断",
      description: "5つの質問であなたの宇宙タイプが分かる、人気の診断コンテンツ。",
      href: "/event/kurawaku2/type",
      duration: "約2分",
      audience: "初心者向け",
      labels: ["人気コンテンツ", "知識不要", "スマートフォン対応"],
      status: "available",
      external: true,
      icon: "sparkles",
    },
    // {
    //   id: "c-quiz",
    //   title: "毎日宇宙クイズ",
    //   description: "毎日更新される宇宙クイズ。195問以上を公開中です。",
    //   href: "/event/quiz",
   //    duration: "約1分",
    //   audience: "初心者向け",
    //   labels: ["人気コンテンツ", "スマートフォン対応"],
    //   status: "available",
   //    external: true,
   //    icon: "help",
   //  },
    // {
    //   id: "c-match",
    //   title: "Cosmo Match",
    //   description: "あなたと相性の良い宇宙の楽しみ方をマッチングします。",
    //   href: "/event/cosmo-match",
    //   duration: "約3分",
    //   audience: "初心者向け",
    //   labels: ["知識不要", "スマートフォン対応"],
    //   status: "available",
    //   external: true,
    //   icon: "users",
    // },
    // {
    //   id: "c-museum",
    //   title: "Cosmo Base Museum Database",
    //   description: "宇宙にまつわる展示・施設をまとめたデータベース。",
    //   href: "https://example.com/placeholder-museum-db",
    //   audience: "だれでも",
    //   labels: ["データベース"],
    //   status: "available",
    //   external: true,
    //   icon: "building",
    // },
     {
       id: "c-event-db",
       title: "Cosmo Base Event Database",
       description: "全国の宇宙イベント情報を検索できるデータベース。",
       href: "/event/kurawaku2/cbed",
       audience: "だれでも",
       labels: ["データベース"],
       status: "available",
       external: true,
       icon: "rocket",
     },
   // {
  //    id: "c-news",
  //    title: "週刊宇宙ニュース",
  //    description: "毎週の宇宙ニュースを分かりやすくまとめてお届けします。",
  //    href: "https://example.com/placeholder-news",
 //     audience: "だれでも",
 //     labels: ["毎週更新"],
   //   status: "available",
   //   external: true,
  //    icon: "file",
  //  },
  ],

  limitedContents: [
    {
      id: "l-quiz",
      title: "イベント参加者限定の宇宙クイズ",
      description: "イベント参加者だけが体験できる特別な宇宙クイズ。",
      href: "https://example.com/placeholder-limited-quiz",
      duration: "約2分",
      labels: ["イベント限定", "期間限定"],
      status: "limited",
      availableFrom: "2026年8月1日",
      availableUntil: "2026年8月2日 23:59",
      requiresPassword: false,
      external: true,
    },
    // {
    //   id: "l-diagnosis",
    //   title: "イベント限定 宇宙タイプ診断",
    //   description: "通常版とは違う、イベント限定バージョンの宇宙タイプ診断です。",
    //   href: "https://example.com/placeholder-limited-diagnosis",
    //   duration: "約2分",
    //   labels: ["イベント限定"],
    //   status: "limited",
    //   availableUntil: "2026年8月31日 23:59",
    //   external: true,
    // },
    // {
    //   id: "l-behind",
    //   title: "開発画面・制作過程の紹介",
    //   description: "ピッチで紹介した開発プロセスを、実際の画面とともに詳しく公開します。",
    //   href: "https://example.com/placeholder-behind-the-scenes",
    //   duration: "約5分",
    //   labels: ["イベント限定"],
    //   status: "limited",
    //   availableUntil: "2026年8月31日 23:59",
    //   external: true,
    // },
    // {
    //   id: "l-doc",
    //   title: "ブース来場者向け限定資料",
    //   description: "ブースにお越しいただいた方向けの、追加資料をダウンロードできます。",
    //   href: "https://example.com/placeholder-booth-doc",
    //   labels: ["イベント限定"],
    //   status: "limited",
    //   availableUntil: "2026年8月31日 23:59",
    //   requiresPassword: true,
    //   external: true,
    // },
    {
      id: "l-survey",
      title: "イベントアンケート",
      description: "ご意見をお聞かせください。今後のコンテンツづくりに活用します。",
      href: "/event/survey",
      duration: "約1分",
      labels: ["イベント限定"],
      status: "limited",
      availableUntil: "2026年8月2日 23:59",
      external: true,
    },
  ],

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

  communityCta: {
    title: "イベントの続きを、Cosmo Base で",
    description:
      "イベントをきっかけに宇宙へ興味を持った方へ。Cosmo Base では、宇宙クイズ、ニュース、イベント情報、診断、交流企画など、宇宙と関われるさまざまなコンテンツを提供しています。",
    primaryLabel: "Cosmo Base に参加する",
    primaryHref: "https://discord.gg/X78w86XE3v",
    secondaryLinks: [
      { label: "公式サイトを見る", href: "https://fsifofficial.github.io/CosmoBase/", event: "click_cosmo_base_website" },
      { label: "宇宙タイプ診断を試す", href: "https://example.com/placeholder-space-type", event: "click_space_type_diagnosis" },
      { label: "SNSを見る", href: "#social", anchor: true },
    ],
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

export default eventPageData
