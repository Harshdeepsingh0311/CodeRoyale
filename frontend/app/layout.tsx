import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit, Press_Start_2P } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const _pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: 'Code Royale - Real-Time Competitive Coding',
  description: 'Real-time multiplayer coding battles where logic wins and pressure breaks you. Code. Survive. Outplay.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
