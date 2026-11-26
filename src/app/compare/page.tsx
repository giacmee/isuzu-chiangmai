import type { Metadata } from "next";
import { CompareClient } from "@/components/CompareClient";

export const metadata: Metadata = {
  title: "เปรียบเทียบรุ่นรถอีซูซุ",
  description: "เปรียบเทียบสเปค ราคา เครื่องยนต์ และระบบความปลอดภัยของรถอีซูซุทุกรุ่น",
};

export default function ComparePage() {
  return <CompareClient />;
}
