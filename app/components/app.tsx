'use client'

import { HomePage } from "../homePage"
import { UseFavorites } from "../hooks/useFavorites"
import { UseFetchCategories } from "../hooks/useFetchCategories"
import { UseFetchRecipes } from "../hooks/useFetchRecipes"


export function App() {
  UseFavorites()
  UseFetchCategories()
  UseFetchRecipes()

  return (
    
      <HomePage/>
    
  )
}