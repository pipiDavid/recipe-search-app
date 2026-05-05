'use client'

import { useEffect, useState } from "react"
import { type Recipe, type ApiResponse } from "./types/recipe"
import { mapMeals } from "./utils/mapAttribute"
import Card from "./components/card"
import './globals.css'
import CardInfo from "./components/cardInfo"
import { type Category, type ApiResCategory } from "./types/categories"
import mapCategories from "./utils/mapCategories"
import { useRouter } from "next/navigation"
import { useRecipeContext } from "./context/RecipeContext"
import RecipeId from "./recipes/[recipeId]/page"

const API_URL = 'https://www.themealdb.com/api/json/v1/1/'


function App() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [query, setQuery] = useState('')
  const {recipes, setRecipes, favoritesId, setFavoritesId, selectedRecipe, setSelectedRecipe,  categories, setCategories} = useRecipeContext()

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

  useEffect(() => {
    if (!query.trim()) {
      setRecipes(recipes)
      setLoading(false)
      setError(null)

      return
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}search.php?s=${query}`)

        if (!response.ok) {
          throw new Error('No se encontraron Recetas')
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
  }, [query])

  useEffect(() => {
    const stored = localStorage.getItem('favoritesRecipes')
    if (stored) {
      setFavoritesId(JSON.parse(stored))
    }
  }, [])

  const addFavoritesRecipes = (id: string) => {
    setFavoritesId(prevValue => {
      const exist = prevValue.some(favoriteRecipe => favoriteRecipe === id)
      const result = exist ? prevValue.filter(favoriteRecipe => favoriteRecipe !== id) : [...prevValue, id]

      return result
    })
  }
  useEffect(() => {
    localStorage.setItem('favoritesRecipes', JSON.stringify(favoritesId))
  }, [favoritesId])

  return (
    <div>
      <header className="sticky top-0 bg-amber-100 pb-5 z-99" >
        <div className="text-center">
          <h1 className="p-10 font-bold text-3xl">MEALS</h1>
        </div>

        <div className="text-center">
          <input
            type="text"
            placeholder="Enter a recipe"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

      </header>

      {loading && <p>LOADING...</p>}
      {error && <p>{error.message}</p>}

      {!selectedRecipe && (
        <div className="grid grid-cols-2 md:grid-cols-4 p-10 gap-10 ">
          {recipes.map((item) => (
            <Card
              key={item.id}
              recipes={item}
              // clickRecipe={() => setSelectedRecipe(item)}
              clickRecipe={() => {
                setSelectedRecipe(item)
                router.push(`/recipes/${item.id}`)
              }}
              addToFavorites={() => addFavoritesRecipes(item.id)}
              isFavorite={favoritesId.includes(item.id)}
            />
          ))}
        </div>
      )}
      {selectedRecipe && (
        <div>
          <RecipeId/>
        </div>
      )}

    </div>
  )
}
export default App
