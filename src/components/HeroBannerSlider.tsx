"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ResolvedHeroSlide {
  slide_key: string;
  title: string;
  subtitle: string;
  cta_label: string;
  cta_href: string;
  text_theme: "light" | "dark";
  show_overlay_text: boolean;
  mediaUrl?: string;
  mediaMimeType?: string;
  youtubeId?: string;
  fallbackCarImg?: string;
}

export function HeroBannerSlider({
  slides,
  autoSlide,
  autoSlideInterval,
}: {
  slides: ResolvedHeroSlide[];
  autoSlide: boolean;
  autoSlideInterval: number;
}) {
  const count = slides.length;
  const hasMultiple = count > 1;
  // ต่อสไลด์แรกไว้ท้ายสุดเพื่อให้เลื่อนวนซ้ำลื่นไหลไร้รอยต่อ
  const renderedSlides = hasMultiple ? [...slides, slides[0]] : slides;

  const [trackIndex, setTrackIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    pointerId: number;
  }>({
    active: false,
    startX: 0,
    pointerId: -1,
  });

  const activeIndex = count > 0 ? trackIndex % count : 0;

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => (prev >= count ? count : prev + 1));
  }, [hasMultiple, count]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => (prev <= 0 ? count - 1 : prev - 1));
  }, [hasMultiple, count]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!hasMultiple) return;
      setIsTransitioning(true);
      setTrackIndex(index);
    },
    [hasMultiple]
  );

  // รีเซ็ตจากสไลด์ตัวโคลนท้ายสุดกลับมา index 0 แบบไร้รอยต่อ
  const handleTrackTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    if (hasMultiple && trackIndex >= count) {
      setIsTransitioning(false);
      setTrackIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  // เลื่อนอัตโนมัติ (เมื่อเปิดใช้งานใน Payload CMS)
  useEffect(() => {
    if (!autoSlide || !hasMultiple || isHovered || isDragging) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      goNext();
    }, autoSlideInterval);

    return () => window.clearInterval(timer);
  }, [autoSlide, autoSlideInterval, hasMultiple, isHovered, isDragging, goNext]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("a, button")) return;

    dragRef.current = {
      active: true,
      startX: e.clientX,
      pointerId: e.pointerId,
    };
    setIsDragging(true);
    setIsTransitioning(false);
    setDragOffsetPx(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    setDragOffsetPx(e.clientX - dragRef.current.startX);
  };

  const finishDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const delta = dragOffsetPx;
    setIsDragging(false);
    setDragOffsetPx(0);
    setIsTransitioning(true);

    if (delta <= -50) {
      goNext();
    } else if (delta >= 50) {
      goPrev();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!hasMultiple) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  if (count === 0) return null;

  return (
    <section
      aria-label="แบนเนอร์แนะนำรุ่นรถและโปรโมชั่น"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        finishDrag();
      }}
      className="bg-white pt-3 pb-3 focus:outline-none sm:pt-4 sm:pb-5"
    >
      {/* Peeking Container: ชิดซ้ายตามระยะขอบและให้สไลด์ถัดไปแง้มขอบขวาแบบ honda.co.th */}
      <div className="relative overflow-hidden pl-3 pr-3 sm:pl-6 sm:pr-0">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            transform: `translate3d(calc(${trackIndex} * -1 * var(--slide-step) + ${dragOffsetPx}px), 0, 0)`,
            transition: isTransitioning
              ? "transform 720ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
          className="flex w-full touch-pan-y select-none [--slide-step:100%] md:[--slide-step:94.5%]"
        >
          {renderedSlides.map((slide, idx) => {
            const isSlideActive = idx === trackIndex;
            const isLightText = slide.text_theme !== "dark";
            const isVideo = Boolean(slide.mediaMimeType?.startsWith("video/"));

            return (
              <div
                key={`${slide.slide_key}-${idx}`}
                className="w-[var(--slide-step)] shrink-0 pr-0 sm:pr-5"
              >
                <div className="relative h-[430px] w-full overflow-hidden rounded-xl bg-[#0d0f12] shadow-[0_12px_36px_rgba(13,15,18,0.14)] sm:h-[480px] sm:rounded-2xl md:h-[45vw] md:min-h-[440px] md:max-h-[630px]">
                  {/* Background Media Layer */}
                  {isVideo && slide.mediaUrl ? (
                    <video
                      src={slide.mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    />
                  ) : slide.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${slide.youtubeId}&controls=0&rel=0&playsinline=1&modestbranding=1`}
                      title={slide.title || "ISUZU Banner Video"}
                      allow="autoplay; encrypted-media"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
                    />
                  ) : slide.mediaUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.mediaUrl}
                      alt={slide.title || "แบนเนอร์อีซูซุศาลาเชียงใหม่"}
                      draggable={false}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    /* Studio Fallback Background + Car Cutout when wide banner is not uploaded yet */
                    <>
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            slide.text_theme === "dark"
                              ? "radial-gradient(circle at 75% 45%, #ffffff 0%, #e5e7eb 55%, #d1d5db 100%)"
                              : "radial-gradient(circle at 78% 35%, rgba(215,0,21,0.38) 0%, rgba(24,28,34,0.9) 48%, #0d0f12 100%)",
                        }}
                      />
                      {slide.fallbackCarImg && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex h-[62%] items-end justify-center px-6 md:inset-y-0 md:right-8 md:left-auto md:h-full md:w-[62%] md:items-center md:justify-end">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={slide.fallbackCarImg}
                            alt={slide.title}
                            draggable={false}
                            className="max-h-full max-w-full object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.55)]"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Readability Scrim */}
                  {slide.show_overlay_text && (
                    <div
                      className={`pointer-events-none absolute inset-0 ${
                        isLightText
                          ? "bg-gradient-to-br from-[#0d0f12]/80 via-[#0d0f12]/35 to-transparent"
                          : "bg-gradient-to-br from-white/75 via-white/25 to-transparent"
                      }`}
                    />
                  )}

                  {/* Top-Left Overlay Title, Subtitle & Ghost CTA (Honda Style) */}
                  {slide.show_overlay_text && (
                    <div
                      className={`relative z-20 max-w-xl px-6 pt-7 sm:px-12 sm:pt-10 lg:px-16 lg:pt-12 transition-all duration-500 ease-out ${
                        isSlideActive
                          ? "translate-y-0 opacity-100 delay-150"
                          : "translate-y-3 opacity-0"
                      } ${isLightText ? "text-white" : "text-[#111317]"}`}
                    >
                      {slide.title.trim() !== "" && (
                        <h1 className="font-display text-2xl font-normal tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[1.15]">
                          {slide.title}
                        </h1>
                      )}
                      {slide.subtitle.trim() !== "" && (
                        <p
                          className={`mt-2 text-sm font-normal leading-relaxed sm:text-lg lg:text-xl ${
                            isLightText ? "text-white/90" : "text-[#111317]/85"
                          }`}
                        >
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.cta_label.trim() !== "" && (
                        <Link
                          href={slide.cta_href || "/#models"}
                          className={`mt-5 inline-flex items-center justify-center rounded-md border px-7 py-2.5 text-sm font-normal backdrop-blur-xs transition-all duration-300 ${
                            isLightText
                              ? "border-white/75 bg-black/15 text-white hover:border-white hover:bg-white hover:text-[#111317]"
                              : "border-[#111317]/65 bg-white/30 text-[#111317] hover:border-[#111317] hover:bg-[#111317] hover:text-white"
                          }`}
                        >
                          {slide.cta_label}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Invisible Right-Edge Peek Click Zone (คลิกขอบขวาเพื่อเลื่อนถัดไปเหมือน Honda) */}
        {hasMultiple && (
          <button
            type="button"
            onClick={goNext}
            aria-label="เลื่อนไปสไลด์ถัดไป"
            className="group absolute top-0 right-0 bottom-0 z-30 hidden w-[5.5%] cursor-pointer items-center justify-center focus:outline-none md:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white opacity-0 shadow-lg backdrop-blur-xs transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
              <ChevronRight className="h-5 w-5" />
            </span>
          </button>
        )}

        {/* Subtle Left Edge Hover Arrow for going back */}
        {hasMultiple && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="ย้อนกลับสไลด์ก่อนหน้า"
            className="group absolute top-0 bottom-0 left-3 z-30 hidden w-12 cursor-pointer items-center justify-center focus:outline-none sm:left-6 md:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white opacity-0 shadow-lg backdrop-blur-xs transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
              <ChevronLeft className="h-5 w-5" />
            </span>
          </button>
        )}

        {/* Pill + Dots Pagination: มุมขวาบนบนเดสก์ท็อป / มุมซ้ายล่างบนมือถือ */}
        {hasMultiple && (
          <div
            role="tablist"
            aria-label="ตัวเลือกสไลด์แบนเนอร์"
            className="absolute bottom-5 left-7 z-30 flex items-center gap-2.5 md:top-8 md:right-[8.5%] md:bottom-auto md:left-auto"
          >
            {slides.map((slide, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={slide.slide_key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`สไลด์ที่ ${idx + 1}: ${slide.title}`}
                  onClick={() => goToSlide(idx)}
                  className="cursor-pointer py-2 -my-2 focus:outline-none"
                >
                  <span
                    className={`block h-[5px] rounded-full transition-all duration-300 ${
                      active
                        ? "w-9 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
                        : "w-[5px] bg-white/75 hover:bg-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
