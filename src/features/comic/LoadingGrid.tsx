import BaseComicCardSkeleton from "@/features/comic/BaseComicCardSkeleton";

export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <BaseComicCardSkeleton key={i} />
      ))}
    </div>
  );
}
