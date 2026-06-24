'use client'

import { useEffect } from "react"
import { useRecipeContext } from "../context/RecipeContext"
import type { Recipe } from "../types/recipe"

const KEY_IDS  = 'favoritesRecipes'
const KEY_DATA = 'favoritesData'

export function readStoredFavorites(): Recipe[] {
  try {
    const raw = localStorage.getItem(KEY_DATA)
    return raw ? (JSON.parse(raw) as Recipe[]) : []
  } catch {
    return []
  }
}

export function UseFavorites() {
  const { setFavoritesId } = useRecipeContext()

  useEffect(() => {
    const stored = localStorage.getItem(KEY_IDS)
    if (stored) setFavoritesId(JSON.parse(stored))
  }, [])

  function getFavorites(id: string, recipe?: Recipe) {
    setFavoritesId((prev) => {
      const exists = prev.includes(id)
      const nextIds = exists ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem(KEY_IDS, JSON.stringify(nextIds))

      const stored = readStoredFavorites()
      if (exists) {
        localStorage.setItem(KEY_DATA, JSON.stringify(stored.filter((r) => r.id !== id)))
      } else if (recipe) {
        const alreadySaved = stored.some((r) => r.id === id)
        if (!alreadySaved) {
          localStorage.setItem(KEY_DATA, JSON.stringify([...stored, recipe]))
        }
      }

      return nextIds
    })
  }

  return { getFavorites }
}
