"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Calculator,
  Car,
  Wrench,
  Users,
  GitCompare,
  MapPin,
  Newspaper,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/#models", matchPrefix: "/models", label: "รุ่นรถอีซูซุ", icon: Car },
  { href: "/calculator", matchPrefix: "/calculator", label: "คำนวณค่างวด", icon: Calculator },
  { href: "/compare", matchPrefix: "/compare", label: "เปรียบเทียบรุ่นรถ", icon: GitCompare },
  { href: "/service/booking", matchPrefix: "/service", label: "นัดหมายศูนย์บริการ", icon: Wrench },
  { href: "/sales", matchPrefix: "/sales", label: "ที่ปรึกษาการขาย", icon: Users },
  { href: "/articles", matchPrefix: "/articles", label: "ข่าวสาร", icon: Newspaper },
  { href: "/branches", matchPrefix: "/branches", label: "สาขา", icon: MapPin },
];

export function Navbar({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const resolvedLogo = logoUrl ?? "/images/logo-isuzu-sala.png";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0f12]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="อีซูซุศาลาเชียงใหม่ หน้าแรก"
          className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolvedLogo}
            alt="ISUZU ศาลา เชียงใหม่"
            className="spring-transition h-10 w-auto max-w-[160px] shrink-0 object-contain duration-300 group-hover:scale-105 sm:h-11"
          />
        </Link>

        {/* Desktop Nav: กรอบไฮไลต์และตัวหนังสือขยายเด้งไปพร้อมกันเป็นชิ้นเดียว */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {NAV_LINKS.map((item) => {
            const isActive =
              item.matchPrefix === "/models"
                ? pathname?.startsWith("/models")
                : pathname?.startsWith(item.matchPrefix);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`spring-transition group relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-300 hover:scale-105 hover:bg-white/12 hover:text-white active:scale-95 xl:px-3 xl:text-sm ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-neutral-200"
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`spring-transition absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#d70015] transition-all duration-300 ${
                    isActive
                      ? "w-3/5 opacity-100"
                      : "w-0 opacity-0 group-hover:w-3/5 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href="tel:053242002"
            className="spring-transition group hidden items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:scale-105 hover:text-white xl:flex"
          >
            <Phone className="spring-transition h-4 w-4 shrink-0 text-[#d70015] duration-300 group-hover:rotate-12 group-hover:scale-110" />
            053-242-002
          </a>
          <Link
            href="/service/booking"
            className="btn-spring shrink-0 whitespace-nowrap rounded-lg bg-[#d70015] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(215,0,21,0.32)] hover:bg-[#b80012] hover:shadow-[0_8px_22px_rgba(215,0,21,0.45)] xl:px-4 xl:text-sm"
          >
            ขอใบเสนอราคา / ทดลองขับ
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="เปิดเมนู"
          aria-expanded={open}
          className="spring-transition inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-neutral-300 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-90 lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6 rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      {open && (
        <div className="animate-spring-dropdown border-t border-white/10 bg-[#0d0f12] px-4 py-4 lg:hidden">
          <div className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${idx * 35}ms` }}
                  className="animate-spring-pop spring-transition flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <Icon className="h-4 w-4 text-[#d70015]" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/service/booking"
                onClick={() => setOpen(false)}
                className="btn-spring block w-full rounded-lg bg-[#d70015] px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                นัดหมายศูนย์บริการ / ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
