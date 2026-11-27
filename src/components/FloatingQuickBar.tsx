"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";

function SteeringWheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="4.2" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path
        d="M8.5 20.5C13.5 18.5 18.5 18 24 18C29.5 18 34.5 18.5 39.5 20.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M24 28V40"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M19.5 24.5L9.5 22.5M28.5 24.5L38.5 22.5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CarBahtIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Car body */}
      <path
        d="M10 27L13.5 19.5C14.2 18 15.6 17 17.3 17H24.5C24.2 18.1 24 19.3 24 20.5C24 24.6 26.8 28.1 30.6 29.1H37.8C38.5 29.9 39 31 39 32.2V36C39 37.1 38.1 38 37 38H34.5C33.4 38 32.5 37.1 32.5 36V35H15.5V36C15.5 37.1 14.6 38 13.5 38H11C9.9 38 9 37.1 9 36V31.5C9 29.8 9.4 28.2 10 27Z"
        fill="currentColor"
      />
      {/* Headlights cutout feel */}
      <rect x="13" y="29" width="4.5" height="2.4" rx="1.2" fill="#B80A12" />
      <rect x="30.5" y="29" width="4.5" height="2.4" rx="1.2" fill="#B80A12" />
      {/* Side mirrors */}
      <path d="M7.5 24.5H11.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      {/* Windshield cutout */}
      <path
        d="M15.6 20.2L13.6 25H26.5C25.3 23.6 24.5 21.9 24.3 20H17.2C16.5 20 15.9 20.1 15.6 20.2Z"
        fill="#B80A12"
      />
      {/* Baht Coin Badge */}
      <circle cx="33.5" cy="17.5" r="8.5" fill="#B80A12" stroke="currentColor" strokeWidth="2.6" />
      <text
        x="33.5"
        y="21.5"
        textAnchor="middle"
        fill="currentColor"
        fontSize="11.5"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        ฿
      </text>
    </svg>
  );
}

function QuoteTableDocIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13 8H29L37 16V38C37 39.6569 35.6569 41 34 41H13C11.3431 41 10 39.6569 10 38V11C10 9.34315 11.3431 8 13 8Z"
        fill="currentColor"
      />
      <path d="M29 8V16H37L29 8Z" fill="#9B060D" fillOpacity="0.45" />
      {/* Top lines */}
      <rect x="14.5" y="14.5" width="7" height="2.2" rx="1" fill="#A80710" />
      <rect x="14.5" y="19" width="11" height="2.2" rx="1" fill="#A80710" />
      {/* Spec/Quotation Table */}
      <rect
        x="14.5"
        y="24"
        width="18"
        height="12.5"
        rx="1.2"
        stroke="#A80710"
        strokeWidth="2"
      />
      <line x1="14.5" y1="28.2" x2="32.5" y2="28.2" stroke="#A80710" strokeWidth="1.8" />
      <line x1="14.5" y1="32.3" x2="32.5" y2="32.3" stroke="#A80710" strokeWidth="1.8" />
      <line x1="25.5" y1="24" x2="25.5" y2="36.5" stroke="#A80710" strokeWidth="1.8" />
    </svg>
  );
}

const QUICK_ACTIONS = [
  {
    href: "/service/booking",
    label: "นัดทดลองขับ",
    sublabel: "Test Drive / ขอใบเสนอราคา",
    Icon: SteeringWheelIcon,
  },
  {
    href: "/calculator",
    label: "คำนวณค่างวด",
    sublabel: "เช็กเงินดาวน์และค่างวด",
    Icon: CarBahtIcon,
  },
  {
    href: "/compare",
    label: "เปรียบเทียบรุ่นรถ",
    sublabel: "เทียบสเปคและราคา 3 รุ่น",
    Icon: QuoteTableDocIcon,
  },
] as const;

export function FloatingQuickBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleOpen = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const handleDelayedClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  // ซ่อนในหน้า Admin และ Media Manager เพื่อไม่ให้บังการทำงาน
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/media-manager")) {
    return null;
  }

  return (
    <aside
      aria-label="เมนูลัดบริการอีซูซุ"
      onMouseEnter={handleOpen}
      onMouseLeave={handleDelayedClose}
      onFocus={handleOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          handleDelayedClose();
        }
      }}
      className={`animate-spring-slide-right fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 md:block ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Soft ambient red glow behind dock when expanded */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-2 right-0 w-20 rounded-l-full bg-[#d70015]/30 blur-2xl transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slim Peeking Edge Tab Handle (ชิดขอบขวาพอดี และซ่อนเก็บเมื่อแผงกางออก) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="เปิดเมนูลัดบริการอีซูซุ"
        aria-expanded={isOpen}
        tabIndex={isOpen ? -1 : 0}
        className={`absolute right-0 top-1/2 z-20 flex h-24 w-6 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-l-2xl bg-gradient-to-b from-[#ef1c24] via-[#d70015] to-[#98050d] text-white shadow-[-6px_8px_22px_rgba(0,0,0,0.28)] ring-1 ring-white/20 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:w-7 focus:outline-none ${
          isOpen
            ? "pointer-events-none translate-x-3 opacity-0"
            : "pointer-events-auto translate-x-0 opacity-100"
        }`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        />
        <ChevronLeft className="h-4 w-4" />
        <span
          aria-hidden="true"
          className="h-4 w-[2px] rounded-full bg-white/50"
        />
      </button>

      {/* Expandable 3-Action Dock (กางออกชิดขอบขวาพอดี 64px ไม่มีแท็บซ้อน) */}
      <div
        className={`relative z-10 w-16 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <div className="flex w-16 flex-col divide-y divide-white/25 rounded-l-2xl bg-gradient-to-b from-[#ef1c24] via-[#d70015] to-[#98050d] shadow-[0_14px_34px_rgba(0,0,0,0.4)] ring-1 ring-white/20">
          {QUICK_ACTIONS.map(({ href, label, sublabel, Icon }, idx) => {
            const roundedClass =
              idx === 0
                ? "rounded-tl-2xl"
                : idx === QUICK_ACTIONS.length - 1
                  ? "rounded-bl-2xl"
                  : "";
            const staggerDelay = isOpen ? `${50 + idx * 55}ms` : "0ms";

            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                tabIndex={isOpen ? 0 : -1}
                style={{ transitionDelay: staggerDelay }}
                className={`group/item relative flex h-16 w-16 items-center justify-center text-white transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-black/15 active:scale-95 focus:outline-none focus-visible:bg-black/20 ${
                  isOpen
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-x-4 scale-90 opacity-0"
                } ${roundedClass}`}
              >
                <Icon className="spring-transition h-9 w-9 transition-transform duration-300 group-hover/item:-translate-x-0.5 group-hover/item:scale-115 group-active/item:scale-90" />

                {/* Slide-out Label แบบเด้งนุ่มๆ เมื่อเอาเมาส์ชี้แต่ละไอคอน */}
                <span className="spring-transition pointer-events-none absolute right-[calc(100%+14px)] flex translate-x-4 scale-90 flex-col items-end whitespace-nowrap rounded-xl bg-[#0d0f12]/95 px-3.5 py-2 text-right opacity-0 shadow-xl ring-1 ring-white/15 backdrop-blur-md transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:scale-100 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:scale-100 group-focus-visible/item:opacity-100">
                  <span className="font-display text-xs font-bold text-white">
                    {label}
                  </span>
                  <span className="text-[10px] text-neutral-300">{sublabel}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
