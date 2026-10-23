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
      setCurrentSrc(fallbackSrc);
      return;
    }

    if (retryCount < 3) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);
      setIsRetrying(true);

      setTimeout(() => {
        const cacheBuster = `?retry=${Date.now()}`;
        const base = fallbackSrc || src;
        const newUrl = base.includes("?")
          ? `${base}&retry=${Date.now()}`
          : `${base}${cacheBuster}`;
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
    const newUrl = base.includes("?")
      ? `${base}&manualRetry=${Date.now()}`
      : `${base}${cacheBuster}`;
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
    <div className="relative flex w-full flex-col items-center justify-center bg-[#09090b] min-h-[300px] [content-visibility:auto] [contain-intrinsic-size:auto_800px_1200px]">
      {!loaded && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#0c0c10] p-6 font-mono text-xs uppercase text-[#c8c2b6] tabular-nums">
          <div className="h-6 w-6 animate-spin border-2 border-[#be123c] border-t-transparent" />
          <span>
            {isRetrying
              ? `MEMUAT ULANG HAL. ${pageNumber}...`
              : `MEMUAT HAL. ${pageNumber}...`}
          </span>
        </div>
      )}

      {error && (
        <div className="my-4 flex w-full flex-col items-center justify-center gap-3 border border-[#be123c]/40 bg-[#0c0c10] py-16 px-4 text-center">
          <AlertCircle className="h-9 w-9 text-[#f43f5e]" />
          <div>
            <p className="font-mono text-xs font-bold uppercase text-[#f4f1ea] tabular-nums">
              Gagal Memuat Lembaran Halaman {pageNumber}
            </p>
            <p className="mt-1 text-xs text-[#c8c2b6]">
              Koneksi terputus atau server gambar sedang padat.
            </p>
          </div>
          <button
            type="button"
            onClick={handleManualRetry}
            className="mt-2 inline-flex min-h-10 items-center gap-2 bg-[#be123c] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`}
            />
            <span>Muat Ulang Halaman</span>
          </button>
        </div>
      )}

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
          className={`block h-auto w-full object-contain select-none transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

export const ChapterImage = memo(ChapterImageComponent);
