'use client'
import { useParams } from "next/navigation"
import CardInfo from "../../components/cardInfo"
import { getRecipeById } from "@/app/utils/getRecipeById"


function RecipeId() {
  const {recipeId} = useParams()
  const recipe = getRecipeById(recipeId as string)

  return (
    <>
      {recipe ? <CardInfo recipes={recipe} /> : <p>Recipe not found</p>}
    </>
  )

}

export default RecipeId