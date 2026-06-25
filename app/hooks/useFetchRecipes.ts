'use client'

import { useEffect } from "react"
import { useRecipeContext } from "../context/RecipeContext"
import { ApiResponse } from "../types/recipe"
import { mapMeals } from "../utils/mapAttribute"



export function UseFetchRecipes() {
  const { setRecipes, query, setLoading, setError, category } = useRecipeContext()
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/'

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        let endpoint = ''

        if(query) {
          endpoint = `${API_URL}search.php?s=${query}`
        } else if(category) {
          endpoint = `${API_URL}filter.php?c=${category}`
        } else {
          endpoint = `${API_URL}search.php?s=`
        }
        const response = await fetch(endpoint, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('No se encontraron Recetas')
        }
        const data: ApiResponse = await response.json()
        const mappedRecipe = mapMeals(data)
        setRecipes(mappedRecipe)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setError(error as Error)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => controller.abort()
  }, [query, category])
}
