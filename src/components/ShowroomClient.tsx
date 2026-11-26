"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Calculator, FileDown, GitCompare, Shield, Sparkles, Car } from "lucide-react";
import type { CarModel } from "@/types/database";
import { formatBaht } from "@/data/mock-data";
import type { MediaManifest } from "@/lib/media-store";
import { Car360Viewer } from "@/components/Car360Viewer";

export function ShowroomClient({
  model,
  media = {},
}: {
  model: CarModel;
  media?: MediaManifest;
}) {
  const [selectedColor, setSelectedColor] = useState(model.colors[0]);
  const [selectedTrim, setSelectedTrim] = useState(model.trims[0]);

  const totalPrice = selectedTrim.price + (selectedColor?.extra_price ?? 0);
  const spinFrames = selectedColor
    ? (media[`spin:${selectedColor.id}`]?.frames?.map((f) => f.url) ?? [])
    : [];
  const has360 = spinFrames.length >= 2;
  const activeCarImage =
    (selectedColor ? media[`color:${selectedColor.id}`]?.url : undefined) ??
    media[`model:${model.slug}`]?.url;
  const brochureEntry = media[`brochure:${model.slug}`];

  return (
    <div className="bg-white">
      {/* Top Showroom Stage */}
      <section className="bg-[#0d0f12] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-xs text-neutral-400">
            <Link href="/" className="hover:text-white">หน้าแรก</Link>
            <span className="mx-2">/</span>
            <Link href="/#models" className="hover:text-white">รุ่นรถอีซูซุ</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{model.name}</span>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            {/* Visual Color Preview Stage */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#181c22] to-[#0b0d10] p-6 sm:p-8">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl transition-colors duration-500"
                  style={{ backgroundColor: selectedColor?.hex_code ?? "#d70015" }}
                />
                <div className="relative flex min-h-[260px] flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#d70015] px-3 py-1 text-xs font-bold tracking-wide uppercase">
                      {model.category_slug}
                    </span>
                    {has360 ? (
                      <span className="rounded-full bg-[#d70015]/20 px-3 py-1 text-xs font-semibold text-[#ff6b7a] ring-1 ring-[#d70015]/40">
                        หมุนดูรอบคัน 360° ({spinFrames.length} มุม)
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-400">
                        พื้นที่แสดงภาพรถ 360° / ภาพตามสี
                      </span>
                    )}
                  </div>

                  {/* Vehicle Preview (แสดงภาพหมุน 360° หรือรูปจริงตามสีที่เลือก) */}
                  <div
                    key={selectedColor?.id ?? "default"}
                    className="animate-spring-pop my-6 flex flex-col items-center justify-center text-center"
                  >
                    {has360 ? (
                      <Car360Viewer
                        key={spinFrames.join("|")}
                        frames={spinFrames}
                        alt={`${model.name} - ${selectedColor?.color_name ?? ""}`}
                      />
                    ) : activeCarImage ? (
                      <div className="flex h-64 w-full items-center justify-center sm:h-80 lg:h-[360px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          key={activeCarImage}
                          src={activeCarImage}
                          alt={`${model.name} - ${selectedColor?.color_name ?? ""}`}
                          className="max-h-full max-w-full rounded-xl object-contain drop-shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div
                        className="spring-transition flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 shadow-2xl transition-all duration-300"
                        style={{ backgroundColor: selectedColor?.hex_code ?? "#333" }}
                      >
                        <Car className="h-10 w-10 text-white mix-blend-difference" />
                      </div>
                    )}
                    <p className="mt-4 font-display text-2xl font-bold text-white">
                      {selectedTrim.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-300">
                      สีที่เลือก: <span className="font-semibold text-white">{selectedColor?.color_name}</span>
                      {selectedColor?.extra_price > 0 && (
                        <span className="ml-1.5 text-xs text-[#ff6b7a]">
                          (+{formatBaht(selectedColor.extra_price)} บาท)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Color Swatch Selector */}
                  <div className="flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-5">
                    {model.colors.map((color) => {
                      const active = selectedColor?.id === color.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`btn-spring flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                            active
                              ? "scale-105 border-[#d70015] bg-white/15 text-white shadow-[0_0_0_2px_rgba(215,0,21,0.3)]"
                              : "border-white/15 bg-transparent text-neutral-400 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          <span
                            className="h-4 w-4 rounded-full border border-white/40"
                            style={{ backgroundColor: color.hex_code }}
                          />
                          <span className="hidden sm:inline">{color.color_name.split(" (")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Model Info & Price Summary */}
            <div className="lg:col-span-5">
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {model.name}
              </h1>
              <p className="mt-2 text-base font-medium text-[#ff4d5e]">{model.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">{model.description}</p>

              {/* Trim Selector */}
              <div className="mt-6">
                <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  เลือกรุ่นย่อย ({model.trims.length} รุ่น)
                </label>
                <div className="mt-2 space-y-2">
                  {model.trims.map((trim) => {
                    const active = selectedTrim.id === trim.id;
                    return (
                      <button
                        key={trim.id}
                        type="button"
                        onClick={() => setSelectedTrim(trim)}
                        className={`spring-transition flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-300 hover:translate-x-1 active:scale-[0.98] ${
                          active
                            ? "border-[#d70015] bg-[#d70015]/15 text-white"
                            : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold">{trim.name}</p>
                          <p className="text-xs text-neutral-400">
                            {trim.engine} • {trim.transmission}
                          </p>
                        </div>
                        <span className="font-display text-sm font-bold">
                          {formatBaht(trim.price)} ฿
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total Price + CTAs */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-neutral-400">ราคารวมสีที่เลือก</span>
                  <span className="font-display text-3xl font-extrabold text-white">
                    {formatBaht(totalPrice)}{" "}
                    <span className="text-sm font-normal text-neutral-400">บาท</span>
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/calculator?model=${model.slug}&trim=${selectedTrim.id}`}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#d70015] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#a80010]"
                  >
                    <Calculator className="h-4 w-4" />
                    คำนวณค่างวดรุ่นนี้
                  </Link>
                  <Link
                    href="/compare"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    <GitCompare className="h-4 w-4" />
                    เปรียบเทียบรุ่น
                  </Link>
                </div>
                {brochureEntry ? (
                  <a
                    href={brochureEntry.url}
                    target="_blank"
                    rel="noreferrer"
                    download={brochureEntry.originalName}
                    className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white hover:border-[#d70015] hover:bg-white/10"
                  >
                    <FileDown className="h-4 w-4 text-[#d70015]" />
                    ดาวน์โหลดโบรชัวร์ PDF ({brochureEntry.originalName})
                  </a>
                ) : (
                  <Link
                    href="/admin/media"
                    className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2.5 text-xs text-neutral-400 hover:bg-white/5 hover:text-white"
                  >
                    <FileDown className="h-4 w-4 text-[#d70015]" />
                    ยังไม่มีไฟล์โบรชัวร์ PDF (อัปโหลดได้ที่หน้าจัดการรูปภาพ)
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spec Breakdown */}
      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-[#111317]">
          ข้อมูลจำเพาะและจุดเด่น: {selectedTrim.name}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#f4f5f7] p-5">
            <p className="text-xs text-neutral-500">
              {model.slug === "isuzu-d-max-ev" ? "แบตเตอรี่และระยะทางวิ่ง" : "ความจุกระบอกสูบ"}
            </p>
            <p className="mt-1 font-display text-lg font-bold">{selectedTrim.specs.engine_displacement}</p>
          </div>
          <div className="rounded-xl bg-[#f4f5f7] p-5">
            <p className="text-xs text-neutral-500">กำลังสูงสุด</p>
            <p className="mt-1 font-display text-lg font-bold">{selectedTrim.specs.max_power}</p>
          </div>
          <div className="rounded-xl bg-[#f4f5f7] p-5">
            <p className="text-xs text-neutral-500">แรงบิดสูงสุด</p>
            <p className="mt-1 font-display text-lg font-bold">{selectedTrim.specs.max_torque}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-6">
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              <Shield className="h-5 w-5 text-[#d70015]" />
              ระบบความปลอดภัย
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
              {selectedTrim.specs.safety.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d70015]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              <Sparkles className="h-5 w-5 text-[#d70015]" />
              อุปกรณ์ภายนอก
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
              {selectedTrim.specs.exterior.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d70015]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              <Car className="h-5 w-5 text-[#d70015]" />
              อุปกรณ์ภายในและเทคโนโลยี
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
              {selectedTrim.specs.interior.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d70015]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
