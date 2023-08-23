import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Client Questionnaire',
  description: 'What do you want your website to be?',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
