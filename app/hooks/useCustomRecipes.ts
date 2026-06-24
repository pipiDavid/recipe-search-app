'use client'

import { useState, useEffect } from "react"
import type { Recipe } from "../types/recipe"

const KEY = 'customRecipes'

export function useCustomRecipes() {
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      setCustomRecipes(raw ? JSON.parse(raw) : [])
    } catch {
      setCustomRecipes([])
    }
  }, [])

  function addRecipe(data: Omit<Recipe, 'id'>) {
    const recipe: Recipe = { ...data, id: `custom-${Date.now()}` }
    setCustomRecipes((prev) => {
      const next = [recipe, ...prev]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function deleteRecipe(id: string) {
    setCustomRecipes((prev) => {
      const next = prev.filter((r) => r.id !== id)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  return { customRecipes, addRecipe, deleteRecipe }
}
