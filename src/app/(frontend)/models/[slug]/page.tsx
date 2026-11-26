import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCarModelBySlug } from "@/lib/cms";
import { ShowroomClient } from "@/components/ShowroomClient";
import { getMediaManifest } from "@/lib/media-store";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await getCarModelBySlug(slug);
  if (!model) return { title: "ไม่พบรุ่นรถ" };
  return {
    title: `${model.name} ราคาและตารางผ่อน`,
    description: model.description,
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [model, media] = await Promise.all([
    getCarModelBySlug(slug),
    getMediaManifest(),
  ]);

  if (!model) {
    notFound();
  }

  return <ShowroomClient model={model} media={media} />;
}
