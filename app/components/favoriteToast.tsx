'use client'

import { useEffect, useState } from "react"

type FavoriteToastProps = {
  recipeName: string
  onDone: () => void
}

export function FavoriteToast({ recipeName, onDone }: FavoriteToastProps) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setExiting(true), 1500)
    const doneTimer = setTimeout(() => onDone(), 1800)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`bg-white border border-[#e8e0d4] rounded-2xl px-10 py-7 flex flex-col items-center gap-3 shadow-2xl shadow-black/10 ${exiting ? "toast-exit" : "toast-enter"}`}
      >
        <span className="text-5xl leading-none heart-pulse select-none text-[#e53e5a]">♥</span>
        <p className="text-[#1a1208] font-semibold text-base tracking-wide">
          ¡Agregado a favoritos!
        </p>
        <p className="text-[#b5a898] text-xs text-center max-w-45 truncate">
          {recipeName}
        </p>
      </div>
    </div>
  )
}
