'use client'

import { useEffect } from "react"
import { useRecipeContext } from "../context/RecipeContext"
import { ApiResponse } from "../types/recipe"
import { mapMeals } from "../utils/mapAttribute"



export function UseFetchRecipes() {
  const { setRecipes, query, setLoading, setError, category } = useRecipeContext()
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/'

  useEffect(() => {
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
        const response = await fetch(endpoint)
        
        

        if (!response.ok) {
          throw new Error('No se encontraron Recetas') //CAMBIAR EL ERROR Y SER MAS EXPLICITO
        }
        const data: ApiResponse = await response.json()
        const mappedRecipe = mapMeals(data)
        setRecipes(mappedRecipe)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [query, category])
}