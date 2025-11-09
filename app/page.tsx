'use client'

import { useState } from 'react'
import ScienceSlide from '@/components/ScienceSlide'
import TechnologySlide from '@/components/TechnologySlide'
import EngineeringSlide from '@/components/EngineeringSlide'
import ArtSlide from '@/components/ArtSlide'
import MathematicsSlide from '@/components/MathematicsSlide'
import AboutSlide from '@/components/AboutSlide'
import WorksheetSlide from '@/components/WorksheetSlide'

type Slide = 'title' | 'science' | 'technology' | 'engineering' | 'art' | 'mathematics' | 'about' | 'worksheet'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState<Slide>('title')

  const showSlide = (slide: Slide) => {
    setCurrentSlide(slide)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentSlide === 'title') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-3 md:px-4 py-6 md:py-8 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            🌍 Социальная сфера Казахстана
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 md:mb-8">
            (1965-1985)
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-12">
            Компонент STEAM / Максимальный балл: 46
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => showSlide('science')}
              className="bg-white text-blue-600 px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🔬 Science (8 баллов)
            </button>
            <button
              onClick={() => showSlide('technology')}
              className="bg-white text-blue-600 px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              💻 Technology (10 баллов)
            </button>
            <button
              onClick={() => showSlide('engineering')}
              className="bg-white text-blue-600 px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              ⚙️ Engineering (20 баллов)
            </button>
            <button
              onClick={() => showSlide('art')}
              className="bg-white text-blue-600 px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🎨 Art (10 баллов)
            </button>
            <button
              onClick={() => showSlide('mathematics')}
              className="bg-white text-blue-600 px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              📊 Mathematics (8 баллов)
            </button>
            <button
              onClick={() => showSlide('about')}
              className="bg-white/20 text-white border-2 border-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg hover:bg-white/30 transition-all duration-300"
            >
              👤 Об авторе
            </button>
            <button
              onClick={() => showSlide('worksheet')}
              className="bg-white/20 text-white border-2 border-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg hover:bg-white/30 transition-all duration-300"
            >
              📋 Рабочий лист
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
        {/* Навигация */}
        <nav className="mb-4 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
          <button
            onClick={() => showSlide('title')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
          >
            ← На главную
          </button>
          
          <div className="flex gap-1 md:gap-2 flex-wrap w-full sm:w-auto">
            <button
              onClick={() => showSlide('science')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'science' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Science
            </button>
            <button
              onClick={() => showSlide('technology')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'technology' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Technology
            </button>
            <button
              onClick={() => showSlide('engineering')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'engineering' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Engineering
            </button>
            <button
              onClick={() => showSlide('art')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'art' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Art
            </button>
            <button
              onClick={() => showSlide('mathematics')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'mathematics' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Mathematics
            </button>
            <button
              onClick={() => showSlide('about')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'about' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Об авторе
            </button>
            <button
              onClick={() => showSlide('worksheet')}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                currentSlide === 'worksheet' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Рабочий лист
            </button>
          </div>
        </nav>

        {/* Контент слайдов */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 lg:p-12">
          {currentSlide === 'science' && <ScienceSlide />}
          {currentSlide === 'technology' && <TechnologySlide />}
          {currentSlide === 'engineering' && <EngineeringSlide />}
          {currentSlide === 'art' && <ArtSlide />}
          {currentSlide === 'mathematics' && <MathematicsSlide />}
          {currentSlide === 'about' && <AboutSlide />}
          {currentSlide === 'worksheet' && <WorksheetSlide />}
        </div>
      </div>
    </div>
  )
}

