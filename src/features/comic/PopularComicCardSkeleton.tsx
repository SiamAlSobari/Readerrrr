export default function PopularComicCardSkeleton() {
  return (
    <div className="animate-pulse group relative overflow-hidden rounded-2xl bg-zinc-900">
      {/* Cover Skeleton */}
      <div className="relative h-52 bg-zinc-800">
        {/* Gradient */}
        <div className="absolute inset-0 bg-lienar-to-t from-black via-black/50 to-transparent" />

        {/* Rank Skeleton */}
        <div className="absolute left-3 top-3 h-5 w-14 rounded-full bg-zinc-700" />

        {/* Rating Skeleton */}
        <div className="absolute right-3 top-3 h-5 w-12 rounded-full bg-zinc-700" />

        {/* Bottom Title & Chapter Skeleton */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1">
          <div className="h-5 w-3/4 rounded bg-zinc-700" />
          <div className="flex justify-between">
            <div className="h-3 w-20 rounded bg-zinc-700" />
            <div className="h-3 w-6 rounded bg-zinc-700" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Stats Skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-24 rounded bg-zinc-700" />
          <div className="h-4 w-24 rounded bg-zinc-700" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-20 rounded bg-zinc-700" />
          <div className="h-4 w-14 rounded bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
