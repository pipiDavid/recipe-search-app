'use client'

import { App } from "./components/app"


function Home() {
return (
    <App/>
)
}

export default Home
/*
  useEffect(() => {

  }, [])

  const addFavoritesRecipes = (id: string) => {
   setFavoritesId(prevValue => {
      const exist = prevValue.some(favoriteRecipe => favoriteRecipe === id)
      const result = exist ? prevValue.filter(favoriteRecipe => favoriteRecipe !== id) : [...prevValue, id]
    localStorage.setItem('favoritesRecipes', JSON.stringify(favoritesId))
      return result
    })
      localStorage.setItem('favoritesRecipes', JSON.stringify(favoritesId))
  }
  useEffect(() => {
    localStorage.setItem('favoritesRecipes', JSON.stringify(favoritesId))
  }, [favoritesId])
*/
  