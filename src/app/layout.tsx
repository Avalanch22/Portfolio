import type { Metadata } from 'next'
import { Inter, Syncopate } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syncopate',
})

export const metadata: Metadata = {
  title: 'Bishal Das | Portfolio',
  description: 'Software Engineer & Creative Developer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syncopate.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
