"use client";

import { useState } from "react";
import { Phone, MessageCircle, Search, MapPin, User } from "lucide-react";
import type { Branch, SalesConsultant } from "@/types/database";

export function SalesFinderClient({
  branches,
  salesConsultants,
}: {
  branches: Branch[];
  salesConsultants: SalesConsultant[];
}) {
  const [query, setQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");

  const filtered = salesConsultants.filter((s) => {
    const matchesBranch = branchFilter === "all" || s.branch_id === branchFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      s.full_name.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q) ||
      s.specialty.toLowerCase().includes(q);
    return matchesBranch && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
        SALES CONSULTANT FINDER
      </p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317] sm:text-4xl">
        ค้นหาที่ปรึกษาการขาย อีซูซุศาลาเชียงใหม่
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        ติดต่อสอบถามโปรโมชั่น ขอใบเสนอราคา หรือปรึกษาการจัดไฟแนนซ์กับทีมขายประจำสาขาโดยตรง
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อเซลส์, ชื่อเล่น หรือรุ่นรถที่เชี่ยวชาญ..."
            className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#d70015] focus:outline-none"
          />
        </div>
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none"
        >
          <option value="all">ทุกสาขาในเชียงใหม่</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((sales) => (
          <div
            key={sales.id}
            className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d0f12] text-white">
                  <User className="h-6 w-6 text-[#d70015]" />
                </div>
                <div>
                  <p className="font-display text-base font-bold text-[#111317]">
                    {sales.nickname}
                  </p>
                  <p className="text-xs text-neutral-500">{sales.full_name}</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                <MapPin className="h-3.5 w-3.5 text-[#d70015]" />
                {sales.branch_name}
              </p>
              <p className="mt-2 rounded-lg bg-[#f4f5f7] p-2.5 text-xs text-neutral-700">
                ความเชี่ยวชาญ: {sales.specialty}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <a
                href={`tel:${sales.phone.replace(/-/g, "")}`}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0d0f12] py-2 text-xs font-semibold text-white hover:bg-[#d70015]"
              >
                <Phone className="h-3.5 w-3.5" />
                โทร
              </a>
              <a
                href={`https://line.me/R/ti/p/${sales.line_id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#06C755] py-2 text-xs font-semibold text-white hover:opacity-90"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                แอด LINE
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
