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

  const glass = {
    background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 100%)",
    backdropFilter: "blur(12px) saturate(160%)",
    WebkitBackdropFilter: "blur(12px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 8px rgba(0,0,0,0.1)",
  }

  return (
    <div
      ref={cardRef}
      className="card-animate group relative rounded-2xl cursor-pointer"
      style={{
        animationDelay: `${index * 0.07}s`,
        transition: "transform 0.12s ease, box-shadow 0.3s ease",
        background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: isHovered
          ? "0 0 0 1.5px #f97316, 0 24px 52px rgba(249,115,22,0.17), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)"
          : "0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
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

        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2 z-20">
          <p
            className="flex-1 truncate text-white font-medium text-sm px-3 py-1.5 rounded-xl group-hover:text-[#fed7aa] transition-colors duration-300"
            style={glass}
          >
            {recipes.name}
          </p>
          <div className="relative shrink-0">
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
              className="relative z-10 w-9 h-9 flex items-center justify-center rounded-xl transition-transform duration-150 hover:scale-110 active:scale-90"
              style={glass}
              onClick={(e) => {
                e.stopPropagation()
                addToFavorites(recipes.id)
                if (!isFavorite) spawnParticles()
              }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite
                ? <span className="text-[#ff6b8a] text-lg select-none leading-none">♥</span>
                : <span className="text-white/80 hover:text-[#ff6b8a] text-lg transition-colors duration-200 select-none leading-none">♡</span>
              }
            </button>
          </div>
        </div>
      </div>

      <div className="px-3.5 py-2.5">
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#d97706]">
          {recipes.category}
        </span>
      </div>
    </div>
  )
}

export default Card
