'use client'

import { useState, useEffect, useMemo, useRef } from "react"
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showModal, setShowModal] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const allRecipes = useMemo(
    () => [...customRecipes, ...recipes],
    [customRecipes, recipes]
  )

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [recipes])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allRecipes.length))
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [visibleCount, allRecipes.length])

  function handleAddToFavorites(id: string, name: string, recipe: typeof allRecipes[0]) {
    const isCurrentlyFavorite = favoritesId.includes(id)
    getFavorites(id, recipe)
    if (!isCurrentlyFavorite) setToastRecipe(name)
  }

  const visibleRecipes = allRecipes.slice(0, visibleCount)
  const hasMore = visibleCount < allRecipes.length

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {visibleRecipes.map((item, i) => {
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

          {hasMore && (
            <div ref={sentinelRef} className="flex items-center justify-center py-10">
              <div className="orbit-loader">
                <span /><span /><span />
              </div>
            </div>
          )}


        </>
      )}

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
