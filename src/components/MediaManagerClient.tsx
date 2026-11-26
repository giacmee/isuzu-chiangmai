"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Car,
  Sparkles,
  Newspaper,
  LayoutTemplate,
  Loader2,
} from "lucide-react";
import type { MediaManifest } from "@/lib/media-store";
import { ARTICLES, CAR_MODELS, PROMOTIONS } from "@/data/mock-data";

type TabId = "brand" | "cars" | "promotions" | "articles";

interface SlotItem {
  slotKey: string;
  label: string;
  hint: string;
  accept: string;
  isPdf?: boolean;
  swatchHex?: string;
  previewLink?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function MediaSlotCard({
  item,
  entry,
  busy,
  onUpload,
  onDelete,
}: {
  item: SlotItem;
  entry?: MediaManifest[string];
  busy: boolean;
  onUpload: (slotKey: string, file: File) => void;
  onDelete: (slotKey: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      onUpload(item.slotKey, file);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex flex-col justify-between rounded-xl border bg-white p-4 shadow-sm transition ${
        dragging
          ? "border-[#d70015] bg-[#d70015]/5 ring-2 ring-[#d70015]/20"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {item.swatchHex && (
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-neutral-300 shadow-inner"
                style={{ backgroundColor: item.swatchHex }}
              />
            )}
            <h3 className="font-display text-sm font-bold text-[#111317]">
              {item.label}
            </h3>
          </div>
          {entry ? (
            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              มีไฟล์แล้ว
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-500">
              ยังไม่มีรูป
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-neutral-500">{item.hint}</p>

        {/* Preview Area */}
        <div className="relative mt-3 flex h-40 items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-[#f4f5f7]">
          {busy && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-xs">
              <Loader2 className="h-6 w-6 animate-spin text-[#d70015]" />
            </div>
          )}

          {entry ? (
            item.isPdf || entry.mimeType === "application/pdf" ? (
              <div className="flex flex-col items-center gap-2 px-4 text-center">
                <FileText className="h-10 w-10 text-[#d70015]" />
                <p className="line-clamp-1 text-xs font-semibold text-[#111317]">
                  {entry.originalName}
                </p>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#d70015] hover:underline"
                >
                  เปิดดูไฟล์ PDF
                </a>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={entry.url}
                alt={item.label}
                className="h-full w-full object-contain p-2"
              />
            )
          ) : (
            <div className="flex flex-col items-center gap-1.5 px-4 text-center text-neutral-400">
              {item.isPdf ? (
                <FileText className="h-8 w-8" />
              ) : (
                <ImageIcon className="h-8 w-8" />
              )}
              <span className="text-xs">ลากไฟล์มาวางที่นี่ หรือกดปุ่มเพิ่มไฟล์</span>
            </div>
          )}
        </div>

        {entry && (
          <p className="mt-2 truncate text-[11px] text-neutral-400">
            {entry.originalName} • {formatFileSize(entry.size)}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={item.accept}
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0d0f12] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#d70015] disabled:opacity-50"
        >
          <Upload className="h-3.5 w-3.5" />
          {entry ? "เปลี่ยนไฟล์" : item.isPdf ? "อัปโหลด PDF" : "เพิ่มรูปภาพ"}
        </button>

        {entry && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onDelete(item.slotKey)}
            title="ลบไฟล์นี้"
            className="flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            ลบ
          </button>
        )}
      </div>
    </div>
  );
}

export function MediaManagerClient({
  initialManifest,
}: {
  initialManifest: MediaManifest;
}) {
  const [manifest, setManifest] = useState<MediaManifest>(initialManifest);
  const [activeTab, setActiveTab] = useState<TabId>("cars");
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const handleUpload = async (slotKey: string, file: File) => {
    setBusySlot(slotKey);
    try {
      const formData = new FormData();
      formData.append("slotKey", slotKey);
      formData.append("file", file);

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as {
        manifest?: MediaManifest;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "อัปโหลดไม่สำเร็จ");
      }
      if (data.manifest) {
        setManifest(data.manifest);
      }
      showToast("success", `อัปโหลดไฟล์ "${file.name}" เรียบร้อยแล้ว`);
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการอัปโหลด"
      );
    } finally {
      setBusySlot(null);
    }
  };

  const handleDelete = async (slotKey: string) => {
    setBusySlot(slotKey);
    try {
      const res = await fetch(
        `/api/media?slotKey=${encodeURIComponent(slotKey)}`,
        { method: "DELETE" }
      );
      const data = (await res.json()) as {
        manifest?: MediaManifest;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "ลบไฟล์ไม่สำเร็จ");
      }
      if (data.manifest) {
        setManifest(data.manifest);
      }
      showToast("success", "ลบไฟล์เรียบร้อยแล้ว");
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการลบไฟล์"
      );
    } finally {
      setBusySlot(null);
    }
  };

  const brandSlots: SlotItem[] = [
    {
      slotKey: "hero_banner",
      label: "แบนเนอร์หลักหน้าแรก (Hero Banner)",
      hint: "แนะนำขนาด 1920×900 px (.webp / .jpg) แสดงเป็นพื้นหลังส่วนบนสุดของหน้าแรก",
      accept: "image/webp,image/png,image/jpeg",
    },
    {
      slotKey: "site_logo",
      label: "โลโก้โชว์รูม อีซูซุศาลาเชียงใหม่",
      hint: "แนะนำไฟล์พื้นหลังโปร่งใส (.png / .svg / .webp)",
      accept: "image/webp,image/png,image/svg+xml,image/jpeg",
    },
  ];

  const promoSlots: SlotItem[] = PROMOTIONS.map((promo) => ({
    slotKey: `promo:${promo.id}`,
    label: promo.title,
    hint: `หมวดหมู่: ${promo.category} • แนะนำขนาด 1200×675 px (16:9)`,
    accept: "image/webp,image/png,image/jpeg",
  }));

  const articleSlots: SlotItem[] = ARTICLES.map((art) => ({
    slotKey: `article:${art.id}`,
    label: art.title,
    hint: `หมวดหมู่: ${art.category} • แนะนำขนาด 1200×675 px (16:9)`,
    accept: "image/webp,image/png,image/jpeg",
  }));

  const uploadedCount = Object.keys(manifest).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
            LOCAL MEDIA MANAGER (STEP 2.5)
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317]">
            จัดการรูปภาพและโบรชัวร์เว็บไซต์
          </h1>
          <p className="mt-1.5 text-sm text-neutral-600">
            เพิ่ม เปลี่ยน หรือลบรูปรถแต่ละสี แบนเนอร์ โปรโมชั่น และโบรชัวร์ PDF ได้ทันที
            (รองรับการลากไฟล์มาวาง — บันทึกอัตโนมัติลง{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              public/images/uploads/
            </code>
            )
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-lg border border-neutral-200 bg-[#f4f5f7] px-4 py-2 text-xs font-semibold text-[#111317]">
            ไฟล์ที่อัปโหลดแล้ว:{" "}
            <span className="text-[#d70015]">{uploadedCount}</span> รายการ
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#d70015] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#a80010]"
          >
            ดูหน้าเว็บจริง
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`mt-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { id: "cars" as const, label: "รุ่นรถ สีรถ & โบรชัวร์", icon: Car },
          { id: "brand" as const, label: "แบนเนอร์ & โลโก้", icon: LayoutTemplate },
          { id: "promotions" as const, label: "รูปโปรโมชั่น", icon: Sparkles },
          { id: "articles" as const, label: "รูปปกข่าวสาร/บทความ", icon: Newspaper },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                active
                  ? "bg-[#d70015] text-white shadow-sm"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-[#d70015] hover:text-[#d70015]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "brand" && (
          <div className="grid gap-6 md:grid-cols-2">
            {brandSlots.map((item) => (
              <MediaSlotCard
                key={item.slotKey}
                item={item}
                entry={manifest[item.slotKey]}
                busy={busySlot === item.slotKey}
                onUpload={handleUpload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {activeTab === "cars" && (
          <div className="space-y-10">
            {CAR_MODELS.map((model) => {
              const slots: SlotItem[] = [
                {
                  slotKey: `model:${model.slug}`,
                  label: `รูปหลักรุ่น ${model.name}`,
                  hint: "แสดงในการ์ดรุ่นรถหน้าแรก และเป็นรูปตั้งต้นในหน้าโชว์รูม (.webp / .png)",
                  accept: "image/webp,image/png,image/jpeg",
                },
                {
                  slotKey: `brochure:${model.slug}`,
                  label: `โบรชัวร์ PDF (${model.name})`,
                  hint: "ไฟล์โบรชัวร์สเปคสำหรับให้ลูกค้ากดดาวน์โหลด (.pdf สูงสุด 10 MB)",
                  accept: "application/pdf",
                  isPdf: true,
                },
                ...model.colors.map((color) => ({
                  slotKey: `color:${color.id}`,
                  label: `สี: ${color.color_name}`,
                  hint: "แสดงเมื่อลูกค้ากดสลับสีนี้ในหน้าโชว์รูม (.webp / .png พื้นใสยิ่งสวย)",
                  accept: "image/webp,image/png,image/jpeg",
                  swatchHex: color.hex_code,
                })),
              ];

              return (
                <section
                  key={model.id}
                  className="rounded-2xl border border-neutral-200 bg-[#f4f5f7]/60 p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
                    <div>
                      <h2 className="font-display text-xl font-bold text-[#111317]">
                        {model.name}
                      </h2>
                      <p className="text-xs text-neutral-500">
                        {model.colors.length} สีให้เลือก • {model.trims.length} รุ่นย่อย
                      </p>
                    </div>
                    <Link
                      href={`/models/${model.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#d70015] hover:underline"
                    >
                      เปิดดูหน้าโชว์รูมรุ่นนี้
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {slots.map((item) => (
                      <MediaSlotCard
                        key={item.slotKey}
                        item={item}
                        entry={manifest[item.slotKey]}
                        busy={busySlot === item.slotKey}
                        onUpload={handleUpload}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {activeTab === "promotions" && (
          <div className="grid gap-6 md:grid-cols-3">
            {promoSlots.map((item) => (
              <MediaSlotCard
                key={item.slotKey}
                item={item}
                entry={manifest[item.slotKey]}
                busy={busySlot === item.slotKey}
                onUpload={handleUpload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {activeTab === "articles" && (
          <div className="grid gap-6 md:grid-cols-2">
            {articleSlots.map((item) => (
              <MediaSlotCard
                key={item.slotKey}
                item={item}
                entry={manifest[item.slotKey]}
                busy={busySlot === item.slotKey}
                onUpload={handleUpload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
