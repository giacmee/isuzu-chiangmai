"use client";

import Link from "next/link";
import { ExternalLink, Home } from "lucide-react";

export function AdminHeaderActions() {
  return (
    <div className="isuzu-admin-actions">
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="isuzu-admin-btn isuzu-admin-btn--primary"
      >
        <ExternalLink size={14} strokeWidth={2.2} />
        <span>ดูพรีวิวเว็บ</span>
      </a>
      <Link href="/" className="isuzu-admin-btn isuzu-admin-btn--ghost">
        <Home size={14} strokeWidth={2.2} />
        <span>กลับหน้าหลักเว็บ</span>
      </Link>
    </div>
  );
}
