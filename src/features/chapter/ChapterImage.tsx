import { useState } from "react"

type Props = {
  src: string
  alt: string
  priority?: boolean
}

export function ChapterImage({ src, alt, priority }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full bg-black">
      {/* Skeleton */}
      {!loaded && (
        <div className="w-full aspect-3/4 bg-white/10 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setLoaded(true)}
        className={`
          w-full
          block
          object-contain
          select-none
          transition-opacity
          duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  )
}
