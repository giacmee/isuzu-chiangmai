import type { Metadata } from "next";
import { SalesFinderClient } from "@/components/SalesFinderClient";
import { getBranches, getSalesConsultants } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ค้นหาที่ปรึกษาการขาย",
  description:
    "ติดต่อที่ปรึกษาการขายประจำสาขา อีซูซุศาลาเชียงใหม่ สอบถามโปรโมชั่นและขอใบเสนอราคา",
};

export default async function SalesFinderPage() {
  const [branches, salesConsultants] = await Promise.all([
    getBranches(),
    getSalesConsultants(),
  ]);

  return (
    <SalesFinderClient
      branches={branches}
      salesConsultants={salesConsultants}
    />
  );
}
