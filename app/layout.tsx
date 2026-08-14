import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: "Eliseo Cabello | Desarrollador Full Stack & Sistemas UNI",
  description:
    "Portafolio profesional de Eliseo Cabello - Estudiante de Ingeniería de Sistemas en la UNI (FIIS).",
  icons: {
    icon: '/943329.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080C14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`dark bg-background ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
