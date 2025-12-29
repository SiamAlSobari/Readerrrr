export default function ComicDetailSkeleton() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden animate-pulse">
      {/* Background cover */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-indigo-900 to-black" />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent z-10" />

      {/* Main content */}
      <div className="relative z-20 flex flex-col md:flex-row gap-6 p-4 sm:p-6 md:p-10">
        {/* Portrait Skeleton */}
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="w-40 sm:w-52 md:w-64 h-80 md:h-96 bg-zinc-800 rounded-2xl" />
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 flex flex-col justify-between gap-4 md:gap-6 space-y-4">
          <div className="space-y-2 md:space-y-3">
            <div className="h-8 w-3/4 bg-zinc-700 rounded" />
            <div className="h-4 w-1/2 bg-zinc-700 rounded" />

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="h-4 w-12 bg-zinc-700 rounded" />
              <div className="h-4 w-12 bg-zinc-700 rounded" />
              <div className="h-4 w-12 bg-zinc-700 rounded" />
            </div>

            {/* Genres */}
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-12 bg-zinc-700 rounded-full" />
              <div className="h-5 w-10 bg-zinc-700 rounded-full" />
              <div className="h-5 w-14 bg-zinc-700 rounded-full" />
            </div>

            {/* Synopsis */}
            <div className="h-24 bg-zinc-700 rounded" />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="h-12 w-48 bg-zinc-700 rounded-lg" />
            <div className="h-12 w-36 bg-zinc-700 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Chapter List Skeleton */}
      <section className="mx-auto mt-16 max-w-7xl px-4 space-y-4">
        <div className="h-8 w-40 bg-zinc-700 rounded" /> {/* Title */}

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-5 rounded-xl bg-zinc-800/50 p-4"
          >
            <div className="h-20 w-32 bg-zinc-700 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 bg-zinc-700 rounded" />
              <div className="h-3 w-1/3 bg-zinc-700 rounded" />
            </div>
            <div className="h-4 w-16 bg-zinc-700 rounded" />
          </div>
        ))}

        {/* Pagination Skeleton */}
        <div className="mt-10 mb-10 flex flex-wrap items-center justify-center gap-4">
          <div className="h-10 w-20 bg-zinc-700 rounded-lg" />
          <div className="h-10 w-36 bg-zinc-700 rounded-lg" />
          <div className="h-10 w-20 bg-zinc-700 rounded-lg" />
        </div>
      </section>
    </section>
  )
}
