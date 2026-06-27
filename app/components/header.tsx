'use client'
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useRecipeContext } from "../context/RecipeContext"
import CategoryDropdown from "./CategoryDropdown"
import { FiSearch, FiHome } from "react-icons/fi"

const TITLE = "ForkFlow"

export default function Header() {
  const { query, setQuery } = useRecipeContext()
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchHovered, setSearchHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const searchExpanded = searchFocused || searchHovered

  return (
    <header className="max-w-full sticky top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-[#e8e0d4] shadow-sm">
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>

        {/* Hero title — collapses on scroll */}
        <div
          className="text-center overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: scrolled ? '0' : '84px',
            opacity: scrolled ? 0 : 1,
            marginBottom: scrolled ? '0' : '1rem',
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          <h1 className="text-3xl font-bold tracking-[0.25em] uppercase select-none" aria-label="ForkFlow">
            {[...TITLE].map((ch, i) => (
              <span
                key={`t-${i}`}
                className={`inline-block ${i < 4 ? 'text-[#1a1208]' : 'text-[#f97316]'}`}
                style={{
                  animation: `letter-fall 0.5s cubic-bezier(0.16,1,0.3,1) both`,
                  animationDelay: `${i * 0.065}s`,
                }}
              >
                {ch}
              </span>
            ))}
          </h1>
          <p
            className="text-[10px] text-[#78685a] tracking-[0.3em] uppercase mt-1.5 animate-slide-up"
            style={{ animationDelay: '0.52s' }}
          >
            From Screen To Table
          </p>
        </div>

        {/* Controls row */}
        <div className="max-w-full flex-wrap flex items-center justify-center gap-3">

          {/* Mini logo — slides in when scrolled */}
          <div
            className="overflow-hidden transition-all duration-500 whitespace-nowrap shrink-0"
            style={{ maxWidth: scrolled ? '160px' : '0', opacity: scrolled ? 1 : 0 }}
            aria-hidden="true"
          >
            <span className="text-sm font-bold tracking-widest uppercase pr-1">
              <span className="text-[#1a1208]">Fork</span>
              <span className="text-[#f97316]">Flow</span>
            </span>
          </div>

          {/* Search bar — small by default, expands on hover/focus */}
          <div
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => setSearchHovered(false)}
            style={{ width: searchExpanded ? '360px' : '118px' }}
            className={`relative flex items-center border rounded-full shrink-0
              transition-all duration-300 ease-out
              ${searchFocused
                ? 'search-focused'
                : 'bg-[#faf8f4] border-[#e8e0d4] hover:border-[#f97316]/50'
              }`}
          >
            <FiSearch
              size={14}
              className="ml-3.5 text-[#78685a] shrink-0"
            />
            <input
              type="text"
              placeholder="Find your next meal..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                if (!isHome) router.push('/')
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 min-w-0 bg-transparent outline-none text-[#1a1208] placeholder-[#b5a898] text-sm py-2 pl-2 pr-4"
            />
          </div>

          <CategoryDropdown />

          {!isHome && (
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm text-[#78685a] hover:text-[#f97316] border border-[#e8e0d4] hover:border-[#f97316] bg-white px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md hover:shadow-[#f97316]/10 group whitespace-nowrap shrink-0"
            >
              <FiHome size={14} className="text-[#78685a] group-hover:text-[#f97316] transition-colors duration-200" />
              <span className="group-hover:tracking-wide transition-all duration-200">Home</span>
            </button>
          )}

          <button
            onClick={() => router.push("/favorites")}
            className="flex items-center gap-2 text-sm text-[#78685a] hover:text-[#f97316] border border-[#e8e0d4] hover:border-[#f97316] bg-white px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md hover:shadow-[#f97316]/10 group whitespace-nowrap shrink-0"
          >
            <span className="animate-heart-throb text-[#e53e5a] leading-none">♥</span>
            <span className="group-hover:tracking-wide transition-all duration-200">Favorites</span>
          </button>

        </div>
      </div>
    </header>
  )
}
