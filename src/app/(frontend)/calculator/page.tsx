import type { Metadata } from "next";
import { CalculatorClient } from "@/components/CalculatorClient";
import { getCarModels } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "คำนวณค่างวดรถอีซูซุ",
  description: "เครื่องมือคำนวณเงินดาวน์และค่างวดรายเดือนสำหรับรถอีซูซุ D-Max, MU-X และรถบรรทุกอีซูซุ",
};

interface PageProps {
  searchParams: Promise<{ model?: string; trim?: string }>;
}

export default async function CalculatorPage({ searchParams }: PageProps) {
  const [{ model, trim }, models] = await Promise.all([
    searchParams,
    getCarModels(),
  ]);
  return (
    <CalculatorClient
      models={models}
      initialModelSlug={model}
      initialTrimId={trim}
    />
  );
}
