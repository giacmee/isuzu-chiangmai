"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Rotate3d } from "lucide-react";

export function Car360Viewer({
  frames,
  alt,
}: {
  frames: string[];
  alt: string;
}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);

  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startFrame: number;
  }>({
    active: false,
    startX: 0,
    startFrame: 0,
  });

  const safeIndex = frames.length > 0 ? frameIndex % frames.length : 0;

  // โหลดภาพทุกเฟรมล่วงหน้าเพื่อให้ลากหมุนได้ลื่นไม่กระตุก
  useEffect(() => {
    frames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [frames]);

  // หมุนอัตโนมัติเมื่อเปิด Auto-Spin
  useEffect(() => {
    if (!isAutoSpin || isDragging || frames.length <= 1) return;
    const timer = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 110);
    return () => window.clearInterval(timer);
  }, [isAutoSpin, isDragging, frames.length]);

  const stepFrame = (delta: number) => {
    if (frames.length <= 1) return;
    setIsAutoSpin(false);
    setFrameIndex(
      (prev) => (((prev + delta) % frames.length) + frames.length) % frames.length
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (frames.length <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsAutoSpin(false);
    setIsDragging(true);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startFrame: safeIndex,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || frames.length <= 1) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const sensitivity = Math.max(8, Math.round(280 / frames.length));
    const step = Math.round(deltaX / sensitivity);
    const next =
      (((dragRef.current.startFrame + step) % frames.length) + frames.length) %
      frames.length;
    setFrameIndex(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  if (frames.length === 0) return null;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="region"
        aria-label={`ภาพหมุน 360 องศา ${alt}`}
        className="flex h-64 w-full cursor-grab touch-pan-y items-center justify-center select-none active:cursor-grabbing sm:h-80 lg:h-[360px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frames[safeIndex]}
          alt={`${alt} มุมมอง ${safeIndex + 1}/${frames.length}`}
          draggable={false}
          className="pointer-events-none max-h-full max-w-full rounded-xl object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* Controls */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => stepFrame(-1)}
          aria-label="หมุนซ้าย"
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-300 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsAutoSpin((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
            isAutoSpin
              ? "bg-[#d70015] text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {isAutoSpin ? (
            <>
              <Pause className="h-3.5 w-3.5" />
              หยุดหมุน
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              หมุนอัตโนมัติ
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => stepFrame(1)}
          aria-label="หมุนขวา"
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-300 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <span className="h-4 w-px bg-white/15" />

        <span className="inline-flex items-center gap-1 px-1.5 text-[11px] font-medium text-neutral-300">
          <Rotate3d className="h-3.5 w-3.5 text-[#d70015]" />
          360° • {safeIndex + 1}/{frames.length}
        </span>
      </div>

      <p className="mt-2 text-[11px] text-neutral-400">
        คลิกลากซ้าย-ขวา หรือปัดนิ้วเพื่อหมุนดูรอบคัน 360°
      </p>
    </div>
  );
}
