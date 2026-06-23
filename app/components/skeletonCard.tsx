function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-[#e8e0d4] shadow-sm">
      <div className="skeleton aspect-square w-full" />
      <div className="p-4 space-y-2 bg-white">
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-3 w-1/3 rounded-full" />
      </div>
    </div>
  )
}

export default SkeletonCard
