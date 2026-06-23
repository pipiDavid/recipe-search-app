'use client'

import CardInfo from "@/app/components/cardInfo"
import { useRecipeContext } from "@/app/context/RecipeContext"
import { useFetchRecipeById } from "@/app/hooks/useFetchRecipeById"
import { useParams } from "next/navigation"

function SkeletonDetail() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-10 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="skeleton md:w-72 aspect-square rounded-2xl shrink-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="skeleton h-3 w-24 rounded-full" />
            <div className="skeleton h-9 w-3/4 rounded-xl" />
            <div className="skeleton h-9 w-1/2 rounded-xl" />
            <div className="border-t border-[#2a2a2a] pt-6 space-y-3">
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

function RecipeId() {
  const { recipeId } = useParams()
  const { recipes, loading } = useRecipeContext()
  useFetchRecipeById(recipeId as string)
  const recipe = recipes[0]

  if (loading) return <SkeletonDetail />

  return (
    <>
      {recipe ? (
        <CardInfo recipes={recipe} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-[#c9402b] text-sm">Recipe not found</p>
        </div>
      )}
    </>
  )
}

export default RecipeId
