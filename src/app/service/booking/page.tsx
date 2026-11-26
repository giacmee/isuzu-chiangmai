"use client";

import { useState } from "react";
import { CheckCircle2, CalendarCheck, Car } from "lucide-react";
import { BRANCHES, CAR_MODELS } from "@/data/mock-data";

export default function ServiceBookingPage() {
  const [mode, setMode] = useState<"quote" | "service">("quote");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
        ONLINE BOOKING &amp; QUOTE
      </p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317]">
        ขอใบเสนอราคา / นัดหมายศูนย์บริการออนไลน์
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        กรอกข้อมูลด้านล่างเพื่อให้เจ้าหน้าที่อีซูซุศาลาเชียงใหม่ติดต่อกลับ (พร้อมเชื่อมต่อ LINE Messaging API / Database ใน Step 3–4)
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-[#f4f5f7] p-1.5">
        <button
          type="button"
          onClick={() => { setMode("quote"); setSubmitted(false); }}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition ${
            mode === "quote" ? "bg-[#0d0f12] text-white shadow" : "text-neutral-600"
          }`}
        >
          <Car className="h-4 w-4 text-[#d70015]" />
          ขอใบเสนอราคา / ทดลองขับ
        </button>
        <button
          type="button"
          onClick={() => { setMode("service"); setSubmitted(false); }}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition ${
            mode === "service" ? "bg-[#0d0f12] text-white shadow" : "text-neutral-600"
          }`}
        >
          <CalendarCheck className="h-4 w-4 text-[#d70015]" />
          นัดหมายศูนย์บริการ / ซ่อมสี
        </button>
      </div>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
          <h2 className="mt-3 font-display text-xl font-bold text-emerald-900">
            ได้รับข้อมูลเรียบร้อยแล้ว (โหมดทดสอบ Prototype)
          </h2>
          <p className="mt-2 text-sm text-emerald-800">
            ใน Step 4 ระบบจะบันทึกข้อมูลนี้ลง PostgreSQL และส่งแจ้งเตือนไปยัง LINE OA ของทีมงานทันที
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 rounded-lg bg-[#0d0f12] px-5 py-2.5 text-sm font-semibold text-white"
          >
            กรอกข้อมูลใหม่
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">ชื่อ - นามสกุล *</label>
              <input
                required
                type="text"
                placeholder="เช่น สมชาย ใจดี"
                className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">เบอร์โทรศัพท์ *</label>
              <input
                required
                type="tel"
                placeholder="08X-XXX-XXXX"
                className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">สาขาที่สะดวก *</label>
              <select className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none">
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {mode === "quote" ? (
              <div>
                <label className="block text-sm font-semibold">รุ่นรถที่สนใจ</label>
                <select className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none">
                  {CAR_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold">ประเภทงานบริการ</label>
                <select className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none">
                  <option>เช็คระยะตามกำหนด</option>
                  <option>ซ่อมบำรุงทั่วไป / ตรวจเช็คช่วงล่าง</option>
                  <option>ศูนย์ซ่อมสีและตัวถัง (Sala Faster Paint)</option>
                  <option>ต่อ พ.ร.บ. / ประกันภัย</option>
                </select>
              </div>
            )}
          </div>

          {mode === "service" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">ทะเบียนรถ *</label>
                <input
                  required
                  type="text"
                  placeholder="เช่น ขก 1234 เชียงใหม่"
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">วันที่ต้องการเข้าศูนย์ *</label>
                <input
                  required
                  type="date"
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold">รายละเอียดเพิ่มเติม / ID LINE</label>
            <textarea
              rows={3}
              placeholder="เช่น ต้องการทราบโปรโมชั่นดาวน์ 15% หรือระบุอาการรถเบื้องต้น..."
              className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#d70015] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#d70015] py-3.5 text-sm font-semibold text-white transition hover:bg-[#a80010]"
          >
            {mode === "quote" ? "ส่งคำขอใบเสนอราคา / ทดลองขับ" : "ยืนยันการนัดหมายศูนย์บริการ"}
          </button>
        </form>
      )}
    </div>
  );
}
