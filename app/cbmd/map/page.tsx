"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MapPin, Loader2, Filter } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { TagBadge } from "@/components/tag-badge"
import { Button } from "@/components/ui/button"
import { fetchFacilitiesData, regions, facilityTypes, Facility } from "@/data/CBMD"
import { useCbmdContext } from "@/components/cbmd-region-context"

const FacilityMap = dynamic(() => import("./facility-map"), { ssr: false })

export default function CbmdMapPage() {
  const { lockedRegion, lockedPrefectures, mapCenter, mapZoom, basePath } = useCbmdContext()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [filtered, setFiltered] = useState<Facility[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(lockedRegion)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [onlyPlanetarium, setOnlyPlanetarium] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selected, setSelected] = useState<Facility | null>(null)

  useEffect(() => {
    fetchFacilitiesData().then((data) => {
      setFacilities(data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    let result = facilities.filter((f) => f.lat && f.lng)
    if (lockedPrefectures) result = result.filter((f) => lockedPrefectures.includes(f.prefecture))
    else if (selectedRegion) result = result.filter((f) => f.region === selectedRegion)
    if (selectedCategory) result = result.filter((f) => f.category === selectedCategory)
    if (onlyPlanetarium) result = result.filter((f) => f.hasPlanetarium)
    setFiltered(result)
  }, [facilities, lockedPrefectures, selectedRegion, selectedCategory, onlyPlanetarium])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">地図から探す</h1>
        <p className="text-muted-foreground">全国の宇宙関連施設を地図上で確認できます</p>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="glass border-white/20 text-white/70 hover:text-white"
        >
          <Filter className="w-4 h-4 mr-2" /> フィルター {showFilters ? "▲" : "▼"}
        </Button>
        {((!lockedRegion && selectedRegion) || selectedCategory || onlyPlanetarium) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { if (!lockedRegion) setSelectedRegion(null); setSelectedCategory(null); setOnlyPlanetarium(false) }}
            className="text-muted-foreground"
          >
            クリア
          </Button>
        )}
        <span className="text-sm text-muted-foreground self-center">{filtered.length}件</span>
      </div>

      {showFilters && (
        <GlassCard className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {!lockedRegion && (
              <div>
                <p className="text-xs font-medium text-foreground mb-2">地方</p>
                <div className="flex flex-wrap gap-1">
                  {regions.map((r) => (
                    <button
                      key={r.name}
                      onClick={() => setSelectedRegion(selectedRegion === r.name ? null : r.name)}
                      className={`px-2 py-1 rounded text-xs transition-all ${selectedRegion === r.name ? "bg-blue-500/20 text-blue-400" : "bg-secondary/50 text-muted-foreground hover:bg-secondary/70"}`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-foreground mb-2">施設カテゴリ</p>
              <div className="flex flex-wrap gap-1">
                {facilityTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedCategory(selectedCategory === t ? null : t)}
                    className={`px-2 py-1 rounded text-xs transition-all ${selectedCategory === t ? "bg-violet-500/20 text-violet-400" : "bg-secondary/50 text-muted-foreground hover:bg-secondary/70"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground mb-2">その他</p>
              <button
                onClick={() => setOnlyPlanetarium(!onlyPlanetarium)}
                className={`px-3 py-1.5 rounded text-xs transition-all ${onlyPlanetarium ? "bg-blue-500/20 text-blue-400" : "bg-secondary/50 text-muted-foreground hover:bg-secondary/70"}`}
              >
                ★ プラネタリウムのみ
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="relative rounded-2xl overflow-hidden" style={{ height: "60vh" }}>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 rounded-2xl">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          ) : (
            <FacilityMap
              facilities={filtered}
              onSelect={setSelected}
              selected={selected}
              initialCenter={mapCenter ?? undefined}
              initialZoom={mapZoom ?? undefined}
            />
          )}
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {selected ? (
            <GlassCard className="border-blue-500/30">
              <TagBadge variant="primary" className="mb-2">{selected.category}</TagBadge>
              <h3 className="font-bold text-foreground mb-1">{selected.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" />{selected.prefecture} {selected.city}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{selected.description}</p>
              <Link href={`${basePath}/facility/${selected.id}`}>
                <Button size="sm" className="w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">詳細を見る</Button>
              </Link>
            </GlassCard>
          ) : (
            <p className="text-sm text-muted-foreground px-2 py-4">地図のマーカーをタップすると詳細が表示されます</p>
          )}

          <div className="space-y-2">
            {filtered.slice(0, 20).map((f) => (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${selected?.id === f.id ? "bg-blue-500/20 border border-blue-500/30" : "bg-secondary/20 hover:bg-secondary/40"}`}
              >
                <span className="font-medium text-foreground">{f.name}</span>
                <span className="text-muted-foreground text-xs block">{f.prefecture}</span>
              </button>
            ))}
            {filtered.length > 20 && (
              <p className="text-xs text-muted-foreground text-center py-2">他 {filtered.length - 20} 件...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
