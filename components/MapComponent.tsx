'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix для иконок Leaflet в Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

// Создаём кастомные иконки для разных типов объектов
const createCustomIcon = (type: string) => {
  const colors: { [key: string]: string } = {
    'Вуз': '#3b82f6',
    'Театр': '#8b5cf6',
    'Больница': '#ef4444',
    'Школа': '#10b981',
    'Дом культуры': '#f59e0b',
    'Музей': '#6366f1',
    'Спорткомплекс': '#ec4899',
  }
  
  const color = colors[type] || '#3b82f6'
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

interface InfrastructureObject {
  type: 'Feature'
  properties: {
    Name: string
    Type: string
    Year: string
    Description: string
    City: string
    Source: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}

interface MapComponentProps {
  lat: number
  lng: number
  cityName: string
  objects?: InfrastructureObject[]
}

// Компонент для обновления карты при изменении города
function MapUpdater({ lat, lng, objects }: { lat: number; lng: number; objects?: InfrastructureObject[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (objects && objects.length > 0) {
      // Вычисляем границы для всех объектов
      const bounds = L.latLngBounds(
        objects.map(obj => [obj.geometry.coordinates[1], obj.geometry.coordinates[0]])
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      map.setView([lat, lng], 12)
    }
  }, [lat, lng, objects, map])
  
  return null
}

export default function MapComponent({ lat, lng, cityName, objects = [] }: MapComponentProps) {
  const markersRef = useRef<L.Marker[]>([])

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border-2 border-gray-300">
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater lat={lat} lng={lng} objects={objects} />
        
        {/* Маркер центра города */}
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="text-center">
              <strong className="text-lg">{cityName}</strong>
              <p className="text-sm text-gray-600 mt-1">Центр города</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Маркеры объектов инфраструктуры */}
        {objects.map((obj, index) => {
          const [lngCoord, latCoord] = obj.geometry.coordinates
          return (
            <Marker
              key={index}
              position={[latCoord, lngCoord]}
              icon={createCustomIcon(obj.properties.Type)}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <strong className="text-base block mb-2">{obj.properties.Name}</strong>
                  <div className="text-sm space-y-1">
                    <p><span className="font-semibold">Тип:</span> {obj.properties.Type}</p>
                    <p><span className="font-semibold">Год:</span> {obj.properties.Year}</p>
                    <p><span className="font-semibold">Описание:</span> {obj.properties.Description}</p>
                    {obj.properties.Source && (
                      <p className="mt-2">
                        <a 
                          href={obj.properties.Source} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Источник →
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
