"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { MapPin, Star, ArrowUpDown, Grid3X3, List, Filter, ExternalLink, Loader2 } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { TagBadge } from "@/components/tag-badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { fetchFacilitiesData, regions, facilityTypes, Facility } from "@/data/CBMD"
import { FacilityImage } from "@/components/facility-image"
import { useCbmdContext } from "@/components/cbmd-region-context"

type SortType = "name" | "region" | "updated"
type ViewMode = "card" | "table"

const prefectureOrder = [
  "北海道","青森県","岩手県","秋田県","宮城県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","奈良県",
  "和歌山県","兵庫県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県",
  "長崎県","大分県","熊本県","宮崎県","鹿児島県","沖縄県",
]

export default function DatabasePage() {
  const { lockedRegion, basePath } = useCbmdContext()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortType>("name")
  const [viewMode, setViewMode] = useState<ViewMode>("card")
  const [selectedRegions, setSelectedRegions] = useState<string[]>(lockedRegion ? [lockedRegion] : [])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [onlyFree, setOnlyFree] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchFacilitiesData().then((data) => { setFacilities(data); setIsLoading(false) })
  }, [])

  const sortedFacilities = useMemo(() => {
    let filtered = [...facilities]
    if (selectedRegions.length > 0) filtered = filtered.filter((f) => selectedRegions.includes(f.region))
    if (selectedCategories.length > 0) filtered = filtered.filter((f) => selectedCategories.includes(f.category))
    if (onlyFree) filtered = filtered.filter((f) => f.isFree)

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name": return a.nameKana.localeCompare(b.nameKana, "ja")
        case "region": {
          const idxA = prefectureOrder.indexOf(a.prefecture)
          const idxB = prefectureOrder.indexOf(b.prefecture)
          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB)
        }
        case "updated": return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        default: return 0
      }
    })
  }, [facilities, sortBy, selectedRegions, selectedCategories, onlyFree])

  const handleRegionToggle = (region: string) =>
    setSelectedRegions((prev) => prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region])
  const handleCategoryToggle = (category: string) =>
    setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category])
  const clearFilters = () => { setSelectedRegions(lockedRegion ? [lockedRegion] : []); setSelectedCategories([]); setOnlyFree(false) }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">データベース一覧</h1>
          <p className="text-muted-foreground">登録されているすべての施設を閲覧（<span className="text-blue-400 font-semibold">{sortedFacilities.length}</span>件）</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-lg p-1 flex">
            <button onClick={() => setViewMode("card")} className={`p-2 rounded-md transition-all ${viewMode === "card" ? "bg-blue-500/20 text-blue-400" : "text-muted-foreground hover:text-foreground"}`}><Grid3X3 className="w-4 h-4" /></button>
            <button onClick={() => setViewMode("table")} className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-blue-500/20 text-blue-400" : "text-muted-foreground hover:text-foreground"}`}><List className="w-4 h-4" /></button>
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden glass border-border/30"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block space-y-6 mb-6 lg:mb-0`}>
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">フィルター</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">クリア</Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">並び替え</Label>
                <div className="space-y-2">
                  {[{ value: "name", label: "五十音順" }, { value: "region", label: "都道府県順" }, { value: "updated", label: "更新日順" }].map((o) => (
                    <button key={o.value} onClick={() => setSortBy(o.value as SortType)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${sortBy === o.value ? "bg-blue-500/20 text-blue-400" : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"}`}>
                      {o.label}<ArrowUpDown className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
              {!lockedRegion && (
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">地方</Label>
                  <div className="space-y-2">
                    {regions.map((region) => (
                      <div key={region.name} className="flex items-center space-x-2">
                        <Checkbox id={`region-${region.name}`} checked={selectedRegions.includes(region.name)} onCheckedChange={() => handleRegionToggle(region.name)} />
                        <Label htmlFor={`region-${region.name}`} className="text-sm text-muted-foreground cursor-pointer">{region.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">施設カテゴリ</Label>
                <div className="space-y-2">
                  {facilityTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={`cat-${type}`} checked={selectedCategories.includes(type)} onCheckedChange={() => handleCategoryToggle(type)} />
                      <Label htmlFor={`cat-${type}`} className="text-sm text-muted-foreground cursor-pointer">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-border/30">
                <div className="flex items-center space-x-2">
                  <Checkbox id="only-free" checked={onlyFree} onCheckedChange={(checked) => setOnlyFree(checked === true)} />
                  <Label htmlFor="only-free" className="text-sm text-emerald-400 font-medium cursor-pointer">入館料無料のみ</Label>
                </div>
              </div>
            </div>
          </GlassCard>
        </aside>

        <div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              <p className="text-sm text-muted-foreground">読み込み中...</p>
            </div>
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedFacilities.map((facility) => (
                <Link key={facility.id} href={`${basePath}/facility/${facility.id}`}>
                  <GlassCard hover className="h-full flex flex-col">
                    <div className="aspect-video rounded-xl bg-secondary/30 mb-4 overflow-hidden relative">
                      <FacilityImage src={facility.image} alt={facility.name} />
                    </div>
                    <div className="space-y-3 flex-1 flex flex-col">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <TagBadge variant="primary">{facility.category}</TagBadge>
                          {facility.hasPlanetarium && <TagBadge variant="accent"><Star className="w-3 h-3 mr-1" />プラネタリウム</TagBadge>}
                          {facility.isFree && <TagBadge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">無料</TagBadge>}
                        </div>
                        <h3 className="font-semibold text-foreground line-clamp-2">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{facility.prefecture} {facility.city}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {facility.tags.slice(0, 3).map((tag) => <TagBadge key={tag}>{tag}</TagBadge>)}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                        <span>更新: {facility.updatedAt}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassCard className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground">施設名</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground hidden md:table-cell">カテゴリ</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground hidden sm:table-cell">所在地</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground hidden lg:table-cell">入館料</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground">更新日</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedFacilities.map((facility) => (
                    <tr key={facility.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-medium text-foreground">{facility.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          {facility.hasPlanetarium && <Star className="w-3 h-3 text-yellow-400" />}
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell"><TagBadge variant="primary">{facility.category}</TagBadge></td>
                      <td className="py-4 px-4 text-sm text-muted-foreground hidden sm:table-cell">{facility.prefecture}</td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className={facility.isFree ? "text-emerald-400 font-medium" : "text-sm text-muted-foreground"}>
                          {facility.admissionFee || "-"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{facility.updatedAt}</td>
                      <td className="py-4 px-4">
                        <Link href={`${basePath}/facility/${facility.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300"><ExternalLink className="w-4 h-4" /></Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
