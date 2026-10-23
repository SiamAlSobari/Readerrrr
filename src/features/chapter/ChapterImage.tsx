import { useState, useEffect, memo } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";

type Props = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  pageNumber: number;
  priority?: boolean;
  onLoadSuccess?: () => void;
};

function ChapterImageComponent({
  src,
  fallbackSrc,
  alt,
  pageNumber,
  priority = false,
  onLoadSuccess,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setError(false);
    setRetryCount(0);
  }, [src]);

  const handleImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      console.warn(`[ChapterImage] Page ${pageNumber} primary URL failed. Switching to fallback.`);
      setCurrentSrc(fallbackSrc);
      return;
    }

    if (retryCount < 3) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);
      setIsRetrying(true);
      console.warn(`[ChapterImage] Page ${pageNumber} load error. Auto retry ${nextRetry}/3...`);

      setTimeout(() => {
        const cacheBuster = `?retry=${Date.now()}`;
        const base = fallbackSrc || src;
        const newUrl = base.includes("?") ? `${base}&retry=${Date.now()}` : `${base}${cacheBuster}`;
        setCurrentSrc(newUrl);
        setIsRetrying(false);
      }, 1000 * nextRetry);
    } else {
      setError(true);
      setLoaded(false);
      setIsRetrying(false);
    }
  };

  const handleManualRetry = () => {
    setError(false);
    setLoaded(false);
    setRetryCount(0);
    setIsRetrying(true);
    const cacheBuster = `?manualRetry=${Date.now()}`;
    const base = fallbackSrc || src;
    const newUrl = base.includes("?") ? `${base}&manualRetry=${Date.now()}` : `${base}${cacheBuster}`;
    setCurrentSrc(newUrl);
    setTimeout(() => setIsRetrying(false), 500);
  };

  const handleImageLoad = () => {
    setLoaded(true);
    setError(false);
    setIsRetrying(false);
    if (onLoadSuccess) onLoadSuccess();
  };

  return (
    <div
      className="relative w-full bg-zinc-950 flex flex-col items-center justify-center min-h-[300px] [content-visibility:auto] [contain-intrinsic-size:auto_800px_1200px]"
    >
      {/* Skeleton / Loading indicator */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/60 text-zinc-400 gap-2 p-6 z-10">
          <div className="w-7 h-7 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium text-zinc-400">
            {isRetrying ? `Mencoba ulang hal. ${pageNumber}...` : `Memuat hal. ${pageNumber}...`}
          </span>
        </div>
      )}

      {/* Error Retry Fallback UI */}
      {error && (
        <div className="w-full py-16 px-4 bg-zinc-900/90 border border-red-500/20 rounded-xl my-4 flex flex-col items-center justify-center text-center gap-3">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <div>
            <p className="text-sm font-semibold text-zinc-200">Gagal memuat gambar halaman {pageNumber}</p>
            <p className="text-xs text-zinc-500 mt-1">Koneksi terputus atau server gambar sibuk.</p>
          </div>
          <button
            onClick={handleManualRetry}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
            Coba Muat Ulang
          </button>
        </div>
      )}

      {/* Actual Image */}
      {!error && (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`
            w-full
            h-auto
            block
            object-contain
            select-none
            transition-opacity
            duration-200
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />
      )}
    </div>
  );
}

export const ChapterImage = memo(ChapterImageComponent);
