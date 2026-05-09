'use client'

import { App } from "./components/app"
import { RecipeProvider } from "./context/RecipeContext"

function Home() {
return (
  <RecipeProvider>
    <App/>
  </RecipeProvider>
)
}

export default Home
/*
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
*/
  