'use client'
import { useContext, createContext, useState, ReactNode } from "react"
import { Recipe } from "../types/recipe"
import { Category } from "../types/categories"

type RecipeContextTypes = {   // esto va a ser los valores que va tener RecipeContext se crean primero tipo props
    query: string
    setQuery: (inputQuery: string) => void

    error: Error | null
    setError: (inputError: Error | null) => void

    loading: boolean
    setLoading: (inputLoading: boolean) => void

    recipes: Recipe[]
    setRecipes: (inputRecipes: Recipe[]) => void

    selectedRecipe: Recipe | null
    setSelectedRecipe: (inputSelectedRecipe: Recipe | null) => void

    favoritesId: string[]
    setFavoritesId: (inputFavoritesId: string[]) => void

    categories: Category[]
    setCategories: (inputCategories: Category[]) => void
}

const RecipeContext = createContext<RecipeContextTypes | null>(null)

export function RecipeProvider({ children }: { children: ReactNode }) {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const [favoritesId, setFavoritesId] = useState<string[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                setRecipes,
                error,
                setError,
                query,
                setQuery,
                loading, 
                setLoading,
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
    console.log('context: ' + JSON.stringify(context))
    return context
}