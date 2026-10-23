export default function PopularComicCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col border border-[#27272e] bg-[#101014]">
      <div className="flex items-center justify-between border-b border-[#27272e] bg-[#0c0c10] px-3 py-2">
        <div className="h-4 w-8 bg-[#181820]" />
        <div className="h-3 w-16 bg-[#181820]" />
        <div className="h-3 w-10 bg-[#181820]" />
      </div>
      <div className="flex gap-3.5 p-3.5">
        <div className="h-32 w-24 shrink-0 bg-[#141418] border border-[#27272e]" />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 w-4/5 bg-[#181820]" />
            <div className="h-3 w-1/3 bg-[#181820]" />
          </div>
          <div className="space-y-1.5 border-t border-[#27272e] pt-2">
            <div className="h-3 w-full bg-[#181820]" />
            <div className="h-3 w-2/3 bg-[#181820]" />
          </div>
        </div>
      </div>
    </div>
  );
}
