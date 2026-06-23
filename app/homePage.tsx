'use client'

import { useState, useEffect } from "react"
import { useRecipeContext } from "./context/RecipeContext"
import Card from "./components/card"
import SkeletonCard from "./components/skeletonCard"
import { FavoriteToast } from "./components/favoriteToast"
import { useRouter } from "next/navigation"
import { UseFavorites } from "./hooks/useFavorites"

const PAGE_SIZE = 10

export function HomePage() {
  const { recipes, favoritesId, loading, error } = useRecipeContext()
  const { getFavorites } = UseFavorites()
  const router = useRouter()
  const [toastRecipe, setToastRecipe] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [recipes])

  function handleAddToFavorites(id: string, name: string) {
    const isCurrentlyFavorite = favoritesId.includes(id)
    getFavorites(id)
    if (!isCurrentlyFavorite) {
      setToastRecipe(name)
    }
  }

  const totalPages = Math.max(1, Math.ceil(recipes.length / PAGE_SIZE))
  const paginated = recipes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages]
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, "…", page - 1, page, page + 1, "…", totalPages]
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {toastRecipe && (
        <FavoriteToast
          recipeName={toastRecipe}
          onDone={() => setToastRecipe(null)}
        />
      )}

      {error && (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#e53e5a] text-sm">{error.message}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginated.map((item) => (
              <Card
                key={item.id}
                recipes={item}
                clickRecipe={() => router.push(`/recipes/${item.id}`)}
                addToFavorites={(id) => handleAddToFavorites(id, item.name)}
                isFavorite={favoritesId.includes(item.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0d4] bg-white text-[#78685a] hover:border-[#f97316] hover:text-[#f97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Anterior
              </button>

              {getPageNumbers().map((p, i) =>
                p === "…" ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-[#b5a898] select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                      p === page
                        ? "bg-[#f97316] text-white shadow-md shadow-[#f97316]/30"
                        : "border border-[#e8e0d4] bg-white text-[#78685a] hover:border-[#f97316] hover:text-[#f97316]"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0d4] bg-white text-[#78685a] hover:border-[#f97316] hover:text-[#f97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
