"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Calculator, Gauge } from "lucide-react";
import { formatBaht } from "@/lib/format";
import type { MediaManifest } from "@/lib/media-store";
import type { CarCategory, CarModel } from "@/types/database";

export function HomeLineup({
  categories,
  models,
  media = {},
}: {
  categories: CarCategory[];
  models: CarModel[];
  media?: MediaManifest;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredModels =
    selectedCategory === "all"
      ? models
      : models.filter((m) => m.category_slug === selectedCategory);

  return (
    <section id="models" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
              ISUZU LINEUP
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-[#111317] sm:text-4xl">
              เลือกรุ่นรถอีซูซุที่ใช่สำหรับคุณ
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`btn-spring rounded-full px-4 py-2 text-sm font-medium ${
                selectedCategory === "all"
                  ? "bg-[#111317] text-white shadow-md"
                  : "bg-[#f4f5f7] text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              ทั้งหมด ({models.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`btn-spring rounded-full px-4 py-2 text-sm font-medium ${
                  selectedCategory === cat.slug
                    ? "bg-[#d70015] text-white shadow-[0_6px_16px_rgba(215,0,21,0.3)]"
                    : "bg-[#f4f5f7] text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div
          key={selectedCategory}
          className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredModels.map((model, idx) => {
            const modelImg =
              media[`model:${model.slug}`]?.url ??
              model.colors.map((c) => media[`color:${c.id}`]?.url).find(Boolean);
            return (
            <div
              key={model.id}
              style={{ animationDelay: `${Math.min(idx * 45, 270)}ms` }}
              className="animate-spring-pop card-spring group flex flex-col overflow-hidden rounded-2xl bg-[#f2f1f1] ring-1 ring-black/5 hover:ring-[#d70015]/35 hover:shadow-[0_18px_36px_rgba(17,19,23,0.10)]"
            >
              {/* Studio Cyclorama Stage แบบ isuzu-tis.com */}
              <div className="lineup-studio-bg relative flex h-56 flex-col justify-between overflow-hidden sm:h-60">
                <div className="relative z-20 flex items-center justify-between px-5 pt-4">
                  <span className="rounded bg-[#d70015] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-xs">
                    {model.category_slug.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-2 py-1 shadow-xs backdrop-blur-xs">
                    {model.colors.slice(0, 4).map((c) => (
                      <span
                        key={c.id}
                        title={c.color_name}
                        className="spring-transition h-3.5 w-3.5 rounded-full border border-black/15 transition-transform duration-300 hover:scale-125"
                        style={{ backgroundColor: c.hex_code }}
                      />
                    ))}
                  </div>
                </div>

                {modelImg ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={modelImg}
                      alt={model.name}
                      className="spring-transition relative z-10 h-full w-full object-contain px-4 pt-2 pb-4 drop-shadow-[0_14px_18px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="lineup-image-fade pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16" />
                  </>
                ) : (
                  <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-6 text-center">
                    <p className="text-xs font-semibold tracking-wider text-[#6e6e6e] uppercase">
                      {model.trims.length} รุ่นย่อยให้เลือก
                    </p>
                    <p className="mt-1 font-display text-xl font-bold tracking-tight text-[#1d1d1d]">
                      {model.name}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col bg-[#f2f1f1] px-5 pt-2 pb-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold tracking-tight text-[#1d1d1d]">
                    {model.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#6e6e6e]">
                    {model.trims.length} รุ่นย่อย
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-[#6e6e6e]">{model.tagline}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#6e6e6e]">
                  <Gauge className="h-4 w-4 text-[#d70015]" />
                  <span>{model.trims[0]?.engine}</span>
                </div>

                <div className="mt-4 border-t border-black/10 pt-4">
                  <p className="text-xs text-[#6e6e6e]">ราคาเริ่มต้น</p>
                  <p className="font-display text-2xl font-bold text-[#1d1d1d]">
                    {formatBaht(model.starting_price)}{" "}
                    <span className="text-sm font-normal text-[#6e6e6e]">บาท</span>
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-1">
                  <Link
                    href={`/models/${model.slug}`}
                    className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#3b3b3b] px-3 py-2.5 text-xs font-semibold text-white group-hover:bg-[#d70015]"
                  >
                    ดูรายละเอียด &amp; สีรถ
                    <ArrowRight className="spring-transition h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={`/calculator?model=${model.slug}`}
                    title="คำนวณค่างวดรุ่นนี้"
                    className="btn-spring flex items-center justify-center rounded-lg bg-white p-2.5 text-[#1d1d1d] ring-1 ring-black/10 hover:text-[#d70015] hover:ring-[#d70015]"
                  >
                    <Calculator className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
