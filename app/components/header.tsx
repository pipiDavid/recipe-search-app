'use client'
import { useRouter } from "next/navigation"
import { useRecipeContext } from "../context/RecipeContext"

export default function Header() {
  const { categories, query, setQuery } = useRecipeContext()
  const router = useRouter()
  return (
    <header className="sticky top-0 bg-amber-100 pb-5 z-99 pe-10" >
       <div className="flex justify-end  pl-5 pt-5 ">
        <button onClick={() => router.push(`/favorites`)} className="text-center bg-amber-200">FAVORITES</button>
       </div>
      <div className="text-center">
        <h1 className="p-10 font-bold text-3xl">MEALS</h1>
      </div>

      <div className="text-center">
        <input
          type="text"
          placeholder="Enter a recipe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

      </div>

    </header>
  )
}