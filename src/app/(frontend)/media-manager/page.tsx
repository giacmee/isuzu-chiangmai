import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMediaManifest } from "@/lib/media-store";
import { getArticles, getCarModels, getPromotions } from "@/lib/cms";
import { getCurrentAdminUser } from "@/lib/payload-auth";
import { MediaManagerClient } from "@/components/MediaManagerClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "จัดการรูปภาพและโบรชัวร์ (Admin)",
  description:
    "ระบบจัดการรูปภาพรุ่นรถ สีรถ แบนเนอร์ โปรโมชั่น บทความ และโบรชัวร์ PDF สำหรับอีซูซุศาลาเชียงใหม่",
};

export default async function MediaManagerPage() {
  const user = await getCurrentAdminUser();
  if (!user) {
    redirect("/admin/login?redirect=/media-manager");
  }

  const [manifest, models, promotions, articles] = await Promise.all([
    getMediaManifest(),
    getCarModels(),
    getPromotions(),
    getArticles(),
  ]);

  return (
    <MediaManagerClient
      initialManifest={manifest}
      models={models}
      promotions={promotions}
      articles={articles}
      userEmail={user.email}
    />
  );
}
