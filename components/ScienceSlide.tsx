'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
    <p className="text-gray-600">Загрузка карты...</p>
  </div>
})

const demographicData = [
  { year: 1965, population: 12.1, urban: 42, rural: 58, birthRate: 32.5, deathRate: 7.2 },
  { year: 1970, population: 13.0, urban: 45, rural: 55, birthRate: 28.3, deathRate: 6.8 },
  { year: 1975, population: 14.3, urban: 50, rural: 50, birthRate: 26.1, deathRate: 6.5 },
  { year: 1980, population: 15.8, urban: 54, rural: 46, birthRate: 24.8, deathRate: 6.3 },
  { year: 1985, population: 16.2, urban: 57, rural: 43, birthRate: 23.5, deathRate: 6.1 },
]

// Данные для исторических карт
const historicalMaps = [
  {
    title: 'Карта административного деления Казахской ССР (1970)',
    description: 'Административное деление республики в 1970-х годах',
    year: 1970,
    source: 'Статистический сборник "Казахстан в цифрах"',
  },
  {
    title: 'Карта размещения населения Казахстана (1975)',
    description: 'Распределение городского и сельского населения по областям',
    year: 1975,
    source: 'Демографический ежегодник Казахской ССР',
  },
  {
    title: 'Карта миграционных потоков (1980)',
    description: 'Направления миграции населения из села в город',
    year: 1980,
    source: 'Статистический сборник по миграции',
  },
]

// Статистические сборники
const statisticalSources = [
  {
    title: 'Народное хозяйство Казахской ССР за 1965-1985 гг.',
    year: 1986,
    description: 'Статистический сборник с данными о населении, экономике и социальной сфере',
    data: ['Население по областям', 'Городское и сельское население', 'Рождаемость и смертность', 'Миграция'],
  },
  {
    title: 'Демографический ежегодник Казахской ССР',
    year: 1985,
    description: 'Подробные демографические данные по годам',
    data: ['Возрастная структура', 'Естественное движение населения', 'Миграционные процессы'],
  },
  {
    title: 'Статистический сборник "Казахстан в цифрах"',
    year: 1980,
    description: 'Основные показатели развития республики',
    data: ['Численность населения', 'Урбанизация', 'Социально-экономические показатели'],
  },
]

export default function ScienceSlide() {
  const [selectedMap, setSelectedMap] = useState<number | null>(null)
  const [selectedSource, setSelectedSource] = useState<number | null>(null)

  return (
    <div>
      <div className="border-b-4 border-blue-500 pb-6 mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          🔬 Science - Демографические изменения Казахстана (1965-1985)
        </h2>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          8 баллов
        </span>
      </div>

      <p className="text-xl text-gray-600 mb-8">
        Исследование демографических изменений по картам и статистике
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Ключевые данные</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>1965 г.:</strong> Население 12.1 млн</li>
            <li>42% городское, 58% сельское</li>
            <li><strong>1985 г.:</strong> Население 16.2 млн</li>
            <li>57% городское, 43% сельское</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-4">📈 Основные изменения</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Рост населения: +4.1 млн (+33.9%)</li>
            <li>Урбанизация: +15%</li>
            <li>Рождаемость: 32.5 → 23.5‰</li>
            <li>Смертность: 7.2 → 6.1‰</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-green-800 mb-4">🎯 Выводы</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Активная урбанизация страны</li>
            <li>Демографический переход</li>
            <li>Миграция из села в город</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Рост населения Казахстана (1965-1985)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={demographicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="population" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Население (млн)"
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Динамика рождаемости и смертности</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={demographicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="birthRate" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Рождаемость (на 1000)"
              dot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="deathRate" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Смертность (на 1000)"
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Изменение соотношения городского и сельского населения</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={demographicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="urban" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Городское (%)"
              dot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="rural" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Сельское (%)"
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">🗺️ Исторические карты</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {historicalMaps.map((map, index) => (
            <div
              key={index}
              onClick={() => setSelectedMap(selectedMap === index ? null : index)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedMap === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <h4 className="font-bold text-gray-800 mb-2">{map.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{map.description}</p>
              <p className="text-xs text-gray-500">Год: {map.year}</p>
              <p className="text-xs text-gray-500 mt-1">Источник: {map.source}</p>
            </div>
          ))}
        </div>

        {selectedMap !== null && (
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-blue-200">
            <h4 className="text-xl font-bold text-gray-800 mb-4">{historicalMaps[selectedMap].title}</h4>
            <div className="bg-gray-100 p-4 rounded-lg mb-4" style={{ minHeight: '400px' }}>
              <MapComponent 
                lat={48.0}
                lng={66.9}
                cityName="Казахстан"
              />
            </div>
            <div className="text-sm text-gray-700">
              <p><strong>Описание:</strong> {historicalMaps[selectedMap].description}</p>
              <p className="mt-2"><strong>Источник:</strong> {historicalMaps[selectedMap].source}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">📚 Статистические сборники</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statisticalSources.map((source, index) => (
            <div
              key={index}
              onClick={() => setSelectedSource(selectedSource === index ? null : index)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedSource === index
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <h4 className="font-bold text-gray-800 mb-2">{source.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{source.description}</p>
              <p className="text-xs text-gray-500">Год издания: {source.year}</p>
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">Содержит данные:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {source.data.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {selectedSource !== null && (
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-purple-200">
            <h4 className="text-xl font-bold text-gray-800 mb-4">{statisticalSources[selectedSource].title}</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 mb-2"><strong>Описание:</strong> {statisticalSources[selectedSource].description}</p>
                <p className="text-gray-700"><strong>Год издания:</strong> {statisticalSources[selectedSource].year}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">Содержащиеся данные:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {statisticalSources[selectedSource].data.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Использование:</strong> Данные из этого сборника использованы для анализа демографических изменений 
                  в период 1965-1985 годов. Сборник содержит подробную статистику по численности населения, 
                  естественному движению населения, миграционным процессам и другим демографическим показателям.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Анализ демографических изменений</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-3">По данным исторических карт:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Административное деление показывало концентрацию населения в крупных городах</li>
              <li>• Миграционные потоки направлялись из сельских районов в промышленные центры</li>
              <li>• Формировались новые городские агломерации вокруг крупных предприятий</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-3">По данным статистических сборников:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Детальная статистика подтверждает рост городского населения</li>
              <li>• Снижение рождаемости связано с урбанизацией и изменением образа жизни</li>
              <li>• Миграция была основным фактором роста городского населения</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
