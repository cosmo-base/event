export interface Facility {
  id: string
  name: string
  nameKana: string
  category: string
  prefecture: string
  region: string
  city: string
  address: string
  description: string
  image: string
  tags: string[]
  hasPlanetarium: boolean
  openingHours: string
  closedDays: string
  admissionFee: string
  access: string
  website?: string
  twitter?: string
  instagram?: string
  youtube?: string
  updatedAt: string
  lat?: number
  lng?: number
  isFree: boolean
}

const CBMD_SPREADSHEET_BASE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDvzMbN9CNa_PXwmre1IFid8fw7rD2yG0IlBnifsjtrtDN0cy3n-nQlEFvKQbE4w06TXTHoZ4edpzj/pub?gid=0&single=true&output=csv"

const BUILD_TIMESTAMP = Date.now()

export const facilityTypes = ["科学館", "博物館", "美術館", "JAXA関連施設", "大学展示", "天文台", "イベント施設", "児童館"]
export const categoryTags = ["地球", "リモートセンシング", "プラネタリウム", "望遠鏡", "天文・天体", "ロケット", "人工衛星", "地球観測"]
export const spacecraftTags = ["はやぶさ", "はやぶさ2", "MMX", "ISS", "H3ロケット", "イプシロン", "SLIM", "かぐや", "あかつき", "HTV"]

export const regionsData = {
  "北海道": ["北海道"],
  "東北": ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  "関東": ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
  "中部": ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
  "近畿": ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  "中国": ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  "四国": ["徳島県", "香川県", "愛媛県", "高知県"],
  "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
}

export const regions = Object.keys(regionsData).map((key) => ({
  name: key,
  prefectures: regionsData[key as keyof typeof regionsData],
}))

function getRegionByPrefecture(pref: string): string {
  for (const [region, prefectures] of Object.entries(regionsData)) {
    if (prefectures.includes(pref)) return region
  }
  return "その他"
}


function parseFacilityCSV(csvText: string): any[] {
  const arr: string[][] = []
  let quote = false
  let col = 0, row = 0
  for (let c = 0; c < csvText.length; c++) {
    const cc = csvText[c], nc = csvText[c + 1]
    arr[row] = arr[row] || []
    arr[row][col] = arr[row][col] || ""
    if (cc === '"' && quote && nc === '"') { arr[row][col] += cc; ++c; continue }
    if (cc === '"') { quote = !quote; continue }
    if (cc === "," && !quote) { ++col; continue }
    if (cc === "\r" && nc === "\n" && !quote) { ++row; col = 0; ++c; continue }
    if (cc === "\n" && !quote) { ++row; col = 0; continue }
    if (cc === "\r" && !quote) { ++row; col = 0; continue }
    arr[row][col] += cc
  }
  if (arr.length < 2) return []
  const headers = arr[0].map((h) => h.trim())
  const facilities: any[] = []
  for (let r = 1; r < arr.length; r++) {
    const rowData = arr[r]
    if (!rowData.some((val) => val.trim() !== "")) continue
    const item: any = {}
    headers.forEach((header, index) => {
      item[header] = (rowData[index] || "").trim()
    })
    if (item.id) facilities.push(item)
  }
  return facilities
}

export async function fetchFacilitiesData(): Promise<Facility[]> {
  try {
    const cacheBusterUrl = `${CBMD_SPREADSHEET_BASE_URL}&_t=${BUILD_TIMESTAMP}`
    const res = await fetch(cacheBusterUrl)

    if (!res.ok) throw new Error(`CBMDデータの取得に失敗: HTTP ${res.status}`)

    const text = await res.text()
    const rawFacilities = parseFacilityCSV(text)

    return rawFacilities.map((raw) => {
      const prefecture = String(raw.prefecture || "").trim()
      const region = getRegionByPrefecture(prefecture)
      const tags = raw.tags ? String(raw.tags).split(",").map((t: string) => t.trim()).filter(Boolean) : []
      const fee = String(raw.admissionFee || "").trim()
      const isFree = fee.includes("無料") || fee.includes("0円") || fee === "0"

      return {
        id: String(raw.id).trim(),
        name: String(raw.name).trim(),
        nameKana: String(raw.nameKana || "").trim(),
        category: String(raw.category || "").trim(),
        prefecture,
        region,
        city: String(raw.city || "").trim(),
        address: String(raw.address || "").trim(),
        description: String(raw.description || "").trim(),
        image: String(raw.image || "/images/placeholder.jpg").trim(),
        tags,
        hasPlanetarium: String(raw.hasPlanetarium).toUpperCase() === "TRUE",
        openingHours: String(raw.openingHours || "").trim(),
        closedDays: String(raw.closedDays || "").trim(),
        admissionFee: fee,
        access: String(raw.access || "").trim(),
        website: raw.website ? String(raw.website).trim() : undefined,
        twitter: raw.twitter ? String(raw.twitter).trim() : undefined,
        instagram: raw.instagram ? String(raw.instagram).trim() : undefined,
        youtube: raw.youtube ? String(raw.youtube).trim() : undefined,
        updatedAt: String(raw.updatedAt || "").trim(),
        lat: raw.lat ? parseFloat(String(raw.lat)) : undefined,
        lng: raw.lng ? parseFloat(String(raw.lng)) : undefined,
        isFree,
      } as Facility
    })
  } catch (error) {
    console.error("CBMD fetch error:", error)
    return []
  }
}
