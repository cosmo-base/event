"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { SpaceEvent } from "@/data/cbed"
import Link from "next/link"

const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})
L.Marker.prototype.options.icon = DefaultIcon

function MapController({
  center,
  onBoundsChange,
}: {
  center: [number, number]
  onBoundsChange: (bounds: { n: number; s: number; e: number; w: number }) => void
}) {
  const map = useMapEvents({
    moveend() {
      const b = map.getBounds()
      onBoundsChange({ n: b.getNorth(), s: b.getSouth(), e: b.getEast(), w: b.getWest() })
    },
  })

  useEffect(() => {
    map.invalidateSize()
    map.flyTo(center, map.getZoom())
  }, [center, map])

  return null
}

export default function CbedEventMap({
  events,
  center,
  onBoundsChange,
}: {
  events: SpaceEvent[]
  center: [number, number]
  onBoundsChange: (bounds: { n: number; s: number; e: number; w: number }) => void
}) {
  return (
    <div className="absolute inset-0 z-10">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} onBoundsChange={onBoundsChange} />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat!, event.lng!]}>
            <Popup>
              <div className="font-sans text-slate-900 leading-tight">
                <strong className="block mb-1">{event.title}</strong>
                <span className="text-xs block text-slate-600">{event.location}</span>
                <Link
                  href={`/kurawaku2/cbed/${event.id}`}
                  className="text-[10px] text-blue-600 underline block mt-2"
                >
                  詳細を見る
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
