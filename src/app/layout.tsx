"use client"
import "./globals.css";
import { Inter } from 'next/font/google'
import ToasterContext from '@/app/context/ToasterContext'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  )
}
