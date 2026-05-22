
import Header from './components/header'
import { RecipeProvider } from './context/RecipeContext'
import './globals.css'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <React.StrictMode>

    <html lang='en'>
      <body>
        <RecipeProvider>
          <Header />
          {children}
        </RecipeProvider>
      </body>
    </html>
    </React.StrictMode>
  )
}
