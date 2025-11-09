#!/usr/bin/env python3
"""
Скрипт для генерации изображений через Stable Diffusion
Использует локальную модель для генерации
"""

import sys
import json
import base64
import io
from pathlib import Path

try:
    import torch
    from diffusers import StableDiffusionPipeline
    from PIL import Image
except ImportError:
    print(json.dumps({
        "error": "Библиотеки не установлены. Установите: pip install torch diffusers pillow"
    }))
    sys.exit(1)

def generate_image(prompt: str, output_path: str = None):
    """
    Генерирует изображение по промпту используя Stable Diffusion
    
    Args:
        prompt: Текстовое описание изображения
        output_path: Путь для сохранения (опционально)
    
    Returns:
        base64 строка изображения или путь к файлу
    """
    try:
        # Определяем устройство (cuda для NVIDIA, mps для Apple Silicon, cpu для остальных)
        if torch.cuda.is_available():
            device = "cuda"
            dtype = torch.float16
        elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
            device = "mps"
            dtype = torch.float32  # MPS не поддерживает float16
        else:
            device = "cpu"
            dtype = torch.float32
        
        print(f"Используется устройство: {device}", file=sys.stderr)
        
        # Загружаем модель (используем более легкую версию для быстрой загрузки)
        model_id = "runwayml/stable-diffusion-v1-5"  # Более стабильная версия
        
        print("Загрузка модели...", file=sys.stderr)
        pipe = StableDiffusionPipeline.from_pretrained(
            model_id,
            torch_dtype=dtype,
            safety_checker=None,  # Отключаем для ускорения
            requires_safety_checker=False
        )
        pipe = pipe.to(device)
        
        # Оптимизация для ускорения
        if device == "cuda":
            pipe.enable_attention_slicing()
            pipe.enable_xformers_memory_efficient_attention()
        
        print("Генерация изображения...", file=sys.stderr)
        # Генерируем изображение
        image = pipe(
            prompt,
            num_inference_steps=20,  # Меньше шагов для ускорения
            guidance_scale=7.5,
            width=512,
            height=512
        ).images[0]
        
        # Конвертируем в base64
        buffer = io.BytesIO()
        image.save(buffer, format='PNG')
        img_bytes = buffer.getvalue()
        img_base64 = base64.b64encode(img_bytes).decode('utf-8')
        
        result = {
            "success": True,
            "image_base64": img_base64,
            "format": "png",
            "device": device
        }
        
        # Сохраняем файл, если указан путь
        if output_path:
            image.save(output_path)
            result["file_path"] = output_path
        
        return result
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "error_type": type(e).__name__
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Промпт не предоставлен. Использование: python generate_image.py 'your prompt'"
        }))
        sys.exit(1)
    
    prompt = sys.argv[1]
    result = generate_image(prompt)
    print(json.dumps(result))

