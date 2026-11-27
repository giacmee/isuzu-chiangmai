"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  Home,
  Monitor,
  PanelRight,
  RefreshCw,
  Smartphone,
  X,
} from "lucide-react";

const PREVIEW_ROUTES = [
  { value: "/", label: "หน้าแรก (/)" },
  { value: "/calculator", label: "คำนวณค่างวด (/calculator)" },
  { value: "/compare", label: "เปรียบเทียบรุ่นรถ (/compare)" },
  { value: "/sales", label: "ที่ปรึกษาการขาย (/sales)" },
  { value: "/branches", label: "สาขาและแผนที่ (/branches)" },
  { value: "/articles", label: "ข่าวสารและบทความ (/articles)" },
  { value: "/service/booking", label: "นัดหมายศูนย์บริการ (/service/booking)" },
];

export function AdminHeaderActions() {
  const [open, setOpen] = useState(false);
  const [previewPath, setPreviewPath] = useState("/");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ path?: string }>;
      if (customEvent.detail?.path) {
        setPreviewPath(customEvent.detail.path);
      }
      setOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("isuzu:open-preview", handleOpenEvent);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("isuzu:open-preview", handleOpenEvent);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const drawer =
    open && typeof document !== "undefined"
      ? createPortal(
          <aside
            aria-label="หน้าต่างพรีวิวเว็บไซต์"
            className="isuzu-preview-drawer"
          >
            <div className="isuzu-preview-toolbar">
              <div className="isuzu-preview-toolbar-left">
                <span className="isuzu-preview-dot" />
                <select
                  aria-label="เลือกหน้าที่ต้องการพรีวิว"
                  value={previewPath}
                  onChange={(e) => setPreviewPath(e.target.value)}
                  className="isuzu-preview-select"
                >
                  {PREVIEW_ROUTES.map((route) => (
                    <option key={route.value} value={route.value}>
                      {route.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="isuzu-preview-toolbar-right">
                <button
                  type="button"
                  onClick={() => setDevice("desktop")}
                  title="มุมมอง Desktop"
                  className={`isuzu-preview-icon-btn ${
                    device === "desktop" ? "isuzu-preview-icon-btn--active" : ""
                  }`}
                >
                  <Monitor size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("mobile")}
                  title="มุมมองมือถือ (390px)"
                  className={`isuzu-preview-icon-btn ${
                    device === "mobile" ? "isuzu-preview-icon-btn--active" : ""
                  }`}
                >
                  <Smartphone size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setRefreshKey((k) => k + 1)}
                  title="รีเฟรชพรีวิวหลังบันทึก"
                  className="isuzu-preview-icon-btn"
                >
                  <RefreshCw size={15} />
                </button>
                <a
                  href={previewPath}
                  target="_blank"
                  rel="noreferrer"
                  title="เปิดในแท็บใหม่"
                  className="isuzu-preview-icon-btn"
                >
                  <ExternalLink size={15} />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  title="ปิดพรีวิว"
                  className="isuzu-preview-icon-btn isuzu-preview-icon-btn--close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="isuzu-preview-body">
              <iframe
                key={`${previewPath}-${refreshKey}`}
                src={previewPath}
                title="พรีวิวเว็บไซต์ อีซูซุศาลาเชียงใหม่"
                className={
                  device === "mobile"
                    ? "isuzu-preview-frame isuzu-preview-frame--mobile"
                    : "isuzu-preview-frame"
                }
              />
            </div>
          </aside>,
          document.body
        )
      : null;

  return (
    <>
      <div className="isuzu-admin-actions">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="isuzu-admin-btn isuzu-admin-btn--primary"
        >
          <PanelRight size={14} strokeWidth={2.2} />
          <span>{open ? "ปิดพรีวิว" : "ดูพรีวิวเว็บ"}</span>
        </button>
        <Link href="/" className="isuzu-admin-btn isuzu-admin-btn--ghost">
          <Home size={14} strokeWidth={2.2} />
          <span>กลับหน้าหลักเว็บ</span>
        </Link>
      </div>
      {drawer}
    </>
  );
}
