"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Images, LogOut, PanelRight } from "lucide-react";
import { logoutPayloadAdmin } from "./logout";

export function AdminNavLinks() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleOpenPreview = () => {
    window.dispatchEvent(
      new CustomEvent("isuzu:open-preview", { detail: { path: "/" } })
    );
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await logoutPayloadAdmin();
  };

  return (
    <div className="isuzu-admin-nav-group">
      <p className="isuzu-admin-nav-title">ทางลัดเว็บไซต์</p>
      <button
        type="button"
        onClick={handleOpenPreview}
        className="isuzu-admin-nav-link isuzu-admin-nav-link--accent"
      >
        <PanelRight size={15} />
        <span>ดูพรีวิวเว็บไซต์ (แท็บด้านข้าง)</span>
      </button>
      <Link href="/" className="isuzu-admin-nav-link">
        <Home size={15} />
        <span>กลับหน้าหลักเว็บไซต์</span>
      </Link>
      <Link href="/media-manager" className="isuzu-admin-nav-link">
        <Images size={15} />
        <span>จัดการรูปภาพ &amp; 360°</span>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="isuzu-admin-nav-link isuzu-admin-nav-link--accent"
      >
        <LogOut size={15} />
        <span>{loggingOut ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}</span>
      </button>
    </div>
  );
}
