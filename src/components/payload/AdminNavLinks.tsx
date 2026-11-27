"use client";

import Link from "next/link";
import { ExternalLink, Home, Images } from "lucide-react";

export function AdminNavLinks() {
  return (
    <div className="isuzu-admin-nav-group">
      <p className="isuzu-admin-nav-title">ทางลัดเว็บไซต์</p>
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="isuzu-admin-nav-link isuzu-admin-nav-link--accent"
      >
        <ExternalLink size={15} />
        <span>ดูพรีวิวเว็บไซต์ (แท็บใหม่)</span>
      </a>
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
