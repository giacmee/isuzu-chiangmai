import type { Metadata } from "next";
import { BRANCHES } from "@/data/mock-data";
import { BranchesClient } from "@/components/BranchesClient";

export const metadata: Metadata = {
  title: "สาขาและศูนย์บริการในเชียงใหม่",
  description:
    "แผนที่ Google Maps ที่อยู่ เบอร์โทรศัพท์ และเวลาทำการของโชว์รูมและศูนย์บริการ อีซูซุศาลาเชียงใหม่ ทุกสาขา",
};

export default function BranchesPage() {
  return <BranchesClient branches={BRANCHES} />;
}
