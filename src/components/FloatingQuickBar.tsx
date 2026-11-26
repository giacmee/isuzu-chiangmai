"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  // ซ่อนในหน้า Admin และ Media Manager เพื่อไม่ให้บังการทำงาน
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/media-manager")) {
    return null;
  }

  return (
    <aside
      aria-label="เมนูลัดบริการอีซูซุ"
      className="animate-spring-slide-right fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="flex flex-col divide-y divide-white/25 rounded-l-2xl bg-gradient-to-b from-[#ef1c24] via-[#d70015] to-[#98050d] shadow-[0_12px_32px_rgba(0,0,0,0.38)] ring-1 ring-white/15">
        {QUICK_ACTIONS.map(({ href, label, sublabel, Icon }, idx) => {
          const roundedClass =
            idx === 0
              ? "rounded-tl-2xl"
              : idx === QUICK_ACTIONS.length - 1
                ? "rounded-bl-2xl"
                : "";

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`spring-transition group relative flex h-16 w-16 items-center justify-center text-white transition-all duration-300 hover:bg-black/15 active:scale-95 focus:outline-none focus-visible:bg-black/20 ${roundedClass}`}
            >
              <Icon className="spring-transition h-9 w-9 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:scale-115 group-active:scale-90" />

              {/* Slide-out Label แบบเด้งนุ่มๆ เมื่อเอาเมาส์ชี้ */}
              <span className="spring-transition pointer-events-none absolute right-[calc(100%+12px)] flex translate-x-4 scale-90 flex-col items-end whitespace-nowrap rounded-xl bg-[#0d0f12]/95 px-3.5 py-2 text-right opacity-0 shadow-xl ring-1 ring-white/15 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                <span className="font-display text-xs font-bold text-white">
                  {label}
                </span>
                <span className="text-[10px] text-neutral-300">{sublabel}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
