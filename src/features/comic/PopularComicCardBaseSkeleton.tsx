export function PopularComicCardBaseSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl bg-background border p-4 animate-pulse">
      
      {/* Cover Skeleton */}
      <div className="relative w-24 shrink-0 overflow-hidden rounded-lg bg-gray-300 h-36" />

      {/* Content Skeleton */}
      <div className="flex flex-col justify-between flex-1">
        
        {/* Top Skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded" /> {/* Title */}
          <div className="h-4 w-full bg-gray-200 rounded" /> {/* Desc line 1 */}
          <div className="h-4 w-5/6 bg-gray-200 rounded" /> {/* Desc line 2 */}
          
          {/* Info line */}
          <div className="flex items-center gap-2 mt-1">
            <div className="h-3 w-6 bg-gray-300 rounded" />
            <div className="h-3 w-1 bg-gray-300 rounded" />
            <div className="h-3 w-6 bg-gray-300 rounded" />
            <div className="h-3 w-1 bg-gray-300 rounded" />
            <div className="h-3 w-14 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Bottom Skeleton */}
        <div className="flex items-center justify-between pt-2">
          
          {/* Stats Skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-3 w-10 bg-gray-300 rounded" />
            <div className="h-3 w-10 bg-gray-300 rounded" />
            <div className="h-3 w-8 bg-gray-300 rounded" />
          </div>

          {/* Latest Chapter Skeleton */}
          <div className="h-3 w-6 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  )
}
