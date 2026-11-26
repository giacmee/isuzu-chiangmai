import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CAR_MODELS } from "@/data/mock-data";
import { ShowroomClient } from "@/components/ShowroomClient";
import { getMediaManifest } from "@/lib/media-store";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CAR_MODELS.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = CAR_MODELS.find((m) => m.slug === slug);
  if (!model) return { title: "ไม่พบรุ่นรถ" };
  return {
    title: `${model.name} ราคาและตารางผ่อน`,
    description: model.description,
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = CAR_MODELS.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  const media = await getMediaManifest();
  return <ShowroomClient model={model} media={media} />;
}
