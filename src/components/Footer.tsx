import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import type { Branch } from "@/types/database";

export function Footer({
  logoUrl,
  branches,
}: {
  logoUrl?: string;
  branches: Branch[];
}) {
  const resolvedLogo = logoUrl ?? "/images/logo-isuzu-sala.png";

  return (
    <>
      <footer className="border-t border-white/10 bg-[#0d0f12] pb-24 text-neutral-300 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolvedLogo}
                  alt="ISUZU ศาลา เชียงใหม่"
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <p className="mt-3 text-sm font-semibold text-white">
                อีซูซุศาลาเชียงใหม่ (Isuzu Sala Chiang Mai)
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                ผู้จำหน่ายและศูนย์บริการมาตรฐานอีซูซุครบวงจรในจังหวัดเชียงใหม่
                พร้อมศูนย์ซ่อมสีและตัวถัง Sala Faster Paint และทีมที่ปรึกษาการขายมืออาชีพ
              </p>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-white">เมนูหลัก</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-400">
                <li><Link href="/#models" className="hover:text-white">โชว์รูมรุ่นรถอีซูซุ</Link></li>
                <li><Link href="/calculator" className="hover:text-white">คำนวณค่างวดออนไลน์</Link></li>
                <li><Link href="/compare" className="hover:text-white">เปรียบเทียบรุ่นรถ</Link></li>
                <li><Link href="/service/booking" className="hover:text-white">นัดหมายศูนย์บริการ</Link></li>
                <li><Link href="/sales" className="hover:text-white">ค้นหาที่ปรึกษาการขาย</Link></li>
                <li><Link href="/articles" className="hover:text-white">ข่าวสารและบทความ</Link></li>
                <li><Link href="/branches" className="hover:text-white">สาขาและแผนที่</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-white">สาขาในจังหวัดเชียงใหม่</h3>
                <Link href="/branches" className="text-xs font-semibold text-[#d70015] hover:underline">
                  ดูแผนที่ทุกสาขา →
                </Link>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {branches.slice(0, 2).map((branch) => (
                  <div key={branch.id} className="rounded-lg border border-white/10 bg-white/5 p-3.5 text-xs">
                    <p className="font-semibold text-white">{branch.name}</p>
                    <p className="mt-1.5 flex items-start gap-1.5 text-neutral-400">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d70015]" />
                      {branch.address}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-neutral-300">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#d70015]" />
                      {branch.phone}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-neutral-400">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                      {branch.business_hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>© {new Date().getFullYear()} อีซูซุศาลาเชียงใหม่ (Next.js Prototype). All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/admin" className="text-neutral-400 hover:text-white">
                Payload CMS (Admin)
              </Link>
              <span>•</span>
              <Link href="/media-manager" className="text-neutral-400 hover:text-white">
                จัดการรูปภาพ &amp; 360°
              </Link>
              <span>•</span>
              <p>Built with Next.js + Payload CMS + Tailwind CSS</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Action Bar สำหรับลูกค้าที่เข้าผ่านมือถือ */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-white/10 bg-[#0d0f12] text-xs font-semibold text-white lg:hidden">
        <a
          href="tel:053242002"
          className="flex items-center justify-center gap-1.5 py-3.5 hover:bg-white/5"
        >
          <Phone className="h-4 w-4 text-[#d70015]" />
          โทรเลย
        </a>
        <a
          href="https://line.me/R/ti/p/@isuzusala"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 border-x border-white/10 bg-[#06C755]/15 py-3.5 text-[#06C755]"
        >
          <MessageCircle className="h-4 w-4" />
          LINE OA
        </a>
        <Link
          href="/calculator"
          className="flex items-center justify-center gap-1.5 bg-[#d70015] py-3.5"
        >
          คำนวณค่างวด
        </Link>
      </div>
    </>
  );
}
