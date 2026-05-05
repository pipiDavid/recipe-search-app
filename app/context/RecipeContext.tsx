'use client'
import React, { useContext, createContext, useState, ReactNode } from "react"
import { Recipe } from "../types/recipe"
import { Category } from "../types/categories"

type RecipeContextTypes = {   // esto va a ser los valores que va tener RecipeContext se crean primero tipo props
    recipes: Recipe[]
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>

    selectedRecipe: Recipe | null
    setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>

    favoritesId: string[]
    setFavoritesId: React.Dispatch<React.SetStateAction<string[]>>

    categories: Category[]
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

const RecipeContext = createContext<RecipeContextTypes | null>(null)

type RecipeProviderProps = {
    children: ReactNode
}

export function RecipeProvider({children}: RecipeProviderProps) {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const [favoritesId, setFavoritesId] = useState<string[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    return (
        <RecipeContext.Provider 
        value={{
            recipes,
            setRecipes,
            selectedRecipe,
            setSelectedRecipe,
            favoritesId,
            setFavoritesId,
            categories,
            setCategories
        }}
        >
            {children}
        </RecipeContext.Provider>
    )
}

export function useRecipeContext() {
    const context = useContext(RecipeContext)

    if(!context) {
        throw new Error('Error')
    }
    return context
}