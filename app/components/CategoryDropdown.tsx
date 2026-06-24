'use client'
import { useState, useRef, useEffect } from "react"
import { useRecipeContext } from "../context/RecipeContext"
import {
  GiMeat, GiChickenLeg, GiCakeSlice,
  GiGoat, GiSheep, GiMeal, GiNoodles, GiPig,
  GiFishCooked, GiBowlOfRice, GiSpoon, GiPlantRoots, GiCarrot,
} from "react-icons/gi"
import { TbEggFried } from "react-icons/tb"
import { BsGridFill } from "react-icons/bs"
import { FiChevronDown } from "react-icons/fi"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Beef":          <GiMeat />,
  "Breakfast":     <TbEggFried />,
  "Chicken":       <GiChickenLeg />,
  "Dessert":       <GiCakeSlice />,
  "Goat":          <GiGoat />,
  "Lamb":          <GiSheep />,
  "Miscellaneous": <GiMeal />,
  "Pasta":         <GiNoodles />,
  "Pork":          <GiPig />,
  "Seafood":       <GiFishCooked />,
  "Side":          <GiBowlOfRice />,
  "Starter":       <GiSpoon />,
  "Vegan":         <GiPlantRoots />,
  "Vegetarian":    <GiCarrot />,
}

function getIcon(name: string) {
  return CATEGORY_ICONS[name] ?? <BsGridFill />
}

export default function CategoryDropdown() {
  const { categories, category, setCategory } = useRecipeContext()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedLabel = category || "All categories"
  const allOption = { name: "" }
  const options = [allOption, ...categories]

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-[#faf8f4] border border-[#e8e0d4] text-[#1a1208] rounded-full px-4 py-2.5 text-sm outline-none
          hover:border-[#f97316] hover:text-[#f97316] hover:bg-white transition-all duration-200 cursor-pointer min-w-44 focus:border-[#f97316] group"
      >
        <span className="text-base shrink-0 group-hover:text-[#f97316] transition-colors duration-200">
          {category ? getIcon(category) : <BsGridFill />}
        </span>
        <span className="flex-1 text-left truncate">{selectedLabel}</span>
        <FiChevronDown
          className={`shrink-0 text-[#78685a] transition-transform duration-300 group-hover:text-[#f97316] ${open ? "rotate-180" : "rotate-0"}`}
          size={15}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`
          absolute right-0 mt-2 w-52 bg-white border border-[#e8e0d4] rounded-2xl shadow-xl z-50 overflow-hidden
          transition-all duration-250 origin-top
          ${open
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
          }
        `}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="py-1.5 max-h-72 overflow-y-auto">
          {options.map((opt) => {
            const isAll = opt.name === ""
            const isActive = category === opt.name
            const isHovered = hovered === (opt.name || "__all__")
            const highlighted = isActive || isHovered

            return (
              <button
                key={opt.name || "__all__"}
                onClick={() => { setCategory(opt.name); setOpen(false) }}
                onMouseEnter={() => setHovered(opt.name || "__all__")}
                onMouseLeave={() => setHovered(null)}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-left
                  transition-all duration-150 cursor-pointer
                  ${isActive ? "bg-[#fff4ed]" : isHovered ? "bg-[#faf8f4]" : ""}
                `}
              >
                <span
                  className={`text-base shrink-0 transition-colors duration-150 ${highlighted ? "text-[#f97316]" : "text-[#1a1208]"}`}
                >
                  {isAll ? <BsGridFill /> : getIcon(opt.name)}
                </span>
                <span
                  className={`flex-1 transition-colors duration-150 font-medium ${highlighted ? "text-[#f97316]" : "text-[#1a1208]"}`}
                >
                  {isAll ? "All categories" : opt.name}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 bg-[#f97316] transition-all duration-200 ${highlighted ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
