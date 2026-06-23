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
      className="group relative rounded-2xl overflow-hidden bg-white border border-[#e8e0d4] hover:border-[#f97316] hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#f97316]/20 transition-all duration-300 cursor-pointer"
      onClick={() => clickRecipe(recipes.id)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={recipes.image}
          alt={recipes.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex items-center justify-between bg-white">
        <p className="text-[#1a1208] font-medium text-sm truncate flex-1">
          {recipes.name}
        </p>
        <button
          className="ml-3 shrink-0 transition-transform duration-200 hover:scale-125"
          onClick={(e) => {
            e.stopPropagation()
            addToFavorites(recipes.id)
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <span className="text-[#e53e5a] text-lg">♥</span>
          ) : (
            <span className="text-[#c5b8aa] hover:text-[#e53e5a] text-lg transition-colors duration-200">♡</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Card
