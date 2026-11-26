import type { Metadata } from "next";
import { ServiceBookingClient } from "@/components/ServiceBookingClient";
import { getBranches, getCarModels } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ขอใบเสนอราคา / นัดหมายศูนย์บริการออนไลน์",
  description:
    "ขอใบเสนอราคา นัดทดลองขับ และนัดหมายเข้าศูนย์บริการอีซูซุศาลาเชียงใหม่ ออนไลน์",
};

export default async function ServiceBookingPage() {
  const [branches, models] = await Promise.all([
    getBranches(),
    getCarModels(),
  ]);

  return <ServiceBookingClient branches={branches} models={models} />;
}
