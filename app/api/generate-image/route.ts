import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as path from 'path'
import * as fs from 'fs'

const execAsync = promisify(exec)

// Функция для генерации через локальный Stable Diffusion (Python)
async function generateWithLocalSD(prompt: string) {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate_image.py')
    
    // Проверяем существование скрипта
    if (!fs.existsSync(scriptPath)) {
      return { success: false, error: 'Python скрипт не найден' }
    }

    // Запускаем Python скрипт
    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}" "${prompt.replace(/"/g, '\\"')}"`,
      { 
        maxBuffer: 10 * 1024 * 1024, // 10MB буфер для больших изображений
        timeout: 300000 // 5 минут таймаут
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
  const HF_MODEL = process.env.HF_MODEL || 'stabilityai/stable-diffusion-2-1'
  
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
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Промпт не предоставлен' }, { status: 400 })
    }

    // Приоритет: локальная генерация → Hugging Face → OpenAI
    try {
      // Пробуем локальную генерацию
      const localResult = await generateWithLocalSD(prompt)
      if (localResult.success) {
        return NextResponse.json({
          imageUrl: localResult.imageUrl,
          prompt,
          provider: localResult.provider
        })
      }
      console.log('Локальная генерация недоступна, пробуем онлайн варианты')
    } catch (localError) {
      console.log('Локальная генерация недоступна:', localError)
    }

    // Fallback на Hugging Face
    try {
      const hfResult = await generateWithHuggingFace(prompt)
      if (hfResult.success) {
        return NextResponse.json({
          imageUrl: hfResult.imageUrl,
          prompt,
          provider: hfResult.provider
        })
      }
    } catch (hfError) {
      console.log('Hugging Face недоступен:', hfError)
    }

    // Fallback на OpenAI
    try {
      const openaiResult = await generateWithOpenAI(prompt)
      if (openaiResult.success) {
        return NextResponse.json({
          imageUrl: openaiResult.imageUrl,
          prompt: openaiResult.revisedPrompt || prompt,
          provider: openaiResult.provider
        })
      }
    } catch (openaiError) {
      console.error('OpenAI недоступен:', openaiError)
    }

    // Если все варианты не сработали
    return NextResponse.json({
      prompt,
      message: 'Все методы генерации недоступны. Используйте промпт вручную.',
      instructions: {
        local: 'Установите зависимости: cd scripts && pip install -r requirements.txt',
        online: 'Проверьте подключение к интернету для онлайн генерации'
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
