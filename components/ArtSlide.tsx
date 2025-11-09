'use client'

import { useState } from 'react'

const furnitureOptions = [
  'Диван-кровать',
  'Сервант',
  'Стенка',
  'Кресло-мешок',
  'Журнальный столик',
]

const decorOptions = [
  'Ковёр на стене',
  'Хрустальная люстра',
  'Ваза с цветами',
  'Ковёр на полу',
  'Шторы',
]

const techOptions = [
  "Телевизор 'Рубин'",
  'Радиола',
  'Проигрыватель',
  'Телефон',
  "Холодильник 'Минск'",
]

const clothesOptions = [
  'Костюм-тройка',
  'Платье в горошек',
  'Джинсы-клёш',
  'Куртка-косуха',
  'Сапоги',
]

export default function ArtSlide() {
  const [furniture, setFurniture] = useState(furnitureOptions[0])
  const [decor, setDecor] = useState(decorOptions[0])
  const [tech, setTech] = useState(techOptions[0])
  const [clothes, setClothes] = useState(clothesOptions[0])
  const [generating, setGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [provider, setProvider] = useState<string>('')
  const [isPlaceholder, setIsPlaceholder] = useState(false)

  const generatePrompt = () => {
    const fullPrompt = `Soviet interior 1970s Kazakhstan. Cozy living room with ${furniture.toLowerCase()}, ${decor.toLowerCase()}, ${tech.toLowerCase()}. Person wearing ${clothes.toLowerCase()}. Warm colors: brown, orange, green, beige. Retro style, detailed, high quality, photorealistic, family atmosphere, Soviet lifestyle.`
    setPrompt(fullPrompt)
    return fullPrompt
  }

  const generateImage = async () => {
    setGenerating(true)
    setGeneratedImage(null)
    setIsPlaceholder(false)
    const imagePrompt = generatePrompt()
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: imagePrompt,
          furniture,
          decor,
          tech,
          clothes
        }),
      })

      const data = await response.json()

      if (response.ok && data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        setPrompt(data.prompt || imagePrompt)
        setProvider(data.provider || 'Unknown')
        setIsPlaceholder(data.isPlaceholder || false)
        
        if (data.message) {
          // Показываем информационное сообщение для placeholder
          console.log(data.message)
        }
      } else if (data.error) {
        setGeneratedImage(null)
        setPrompt(imagePrompt)
        // Не показываем alert, просто показываем placeholder
        generatePlaceholderFallback()
      } else {
        // Если нет изображения, генерируем placeholder
        generatePlaceholderFallback()
      }
    } catch (error) {
      console.error('Ошибка генерации:', error)
      // При ошибке показываем placeholder
      generatePlaceholderFallback()
    } finally {
      setGenerating(false)
    }
  }

  const generatePlaceholderFallback = () => {
    // Генерируем placeholder через API
    const imagePrompt = generatePrompt()
    fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        prompt: imagePrompt,
        furniture,
        decor,
        tech,
        clothes
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        setPrompt(data.prompt || imagePrompt)
        setProvider(data.provider || 'Placeholder')
        setIsPlaceholder(data.isPlaceholder || false)
      } else {
        setPrompt(imagePrompt)
      }
    })
  }

  return (
    <div>
      <div className="border-b-4 border-blue-500 pb-6 mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          🎨 Art - Мой дом в 1970-х
        </h2>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          10 баллов
        </span>
      </div>

      <p className="text-xl text-gray-600 mb-8">
        Создание коллажа или иллюстрации интерьера, одежды и семейного быта
      </p>

      {isPlaceholder && (
        <div className="mb-4 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl">
          <p className="text-amber-800 font-semibold">
            ℹ️ ИИ генерация недоступна. Показана иллюстрация на основе выбранных элементов.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Выберите элементы интерьера</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Мебель:</label>
              <select
                value={furniture}
                onChange={(e) => setFurniture(e.target.value)}
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                {furnitureOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Декор:</label>
              <select
                value={decor}
                onChange={(e) => setDecor(e.target.value)}
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                {decorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Техника:</label>
              <select
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {techOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Одежда:</label>
              <select
                value={clothes}
                onChange={(e) => setClothes(e.target.value)}
                className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                {clothesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateImage}
              disabled={generating}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? '🎨 Генерация изображения...' : '🎨 Создать изображение'}
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              {generating 
                ? 'Пробуем ИИ генерацию... Если не сработает, покажем иллюстрацию'
                : 'Попробует ИИ генерацию, если недоступна - покажет готовую иллюстрацию'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">🖼️ Результат</h3>
          
          {generating && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border-4 border-amber-200 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-700">Генерация изображения...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Пробуем ИИ генерацию...
                </p>
              </div>
            </div>
          )}

          {!generating && generatedImage && (
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
              {provider && (
                <div className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold">Источник:</span> {provider}
                </div>
              )}
              <img 
                src={generatedImage} 
                alt="Сгенерированное изображение" 
                className="w-full rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = generatedImage
                    link.download = 'my_house_1970s.png'
                    link.click()
                  }}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  📥 Скачать изображение
                </button>
                {isPlaceholder && (
                  <button
                    onClick={generateImage}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    🔄 Попробовать ИИ снова
                  </button>
                )}
              </div>
            </div>
          )}

          {!generating && !generatedImage && prompt && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border-4 border-amber-200 min-h-[400px]">
              <div className="space-y-4 text-lg mb-6">
                <div className="bg-white/80 p-4 rounded-lg">
                  <span className="font-semibold text-amber-800">Мебель:</span> {furniture}
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <span className="font-semibold text-purple-800">Декор:</span> {decor}
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <span className="font-semibold text-green-800">Техника:</span> {tech}
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <span className="font-semibold text-orange-800">Одежда:</span> {clothes}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                <h4 className="font-bold text-gray-800 mb-2">Промпт для ИИ:</h4>
                <textarea
                  value={prompt}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 mb-3 h-32"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(prompt)
                      alert('Промпт скопирован!')
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                  >
                    📋 Копировать промпт
                  </button>
                  <a
                    href={`https://huggingface.co/spaces/stabilityai/stable-diffusion`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors text-sm text-center flex items-center justify-center"
                  >
                    🆓 Hugging Face
                  </a>
                </div>
              </div>
            </div>
          )}

          {!generating && !generatedImage && !prompt && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border-4 border-amber-200 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-600 text-center">
                Выберите элементы и нажмите "Создать изображение"
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h4 className="text-xl font-bold text-blue-800 mb-4">📝 Описание элементов 1970-х</h4>
          <div className="space-y-4 text-gray-700">
            <div>
              <strong className="text-blue-700">Интерьер:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Мебель: массивная, из натурального дерева или ДСП</li>
                <li>Цвета: коричневый, оранжевый, зелёный, бежевый</li>
                <li>Ковры на стенах и полу</li>
                <li>Хрустальные люстры и вазы</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-700">Одежда:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Яркие цвета и принты</li>
                <li>Широкие брюки-клёш</li>
                <li>Платья с цветочными узорами</li>
                <li>Кожаные куртки</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl">
          <h4 className="text-xl font-bold text-gray-800 mb-3">🎨 Цветовая палитра эпохи 1970-х</h4>
          <div className="flex gap-4 flex-wrap">
            {['#8B4513', '#FF8C00', '#228B22', '#F5DEB3', '#CD853F', '#FF6347'].map((color) => (
              <div
                key={color}
                className="w-16 h-16 rounded-lg shadow-md"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
