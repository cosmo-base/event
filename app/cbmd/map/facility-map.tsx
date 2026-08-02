"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Facility } from "@/data/CBMD"

const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})
L.Marker.prototype.options.icon = DefaultIcon

function FlyTo({ facility }: { facility: Facility | null }) {
  const map = useMap()
  useEffect(() => {
    if (facility?.lat && facility?.lng) {
      map.flyTo([facility.lat, facility.lng], 13)
    }
  }, [facility, map])
  return null
}

export default function FacilityMap({
  facilities,
  onSelect,
  selected,
}: {
  facilities: Facility[]
  onSelect: (f: Facility) => void
  selected: Facility | null
}) {
  return (
    <div className="absolute inset-0">
      <MapContainer
        center={[35.68, 139.69]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyTo facility={selected} />
        {facilities.map((f) =>
          f.lat && f.lng ? (
            <Marker
              key={f.id}
              position={[f.lat, f.lng]}
              eventHandlers={{ click: () => onSelect(f) }}
            >
              <Popup>
                <div className="font-sans text-slate-900 leading-tight">
                  <strong className="block mb-1">{f.name}</strong>
                  <span className="text-xs block text-slate-600">{f.prefecture} {f.city}</span>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  )
}
