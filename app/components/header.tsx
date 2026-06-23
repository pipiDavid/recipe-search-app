'use client'
import { useRouter } from "next/navigation"
import { useRecipeContext } from "../context/RecipeContext"

export default function Header() {
  const { categories, query, setQuery, category, setCategory } = useRecipeContext()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e0d4] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold tracking-[0.25em] uppercase text-[#1a1208]">
            My <span className="text-[#f97316]">Meals</span>
          </h1>
          <button
            onClick={() => router.push("/favorites")}
            className="flex items-center gap-2 text-sm text-[#78685a] hover:text-[#f97316] border border-[#e8e0d4] hover:border-[#f97316] bg-white px-4 py-2 rounded-full transition-all duration-200"
          >
            <span className="text-[#e53e5a]">♥</span>
            Favorites
          </button>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-[#faf8f4] border border-[#e8e0d4] text-[#1a1208] placeholder-[#b5a898] rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all duration-200"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#faf8f4] border border-[#e8e0d4] text-[#1a1208] rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all duration-200 cursor-pointer"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

      </div>
    </header>
  )
}
