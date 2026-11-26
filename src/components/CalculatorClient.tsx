"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import type { CarModel } from "@/types/database";
import { formatBaht } from "@/lib/format";

const DOWN_PAYMENT_OPTIONS = [10, 15, 20, 25, 30];
const TERM_OPTIONS = [48, 60, 72, 84];

export function CalculatorClient({
  models,
  initialModelSlug,
  initialTrimId,
}: {
  models: CarModel[];
  initialModelSlug?: string;
  initialTrimId?: string;
}) {
  const modelsWithTrims = models.filter((m) => m.trims.length > 0);
  const defaultModel =
    modelsWithTrims.find((m) => m.slug === initialModelSlug) ?? modelsWithTrims[0];
  const defaultTrim =
    defaultModel?.trims.find((t) => t.id === initialTrimId) ?? defaultModel?.trims[0];

  const [selectedModelId, setSelectedModelId] = useState(defaultModel?.id ?? "");
  const [selectedTrimId, setSelectedTrimId] = useState(defaultTrim?.id ?? "");
  const [downPercent, setDownPercent] = useState(15);
  const [interestRate, setInterestRate] = useState(2.39);
  const [months, setMonths] = useState(72);

  if (!defaultModel || !defaultTrim) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="font-display text-xl font-bold text-[#111317]">
          ยังไม่มีข้อมูลรุ่นรถในระบบ CMS
        </p>
      </div>
    );
  }

  const currentModel =
    modelsWithTrims.find((m) => m.id === selectedModelId) ?? defaultModel;
  const currentTrim =
    currentModel.trims.find((t) => t.id === selectedTrimId) ?? currentModel.trims[0];

  const carPrice = currentTrim.price;
  const downPayment = (carPrice * downPercent) / 100;
  const financeAmount = carPrice - downPayment;
  const years = months / 12;
  const totalInterest = financeAmount * (interestRate / 100) * years;
  const monthlyPayment = (financeAmount + totalInterest) / months;

  function handleModelChange(modelId: string) {
    setSelectedModelId(modelId);
    const nextModel = modelsWithTrims.find((m) => m.id === modelId);
    if (nextModel && nextModel.trims.length > 0) {
      setSelectedTrimId(nextModel.trims[0].id);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
          INSTALLMENT CALCULATOR
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317] sm:text-4xl">
          คำนวณค่างวดรถอีซูซุออนไลน์
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          ประเมินเงินดาวน์และค่างวดต่อเดือนเบื้องต้นได้ทันที (สูตรคำนวณ Flat Rate มาตรฐานไฟแนนซ์รถยนต์)
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Form Controls */}
        <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-7">
          <div>
            <label className="block text-sm font-semibold text-[#111317]">
              1. เลือกรุ่นรถหลัก
            </label>
            <select
              value={currentModel.id}
              onChange={(e) => handleModelChange(e.target.value)}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#d70015] focus:outline-none"
            >
              {modelsWithTrims.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#111317]">
              2. เลือกรุ่นย่อย
            </label>
            <select
              value={currentTrim.id}
              onChange={(e) => setSelectedTrimId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#d70015] focus:outline-none"
            >
              {currentModel.trims.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {formatBaht(t.price)} บาท
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#111317]">
                3. เงินดาวน์ ({downPercent}%)
              </label>
              <span className="text-sm font-bold text-[#d70015]">
                {formatBaht(downPayment)} บาท
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-5 gap-2">
              {DOWN_PAYMENT_OPTIONS.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPercent(pct)}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                    downPercent === pct
                      ? "bg-[#111317] text-white"
                      : "bg-[#f4f5f7] text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-[#111317]">
                4. ระยะเวลาผ่อนชำระ (งวด)
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {TERM_OPTIONS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                      months === m
                        ? "bg-[#d70015] text-white"
                        : "bg-[#f4f5f7] text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {m} งวด ({m / 12} ปี)
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111317]">
                5. อัตราดอกเบี้ยต่อปี (%)
              </label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="10"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="mt-2.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold focus:border-[#d70015] focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-neutral-500">
                สามารถปรับตามแคมเปญโปรโมชั่นประจำเดือนได้
              </p>
            </div>
          </div>
        </div>

        {/* Result Summary Card */}
        <div className="flex flex-col justify-between rounded-2xl bg-[#0d0f12] p-6 text-white sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#ff5c6c] uppercase">
              <Calculator className="h-4 w-4" />
              สรุปผลการคำนวณเบื้องต้น
            </div>
            <h2 className="mt-2 font-display text-xl font-bold">{currentTrim.name}</h2>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-xs text-neutral-400">ค่างวดโดยประมาณต่อเดือน</p>
              <p className="mt-1 font-display text-4xl font-extrabold text-[#ff4d5e]">
                {formatBaht(monthlyPayment)}
                <span className="ml-1.5 text-base font-normal text-neutral-300">บาท / เดือน</span>
              </p>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <dt className="text-neutral-400">ราคารถ</dt>
                <dd className="font-semibold">{formatBaht(carPrice)} บาท</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <dt className="text-neutral-400">เงินดาวน์ ({downPercent}%)</dt>
                <dd className="font-semibold">{formatBaht(downPayment)} บาท</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <dt className="text-neutral-400">ยอดจัดไฟแนนซ์</dt>
                <dd className="font-semibold">{formatBaht(financeAmount)} บาท</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">ระยะเวลาผ่อน / ดอกเบี้ย</dt>
                <dd className="font-semibold">
                  {months} งวด / {interestRate.toFixed(2)}%
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/service/booking"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d70015] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a80010]"
            >
              ส่งตารางนี้ให้เซลส์ทำใบเสนอราคาพิเศษ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-neutral-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ราคานี้ยังไม่รวมส่วนลดเงินดาวน์และของแถมพิเศษจากสาขาเชียงใหม่
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
