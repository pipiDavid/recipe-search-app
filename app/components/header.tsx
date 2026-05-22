'use client'
import { useRecipeContext } from "../context/RecipeContext"

export default function Header() {
  const { categories, query, setQuery } = useRecipeContext()
  return (
    <header className="sticky top-0 bg-amber-100 pb-5 z-99" >
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