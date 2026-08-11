import jsPDF from 'jspdf'

export async function generateDocumentationPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Функция для добавления новой страницы
  const addNewPage = () => {
    doc.addPage()
    yPosition = margin
  }

  // Функция для проверки места на странице
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      addNewPage()
    }
  }

  // Слайд 1: Титульная страница
  doc.setFillColor(59, 130, 246) // blue-500
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.text('🌍 Социальная сфера Казахстана', pageWidth / 2, 60, { align: 'center' })
  
  doc.setFontSize(24)
  doc.text('(1965-1985)', pageWidth / 2, 80, { align: 'center' })
  
  doc.setFontSize(18)
  doc.text('Компонент STEAM', pageWidth / 2, 100, { align: 'center' })
  doc.text('Максимальный балл: 46', pageWidth / 2, 115, { align: 'center' })
  
  doc.setFontSize(14)
  doc.text('Автор: krazher220, 9 Д', pageWidth / 2, 140, { align: 'center' })
  doc.text('КГУ «Школа-лицей №1 отдела образования города Костаная»', pageWidth / 2, 155, { align: 'center' })
  doc.text('Управления образования акимата Костанайской области', pageWidth / 2, 165, { align: 'center' })
  
  doc.setFontSize(12)
  doc.text(`Дата создания: ${new Date().toLocaleDateString('ru-RU')}`, pageWidth / 2, 180, { align: 'center' })

  // Слайд 2: Science
  addNewPage()
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  doc.setTextColor(0, 0, 0)
  
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('🔬 Science (8 баллов)', margin, yPosition)
  yPosition += 15

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Исследование демографических изменений в Казахстане с 1965 по 1985 гг.', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Основные показатели:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const scienceData = [
    '• Рост населения: с 12.1 млн (1965) до 16.2 млн (1985)',
    '• Урбанизация: с 42% (1965) до 57% (1985)',
    '• Рождаемость: снижение с 32.5‰ до 23.5‰',
    '• Смертность: снижение с 7.2‰ до 6.1‰',
    '• Миграция: активное перемещение из села в город'
  ]
  
  scienceData.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Исторические карты и статистические сборники:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('• Карта административного деления Казахской ССР (1970)', margin + 5, yPosition)
  yPosition += 7
  doc.text('• Карта размещения населения Казахстана (1975)', margin + 5, yPosition)
  yPosition += 7
  doc.text('• Карта миграционных потоков (1980)', margin + 5, yPosition)
  yPosition += 7
  doc.text('• Народное хозяйство Казахской ССР за 1965-1985 гг.', margin + 5, yPosition)

  // Слайд 3: Technology
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('💻 Technology (10 баллов)', margin, yPosition)
  yPosition += 15

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Интерактивная карта социальной инфраструктуры 1970-1980-х гг.', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Города исследования:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const cities = [
    '• Алма-Ата: новые университеты, оперный театр, клиники',
    '• Караганда: жилые районы, больницы',
    '• Павлодар: школы, спортивные комплексы',
    '• Кокшетау: дома культуры, музеи',
    '• Костанай: дома культуры, музеи'
  ]
  
  cities.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Типы объектов инфраструктуры:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const infrastructureTypes = [
    '• ВУЗы (университеты, институты)',
    '• Театры (оперные, драматические)',
    '• Больницы и поликлиники',
    '• Школы и детские сады',
    '• Дома культуры',
    '• Музеи',
    '• Спортивные комплексы'
  ]
  
  infrastructureTypes.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.text(`Всего объектов на карте: 119`, margin, yPosition)

  // Слайд 4: Engineering
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('⚙️ Engineering (20 баллов)', margin, yPosition)
  yPosition += 15

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Проект "Город будущего 1985" с улучшенными условиями жизни', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Распределение зон города:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const zones = [
    '• Жилая зона: 40%',
    '• Промышленная зона: 15%',
    '• Транспортная зона: 20%',
    '• Рекреационная зона: 15%',
    '• Административная зона: 10%'
  ]
  
  zones.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Улучшения в жилье:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const housing = [
    '• Многоэтажные панельные дома',
    '• Улучшенная планировка квартир',
    '• Центральное отопление и горячее водоснабжение',
    '• Лифты в домах',
    '• Балконы и лоджии',
    '• Детские площадки и парковки'
  ]
  
  housing.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Транспортная система:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const transport = [
    '• Метрополитен',
    '• Троллейбусы и автобусы',
    '• Трамваи',
    '• Велосипедные дорожки',
    '• Пешеходные зоны'
  ]
  
  transport.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Экологические меры:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const ecology = [
    '• Парки и скверы',
    '• Озеленение улиц',
    '• Очистные сооружения',
    '• Система утилизации отходов',
    '• Защитные лесополосы'
  ]
  
  ecology.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  // Слайд 5: Art
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('🎨 Art (10 баллов)', margin, yPosition)
  yPosition += 15

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Коллаж/иллюстрация "Мой дом в 1970-х"', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Элементы интерьера:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const artElements = [
    '• Мебель: деревянная мебель, диваны, кресла',
    '• Декор: ковры, шторы, картины, вазы',
    '• Техника: телевизор, радиоприемник, проигрыватель',
    '• Одежда: стиль 1970-х годов',
    '• Семейный быт: уютная атмосфера советского дома'
  ]
  
  artElements.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Цветовая гамма:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('Теплые цвета: коричневый, оранжевый, зеленый, бежевый', margin + 5, yPosition)
  yPosition += 7
  doc.text('Ретро стиль, детализированное изображение', margin + 5, yPosition)

  // Слайд 6: Mathematics
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('📊 Mathematics (8 баллов)', margin, yPosition)
  yPosition += 15

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Изменение соотношения городского и сельского населения', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Исходные данные:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('1960 год:', margin + 5, yPosition)
  yPosition += 7
  doc.text('  • Городское население: 40%', margin + 10, yPosition)
  yPosition += 7
  doc.text('  • Сельское население: 60%', margin + 10, yPosition)
  yPosition += 7
  doc.text('  • Соотношение сельского к городскому: 60/40 = 1.5', margin + 10, yPosition)
  
  yPosition += 10
  doc.text('1985 год:', margin + 5, yPosition)
  yPosition += 7
  doc.text('  • Городское население: 57%', margin + 10, yPosition)
  yPosition += 7
  doc.text('  • Сельское население: 43%', margin + 10, yPosition)
  yPosition += 7
  doc.text('  • Соотношение сельского к городскому: 43/57 ≈ 0.754', margin + 10, yPosition)

  yPosition += 10
  doc.setFont('helvetica', 'bold')
  doc.text('Расчет изменения:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('Изменение = (0.754 - 1.5) / 1.5 × 100%', margin + 5, yPosition)
  yPosition += 7
  doc.text('Изменение = -0.746 / 1.5 × 100%', margin + 5, yPosition)
  yPosition += 7
  doc.text('Изменение ≈ -49.7%', margin + 5, yPosition)

  yPosition += 10
  doc.setFont('helvetica', 'bold')
  doc.text('Вывод:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('Соотношение сельского населения к городскому уменьшилось', margin + 5, yPosition)
  yPosition += 7
  doc.text('на 49.7%, что свидетельствует о значительной урбанизации', margin + 5, yPosition)
  yPosition += 7
  doc.text('Казахстана в период 1960-1985 годов.', margin + 5, yPosition)

  // Слайд 7: Об авторе
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('👤 Об авторе', margin, yPosition)
  yPosition += 15

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('krazher220', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.text('Класс: 9 Д', margin, yPosition)
  yPosition += 10

  doc.text('Ученик КГУ «Школа-лицей №1 отдела образования города Костаная»', margin, yPosition)
  yPosition += 7
  doc.text('Управления образования акимата Костанайской области', margin, yPosition)
  yPosition += 15

  doc.setFont('helvetica', 'bold')
  doc.text('О проекте:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('Название: Социальная сфера Казахстана (1965-1985)', margin + 5, yPosition)
  yPosition += 7
  doc.text('Тип: STEAM проект', margin + 5, yPosition)
  yPosition += 7
  doc.text('Максимальный балл: 46 баллов', margin + 5, yPosition)
  yPosition += 10

  doc.setFont('helvetica', 'bold')
  doc.text('Технологии проекта:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  const technologies = [
    '• Next.js 14',
    '• TypeScript',
    '• Tailwind CSS',
    '• Recharts',
    '• Leaflet',
    '• React',
    '• Stable Diffusion'
  ]
  
  technologies.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  // Слайд 8: Рабочий лист
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('📋 STEAM Рабочий лист', margin, yPosition)
  yPosition += 15

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Тема: Период застоя в Казахстане', margin, yPosition)
  yPosition += 7
  doc.text('Класс: 9', margin, yPosition)
  yPosition += 7
  doc.text('Форма работы: групповая (3 направления)', margin, yPosition)
  yPosition += 10

  doc.setFont('helvetica', 'bold')
  doc.text('Групповые направления:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('1. Science (8 баллов) - Исследование демографических изменений', margin + 5, yPosition)
  yPosition += 7
  doc.text('2. Technology (10 баллов) - Интерактивная карта инфраструктуры', margin + 5, yPosition)
  yPosition += 7
  doc.text('3. Engineering (20 баллов) - Проект "Город будущего 1985"', margin + 5, yPosition)
  yPosition += 10

  doc.setFont('helvetica', 'bold')
  doc.text('Индивидуальные/Малые группы:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('4. Art (10 баллов) - Коллаж "Мой дом в 1970-х"', margin + 5, yPosition)
  yPosition += 7
  doc.text('5. Mathematics (8 баллов) - Диаграмма и расчеты', margin + 5, yPosition)

  // Последняя страница: Источники
  addNewPage()
  yPosition = margin
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('📚 Источники информации', margin, yPosition)
  yPosition += 15

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  const sources = [
    '• Учебник "История Казахстана" для 9 класса',
    '• Статистические сборники периода 1965-1985 гг.',
    '• Исторические карты и документы',
    '• Материалы данного веб-сайта',
    '• Народное хозяйство Казахской ССР за 1965-1985 гг.',
    '• Демографический ежегодник Казахской ССР'
  ]
  
  sources.forEach(item => {
    checkPageBreak(8)
    doc.text(item, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 10
  doc.setFont('helvetica', 'bold')
  doc.text('GitHub репозиторий:', margin, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'normal')
  doc.text('https://github.com/Krazher220-Ceo/STEAMhistory', margin + 5, yPosition)
  yPosition += 10

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.text(`Документ создан автоматически ${new Date().toLocaleDateString('ru-RU')}`, pageWidth / 2, pageHeight - 10, { align: 'center' })

  // Сохраняем PDF
  doc.save('Социальная_сфера_Казахстана_1965-1985.pdf')
}

