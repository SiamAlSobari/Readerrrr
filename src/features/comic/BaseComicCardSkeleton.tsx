export default function BaseComicCardSkeleton() {
  return (
    <div className="animate-pulse group relative rounded-2xl overflow-hidden bg-zinc-900">
      {/* Cover Skeleton */}
      <div className="relative h-64 bg-zinc-800">
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-800 to-transparent" />
        {/* Top badges skeleton */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="h-5 w-16 rounded-md bg-zinc-700" />
          <div className="h-5 w-12 rounded-md bg-zinc-700" />
        </div>
        {/* Bottom info skeleton */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="h-5 w-3/4 rounded bg-zinc-700" />
          <div className="flex justify-between">
            <div className="h-4 w-20 rounded bg-zinc-700" />
            <div className="h-4 w-6 rounded bg-zinc-700" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Genre Skeleton */}
        <div className="flex flex-wrap gap-1.5">
          <div className="h-5 w-16 rounded-md bg-zinc-700" />
          <div className="h-5 w-12 rounded-md bg-zinc-700" />
          <div className="h-5 w-10 rounded-md bg-zinc-700" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="h-4 w-24 rounded bg-zinc-700" />
          <div className="h-4 w-14 rounded bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
