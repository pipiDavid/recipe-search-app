'use client'
import { useContext, createContext, useState, ReactNode } from "react"
import { Recipe } from "../types/recipe"
import { Category } from "../types/categories"

type RecipeContextTypes = {   // esto va a ser los valores que va tener RecipeContext se crean primero tipo props
	query: string
	setQuery: (inputQuery: string) => void

	category: string
    setCategory: (inputCategory: string) => void

	error: Error | null
	setError: (inputError: Error | null) => void

	loading: boolean
	setLoading: (inputLoading: boolean) => void

	recipes: Recipe[]
	setRecipes: (inputRecipes: Recipe[]) => void

	favoritesId: string[]
	setFavoritesId: (inputFavoritesId: string[] | ((prev: string[]) => string[])) => void

	categories: Category[]
	setCategories: (inputCategories: Category[]) => void
}

const RecipeContext = createContext<RecipeContextTypes | null>(null)

export function RecipeProvider({ children }: { children: ReactNode }) {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
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
				category,
				setCategory,
				loading,
				setLoading,
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
	console.log('context: ' + context)
	if (!context) {
		throw new Error('Error con el useRecipeContext')
	}

	return context
}