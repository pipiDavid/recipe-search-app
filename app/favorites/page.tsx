'use client'
import Card from "@/app/components/card"
import { UseFavorites } from "@/app/hooks/useFavorites"
import { useRouter } from "next/navigation"
import getFavoriteRecipe from "../utils/getFavoriteRecipe"

export default function FavoritesRecipes() {
  const router = useRouter()
  const { getFavorites } = UseFavorites()
  const favoritesRecipes = getFavoriteRecipe()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 p-10 gap-10 ">
      {favoritesRecipes.map((recipe) => (
        <Card
          key={recipe.id}
          recipes={recipe}
          clickRecipe={() => {
            router.push(`/recipes/${recipe.id}`)
          }}
          addToFavorites={getFavorites}
          isFavorite={true}

        />
      ))}
    </div>
  )
}