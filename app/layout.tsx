import './globals.css'
import { RecipeProvider } from './context/RecipeContext'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>

        <RecipeProvider>
          {children}
          </RecipeProvider>
      </body>
    </html>
  )
}
