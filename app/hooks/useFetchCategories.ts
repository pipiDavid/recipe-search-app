'use client'

import { useEffect } from "react"
import { ApiResCategory } from "../types/categories"
import { useRecipeContext } from "../context/RecipeContext"
import mapCategories from "../utils/mapCategories"

export function UseFetchCategories() {
  const { setCategories, error, setError } = useRecipeContext()
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/' // iNCLUIR ESTO EN UN .ENV 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}list.php?c=list`)

        if (!response.ok) {
          throw new Error('No se encontro la lista')
        }
        const data: ApiResCategory = await response.json()
        const mappedCategories = mapCategories(data)
        setCategories(mappedCategories)

      } catch (error) {
        setError(error as Error)
      }
    }
    fetchData()
  }, [])
}