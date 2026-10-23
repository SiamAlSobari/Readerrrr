export default function BaseComicCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col border border-[#27272e] bg-[#101014]">
      <div className="flex items-center justify-between border-b border-[#27272e] bg-[#0c0c10] px-2.5 py-2">
        <div className="h-3 w-16 bg-[#181820]" />
        <div className="h-3 w-8 bg-[#181820]" />
      </div>
      <div className="aspect-3/4 w-full bg-[#141418]" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-4/5 bg-[#181820]" />
        <div className="h-3 w-2/3 bg-[#181820]" />
        <div className="pt-2 border-t border-[#27272e] flex gap-1">
          <div className="h-4 w-12 bg-[#181820]" />
          <div className="h-4 w-12 bg-[#181820]" />
        </div>
      </div>
    </div>
  );
}
