# 🌍 Социальная сфера Казахстана (1965-1985) - STEAM Проект

Интерактивный веб-сайт для компонента STEAM "Социальная сфера Казахстана". Проект включает все компоненты STEAM: Science, Technology, Engineering, Art, и Mathematics.

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📋 Компоненты STEAM

- **🔬 Science (8 баллов)** - Демографические изменения с интерактивными графиками
- **💻 Technology (10 баллов)** - Интерактивная карта с выбором городов и информацией об инфраструктуре
- **⚙️ Engineering (20 баллов)** - Проект "Город будущего 1985" с визуализацией зон
- **🎨 Art (10 баллов)** - Генератор коллажа "Мой дом в 1970-х"
- **📊 Mathematics (8 баллов)** - Диаграммы и решение задачи о соотношении населения

## 🛠️ Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Recharts** - Графики и диаграммы
- **Leaflet** - Интерактивные карты
- **React Leaflet** - React компоненты для Leaflet
- **Stable Diffusion** - Локальная генерация изображений (Python)
- **OpenAI DALL-E** - Генерация изображений через API

## 📁 Структура проекта

```
steam_social_sphere_website/
├── app/
│   ├── layout.tsx          # Основной layout
│   ├── page.tsx             # Главная страница
│   └── globals.css           # Глобальные стили
├── components/
│   ├── ScienceSlide.tsx     # Компонент Science
│   ├── TechnologySlide.tsx  # Компонент Technology
│   ├── MapComponent.tsx     # Карта Leaflet
│   ├── EngineeringSlide.tsx # Компонент Engineering
│   ├── ArtSlide.tsx         # Компонент Art
│   └── MathematicsSlide.tsx # Компонент Mathematics
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 📝 Использование

1. Выберите компонент на главной странице
2. Для Technology: выберите город, чтобы увидеть карту и информацию
3. Для Art: выберите элементы интерьера для создания коллажа
4. Все данные и расчёты отображаются автоматически

## 🔧 Настройка

Все данные находятся в компонентах. Для изменения:
- Демографические данные: `components/ScienceSlide.tsx`
- Данные городов: `components/TechnologySlide.tsx`
- Зоны города: `components/EngineeringSlide.tsx`
- Математические данные: `components/MathematicsSlide.tsx`

## 🤖 Генерация изображений

Проект поддерживает несколько методов генерации изображений:

1. **Локальная генерация** (Stable Diffusion через Python)
   - Требует установки Python зависимостей
   - См. `scripts/README.md` для инструкций

2. **Hugging Face API** (бесплатно, онлайн)
   - Автоматический fallback

3. **OpenAI DALL-E** (платно)
   - Требует API ключ

## 📦 Установка Python зависимостей (для локальной генерации)

```bash
cd scripts
pip install -r requirements.txt
```

## 👤 Автор

**krazher220 9 Д**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/Krazher220-Ceo/STEAMhistory)

Проект создан для образовательных целей в рамках компонента STEAM.

## 📄 Лицензия

Этот проект лицензирован под [MIT License](LICENSE).

Copyright (c) 2025 krazher220

---

**Удачи в выполнении задания!** 🎓

