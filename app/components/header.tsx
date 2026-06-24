'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useRecipeContext } from "../context/RecipeContext"

const WORD1 = "My "
const WORD2 = "Meals"

export default function Header() {
  const { categories, query, setQuery, category, setCategory } = useRecipeContext()
  const router = useRouter()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-[#e8e0d4] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold tracking-[0.25em] uppercase select-none" aria-label="My Meals">
            {[...WORD1].map((ch, i) => (
              <span
                key={`w1-${i}`}
                className="inline-block text-[#1a1208]"
                style={{ animation: `letter-fall 0.5s cubic-bezier(0.16,1,0.3,1) both`, animationDelay: `${i * 0.065}s` }}
              >
                {ch}
              </span>
            ))}
            {[...WORD2].map((ch, i) => (
              <span
                key={`w2-${i}`}
                className="inline-block text-[#f97316]"
                style={{ animation: `letter-fall 0.5s cubic-bezier(0.16,1,0.3,1) both`, animationDelay: `${(i + WORD1.length) * 0.065}s` }}
              >
                {ch}
              </span>
            ))}
          </h1>

          <button
            onClick={() => router.push("/favorites")}
            className="flex items-center gap-2 text-sm text-[#78685a] hover:text-[#f97316] border border-[#e8e0d4] hover:border-[#f97316] bg-white px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md hover:shadow-[#f97316]/10 group"
          >
            <span className="animate-heart-throb text-[#e53e5a] leading-none">♥</span>
            <span className="group-hover:tracking-wide transition-all duration-200">Favorites</span>
          </button>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`flex-1 border text-[#1a1208] placeholder-[#b5a898] rounded-full px-5 py-2.5 text-sm outline-none transition-colors duration-200 ${
              searchFocused ? "search-focused" : "bg-[#faf8f4] border-[#e8e0d4]"
            }`}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#faf8f4] border border-[#e8e0d4] text-[#1a1208] rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all duration-200 cursor-pointer"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

      </div>
    </header>
  )
}
