import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Социальная сфера Казахстана (1965-1985)',
  description: 'Компонент STEAM - Социальная сфера Казахстана',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="relative min-h-screen">
        {children}
        <footer className="w-full py-4 bg-gray-100 border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <a
              href="https://github.com/Krazher220-Ceo/STEAMhistory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Сделано Кабдуалы Алихан 9 Д
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}

