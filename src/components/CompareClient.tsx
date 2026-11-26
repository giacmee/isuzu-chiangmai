"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { CAR_MODELS, formatBaht } from "@/data/mock-data";

const ALL_TRIMS = CAR_MODELS.flatMap((model) =>
  model.trims.map((trim) => ({
    ...trim,
    modelName: model.name,
    modelSlug: model.slug,
  }))
);

export function CompareClient() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    ALL_TRIMS[0]?.id ?? "",
    ALL_TRIMS[2]?.id ?? "",
    ALL_TRIMS[5]?.id ?? "",
  ]);

  const selectedTrims = selectedIds
    .map((id) => ALL_TRIMS.find((t) => t.id === id))
    .filter((t): t is (typeof ALL_TRIMS)[number] => Boolean(t));

  function updateSlot(index: number, trimId: string) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = trimId;
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
        COMPARE MODELS
      </p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317] sm:text-4xl">
        เปรียบเทียบรุ่นรถและสเปคอีซูซุ
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        เลือกรุ่นย่อยที่สนใจได้สูงสุด 3 รุ่น เพื่อเปรียบเทียบราคา เครื่องยนต์ และอุปกรณ์ความปลอดภัย
      </p>

      {/* Selectors */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((slot) => (
          <div key={slot} className="rounded-xl border border-neutral-200 bg-[#f4f5f7] p-4">
            <label className="text-xs font-semibold text-neutral-500">
              รุ่นที่ {slot + 1}
            </label>
            <select
              value={selectedIds[slot]}
              onChange={(e) => updateSlot(slot, e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm font-medium focus:border-[#d70015] focus:outline-none"
            >
              {ALL_TRIMS.map((trim) => (
                <option key={trim.id} value={trim.id}>
                  {trim.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-[#0d0f12] text-white">
              <th className="w-48 p-4 font-display text-xs uppercase tracking-wider text-neutral-400">
                หัวข้อเปรียบเทียบ
              </th>
              {selectedTrims.map((trim, idx) => (
                <th key={`${trim.id}-${idx}`} className="p-4 align-top">
                  <p className="text-xs text-[#ff5c6c]">{trim.modelName}</p>
                  <p className="mt-1 font-display text-base font-bold">{trim.name}</p>
                  <p className="mt-2 font-display text-xl font-extrabold text-white">
                    {formatBaht(trim.price)}{" "}
                    <span className="text-xs font-normal text-neutral-400">บาท</span>
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold">เครื่องยนต์</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4">{t.engine} ({t.specs.engine_displacement})</td>
              ))}
            </tr>
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold">กำลังสูงสุด</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4">{t.specs.max_power}</td>
              ))}
            </tr>
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold">แรงบิดสูงสุด</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4">{t.specs.max_torque}</td>
              ))}
            </tr>
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold">ระบบส่งกำลัง / ขับเคลื่อน</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4">{t.transmission} • {t.drivetrain}</td>
              ))}
            </tr>
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold align-top">ความปลอดภัย</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4 align-top">
                  <ul className="list-disc space-y-1 pl-4 text-neutral-700">
                    {t.specs.safety.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold align-top">ภายในและเทคโนโลยี</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4 align-top">
                  <ul className="list-disc space-y-1 pl-4 text-neutral-700">
                    {t.specs.interior.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="bg-[#f4f5f7] p-4 font-semibold">คำนวณค่างวด</td>
              {selectedTrims.map((t, i) => (
                <td key={i} className="p-4">
                  <Link
                    href={`/calculator?model=${t.modelSlug}&trim=${t.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#d70015] px-4 py-2 text-xs font-semibold text-white hover:bg-[#a80010]"
                  >
                    <Calculator className="h-3.5 w-3.5" />
                    คำนวณรุ่นนี้
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
