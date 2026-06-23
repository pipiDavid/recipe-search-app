import type { Recipe } from "../types/recipe"

type CardProps = {
  recipes: Recipe
  clickRecipe: (id: string) => void
  addToFavorites: (id: string) => void
  isFavorite: boolean
}

function Card({ recipes, clickRecipe, addToFavorites, isFavorite }: CardProps) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#c9402b] transition-all duration-300 cursor-pointer"
      onClick={() => clickRecipe(recipes.id)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={recipes.image}
          alt={recipes.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex items-center justify-between">
        <p className="text-[#f5f5f0] font-medium text-sm truncate flex-1">
          {recipes.name}
        </p>
        <button
          className="ml-3 flex-shrink-0 transition-transform duration-200 hover:scale-125"
          onClick={(e) => {
            e.stopPropagation()
            addToFavorites(recipes.id)
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <span className="text-[#c9402b] text-lg">♥</span>
          ) : (
            <span className="text-[#5a5a5a] hover:text-[#c9402b] text-lg transition-colors duration-200">♡</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Card
