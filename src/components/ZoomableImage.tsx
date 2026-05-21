"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.0;
const WHEEL_STEP = 0.05;

export type GalleryItem = { src: string; alt: string };

type Props = ImageProps & {
  /** 包住觸發按鈕的額外 className，方便維持父層原本的尺寸／圓角等 */
  wrapperClassName?: string;
  /** 若傳入多張，會在燈箱顯示左右箭頭可切換 */
  gallery?: GalleryItem[];
  /** 點擊這張圖在 gallery 中的索引（預設 0） */
  galleryIndex?: number;
};

export default function ZoomableImage({
  wrapperClassName,
  gallery,
  galleryIndex,
  ...imageProps
}: Props) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [currentIdx, setCurrentIdx] = useState(galleryIndex ?? 0);
  const modalRef = useRef<HTMLDivElement>(null);

  const galleryLen = gallery?.length ?? 0;
  const hasGallery = galleryLen > 1;

  const close = useCallback(() => setOpen(false), []);

  const goPrev = useCallback(() => {
    if (!hasGallery) return;
    setCurrentIdx((i) => (i - 1 + galleryLen) % galleryLen);
  }, [hasGallery, galleryLen]);

  const goNext = useCallback(() => {
    if (!hasGallery) return;
    setCurrentIdx((i) => (i + 1) % galleryLen);
  }, [hasGallery, galleryLen]);

  // 開啟時把索引重設回被點擊的那張、scale 歸位
  useEffect(() => {
    if (open) {
      setCurrentIdx(galleryIndex ?? 0);
      setScale(MIN_SCALE);
    }
  }, [open, galleryIndex]);

  // 切換到不同張時把 scale 歸位
  useEffect(() => {
    if (open) setScale(MIN_SCALE);
  }, [currentIdx, open]);

  // 鍵盤 / 滾輪 / body scroll lock
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const modal = modalRef.current;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? WHEEL_STEP : -WHEEL_STEP;
      setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)));
    };
    modal?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      modal?.removeEventListener("wheel", onWheel);
    };
  }, [open, close, goPrev, goNext]);

  const inlineSrcStr =
    typeof imageProps.src === "string"
      ? imageProps.src
      : typeof imageProps.src === "object" && "src" in imageProps.src
        ? imageProps.src.src
        : "";

  const currentItem: GalleryItem = hasGallery
    ? gallery![currentIdx]
    : { src: inlineSrcStr, alt: imageProps.alt };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`放大圖片：${imageProps.alt}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={[
          "relative block h-full w-full cursor-zoom-in",
          wrapperClassName ?? "",
        ].join(" ")}
      >
        <Image {...imageProps} />
      </div>

      {open && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          {/* 關閉鈕 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="關閉放大圖片"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <span aria-hidden className="text-lg leading-none">
              ✕
            </span>
          </button>

          {/* 左右箭頭（只有多張時才顯示） */}
          {hasGallery && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="上一張"
                className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:left-6 md:h-12 md:w-12"
              >
                <span aria-hidden className="text-2xl leading-none">
                  ‹
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="下一張"
                className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-6 md:h-12 md:w-12"
              >
                <span aria-hidden className="text-2xl leading-none">
                  ›
                </span>
              </button>

              {/* 索引指示器 */}
              <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {currentIdx + 1} / {galleryLen}
              </div>
            </>
          )}

          {/* 圖片容器 */}
          <div
            style={{
              width: `${scale * 180}vw`,
              height: `${scale * 180}vh`,
            }}
            className="pointer-events-none flex items-center justify-center transition-[width,height] duration-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentItem.src}
              src={currentItem.src}
              alt={currentItem.alt}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto max-h-full max-w-full select-none object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
