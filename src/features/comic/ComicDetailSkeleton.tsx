export default function ComicDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#09090b] animate-pulse">
      <section className="border-b border-[#27272e]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
          <div className="mb-6 flex items-center justify-between border-b border-[#27272e] pb-4">
            <div className="h-10 w-36 bg-[#141418] border border-[#27272e]" />
            <div className="flex gap-2">
              <div className="h-8 w-28 bg-[#141418]" />
              <div className="h-8 w-28 bg-[#141418]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mx-auto max-w-xs border border-[#27272e] bg-[#0c0c10] p-5 space-y-3">
                <div className="aspect-3/4 w-full bg-[#141418]" />
                <div className="h-10 w-full bg-[#141418]" />
                <div className="h-12 w-full bg-[#181820]" />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-2 border-b border-[#27272e] pb-4">
                <div className="h-10 w-3/4 bg-[#141418]" />
                <div className="h-4 w-1/2 bg-[#141418]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px border border-[#27272e] bg-[#27272e]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-20 bg-[#101014]" />
                ))}
              </div>

              <div className="flex gap-2">
                <div className="h-8 w-20 bg-[#141418]" />
                <div className="h-8 w-24 bg-[#141418]" />
                <div className="h-8 w-20 bg-[#141418]" />
              </div>

              <div className="h-36 w-full border border-[#27272e] bg-[#0c0c10]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-4">
        <div className="h-8 w-48 bg-[#141418]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-[#27272e] bg-[#27272e]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 bg-[#101014]" />
          ))}
        </div>
      </section>
    </div>
  );
}
