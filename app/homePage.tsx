'use client'

import { useRecipeContext } from "./context/RecipeContext"
import Card from "./components/card"
import { useRouter } from "next/navigation"
import { UseFavorites } from "./hooks/useFavorites"




export function HomePage() {
  const { recipes,favoritesId, loading, error } = useRecipeContext()
  const {getFavorites} = UseFavorites()
  const router = useRouter()
  return (
    <div>

      {loading && <p>LOADING...</p>}
      {error && <p>{error.message}</p>}


      <div className="grid grid-cols-2 md:grid-cols-4 p-10 gap-10 ">
        {recipes.map((item) => {
          console.log('recipes' + recipes, 'item' + item)
          return (
            <Card
              key={item.id}
              recipes={item}
              clickRecipe={() => {
                router.push(`/recipes/${item.id}`)
              }}
              addToFavorites={getFavorites}
              isFavorite={favoritesId.includes(item.id)}
            />
          )
        })}
      </div>


    </div>
  )
} 