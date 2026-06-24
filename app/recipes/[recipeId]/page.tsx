'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import CardInfo from "@/app/components/cardInfo"
import { useRecipeContext } from "@/app/context/RecipeContext"
import { useFetchRecipeById } from "@/app/hooks/useFetchRecipeById"
import type { Recipe } from "@/app/types/recipe"

function SkeletonDetail() {
  return (
    <div className="min-h-screen bg-[#faf8f4] px-6 py-10 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="skeleton md:w-72 aspect-square rounded-2xl shrink-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="skeleton h-3 w-24 rounded-full" />
            <div className="skeleton h-9 w-3/4 rounded-xl" />
            <div className="skeleton h-9 w-1/2 rounded-xl" />
            <div className="border-t border-[#e8e0d4] pt-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-4 rounded-full" style={{ width: `${60 + (i % 3) * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="skeleton rounded-2xl h-48 w-full" />
      </div>
    </div>
  )
}

// API recipe — calls useFetchRecipeById unconditionally
function ApiRecipeDetail({ recipeId }: { recipeId: string }) {
  const { recipes, loading } = useRecipeContext()
  useFetchRecipeById(recipeId)
  const recipe = recipes[0]

  if (loading) return <SkeletonDetail />
  return recipe ? (
    <CardInfo recipes={recipe} />
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-[#e53e5a] text-sm">Recipe not found</p>
    </div>
  )
}

// Custom recipe — reads from localStorage, no API call
function CustomRecipeDetail({ recipeId }: { recipeId: string }) {
  const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("customRecipes")
      const all: Recipe[] = raw ? JSON.parse(raw) : []
      setRecipe(all.find((r) => r.id === recipeId) ?? null)
    } catch {
      setRecipe(null)
    }
  }, [recipeId])

  if (recipe === undefined) return <SkeletonDetail />
  return recipe ? (
    <CardInfo recipes={recipe} />
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-[#e53e5a] text-sm">Recipe not found</p>
    </div>
  )
}

export default function RecipeId() {
  const { recipeId } = useParams()
  const id = recipeId as string

  if (id.startsWith("custom-")) {
    return <CustomRecipeDetail recipeId={id} />
  }
  return <ApiRecipeDetail recipeId={id} />
}
