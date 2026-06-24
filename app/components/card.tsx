'use client'
import { useRef, useState } from "react"
import type { Recipe } from "../types/recipe"

type Particle = { id: number; dx: string; dy: string; rot: string; delay: string }

type CardProps = {
  recipes: Recipe
  clickRecipe: (id: string) => void
  addToFavorites: (id: string) => void
  isFavorite: boolean
  index?: number
  isCustom?: boolean
  onDelete?: () => void
}

function Card({ recipes, clickRecipe, addToFavorites, isFavorite, index = 0, isCustom = false, onDelete }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -16}deg) rotateY(${(x - 0.5) * 16}deg) scale(1.05) translateZ(10px)`
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (card) card.style.transform = ""
    setIsHovered(false)
  }

  function spawnParticles() {
    const next: Particle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2
      const dist = 40 + Math.random() * 32
      return {
        id: Date.now() + i,
        dx: `${(Math.cos(angle) * dist).toFixed(1)}px`,
        dy: `${(Math.sin(angle) * dist - 22).toFixed(1)}px`,
        rot: `${Math.round((Math.random() - 0.5) * 230)}deg`,
        delay: `${(i * 0.042).toFixed(3)}s`,
      }
    })
    setParticles(next)
    setTimeout(() => setParticles([]), 1100)
  }

  return (
    <div
      ref={cardRef}
      className="card-animate group relative rounded-2xl bg-white cursor-pointer"
      style={{
        animationDelay: `${index * 0.07}s`,
        transition: "transform 0.12s ease, box-shadow 0.3s ease",
        boxShadow: isHovered
          ? "0 0 0 1.5px #f97316, 0 24px 52px rgba(249,115,22,0.17), 0 8px 24px rgba(0,0,0,0.08)"
          : "0 0 0 1px #e8e0d4, 0 1px 4px rgba(0,0,0,0.04)",
        willChange: "transform",
      }}
      onClick={() => clickRecipe(recipes.id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(249,115,22,0.13) 0%, transparent 58%)`
            : "none",
        }}
      />

      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={recipes.image}
          alt={recipes.name}
        />
        <div className="absolute inset-0 bg-linear-to from-black/52 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {isCustom && (
          <div className="absolute top-2 left-2 z-20 pointer-events-none">
            <span className="bg-[#f97316]/90 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full shadow-sm">
              Mine
            </span>
          </div>
        )}

        {isCustom && onDelete && (
          <button
            className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-[#b5a898] hover:text-[#e53e5a] hover:bg-white transition-all duration-150 opacity-0 group-hover:opacity-100 shadow-sm text-xs"
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            aria-label="Delete recipe"
          >
            ✕
          </button>
        )}

        <div
          className="absolute bottom-2.5 left-2.5 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span className="bg-white/95 backdrop-blur-sm text-[10px] font-bold tracking-[0.14em] uppercase text-[#d97706] px-2.5 py-1 rounded-full shadow-sm">
            {recipes.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between bg-white rounded-b-2xl relative z-10">
        <p className="text-[#1a1208] font-medium text-sm truncate flex-1 group-hover:text-[#f97316] transition-colors duration-300">
          {recipes.name}
        </p>
        <div className="relative ml-3 shrink-0">
          {particles.map((p) => (
            <span
              key={p.id}
              className="heart-particle text-[#e53e5a]"
              style={{ "--dx": p.dx, "--dy": p.dy, "--rot": p.rot, "--delay": p.delay } as React.CSSProperties}
            >
              ♥
            </span>
          ))}
          <button
            className="relative z-10 transition-transform duration-150 hover:scale-125 active:scale-90"
            onClick={(e) => {
              e.stopPropagation()
              addToFavorites(recipes.id)
              if (!isFavorite) spawnParticles()
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite
              ? <span className="text-[#e53e5a] text-xl select-none">♥</span>
              : <span className="text-[#c5b8aa] hover:text-[#e53e5a] text-xl transition-colors duration-200 select-none">♡</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
