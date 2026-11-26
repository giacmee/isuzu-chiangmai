"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Navigation,
  Wrench,
  Users,
  CheckCircle2,
  Building2,
} from "lucide-react";
import type { Branch } from "@/types/database";

const SERVICE_FILTERS = [
  "ทั้งหมด",
  "โชว์รูมฝ่ายขายรถใหม่",
  "ศูนย์บริการเช็คระยะมาตรฐาน",
  "ศูนย์ซ่อมสีและตัวถัง Sala Faster Paint",
  "จำหน่ายอะไหล่แท้ตรีเพชรอีซูซุ",
];

export function BranchesClient({ branches }: { branches: Branch[] }) {
  const [selectedService, setSelectedService] = useState("ทั้งหมด");
  const [activeBranchId, setActiveBranchId] = useState(branches[0]?.id ?? "");

  const filteredBranches = branches.filter((branch) => {
    if (selectedService === "ทั้งหมด") return true;
    return branch.services?.includes(selectedService);
  });

  const activeBranch =
    filteredBranches.find((b) => b.id === activeBranchId) ??
    filteredBranches[0] ??
    branches[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
          BRANCHES &amp; SERVICE CENTERS
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317] sm:text-4xl">
          สาขาและศูนย์บริการ อีซูซุศาลาเชียงใหม่
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          ครอบคลุมทุกพื้นที่ในจังหวัดเชียงใหม่ พร้อมโชว์รูมรถใหม่ ศูนย์เช็คระยะมาตรฐาน
          และศูนย์ซ่อมสีและตัวถัง Sala Faster Paint
        </p>
      </div>

      {/* Service Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {SERVICE_FILTERS.map((service) => {
          const isActive = selectedService === service;
          return (
            <button
              key={service}
              type="button"
              onClick={() => setSelectedService(service)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                isActive
                  ? "bg-[#d70015] text-white shadow-sm"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-[#d70015] hover:text-[#d70015]"
              }`}
            >
              {service}
            </button>
          );
        })}
      </div>

      {/* Main Layout: Branch List + Interactive Map */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-6">
          {filteredBranches.map((branch) => {
            const isSelected = activeBranch?.id === branch.id;
            return (
              <div
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`cursor-pointer rounded-2xl border p-6 transition ${
                  isSelected
                    ? "border-[#d70015] bg-white shadow-md ring-1 ring-[#d70015]/20"
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 shrink-0 text-[#d70015]" />
                    <h2 className="font-display text-lg font-bold text-[#111317]">
                      {branch.name}
                    </h2>
                  </div>
                  {branch.is_head_office && (
                    <span className="rounded-full bg-[#d70015]/10 px-2.5 py-0.5 text-xs font-semibold text-[#d70015]">
                      สำนักงานใหญ่
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-sm text-neutral-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d70015]" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-[#d70015]" />
                    <a
                      href={`tel:${branch.phone.replace(/[^0-9]/g, "").slice(0, 9)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-semibold text-[#111317] hover:text-[#d70015]"
                    >
                      {branch.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-neutral-400" />
                    <span>{branch.business_hours}</span>
                  </p>
                </div>

                {branch.services && branch.services.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {branch.services.map((srv) => (
                      <span
                        key={srv}
                        className="inline-flex items-center gap-1 rounded-md bg-[#f4f5f7] px-2.5 py-1 text-xs font-medium text-neutral-700"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[#d70015]" />
                        {srv}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <a
                    href={branch.google_map_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0d0f12] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#d70015]"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    นำทาง Google Maps
                  </a>
                  <a
                    href={branch.line_oa_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#06C755] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    แอด LINE สาขา
                  </a>
                  <Link
                    href="/service/booking"
                    onClick={(e) => e.stopPropagation()}
                    className="col-span-2 flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-[#111317] transition hover:border-[#d70015] hover:text-[#d70015] sm:col-span-1"
                  >
                    <Wrench className="h-3.5 w-3.5" />
                    นัดหมายเข้าศูนย์
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Map Panel */}
        <div className="lg:col-span-6">
          {activeBranch && (
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="border-b border-neutral-200 bg-[#0d0f12] px-5 py-4 text-white">
                <p className="text-xs font-semibold text-[#d70015]">แผนที่สาขาที่เลือก</p>
                <h3 className="mt-0.5 font-display text-base font-bold">
                  {activeBranch.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-300">{activeBranch.address}</p>
              </div>
              <div className="aspect-[4/3] w-full bg-[#f4f5f7]">
                <iframe
                  title={`แผนที่ ${activeBranch.name}`}
                  src={activeBranch.map_embed_url}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f4f5f7] px-5 py-4">
                <div className="text-xs text-neutral-600">
                  ต้องการคุยกับเซลส์ประจำสาขานี้?
                </div>
                <Link
                  href="/sales"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#d70015] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#a80010]"
                >
                  <Users className="h-3.5 w-3.5" />
                  ดูรายชื่อที่ปรึกษาการขาย
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
