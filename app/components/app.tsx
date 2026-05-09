'use client'

import { HomePage } from "../homePage"
import { UseFetchCategories } from "../hooks/useFetchCategories"
import { UseFetchRecipes } from "../hooks/useFetchRecipes"

export function App() {
  UseFetchCategories()
  UseFetchRecipes()

  return (
    <HomePage/>
  )
}