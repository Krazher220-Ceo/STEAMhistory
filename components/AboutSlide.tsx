'use client'

export default function AboutSlide() {
  const schedule = [
    {
      time: '08:00 - 08:40',
      subject: 'Химия',
      teacher: 'Юлия Николаевна Шебелист',
      room: '41 - Химия',
      description: 'Степень окисления. Окисление и восстановление'
    },
    {
      time: '08:45 - 09:25',
      subject: 'История Казахстана',
      teacher: 'Анна Владимировна Козыбаева',
      room: '18 - История',
      description: 'Социально-экономическое развитие Казахстана в 1965-1985 гг.'
    },
    {
      time: '09:40 - 10:20',
      subject: 'Русская литература',
      teacher: 'Екатерина Васильевна Мекебаева',
      room: '15 - Кабинет 15',
      description: 'Тема маленького человека в литературе.'
    },
    {
      time: '10:35 - 11:15',
      subject: 'Алгебра',
      teacher: 'Анастасия Анатольевна Титова',
      room: '22 - Русский язык и литература',
      description: 'Числовая последовательность, способы ее задания и свойства'
    },
    {
      time: '11:20 - 12:00',
      subject: 'Физическая культура',
      teacher: 'Александр Геннадьевич Минко',
      room: '43 - Спортивный зал',
      description: 'ОБЖ №5 - Безопасность и защита человека. Основные виды мошенничества. Техника безопасности. Строевые упражнения в группах.'
    },
    {
      time: '12:05 - 12:45',
      subject: 'Иностранный язык (английский язык)',
      teacher: 'Елена Игоревна Балабай',
      room: '25 - Английский язык',
      description: 'Планета и Земля наше место на ней'
    },
    {
      time: '12:50 - 13:30',
      subject: 'Казахский язык и литература',
      teacher: 'Шнар Амантаевна Балтабаева',
      room: '33 - Казахский язык',
      description: 'Изучение казахского языка и литературы'
    }
  ]

  return (
    <div className="w-full">
      <div className="border-b-4 border-blue-500 pb-4 md:pb-6 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
          👤 Об авторе
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-8 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Кабдуалы Алихан</h3>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            <strong>Класс:</strong> 9 Д
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Ученик{' '}
            <a
              href="https://mektep1.edu.kz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-semibold"
            >
              КГУ «Школа-лицей №1 отдела образования города Костаная»
            </a>{' '}
            Управления образования акимата Костанайской области
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Создатель проекта{' '}
            <strong className="text-blue-600">"Социальная сфера Казахстана (1965-1985)"</strong>{' '}
            в рамках компонента STEAM.
          </p>
          <div className="mt-6">
            <a
              href="https://github.com/Krazher220-Ceo/STEAMhistory"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Репозиторий
            </a>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-gray-200 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">📚 О проекте</h3>
          <div className="space-y-3 text-gray-700">
            <p className="text-base md:text-lg">
              <strong>Название:</strong> Социальная сфера Казахстана (1965-1985)
            </p>
            <p className="text-base md:text-lg">
              <strong>Тип:</strong> STEAM проект
            </p>
            <p className="text-base md:text-lg">
              <strong>Максимальный балл:</strong> 46 баллов
            </p>
            <p className="text-base md:text-lg">
              <strong>Компоненты:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm md:text-base">
              <li>🔬 Science (8 баллов)</li>
              <li>💻 Technology (10 баллов)</li>
              <li>⚙️ Engineering (20 баллов)</li>
              <li>🎨 Art (10 баллов)</li>
              <li>📊 Mathematics (8 баллов)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 md:p-8 rounded-xl border-l-4 border-amber-500 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">🎯 Цель проекта</h3>
        <p className="text-base md:text-lg text-gray-700 mb-4">
          Изучение демографических изменений и социальной инфраструктуры Казахстана 
          в период с 1965 по 1985 годы через призму STEAM подхода:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-sm md:text-base text-gray-700">
          <li>Анализ демографических данных и статистики</li>
          <li>Исследование социальной инфраструктуры городов</li>
          <li>Проектирование города будущего 1985 года</li>
          <li>Визуализация быта и культуры 1970-х годов</li>
          <li>Математический анализ изменений в структуре населения</li>
        </ul>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-gray-200 shadow-lg mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">📅 Расписание уроков (9 Д)</h3>
        <div className="space-y-4">
          {schedule.map((lesson, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base md:text-lg">{lesson.subject}</h4>
                    <p className="text-sm text-gray-600">{lesson.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base font-semibold text-gray-700">{lesson.time}</p>
                  <p className="text-xs md:text-sm text-gray-500">{lesson.room}</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 mt-2 pl-7 md:pl-10">
                {lesson.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-blue-100 p-4 md:p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">119</div>
          <div className="text-sm md:text-base text-gray-700">Объектов инфраструктуры</div>
        </div>
        <div className="bg-purple-100 p-4 md:p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">5</div>
          <div className="text-sm md:text-base text-gray-700">Городов</div>
        </div>
        <div className="bg-green-100 p-4 md:p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">7</div>
          <div className="text-sm md:text-base text-gray-700">Типов объектов</div>
        </div>
      </div>

      <div className="mt-8 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">🛠️ Технологии проекта</h3>
        <div className="flex flex-wrap gap-2">
          {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Leaflet', 'React', 'Stable Diffusion'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm md:text-base text-gray-600">
          Проект создан в образовательных целях © 2025
        </p>
        <p className="text-xs md:text-sm text-gray-500 mt-2">
          Лицензия: <a href="https://github.com/Krazher220-Ceo/STEAMhistory/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MIT License</a>
        </p>
      </div>
    </div>
  )
}
