'use client'

import { useState, useEffect, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const zoneData = [
  { name: 'Жилая', value: 40, color: '#3b82f6' },
  { name: 'Промышленная', value: 15, color: '#ef4444' },
  { name: 'Транспортная', value: 20, color: '#f59e0b' },
  { name: 'Рекреационная', value: 15, color: '#10b981' },
  { name: 'Административная', value: 10, color: '#8b5cf6' },
]

// Фиксированные высоты для домов (больше домов)
const residentialHeights = [90, 100, 85, 95, 110, 88, 92, 105, 87, 98, 103, 89]

export default function EngineeringSlide() {
  const [rotation, setRotation] = useState({ x: -25, y: 45 })
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

  // Мемоизируем позиции элементов (более детальная структура)
  const cityElements = useMemo(() => {
    // Жилая зона - больше домов (12 вместо 6)
    const residential = [...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2
      const radius = 120 + (i % 3) * 20 // Разные радиусы для разнообразия
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        height: residentialHeights[i]
      }
    })

    // Промышленная зона (больше заводов)
    const industrial = [...Array(5)].map((_, i) => {
      const angle = (i / 5) * Math.PI * 2 + Math.PI
      const radius = 170 + i * 10
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        height: 90 + i * 5
      }
    })

    // Рекреационная зона (больше парков)
    const parks = [...Array(6)].map((_, i) => {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6
      const radius = 100 + (i % 2) * 15
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        size: 60 + (i % 3) * 10
      }
    })

    // Социальная инфраструктура (школы, больницы, магазины)
    const schools = [...Array(3)].map((_, i) => {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 3
      const radius = 130
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius
      }
    })

    const hospitals = [...Array(2)].map((_, i) => {
      const angle = (i / 2) * Math.PI * 2 + Math.PI / 2
      const radius = 150
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius
      }
    })

    return { residential, industrial, parks, schools, hospitals }
  }, [])

  // Высота земли (все элементы должны быть выше этого значения)
  const groundLevel = 0
  // Центр сцены (фиксированный для правильного вращения)
  const sceneCenter = { x: 0, y: 0, z: 0 }

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
          <div className="relative w-full h-[400px] md:h-[600px]" style={{ perspective: '1200px', perspectiveOrigin: '50% 50%', overflow: 'hidden' }}>
            <div
              className="absolute"
              style={{
                width: '600px',
                height: '600px',
                left: '50%',
                top: '50%',
                marginLeft: '-300px',
                marginTop: '-300px',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Земля/Основание */}
              <div
                className="absolute"
                style={{
                  width: '550px',
                  height: '550px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  transform: `translate(-50%, -50%) translateZ(${groundLevel}px) rotateX(90deg)`,
                  left: '50%',
                  top: '50%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center'
                }}
              />

              {/* Транспортная зона - Дороги (ВМОНТИРОВАНЫ В ЗЕМЛЮ) */}
              {[
                { angle: 0, length: 400 },
                { angle: Math.PI / 2, length: 400 },
                { angle: Math.PI / 4, length: 280 },
                { angle: -Math.PI / 4, length: 280 }
              ].map((road, i) => {
                const roadHeight = 25 // Высота дороги
                // Центр дороги должен быть на groundLevel - roadHeight/2, чтобы верх был на groundLevel
                const roadCenterY = groundLevel - roadHeight / 2
                return (
                  <div
                    key={`road-${i}`}
                    className="absolute"
                    style={{
                      width: `${road.length}px`,
                      height: `${roadHeight}px`,
                      background: 'linear-gradient(90deg, #4b5563 0%, #6b7280 50%, #4b5563 100%)',
                      transform: `translate(-50%, -50%) translate3d(0, ${roadCenterY}px, 0) rotateZ(${road.angle}rad)`,
                      left: '50%',
                      top: '50%',
                      borderTop: '3px dashed #fbbf24',
                      borderBottom: '3px dashed #fbbf24',
                      transformStyle: 'preserve-3d',
                      borderRadius: '2px',
                      transformOrigin: 'center center',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
                      zIndex: 1 // Дороги поверх земли, но под зданиями
                    }}
                  >
                    {/* Разметка дороги */}
                    <div
                      className="absolute"
                      style={{
                        width: '100%',
                        height: '2px',
                        background: '#fbbf24',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        opacity: 0.7
                      }}
                    />
                  </div>
                )
              })}

              {/* Рекреационная зона - Парки (на уровне земли, более детальные) */}
              {cityElements.parks.map((park, i) => (
                <div
                  key={`park-${i}`}
                  className="absolute"
                  style={{
                    width: `${park.size}px`,
                    height: `${park.size}px`,
                    background: 'radial-gradient(circle, #10b981 0%, #059669 100%)',
                    transform: `translate(-50%, -50%) translate3d(${park.x}px, ${groundLevel + 0.5}px, ${park.z}px) rotateX(90deg)`,
                    left: '50%',
                    top: '50%',
                    borderRadius: '50%',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Деревья (больше деревьев) */}
                  {[...Array(4 + (i % 3))].map((_, j) => {
                    const treeAngle = (j / (4 + (i % 3))) * Math.PI * 2
                    const treeRadius = park.size * 0.25
                    const treeX = Math.cos(treeAngle) * treeRadius
                    const treeZ = Math.sin(treeAngle) * treeRadius
                    return (
                      <div
                        key={`tree-${j}`}
                        className="absolute"
                        style={{
                          width: '14px',
                          height: '22px',
                          background: 'linear-gradient(180deg, #166534 0%, #0f4c1f 100%)',
                          transform: `translate(-50%, -50%) translate3d(${treeX}px, ${groundLevel - 12}px, ${treeZ}px)`,
                          left: '50%',
                          top: '50%',
                          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                          transformStyle: 'preserve-3d',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                        }}
                      />
                    )
                  })}
                  {/* Скамейки в парке */}
                  {[...Array(2)].map((_, j) => {
                    const benchAngle = (j / 2) * Math.PI + Math.PI / 4
                    const benchRadius = park.size * 0.3
                    const benchX = Math.cos(benchAngle) * benchRadius
                    const benchZ = Math.sin(benchAngle) * benchRadius
                    return (
                      <div
                        key={`bench-${j}`}
                        className="absolute"
                        style={{
                          width: '16px',
                          height: '4px',
                          background: '#8B4513',
                          transform: `translate(-50%, -50%) translate3d(${benchX}px, ${groundLevel + 1}px, ${benchZ}px) rotateX(90deg)`,
                          left: '50%',
                          top: '50%',
                          borderRadius: '2px',
                          transformStyle: 'preserve-3d'
                        }}
                      />
                    )
                  })}
                </div>
              ))}

              {/* Жилая зона - Панельные дома (более детальные) */}
              {cityElements.residential.map((house, i) => (
                <div
                  key={`residential-${i}`}
                  className="absolute"
                  style={{
                    width: '38px',
                    height: `${house.height}px`,
                    background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
                    transform: `translate(-50%, -50%) translate3d(${house.x}px, ${groundLevel - house.height/2}px, ${house.z}px)`,
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    borderRadius: '4px 4px 0 0',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom'
                  }}
                >
                  {/* Окна (более детальные, по 2 на этаж) */}
                  {[...Array(Math.floor(house.height / 18))].map((_, j) => (
                    <div key={`floor-${j}`}>
                      <div
                        className="absolute w-2.5 h-2.5 bg-yellow-300 rounded-sm"
                        style={{
                          left: '6px',
                          top: `${8 + j * 18}px`,
                          boxShadow: '0 0 5px rgba(255,255,0,0.6)',
                          border: '1px solid #fbbf24'
                        }}
                      />
                      <div
                        className="absolute w-2.5 h-2.5 bg-yellow-300 rounded-sm"
                        style={{
                          right: '6px',
                          top: `${8 + j * 18}px`,
                          boxShadow: '0 0 5px rgba(255,255,0,0.6)',
                          border: '1px solid #fbbf24'
                        }}
                      />
                    </div>
                  ))}
                  {/* Балконы */}
                  {[...Array(Math.floor(house.height / 25))].map((_, j) => (
                    <div
                      key={`balcony-${j}`}
                      className="absolute"
                      style={{
                        width: '42px',
                        height: '3px',
                        background: '#1e40af',
                        left: '-2px',
                        top: `${12 + j * 25}px`,
                        borderRadius: '2px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    />
                  ))}
                  {/* Крыша */}
                  <div
                    className="absolute"
                    style={{
                      width: '42px',
                      height: '5px',
                      background: '#1e3a8a',
                      left: '-2px',
                      top: '-5px',
                      borderRadius: '4px 4px 0 0',
                      boxShadow: '0 -2px 8px rgba(0,0,0,0.3)'
                    }}
                  />
                </div>
              ))}

              {/* Промышленная зона (более детальная) */}
              {cityElements.industrial.map((factory, i) => (
                <div
                  key={`industrial-${i}`}
                  className="absolute"
                  style={{
                    width: '55px',
                    height: `${factory.height}px`,
                    background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    transform: `translate(-50%, -50%) translate3d(${factory.x}px, ${groundLevel - factory.height/2}px, ${factory.z}px)`,
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    borderRadius: '4px 4px 0 0',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom'
                  }}
                >
                  {/* Окна на заводах */}
                  {[...Array(Math.floor(factory.height / 20))].map((_, j) => (
                    <div
                      key={`factory-window-${j}`}
                      className="absolute w-3 h-3 bg-gray-800 rounded-sm"
                      style={{
                        left: '8px',
                        top: `${10 + j * 20}px`,
                        opacity: 0.7
                      }}
                    />
                  ))}
                  {/* Трубы (несколько) */}
                  {[...Array(2 + (i % 2))].map((_, j) => (
                    <div
                      key={`chimney-${j}`}
                      className="absolute bg-gray-600 rounded-full"
                      style={{
                        width: '4px',
                        height: `${20 + j * 5}px`,
                        left: `${15 + j * 12}px`,
                        top: `-${20 + j * 5}px`,
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                      }}
                    />
                  ))}
                </div>
              ))}

              {/* Социальная инфраструктура - Школы */}
              {cityElements.schools.map((school, i) => (
                <div
                  key={`school-${i}`}
                  className="absolute"
                  style={{
                    width: '45px',
                    height: '75px',
                    background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
                    transform: `translate(-50%, -50%) translate3d(${school.x}px, ${groundLevel - 37.5}px, ${school.z}px)`,
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    borderRadius: '4px 4px 0 0',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom'
                  }}
                >
                  {/* Флаг на школе */}
                  <div
                    className="absolute"
                    style={{
                      width: '2px',
                      height: '15px',
                      background: '#6b7280',
                      left: '50%',
                      top: '-15px',
                      transform: 'translateX(-50%)'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '8px',
                      height: '6px',
                      background: '#ef4444',
                      left: '50%',
                      top: '-15px',
                      transform: 'translateX(-50%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                    }}
                  />
                </div>
              ))}

              {/* Социальная инфраструктура - Больницы */}
              {cityElements.hospitals.map((hospital, i) => (
                <div
                  key={`hospital-${i}`}
                  className="absolute"
                  style={{
                    width: '50px',
                    height: '80px',
                    background: 'linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)',
                    transform: `translate(-50%, -50%) translate3d(${hospital.x}px, ${groundLevel - 40}px, ${hospital.z}px)`,
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    borderRadius: '4px 4px 0 0',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom',
                    border: '2px solid #ef4444'
                  }}
                >
                  {/* Красный крест */}
                  <div
                    className="absolute"
                    style={{
                      width: '20px',
                      height: '4px',
                      background: '#ef4444',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: '4px',
                      height: '20px',
                      background: '#ef4444',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
              ))}

              {/* Административная зона - Центральное здание (более детальное) */}
              <div
                className="absolute"
                style={{
                  width: '80px',
                  height: '120px',
                  background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
                  transform: `translate(-50%, -50%) translate3d(0, ${groundLevel - 60}px, 0)`,
                  left: '50%',
                  top: '50%',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                  borderRadius: '8px 8px 0 0',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center bottom',
                  zIndex: 10
                }}
              >
                {/* Колонны (более детальные) */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`column-${i}`}
                    className="absolute bg-purple-700"
                    style={{
                      width: '3px',
                      height: '100%',
                      left: `${10 + i * 20}px`,
                      bottom: '0',
                      borderRadius: '2px 2px 0 0',
                      boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.2)'
                    }}
                  />
                ))}
                {/* Окна */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`admin-window-${i}`}
                    className="absolute w-4 h-4 bg-yellow-300 rounded-sm"
                    style={{
                      left: '50%',
                      top: `${20 + i * 30}px`,
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 6px rgba(255,255,0,0.6)',
                      border: '1px solid #fbbf24'
                    }}
                  />
                ))}
                {/* Крыша с флагом */}
                <div
                  className="absolute"
                  style={{
                    width: '90px',
                    height: '8px',
                    background: '#6d28d9',
                    left: '-5px',
                    top: '-8px',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 -3px 10px rgba(0,0,0,0.3)'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '2px',
                    height: '20px',
                    background: '#6b7280',
                    left: '50%',
                    top: '-28px',
                    transform: 'translateX(-50%)'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '12px',
                    height: '8px',
                    background: '#ef4444',
                    left: '50%',
                    top: '-28px',
                    transform: 'translateX(-50%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                  }}
                />
              </div>

              {/* Транспорт - Автобусы на дорогах (на уровне дороги) */}
              {[...Array(3)].map((_, i) => {
                const roadHeight = 25
                const roadCenterY = groundLevel - roadHeight / 2
                // Автобусы на верхней поверхности дороги
                const busY = roadCenterY + roadHeight / 2
                return (
                  <div
                    key={`bus-${i}`}
                    className="absolute"
                    style={{
                      width: '28px',
                      height: '14px',
                      background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                      transform: `translate(-50%, -50%) translate3d(${(i - 1) * 100}px, ${busY}px, 0)`,
                      left: '50%',
                      top: '50%',
                      borderRadius: '4px',
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      zIndex: 2 // Автобусы поверх дорог
                    }}
                  >
                    {/* Окна автобуса */}
                    <div
                      className="absolute w-2 h-2 bg-blue-200 rounded-sm"
                      style={{
                        left: '4px',
                        top: '3px'
                      }}
                    />
                    <div
                      className="absolute w-2 h-2 bg-blue-200 rounded-sm"
                      style={{
                        right: '4px',
                        top: '3px'
                      }}
                    />
                  </div>
                )
              })}
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
