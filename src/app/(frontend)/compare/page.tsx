import type { Metadata } from "next";
import { CompareClient } from "@/components/CompareClient";
import { getCarModels } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "เปรียบเทียบรุ่นรถอีซูซุ",
  description: "เปรียบเทียบสเปค ราคา เครื่องยนต์ และระบบความปลอดภัยของรถอีซูซุทุกรุ่น",
};

export default async function ComparePage() {
  const models = await getCarModels();
  return <CompareClient models={models} />;
}
