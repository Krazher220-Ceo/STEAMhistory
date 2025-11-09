'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Динамический импорт карты для избежания SSR проблем
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-gray-200 rounded-xl flex items-center justify-center">
    <p className="text-gray-600">Загрузка карты...</p>
  </div>
})

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

interface GeoJSONData {
  type: 'FeatureCollection'
  features: InfrastructureObject[]
}

const cityData = {
  almaty: {
    name: 'Алма-Ата',
    lat: 43.2220,
    lng: 76.8512,
  },
  karaganda: {
    name: 'Караганда',
    lat: 49.8014,
    lng: 73.1049,
  },
  pavlodar: {
    name: 'Павлодар',
    lat: 52.2870,
    lng: 76.9733,
  },
  kokshetau: {
    name: 'Кокшетау',
    lat: 53.2833,
    lng: 69.3833,
  },
  kostanay: {
    name: 'Костанай',
    lat: 53.2144,
    lng: 63.6246,
  },
}

export default function TechnologySlide() {
  const [selectedCity, setSelectedCity] = useState<keyof typeof cityData | null>(null)
  const [allObjects, setAllObjects] = useState<InfrastructureObject[]>([])
  const [loading, setLoading] = useState(true)

  // Загружаем данные из GeoJSON
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/infrastructure_1970s_1980s.geojson')
        const data: GeoJSONData = await response.json()
        setAllObjects(data.features)
        setLoading(false)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const currentCity = selectedCity ? cityData[selectedCity] : null
  
  // Фильтруем объекты по выбранному городу
  const cityObjects = selectedCity && currentCity
    ? allObjects.filter(obj => obj.properties.City === currentCity.name)
    : []

  // Подсчитываем объекты по типам
  const countByType = cityObjects.reduce((acc, obj) => {
    const type = obj.properties.Type
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const typeLabels: { [key: string]: { icon: string; label: string; color: string } } = {
    'Вуз': { icon: '🎓', label: 'Вузов', color: 'blue' },
    'Театр': { icon: '🎭', label: 'Театров', color: 'purple' },
    'Больница': { icon: '🏥', label: 'Больниц', color: 'red' },
    'Школа': { icon: '🏫', label: 'Школ', color: 'green' },
    'Дом культуры': { icon: '🎪', label: 'Домов культуры', color: 'yellow' },
    'Музей': { icon: '🏛️', label: 'Музеев', color: 'indigo' },
    'Спорткомплекс': { icon: '🏟️', label: 'Спорткомплексов', color: 'pink' },
  }

  const colorClasses: { [key: string]: string } = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    pink: 'bg-pink-50 text-pink-600',
  }

  return (
    <div>
      <div className="border-b-4 border-blue-500 pb-6 mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          💻 Technology - Интерактивная карта социальной инфраструктуры
        </h2>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          10 баллов
        </span>
      </div>

      <p className="text-xl text-gray-600 mb-8">
        Создание интерактивной карты с объектами социальной инфраструктуры 1970-1980-х гг.
      </p>

      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          🏙️ Выберите город для просмотра:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.keys(cityData).map((cityKey) => {
            const city = cityData[cityKey as keyof typeof cityData]
            return (
              <button
                key={cityKey}
                onClick={() => setSelectedCity(cityKey as keyof typeof cityData)}
                className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  selectedCity === cityKey
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
                }`}
              >
                {city.name}
              </button>
            )
          })}
        </div>
      </div>

      {loading && (
        <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 text-center">
          <p className="text-xl text-gray-700">Загрузка данных...</p>
        </div>
      )}

      {!loading && selectedCity && currentCity && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              📍 {currentCity.name}
            </h3>
            <p className="text-gray-600 mb-4">
              Найдено объектов: <strong>{cityObjects.length}</strong>
            </p>
            <MapComponent 
              lat={currentCity.lat} 
              lng={currentCity.lng} 
              cityName={currentCity.name}
              objects={cityObjects}
            />
          </div>

          <div className="bg-white border-2 border-blue-200 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-gray-800 mb-4">📊 Объекты инфраструктуры</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(typeLabels).map(([type, info]) => {
                const count = countByType[type] || 0
                if (count === 0) return null
                return (
                  <div key={type} className={`${colorClasses[info.color]} p-4 rounded-lg`}>
                    <div className="text-2xl mb-2">{info.icon}</div>
                    <div className="text-3xl font-bold">{count}</div>
                    <div className="text-sm">{info.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4">📋 Список объектов</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {cityObjects.map((obj, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold text-gray-800 mb-2">{obj.properties.Name}</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Тип:</span> {obj.properties.Type}</p>
                    <p><span className="font-medium">Год:</span> {obj.properties.Year}</p>
                    <p className="text-xs text-gray-500 mt-2">{obj.properties.Description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && !selectedCity && (
        <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 text-center">
          <p className="text-xl text-gray-700 mb-4">
            Выберите город для просмотра объектов инфраструктуры
          </p>
          <p className="text-gray-600">
            Всего объектов в базе: <strong>{allObjects.length}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
