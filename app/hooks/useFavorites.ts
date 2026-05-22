'use client'

import { useEffect } from "react"
import { useRecipeContext } from "../context/RecipeContext"


export function UseFavorites() {
    const {setFavoritesId} = useRecipeContext()
    
    useEffect(() => {
        const stored = localStorage.getItem('favoritesRecipes')

        if(stored) {
          setFavoritesId(JSON.parse(stored))
        }
    }, [])

     function getFavorites(id: string) {
        setFavoritesId(prevValue => {
            const exits = prevValue.some(favoriteRecipe => favoriteRecipe === id)
            const result = exits ? prevValue.filter(favoriteRecipe => favoriteRecipe !== id) : [...prevValue, id]
            localStorage.setItem('favoritesRecipes', JSON.stringify(result))
            return result
        })
    }
    return {
        getFavorites
    }
    
}