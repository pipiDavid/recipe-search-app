
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
