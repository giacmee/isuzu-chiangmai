import type { Metadata } from "next";
import { getMediaManifest } from "@/lib/media-store";
import { MediaManagerClient } from "@/components/MediaManagerClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "จัดการรูปภาพและโบรชัวร์ (Admin)",
  description:
    "ระบบจัดการรูปภาพรุ่นรถ สีรถ แบนเนอร์ โปรโมชั่น บทความ และโบรชัวร์ PDF สำหรับอีซูซุศาลาเชียงใหม่",
};

export default async function AdminMediaPage() {
  const manifest = await getMediaManifest();
  return <MediaManagerClient initialManifest={manifest} />;
}
