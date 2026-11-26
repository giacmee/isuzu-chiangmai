import type { Metadata } from "next";
import { BranchesClient } from "@/components/BranchesClient";
import { getBranches } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "สาขาและศูนย์บริการในเชียงใหม่",
  description:
    "แผนที่ Google Maps ที่อยู่ เบอร์โทรศัพท์ และเวลาทำการของโชว์รูมและศูนย์บริการ อีซูซุศาลาเชียงใหม่ ทุกสาขา",
};

export default async function BranchesPage() {
  const branches = await getBranches();
  return <BranchesClient branches={branches} />;
}
