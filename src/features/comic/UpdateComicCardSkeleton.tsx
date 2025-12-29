export default function UpdateComicCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="animate-pulse relative flex gap-3 p-3 bg-zinc-900/50 rounded-xl">
        <div className="relative w-20 h-28 shrink-0 bg-zinc-800 rounded-lg" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 w-3/4 bg-zinc-700 rounded" />
          <div className="h-3 w-full bg-zinc-700 rounded" />
          <div className="flex justify-between mt-2">
            <div className="h-4 w-20 bg-zinc-700 rounded" />
            <div className="h-4 w-12 bg-zinc-700 rounded" />
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="animate-pulse relative overflow-hidden rounded-xl bg-zinc-900 p-4">
      <div className="flex gap-4">
        {/* Image section */}
        <div className="relative w-28 h-40 shrink-0 bg-zinc-800 rounded-lg" />

        {/* Content section */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title */}
          <div className="space-y-1">
            <div className="h-5 w-3/4 bg-zinc-700 rounded" />
            <div className="h-3 w-1/2 bg-zinc-700 rounded" />
          </div>

          {/* Description */}
          <div className="h-12 bg-zinc-700 rounded" />

          {/* Stats row */}
          <div className="flex flex-wrap gap-4">
            <div className="h-4 w-20 bg-zinc-700 rounded" />
            <div className="h-4 w-20 bg-zinc-700 rounded" />
            <div className="h-4 w-20 bg-zinc-700 rounded" />
          </div>

          {/* Genre tags */}
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-zinc-700 rounded-md" />
            <div className="h-5 w-10 bg-zinc-700 rounded-md" />
            <div className="h-5 w-14 bg-zinc-700 rounded-md" />
          </div>

          {/* Bottom info row */}
          <div className="flex justify-between pt-2 border-t border-gray-800/50">
            <div className="flex gap-3">
              <div className="h-5 w-20 bg-zinc-700 rounded-full" />
              <div className="h-5 w-14 bg-zinc-700 rounded-full" />
            </div>
            <div className="h-5 w-14 bg-zinc-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
