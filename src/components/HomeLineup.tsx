"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Calculator, Gauge } from "lucide-react";
import { CAR_CATEGORIES, CAR_MODELS, formatBaht } from "@/data/mock-data";
import type { MediaManifest } from "@/lib/media-store";

export function HomeLineup({ media = {} }: { media?: MediaManifest }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredModels =
    selectedCategory === "all"
      ? CAR_MODELS
      : CAR_MODELS.filter((m) => m.category_slug === selectedCategory);

  return (
    <section id="models" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              ทั้งหมด ({CAR_MODELS.length})
            </button>
            {CAR_CATEGORIES.map((cat) => (
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
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredModels.map((model, idx) => {
            const modelImg =
              media[`model:${model.slug}`]?.url ??
              model.colors.map((c) => media[`color:${c.id}`]?.url).find(Boolean);
            return (
            <div
              key={model.id}
              style={{ animationDelay: `${Math.min(idx * 45, 270)}ms` }}
              className="animate-spring-pop card-spring group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white hover:border-[#d70015]/40 hover:shadow-[0_18px_36px_rgba(17,19,23,0.12)]"
            >
              {/* Showroom Card Header (แสดงรูปจริงเมื่ออัปโหลดผ่าน /admin/media) */}
              <div className="relative flex h-44 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#14171c] via-[#1f242c] to-[#0d0f12] p-5 text-white">
                {modelImg && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={modelImg}
                      alt={model.name}
                      className="spring-transition absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/90 via-[#0d0f12]/25 to-[#0d0f12]/40" />
                  </>
                )}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded bg-[#d70015] px-2.5 py-0.5 text-[11px] font-semibold">
                    {model.category_slug.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {model.colors.slice(0, 4).map((c) => (
                      <span
                        key={c.id}
                        title={c.color_name}
                        className="spring-transition h-3.5 w-3.5 rounded-full border border-white/40 transition-transform duration-300 hover:scale-125"
                        style={{ backgroundColor: c.hex_code }}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-[11px] tracking-wider text-neutral-300 uppercase">
                    {model.trims.length} รุ่นย่อยให้เลือก
                  </p>
                  <p className="font-display text-lg font-bold tracking-tight text-white">
                    {model.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="line-clamp-2 text-sm text-neutral-600">{model.tagline}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                  <Gauge className="h-4 w-4 text-[#d70015]" />
                  <span>{model.trims[0]?.engine}</span>
                </div>

                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <p className="text-xs text-neutral-500">ราคาเริ่มต้น</p>
                  <p className="font-display text-2xl font-bold text-[#111317]">
                    {formatBaht(model.starting_price)}{" "}
                    <span className="text-sm font-normal text-neutral-500">บาท</span>
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-1">
                  <Link
                    href={`/models/${model.slug}`}
                    className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#111317] px-3 py-2.5 text-xs font-semibold text-white group-hover:bg-[#d70015]"
                  >
                    ดูรายละเอียด &amp; สีรถ
                    <ArrowRight className="spring-transition h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={`/calculator?model=${model.slug}`}
                    title="คำนวณค่างวดรุ่นนี้"
                    className="btn-spring flex items-center justify-center rounded-lg border border-neutral-200 p-2.5 text-neutral-700 hover:border-[#d70015] hover:text-[#d70015]"
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
