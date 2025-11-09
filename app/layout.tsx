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
      <body>{children}</body>
    </html>
  )
}

