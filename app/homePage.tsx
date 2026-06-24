'use client'

import { useState, useEffect, useMemo } from "react"
import { useRecipeContext } from "./context/RecipeContext"
import Card from "./components/card"
import SkeletonCard from "./components/skeletonCard"
import { FavoriteToast } from "./components/favoriteToast"
import { AddRecipeModal } from "./components/addRecipeModal"
import { useRouter } from "next/navigation"
import { UseFavorites } from "./hooks/useFavorites"
import { useCustomRecipes } from "./hooks/useCustomRecipes"

const PAGE_SIZE = 10

export function HomePage() {
  const { recipes, favoritesId, loading, error, categories } = useRecipeContext()
  const { getFavorites } = UseFavorites()
  const { customRecipes, addRecipe, deleteRecipe } = useCustomRecipes()
  const router = useRouter()
  const [toastRecipe, setToastRecipe] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageKey, setPageKey] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // Custom recipes always shown first, then API results
  const allRecipes = useMemo(
    () => [...customRecipes, ...recipes],
    [customRecipes, recipes]
  )

  useEffect(() => {
    setPage(1)
  }, [recipes])

  function handleAddToFavorites(id: string, name: string, recipe: typeof allRecipes[0]) {
    const isCurrentlyFavorite = favoritesId.includes(id)
    getFavorites(id, recipe)
    if (!isCurrentlyFavorite) setToastRecipe(name)
  }

  function changePage(next: number) {
    setPage(next)
    setPageKey((k) => k + 1)
  }

  const totalPages = Math.max(1, Math.ceil(allRecipes.length / PAGE_SIZE))
  const paginated = allRecipes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages]
    if (page >= totalPages - 3)
      return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, "…", page - 1, page, page + 1, "…", totalPages]
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {toastRecipe && (
        <FavoriteToast recipeName={toastRecipe} onDone={() => setToastRecipe(null)} />
      )}

      {showModal && (
        <AddRecipeModal
          categories={categories.map((c) => c.name)}
          onClose={() => setShowModal(false)}
          onAdd={addRecipe}
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
          <div key={pageKey} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginated.map((item, i) => {
              const isCustom = item.id.startsWith("custom-")
              return (
                <Card
                  key={item.id}
                  recipes={item}
                  clickRecipe={() => router.push(`/recipes/${item.id}`)}
                  addToFavorites={(id) => handleAddToFavorites(id, item.name, item)}
                  isFavorite={favoritesId.includes(item.id)}
                  index={i}
                  isCustom={isCustom}
                  onDelete={isCustom ? () => deleteRecipe(item.id) : undefined}
                />
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0d4] bg-white text-[#78685a] hover:border-[#f97316] hover:text-[#f97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              >
                ← Previous
              </button>

              {getPageNumbers().map((p, i) =>
                p === "…" ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-[#b5a898] select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => changePage(p as number)}
                    className={`page-num-enter w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                      p === page
                        ? "bg-[#f97316] text-white shadow-md shadow-[#f97316]/30 scale-110"
                        : "border border-[#e8e0d4] bg-white text-[#78685a] hover:border-[#f97316] hover:text-[#f97316] hover:scale-105"
                    }`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0d4] bg-white text-[#78685a] hover:border-[#f97316] hover:text-[#f97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Floating action button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#f97316] text-white rounded-full shadow-lg shadow-[#f97316]/40 hover:bg-[#ea6c10] hover:scale-110 hover:shadow-xl hover:shadow-[#f97316]/50 active:scale-95 transition-all duration-200 flex items-center justify-center text-3xl leading-none pb-0.5"
        aria-label="Add your own recipe"
        title="Add your own recipe"
      >
        +
      </button>
    </main>
  )
}
