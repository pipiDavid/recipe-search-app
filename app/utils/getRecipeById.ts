'use client'
import { useRecipeContext } from "../context/RecipeContext";

export function getRecipeById(id: string) {
    const {recipes} = useRecipeContext()
    
    const recipe = recipes.find((recipe) => recipe.id === id)

    return recipe
}
