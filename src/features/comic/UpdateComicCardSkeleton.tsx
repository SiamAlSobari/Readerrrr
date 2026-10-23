export default function UpdateComicCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="animate-pulse flex gap-3 border border-[#27272e] bg-[#101014] p-2.5">
        <div className="h-20 w-15 shrink-0 bg-[#141418] border border-[#27272e]" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 w-1/2 bg-[#181820]" />
          <div className="h-4 w-4/5 bg-[#181820]" />
          <div className="h-3 w-2/3 bg-[#181820]" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse flex gap-3.5 border border-[#27272e] bg-[#101014] p-3">
      <div className="h-28 w-20 shrink-0 bg-[#141418] border border-[#27272e]" />
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-14 bg-[#181820]" />
            <div className="h-3 w-12 bg-[#181820]" />
          </div>
          <div className="h-4 w-3/4 bg-[#181820]" />
          <div className="h-3 w-1/3 bg-[#181820]" />
        </div>
        <div className="flex justify-between border-t border-[#27272e] pt-2">
          <div className="h-3 w-20 bg-[#181820]" />
          <div className="h-3 w-14 bg-[#181820]" />
        </div>
      </div>
    </div>
  );
}
