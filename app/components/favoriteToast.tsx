'use client'

import { useEffect, useState } from "react"

type FavoriteToastProps = {
  recipeName: string
  onDone: () => void
}

type Particle = { id: number; dx: string; dy: string; rot: string; delay: string }

function makeParticles(): Particle[] {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const dist = 52 + Math.random() * 40
    return {
      id: i,
      dx: `${(Math.cos(angle) * dist).toFixed(1)}px`,
      dy: `${(Math.sin(angle) * dist - 18).toFixed(1)}px`,
      rot: `${Math.round((Math.random() - 0.5) * 260)}deg`,
      delay: `${(i * 0.05).toFixed(3)}s`,
    }
  })
}

export function FavoriteToast({ recipeName, onDone }: FavoriteToastProps) {
  const [exiting, setExiting] = useState(false)
  const [particles] = useState<Particle[]>(makeParticles)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 1600)
    const t2 = setTimeout(() => onDone(), 2060)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`relative bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-3 ${exiting ? "toast-exit" : "toast-enter"}`}
        style={{
          border: "1px solid #e8e0d4",
          boxShadow: "0 40px 80px rgba(0,0,0,0.13), 0 0 0 1px rgba(249,115,22,0.08), 0 10px 40px rgba(249,115,22,0.12)",
        }}
      >
        <div className="relative">
          {particles.map((p) => (
            <span
              key={p.id}
              className="heart-particle text-[#e53e5a]"
              style={{ "--dx": p.dx, "--dy": p.dy, "--rot": p.rot, "--delay": p.delay } as React.CSSProperties}
            >
              ♥
            </span>
          ))}
          <span className="text-5xl leading-none heart-pulse select-none text-[#e53e5a] block relative z-10">♥</span>
        </div>
        <p className="text-[#1a1208] font-semibold text-base tracking-wide">Added to favorites!</p>
        <p className="text-[#b5a898] text-xs text-center max-w-45 truncate">{recipeName}</p>
      </div>
    </div>
  )
}
