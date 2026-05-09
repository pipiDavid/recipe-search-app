'use client'

import { useRecipeContext } from "./context/RecipeContext"
import Card from "./components/card"
import RecipeId from "./recipes/[recipeId]/page"
import { useRouter } from "next/navigation"


export function HomePage() {
 const {recipes, favoritesId, query, loading, setQuery, categories, error, selectedRecipe, setSelectedRecipe} = useRecipeContext()
 const router = useRouter()
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
                           /* addToFavorites={() => addFavoritesRecipes(item.id)}
                            isFavorite={favoritesId.includes(item.id)} */
                        />
                    ))}
                </div>
            )}
            {selectedRecipe && (
                <div>
                    <RecipeId />
                </div>
            )}

        </div>
    )
}
