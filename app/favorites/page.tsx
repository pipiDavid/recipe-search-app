'use client'
import { useState, useEffect, useMemo } from "react"
import type { Recipe } from "@/app/types/recipe"
import Card from "@/app/components/card"
import { UseFavorites, readStoredFavorites } from "@/app/hooks/useFavorites"
import { useRouter } from "next/navigation"

export default function FavoritesRecipes() {
  const router = useRouter()
  const { getFavorites } = UseFavorites()
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [search, setSearch] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [pageKey, setPageKey] = useState(0)

  useEffect(() => {
    setFavorites(readStoredFavorites())
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return favorites
    const q = search.toLowerCase()
    return favorites.filter((r) => r.name.toLowerCase().includes(q))
  }, [favorites, search])

  function handleToggle(id: string) {
    getFavorites(id)
    setFavorites((prev) => prev.filter((r) => r.id !== id))
    setPageKey((k) => k + 1)
  }

  const isEmpty = favorites.length === 0
  const noResults = !isEmpty && filtered.length === 0

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
        <div>
          <h2 className="text-2xl font-bold text-[#1a1208] tracking-tight">
            My <span className="text-[#e53e5a]">Favorites</span>
          </h2>
          {!isEmpty && (
            <p className="text-xs text-[#b5a898] mt-1">
              {favorites.length} {favorites.length === 1 ? "saved recipe" : "saved recipes"}
            </p>
          )}
        </div>

        {!isEmpty && (
          <input
            type="text"
            placeholder="Search favorites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full sm:w-72 border text-[#1a1208] placeholder-[#b5a898] rounded-full px-5 py-2.5 text-sm outline-none transition-colors duration-200 ${
              searchFocused ? "search-focused" : "bg-[#faf8f4] border-[#e8e0d4]"
            }`}
          />
        )}
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-28 gap-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-6xl select-none" style={{ animation: "heart-pulse 2s ease-in-out infinite" }}>🍽️</span>
          <p className="text-xl font-semibold text-[#1a1208]">No favorites yet</p>
          <p className="text-sm text-[#b5a898] text-center max-w-64">Explore recipes and tap the heart to save them here</p>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-6 py-2.5 rounded-full text-sm font-medium bg-[#f97316] text-white hover:bg-[#ea6c10] transition-all duration-200 shadow-md shadow-[#f97316]/30 hover:shadow-lg hover:shadow-[#f97316]/40 hover:scale-105 active:scale-95"
          >
            Explore recipes
          </button>
        </div>
      )}

      {noResults && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <span className="text-4xl select-none">🔍</span>
          <p className="text-base font-semibold text-[#1a1208]">No results</p>
          <p className="text-sm text-[#b5a898]">No favorites match &quot;{search}&quot;</p>
          <button onClick={() => setSearch("")} className="mt-1 text-sm text-[#f97316] hover:underline">
            Clear search
          </button>
        </div>
      )}

      {!isEmpty && !noResults && (
        <div key={pageKey} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((recipe, i) => (
            <Card
              key={recipe.id}
              recipes={recipe}
              clickRecipe={() => router.push(`/recipes/${recipe.id}`)}
              addToFavorites={() => handleToggle(recipe.id)}
              isFavorite={true}
              index={i}
            />
          ))}
        </div>
      )}

    </main>
  )
}
