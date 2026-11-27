"use client";

import Link from "next/link";
import { Home, Images, PanelRight } from "lucide-react";

export function AdminNavLinks() {
  const handleOpenPreview = () => {
    window.dispatchEvent(
      new CustomEvent("isuzu:open-preview", { detail: { path: "/" } })
    );
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
    </div>
  );
}
