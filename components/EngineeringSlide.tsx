'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const zoneData = [
  { name: 'Жилая', value: 40, color: '#3b82f6' },
  { name: 'Промышленная', value: 15, color: '#ef4444' },
  { name: 'Транспортная', value: 20, color: '#f59e0b' },
  { name: 'Рекреационная', value: 15, color: '#10b981' },
  { name: 'Административная', value: 10, color: '#8b5cf6' },
]

export default function EngineeringSlide() {
  return (
    <div>
      <div className="border-b-4 border-blue-500 pb-6 mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          ⚙️ Engineering - Город будущего 1985
        </h2>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          20 баллов
        </span>
      </div>

      <p className="text-xl text-gray-600 mb-8">
        Проектирование города с улучшенными условиями жизни
      </p>

      <div className="mb-8">
        <h3 className="text-3xl font-bold text-blue-800 mb-6">
          🏗️ Проект "Город будущего 1985"
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Распределение зон города</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={zoneData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {zoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {zoneData.map((zone) => (
              <div
                key={zone.name}
                className="p-4 rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${zone.color}, ${zone.color}dd)` }}
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-bold">{zone.name}</h5>
                  <span className="text-3xl font-bold">{zone.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border-t-4 border-blue-500 p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            🏠 Жильё
          </h4>
          <ul className="space-y-2">
            {[
              'Многоэтажные панельные дома',
              'Улучшенная планировка квартир',
              'Центральное отопление',
              'Горячее водоснабжение',
              'Лифты в домах',
              'Балконы и лоджии',
              'Детские площадки',
              'Парковки',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-t-4 border-purple-500 p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            🚌 Транспорт
          </h4>
          <ul className="space-y-2">
            {[
              'Метрополитен',
              'Троллейбусы',
              'Автобусы',
              'Трамваи',
              'Такси',
              'Велосипедные дорожки',
              'Пешеходные зоны',
              'Парковки',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-t-4 border-green-500 p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            🌳 Экология
          </h4>
          <ul className="space-y-2">
            {[
              'Парки и скверы',
              'Озеленение улиц',
              'Очистные сооружения',
              'Система утилизации отходов',
              'Защитные лесополосы',
              'Водоочистные станции',
              'Контроль выбросов',
              'Зоны отдыха',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-t-4 border-orange-500 p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
            🏛️ Инфраструктура
          </h4>
          <ul className="space-y-2">
            {[
              'Школы и детсады',
              'Поликлиники',
              'Магазины',
              'Столовые',
              'Библиотеки',
              'Спорткомплексы',
              'Кинотеатры',
              'Дома культуры',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">🎯 Ключевые улучшения</h4>
        <ol className="space-y-2 text-gray-700 text-lg">
          <li>1. <strong>Комфортное жильё:</strong> Современные панельные дома с улучшенной планировкой</li>
          <li>2. <strong>Эффективный транспорт:</strong> Развитая сеть общественного транспорта</li>
          <li>3. <strong>Чистая экология:</strong> Парки, озеленение, очистные сооружения</li>
          <li>4. <strong>Социальная инфраструктура:</strong> Школы, поликлиники, магазины в шаговой доступности</li>
        </ol>
      </div>
    </div>
  )
}

