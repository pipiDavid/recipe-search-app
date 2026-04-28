'use client'

  import { useEffect, useState } from "react"
  import { type Recipe, type ApiResponse } from "./types/recipe"
  import { mapMeals } from "./utils/mapAttribute"
  import Card from "./components/card"
  import './globals.css'
  import CardInfo from "./components/cardInfo"
  import { type Category, type ApiResCategory } from "./types/categories" 
  import mapCategories from "./utils/mapCategories"

  const API_URL = 'https://www.themealdb.com/api/json/v1/1/'


  function App() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const [recipe, setRecipe] = useState<Recipe[]>([])
    const [query, setQuery] = useState('')
    const [favoritesId, setFavoritesId] = useState<string[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const [category, setCategory] = useState<Category[] | null>([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_URL}list.php?c=list`)

          if(!response.ok) {
            throw new Error('No se encontro la lista')
          }
          const data: ApiResCategory = await response.json()
          const mappedCategories = mapCategories(data)
          setCategory(mappedCategories)

        } catch(error) {
          setError(error as Error)
        }
      }
      fetchData()
    }, [category])

    useEffect(() => {
      if (!query.trim()) {
        setRecipe(recipe)
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
          setRecipe(mappedRecipe)

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
          </div>

          <div>
            <select>
              <option></option>
            </select>
          </div>

        </header>

        {loading && <p>LOADING...</p>}
        {error && <p>{error.message}</p>}

        {!selectedRecipe && (
          <div className="grid grid-cols-2 md:grid-cols-4 p-10 gap-10 ">
            {recipe.map((item) => (
              <Card
                key={item.id}
                recipe={item}
                clickRecipe={() => setSelectedRecipe(item)}
                addToFavorites={() => addFavoritesRecipes(item.id)}
                isFavorite={favoritesId.includes(item.id)}
              />
            ))}
          </div>
        )}
        {selectedRecipe && (
          <div>
            <CardInfo
              key={selectedRecipe.id}
              recipe={selectedRecipe}
            />
          </div>
        )}

      </div>
    )
  }
  export default App
