import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as path from 'path'
import * as fs from 'fs'

const execAsync = promisify(exec)

// Функция для генерации SVG изображения-заглушки на основе параметров
function generatePlaceholderImage(furniture: string, decor: string, tech: string, clothes: string): string {
  const colors = {
    furniture: '#8B4513', // Коричневый
    decor: '#FF8C00',     // Темно-оранжевый
    tech: '#228B22',      // Зеленый
    clothes: '#CD853F',   // Персиковый
    bg: '#F5DEB3'         // Бежевый
  }

  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFE4B5;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg)"/>
      
      <!-- Ковер на полу -->
      <rect x="50" y="350" width="412" height="120" fill="${colors.decor}" opacity="0.6" rx="10"/>
      <text x="256" y="410" font-family="Arial" font-size="14" fill="white" text-anchor="middle">${decor}</text>
      
      <!-- Мебель -->
      <rect x="80" y="280" width="150" height="80" fill="${colors.furniture}" rx="5"/>
      <text x="155" y="325" font-family="Arial" font-size="12" fill="white" text-anchor="middle">${furniture}</text>
      
      <!-- Техника -->
      <rect x="280" y="250" width="120" height="90" fill="${colors.tech}" rx="5"/>
      <text x="340" y="295" font-family="Arial" font-size="11" fill="white" text-anchor="middle">${tech}</text>
      
      <!-- Человек в одежде -->
      <circle cx="200" cy="200" r="30" fill="${colors.clothes}"/>
      <rect x="170" y="230" width="60" height="80" fill="${colors.clothes}" rx="5"/>
      <text x="200" y="320" font-family="Arial" font-size="10" fill="white" text-anchor="middle">${clothes}</text>
      
      <!-- Декоративные элементы -->
      <circle cx="400" cy="150" r="25" fill="${colors.decor}" opacity="0.7"/>
      <text x="400" y="155" font-family="Arial" font-size="9" fill="white" text-anchor="middle">Декор</text>
      
      <!-- Текст -->
      <text x="256" y="50" font-family="Arial" font-size="20" font-weight="bold" fill="#8B4513" text-anchor="middle">Советский интерьер 1970-х</text>
      <text x="256" y="480" font-family="Arial" font-size="14" fill="#666" text-anchor="middle">Иллюстрация на основе выбранных элементов</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

// Функция для генерации через локальный Stable Diffusion (Python)
async function generateWithLocalSD(prompt: string) {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate_image.py')
    
    if (!fs.existsSync(scriptPath)) {
      return { success: false, error: 'Python скрипт не найден' }
    }

    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}" "${prompt.replace(/"/g, '\\"')}"`,
      { 
        maxBuffer: 10 * 1024 * 1024,
        timeout: 300000
      }
    )

    if (stderr) {
      console.log('Python stderr:', stderr)
    }

    const result = JSON.parse(stdout)
    
    if (result.success && result.image_base64) {
      return {
        success: true,
        imageUrl: `data:image/${result.format || 'png'};base64,${result.image_base64}`,
        provider: `Local Stable Diffusion (${result.device || 'unknown'})`
      }
    }
    
    return { success: false, error: result.error || 'Неизвестная ошибка' }
  } catch (error: any) {
    console.error('Ошибка локальной генерации:', error)
    return { 
      success: false, 
      error: error.message || 'Ошибка выполнения Python скрипта' 
    }
  }
}

// Функция для генерации через Hugging Face (бесплатно, онлайн)
async function generateWithHuggingFace(prompt: string) {
  const HF_API_KEY = process.env.HF_API_KEY || ''
  // Используем более стабильную модель
  const HF_MODEL = process.env.HF_MODEL || 'runwayml/stable-diffusion-v1-5'
  
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(HF_API_KEY && { 'Authorization': `Bearer ${HF_API_KEY}` }),
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    )

    // Проверяем статус ответа
    if (response.status === 503) {
      // Модель загружается, нужно подождать
      const data = await response.json()
      if (data.estimated_time) {
        return { success: false, error: 'Модель загружается, попробуйте позже' }
      }
    }

    if (response.ok) {
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      const mimeType = blob.type || 'image/png'
      
      return {
        success: true,
        imageUrl: `data:${mimeType};base64,${base64}`,
        provider: 'Hugging Face (Online)'
      }
    }
    
    return { success: false }
  } catch (error) {
    return { success: false }
  }
}

// Функция для генерации через Replicate (бесплатный tier)
async function generateWithReplicate(prompt: string) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || ''
  
  if (!REPLICATE_API_TOKEN) {
    return { success: false, error: 'Replicate API токен не настроен' }
  }

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
        input: {
          prompt: prompt,
          width: 512,
          height: 512,
        }
      }),
    })

    if (response.ok) {
      const data = await response.json()
      // Replicate возвращает URL для проверки статуса, нужно опрашивать
      // Для упрощения возвращаем ошибку, чтобы использовать fallback
      return { success: false, error: 'Replicate требует асинхронной обработки' }
    }
    
    return { success: false }
  } catch (error) {
    return { success: false }
  }
}

// Функция для генерации через OpenAI DALL-E (платно)
async function generateWithOpenAI(prompt: string) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  
  if (!OPENAI_API_KEY) {
    return { success: false, error: 'OpenAI API ключ не настроен' }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.data && data.data[0] && data.data[0].url) {
        return {
          success: true,
          imageUrl: data.data[0].url,
          revisedPrompt: data.data[0].revised_prompt || prompt,
          provider: 'OpenAI DALL-E'
        }
      }
    }
    
    return { success: false }
  } catch (error) {
    return { success: false }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, furniture, decor, tech, clothes } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Промпт не предоставлен' }, { status: 400 })
    }

    // Приоритет: локальная генерация → Hugging Face → OpenAI → Placeholder
    const methods = [
      { name: 'local', fn: () => generateWithLocalSD(prompt) },
      { name: 'huggingface', fn: () => generateWithHuggingFace(prompt) },
      { name: 'openai', fn: () => generateWithOpenAI(prompt) },
    ]

    for (const method of methods) {
      try {
        const result = await method.fn()
        if (result.success) {
          return NextResponse.json({
            imageUrl: result.imageUrl,
            prompt: ('revisedPrompt' in result && result.revisedPrompt) ? result.revisedPrompt : prompt,
            provider: result.provider
          })
        }
      } catch (error) {
        console.log(`${method.name} недоступен:`, error)
        continue
      }
    }

    // Если все методы не сработали, возвращаем placeholder изображение
    if (furniture && decor && tech && clothes) {
      const placeholderImage = generatePlaceholderImage(furniture, decor, tech, clothes)
      return NextResponse.json({
        imageUrl: placeholderImage,
        prompt,
        provider: 'Placeholder (ИИ недоступен)',
        isPlaceholder: true,
        message: 'ИИ генерация недоступна. Показана иллюстрация на основе выбранных элементов.'
      })
    }

    // Если нет параметров для placeholder, возвращаем промпт
    return NextResponse.json({
      prompt,
      message: 'Все методы генерации недоступны. Используйте промпт вручную.',
      instructions: {
        local: 'Установите зависимости: cd scripts && pip install -r requirements.txt',
        online: 'Проверьте подключение к интернету для онлайн генерации',
        placeholder: 'Выберите элементы интерьера для генерации placeholder изображения'
      }
    })

  } catch (error) {
    console.error('Ошибка генерации изображения:', error)
    return NextResponse.json({
      error: 'Ошибка генерации изображения',
      message: 'Используйте промпт вручную в генераторах изображений.'
    }, { status: 500 })
  }
}
