import { useRecipeContext } from "../context/RecipeContext"

function getFavoriteRecipe() {
    const {recipes, favoritesId} = useRecipeContext()
     const favoriteRecipes = recipes.filter(recipe => {
        return favoritesId.includes(recipe.id)
       })

       return favoriteRecipes
}

export default getFavoriteRecipe