"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Calculator, Car, Wrench, Users, GitCompare, MapPin, Newspaper } from "lucide-react";

const NAV_LINKS = [
  { href: "/#models", label: "รุ่นรถอีซูซุ", icon: Car },
  { href: "/calculator", label: "คำนวณค่างวด", icon: Calculator },
  { href: "/compare", label: "เปรียบเทียบรุ่นรถ", icon: GitCompare },
  { href: "/service/booking", label: "นัดหมายศูนย์บริการ", icon: Wrench },
  { href: "/sales", label: "ที่ปรึกษาการขาย", icon: Users },
  { href: "/articles", label: "ข่าวสาร", icon: Newspaper },
  { href: "/branches", label: "สาขา", icon: MapPin },
];

export function Navbar({ logoUrl }: { logoUrl?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0f12]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt="ISUZU อีซูซุศาลาเชียงใหม่"
              className="h-8 w-auto max-w-[120px] shrink-0 object-contain"
            />
          ) : (
            <span className="font-display text-2xl font-extrabold tracking-tight text-[#d70015]">
              ISUZU
            </span>
          )}
          <span className="hidden h-5 w-px bg-white/20 sm:block" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-white">
              อีซูซุศาลาเชียงใหม่
            </span>
            <span className="hidden whitespace-nowrap text-[10px] text-neutral-400 xl:block">
              Authorized Dealer &amp; Service
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-3.5 lg:flex xl:gap-5">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap text-[13px] font-medium text-neutral-200 transition-colors hover:text-white xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href="tel:053242002"
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-neutral-300 hover:text-white xl:flex"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#d70015]" />
            053-242-002
          </a>
          <Link
            href="/service/booking"
            className="shrink-0 whitespace-nowrap rounded-md bg-[#d70015] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#a80010] xl:px-4 xl:text-sm"
          >
            ขอใบเสนอราคา / ทดลองขับ
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="เปิดเมนู"
          className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-neutral-300 hover:bg-white/10 hover:text-white lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0d0f12] px-4 py-4 lg:hidden">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-200 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/service/booking"
                onClick={() => setOpen(false)}
                className="block w-full rounded-md bg-[#d70015] px-4 py-2.5 text-center text-sm font-semibold text-white"
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
