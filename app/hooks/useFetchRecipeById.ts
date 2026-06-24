import { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { ApiResponse } from "../types/recipe";
import { mapMeals } from "../utils/mapAttribute";

export function useFetchRecipeById(recipeId: string) {
    const {setRecipes, setLoading, setError} = useRecipeContext()
     const API_URL = 'https://www.themealdb.com/api/json/v1/1/'

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                setError(null)
                setLoading(true)

                const response = await fetch(`${API_URL}lookup.php?i=${recipeId}`)

                if(!response.ok) {
                  throw new Error('No se encontraron recetas')
                }
                const data: ApiResponse = await response.json()
                const mappedRecipe = mapMeals(data)
                setRecipes(mappedRecipe)

            } catch(error) {
              setError(error as Error)
            
            } finally {
              setLoading(false)
            }
        }
        fetchRecipeById()
    }, [recipeId])
}