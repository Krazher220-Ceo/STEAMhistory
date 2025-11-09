'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const zoneData = [
  { name: 'Жилая', value: 40, color: '#3b82f6' },
  { name: 'Промышленная', value: 15, color: '#ef4444' },
  { name: 'Транспортная', value: 20, color: '#f59e0b' },
  { name: 'Рекреационная', value: 15, color: '#10b981' },
  { name: 'Административная', value: 10, color: '#8b5cf6' },
]

export default function EngineeringSlide() {
  const [rotation, setRotation] = useState({ x: -20, y: 45 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMousePos.x
        const deltaY = e.clientY - lastMousePos.y
        setRotation(prev => ({
          x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
          y: prev.y + deltaX * 0.5
        }))
        setLastMousePos({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, lastMousePos])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div>
      <div className="border-b-4 border-blue-500 pb-4 md:pb-6 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
          ⚙️ Engineering - Город будущего 1985
        </h2>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold">
          20 баллов
        </span>
      </div>

      <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
        Проектирование города с улучшенными условиями жизни
      </p>

      {/* 3D Визуализация города */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 md:mb-6">
          🏗️ 3D Визуализация "Город будущего 1985"
        </h3>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8 rounded-xl border-2 border-gray-300 mb-4">
          <div className="relative w-full h-[400px] md:h-[600px] perspective-1000">
            <div
              className="absolute inset-0 preserve-3d"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Земля/Основание */}
              <div
                className="absolute"
                style={{
                  width: '600px',
                  height: '600px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  transform: 'translate(-50%, -50%) translateZ(-200px) rotateX(90deg)',
                  left: '50%',
                  top: '50%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}
              />

              {/* Жилая зона - Панельные дома */}
              {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * Math.PI * 2
                const radius = 150
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                const height = 80 + Math.random() * 40
                return (
                  <div
                    key={`residential-${i}`}
                    className="absolute"
                    style={{
                      width: '40px',
                      height: `${height}px`,
                      background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                      transform: `translate(-50%, -50%) translate3d(${x}px, -${height/2}px, ${z}px)`,
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      borderRadius: '4px 4px 0 0'
                    }}
                  >
                    {/* Окна */}
                    {[...Array(Math.floor(height / 20))].map((_, j) => (
                      <div
                        key={`window-${j}`}
                        className="absolute w-3 h-3 bg-yellow-300 rounded-sm"
                        style={{
                          left: '6px',
                          top: `${10 + j * 20}px`,
                          boxShadow: '0 0 5px rgba(255,255,0,0.5)'
                        }}
                      />
                    ))}
                  </div>
                )
              })}

              {/* Промышленная зона */}
              {[...Array(3)].map((_, i) => {
                const angle = (i / 3) * Math.PI * 2 + Math.PI
                const radius = 200
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                return (
                  <div
                    key={`industrial-${i}`}
                    className="absolute"
                    style={{
                      width: '60px',
                      height: '100px',
                      background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
                      transform: `translate(-50%, -50%) translate3d(${x}px, -50px, ${z}px)`,
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      borderRadius: '4px 4px 0 0'
                    }}
                  >
                    {/* Трубы */}
                    <div
                      className="absolute w-4 h-20 bg-gray-600 rounded-full"
                      style={{
                        left: '50%',
                        top: '-20px',
                        transform: 'translateX(-50%)'
                      }}
                    />
                  </div>
                )
              })}

              {/* Транспортная зона - Дороги */}
              {[
                { angle: 0, length: 400 },
                { angle: Math.PI / 2, length: 400 }
              ].map((road, i) => (
                <div
                  key={`road-${i}`}
                  className="absolute"
                  style={{
                    width: `${road.length}px`,
                    height: '30px',
                    background: 'linear-gradient(90deg, #4b5563 0%, #6b7280 50%, #4b5563 100%)',
                    transform: `translate(-50%, -50%) translate3d(0, 0, 0) rotateZ(${road.angle}rad)`,
                    left: '50%',
                    top: '50%',
                    borderTop: '2px dashed #fbbf24',
                    borderBottom: '2px dashed #fbbf24'
                  }}
                />
              ))}

              {/* Рекреационная зона - Парки */}
              {[...Array(4)].map((_, i) => {
                const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
                const radius = 120
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                return (
                  <div
                    key={`park-${i}`}
                    className="absolute"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'radial-gradient(circle, #10b981 0%, #059669 100%)',
                      transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateX(90deg)`,
                      left: '50%',
                      top: '50%',
                      borderRadius: '50%',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    {/* Деревья */}
                    {[...Array(3)].map((_, j) => {
                      const treeAngle = (j / 3) * Math.PI * 2
                      const treeRadius = 20
                      const treeX = Math.cos(treeAngle) * treeRadius
                      const treeZ = Math.sin(treeAngle) * treeRadius
                      return (
                        <div
                          key={`tree-${j}`}
                          className="absolute"
                          style={{
                            width: '15px',
                            height: '25px',
                            background: '#166534',
                            transform: `translate(-50%, -50%) translate3d(${treeX}px, -10px, ${treeZ}px)`,
                            left: '50%',
                            top: '50%',
                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                          }}
                        />
                      )
                    })}
                  </div>
                )
              })}

              {/* Административная зона - Центральное здание */}
              <div
                className="absolute"
                style={{
                  width: '80px',
                  height: '120px',
                  background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
                  transform: 'translate(-50%, -50%) translate3d(0, -60px, 0)',
                  left: '50%',
                  top: '50%',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                  borderRadius: '8px 8px 0 0'
                }}
              >
                {/* Колонны */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`column-${i}`}
                    className="absolute w-2 h-20 bg-purple-700"
                    style={{
                      left: `${10 + i * 20}px`,
                      bottom: '0',
                      borderRadius: '2px 2px 0 0'
                    }}
                  />
                ))}
              </div>

              {/* Транспорт - Автобусы на дорогах */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={`bus-${i}`}
                  className="absolute"
                  style={{
                    width: '30px',
                    height: '15px',
                    background: '#f59e0b',
                    transform: `translate(-50%, -50%) translate3d(${i * 100 - 50}px, 0, 0)`,
                    left: '50%',
                    top: '50%',
                    borderRadius: '4px',
                    animation: `moveBus${i} 3s linear infinite`
                  }}
                >
                  <style>{`
                    @keyframes moveBus${i} {
                      0% { transform: translate(-50%, -50%) translate3d(${i * 100 - 50}px, 0, 0); }
                      100% { transform: translate(-50%, -50%) translate3d(${i * 100 + 150}px, 0, 0); }
                    }
                  `}</style>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm md:text-base text-gray-600 mt-4">
            💡 Перетащите мышью для поворота 3D модели города
          </p>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 md:mb-6">
          📊 Распределение зон города
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Распределение зон</h4>
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

          <div className="space-y-3 md:space-y-4">
            {zoneData.map((zone) => (
              <div
                key={zone.name}
                className="p-3 md:p-4 rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${zone.color}, ${zone.color}dd)` }}
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-lg md:text-xl font-bold">{zone.name}</h5>
                  <span className="text-2xl md:text-3xl font-bold">{zone.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white border-t-4 border-blue-500 p-4 md:p-6 rounded-xl shadow-lg">
          <h4 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4 flex items-center gap-2">
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
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-t-4 border-purple-500 p-4 md:p-6 rounded-xl shadow-lg">
          <h4 className="text-lg md:text-xl font-bold text-purple-800 mb-3 md:mb-4 flex items-center gap-2">
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
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-t-4 border-green-500 p-4 md:p-6 rounded-xl shadow-lg">
          <h4 className="text-lg md:text-xl font-bold text-green-800 mb-3 md:mb-4 flex items-center gap-2">
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
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-t-4 border-orange-500 p-4 md:p-6 rounded-xl shadow-lg">
          <h4 className="text-lg md:text-xl font-bold text-orange-800 mb-3 md:mb-4 flex items-center gap-2">
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
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6 rounded-xl border-l-4 border-blue-500">
        <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">🎯 Ключевые улучшения</h4>
        <ol className="space-y-2 text-gray-700 text-base md:text-lg">
          <li>1. <strong>Комфортное жильё:</strong> Современные панельные дома с улучшенной планировкой</li>
          <li>2. <strong>Эффективный транспорт:</strong> Развитая сеть общественного транспорта</li>
          <li>3. <strong>Чистая экология:</strong> Парки, озеленение, очистные сооружения</li>
          <li>4. <strong>Социальная инфраструктура:</strong> Школы, поликлиники, магазины в шаговой доступности</li>
        </ol>
      </div>
    </div>
  )
}
