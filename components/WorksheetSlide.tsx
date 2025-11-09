'use client'

export default function WorksheetSlide() {
  return (
    <div className="w-full">
      <div className="border-b-4 border-blue-500 pb-4 md:pb-6 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
          📋 STEAM Рабочий лист
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            Класс: 9
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
            Форма работы: групповая (3 направления)
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl border-l-4 border-blue-500 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Социально-экономическое развитие Казахстана (1965–1985 гг.)
        </h3>
        <p className="text-lg md:text-xl text-gray-700 font-semibold mb-2">
          Тема: Период застоя в Казахстане
        </p>
        <p className="text-base md:text-lg text-gray-600">
          Изучение социально-экономических процессов в Казахстане в период 1965-1985 годов 
          через призму STEAM подхода
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
        {/* Направление 1: Science */}
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🔬</div>
            <h3 className="text-xl font-bold text-gray-800">Science</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
              8 баллов
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Задание:</h4>
              <p className="text-sm text-gray-600 mb-3">
                Исследовать демографические изменения в Казахстане с 1965 по 1985 годы
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Вопросы для исследования:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Как изменилась численность населения?</li>
                <li>Какие изменения произошли в соотношении городского и сельского населения?</li>
                <li>Как изменились показатели рождаемости и смертности?</li>
                <li>Какие факторы повлияли на миграционные процессы?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Методы работы:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Анализ статистических данных</li>
                <li>Работа с историческими картами</li>
                <li>Изучение статистических сборников</li>
                <li>Построение графиков и диаграмм</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-xs text-gray-600">
                <strong>Результат:</strong> Графики демографических изменений, анализ данных
              </p>
            </div>
          </div>
        </div>

        {/* Направление 2: Technology */}
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">💻</div>
            <h3 className="text-xl font-bold text-gray-800">Technology</h3>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">
              10 баллов
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Задание:</h4>
              <p className="text-sm text-gray-600 mb-3">
                Создать интерактивную карту социальной инфраструктуры Казахстана 1970-1980-х годов
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Вопросы для исследования:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Какие объекты социальной инфраструктуры были построены?</li>
                <li>В каких городах развивалась инфраструктура?</li>
                <li>Какие типы объектов преобладали?</li>
                <li>Как инфраструктура влияла на качество жизни?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Методы работы:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Сбор данных об объектах инфраструктуры</li>
                <li>Создание интерактивной карты (Google My Maps)</li>
                <li>Классификация объектов по типам</li>
                <li>Анализ распределения по городам</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg mt-4">
              <p className="text-xs text-gray-600">
                <strong>Результат:</strong> Интерактивная карта с объектами инфраструктуры
              </p>
            </div>
          </div>
        </div>

        {/* Направление 3: Engineering */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">⚙️</div>
            <h3 className="text-xl font-bold text-gray-800">Engineering</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
              20 баллов
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Задание:</h4>
              <p className="text-sm text-gray-600 mb-3">
                Спроектировать "Город будущего 1985" с улучшенными условиями жизни
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Вопросы для исследования:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Как улучшить жилищные условия?</li>
                <li>Какие решения для транспортной системы?</li>
                <li>Как обеспечить экологическую безопасность?</li>
                <li>Какая инфраструктура необходима?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Методы работы:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Проектирование зон города</li>
                <li>Разработка плана развития</li>
                <li>Визуализация проекта</li>
                <li>Обоснование решений</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg mt-4">
              <p className="text-xs text-gray-600">
                <strong>Результат:</strong> Проект города с планом и визуализацией
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительные направления */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* Art */}
        <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🎨</div>
            <h3 className="text-xl font-bold text-gray-800">Art</h3>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-semibold">
              10 баллов
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Задание:</h4>
              <p className="text-sm text-gray-600 mb-3">
                Создать коллаж или иллюстрацию "Мой дом в 1970-х"
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Элементы для отображения:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Интерьер (мебель, декор)</li>
                <li>Техника того времени</li>
                <li>Одежда и стиль</li>
                <li>Семейный быт</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg mt-4">
              <p className="text-xs text-gray-600">
                <strong>Результат:</strong> Коллаж или иллюстрация интерьера 1970-х
              </p>
            </div>
          </div>
        </div>

        {/* Mathematics */}
        <div className="bg-white p-6 rounded-xl border-2 border-red-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📊</div>
            <h3 className="text-xl font-bold text-gray-800">Mathematics</h3>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
              8 баллов
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Задание:</h4>
              <p className="text-sm text-gray-600 mb-3">
                Проанализировать изменения в соотношении городского и сельского населения
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Задачи:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                <li>Построить диаграммы соотношения</li>
                <li>Рассчитать процентные изменения</li>
                <li>Проанализировать динамику</li>
                <li>Сделать выводы</li>
              </ul>
            </div>
            <div className="bg-red-50 p-3 rounded-lg mt-4">
              <p className="text-xs text-gray-600">
                <strong>Результат:</strong> Диаграммы и расчеты с выводами
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Источники информации */}
      <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          📚 Источники информации
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
          <li>Учебник "История Казахстана" для 9 класса</li>
          <li>Статистические сборники периода 1965-1985 гг.</li>
          <li>Исторические карты и документы</li>
          <li>Материалы данного веб-сайта</li>
        </ul>
      </div>
    </div>
  )
}

