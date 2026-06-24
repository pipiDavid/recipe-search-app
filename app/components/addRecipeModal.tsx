'use client'

import { useState, useEffect, useRef } from "react"
import type { Recipe } from "../types/recipe"

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23faf8f4'/%3E%3Ccircle cx='200' cy='185' r='85' fill='%23f97316' opacity='0.07'/%3E%3Ctext x='200' y='196' font-size='20' text-anchor='middle' fill='%23b5a898' font-family='-apple-system%2C sans-serif'%3ESin imagen%3C/text%3E%3C/svg%3E"

type Row = { ingredient: string; measure: string }

type Props = {
  categories: string[]
  onClose: () => void
  onAdd: (recipe: Omit<Recipe, "id">) => void
}

export function AddRecipeModal({ categories, onClose, onAdd }: Props) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [instructions, setInstructions] = useState("")
  const [rows, setRows] = useState<Row[]>([{ ingredient: "", measure: "" }])
  const [nameError, setNameError] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function addRow() { setRows((prev) => [...prev, { ingredient: "", measure: "" }]) }
  function removeRow(i: number) { setRows((prev) => prev.filter((_, idx) => idx !== i)) }
  function updateRow(i: number, field: keyof Row, value: string) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setNameError(true); nameRef.current?.focus(); return }
    const valid = rows.filter((r) => r.ingredient.trim())
    onAdd({
      name: name.trim(),
      category: category.trim() || "Custom",
      image: imageUrl.trim() || PLACEHOLDER_IMAGE,
      instructions: instructions.trim(),
      ingredients: valid.map((r) => r.ingredient.trim()),
      measures: valid.map((r) => r.measure.trim()),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-animate w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e0d4] shrink-0">
          <h2 className="text-lg font-bold text-[#1a1208]">
            New <span className="text-[#f97316]">Recipe</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#b5a898] hover:text-[#1a1208] hover:bg-[#faf8f4] transition-all duration-150 text-sm"
          >
            ✕
          </button>
        </div>

        <form id="recipe-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          <div>
            <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#b5a898] mb-1.5">
              Name *
            </label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(false) }}
              placeholder="E.g.: Grandma's rice pudding"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 ${
                nameError ? "border-[#e53e5a] bg-[#fff8f8]" : "border-[#e8e0d4] bg-[#faf8f4] focus:border-[#f97316] focus:bg-white"
              }`}
            />
            {nameError && <p className="text-xs text-[#e53e5a] mt-1">Name is required</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#b5a898] mb-1.5">
              Category
            </label>
            <input
              list="cats"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="E.g.: Dessert, Chicken, Custom…"
              className="w-full border border-[#e8e0d4] bg-[#faf8f4] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all duration-200"
            />
            <datalist id="cats">
              {categories.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#b5a898] mb-1.5">
              Image URL <span className="normal-case font-normal text-[#c5b8aa]">(optional)</span>
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-[#e8e0d4] bg-[#faf8f4] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#b5a898] mb-1.5">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe the recipe steps..."
              rows={4}
              className="w-full border border-[#e8e0d4] bg-[#faf8f4] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all duration-200 resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#b5a898] mb-2">
              Ingredients
            </label>
            <div className="space-y-2">
              {rows.map((row, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={row.ingredient}
                    onChange={(e) => updateRow(i, "ingredient", e.target.value)}
                    placeholder="Ingredient"
                    className="flex-1 border border-[#e8e0d4] bg-[#faf8f4] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all"
                  />
                  <input
                    value={row.measure}
                    onChange={(e) => updateRow(i, "measure", e.target.value)}
                    placeholder="Amount"
                    className="w-28 border border-[#e8e0d4] bg-[#faf8f4] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#f97316] focus:bg-white transition-all"
                  />
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#b5a898] hover:text-[#e53e5a] hover:bg-[#fff8f8] transition-all text-xs shrink-0"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRow}
              className="mt-2.5 flex items-center gap-1 text-xs font-medium text-[#f97316] hover:text-[#ea6c10] transition-colors"
            >
              <span className="text-base leading-none">+</span> Add ingredient
            </button>
          </div>

        </form>

        <div className="px-6 py-4 border-t border-[#e8e0d4] shrink-0">
          <button
            type="submit"
            form="recipe-form"
            className="w-full py-3 rounded-xl bg-[#f97316] text-white font-semibold text-sm hover:bg-[#ea6c10] transition-all duration-200 shadow-md shadow-[#f97316]/30 hover:shadow-lg hover:shadow-[#f97316]/40 hover:scale-[1.015] active:scale-[0.985]"
          >
            Save recipe
          </button>
        </div>

      </div>
    </div>
  )
}
