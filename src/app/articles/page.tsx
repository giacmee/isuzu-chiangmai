import type { Metadata } from "next";
import { ARTICLES } from "@/data/mock-data";
import { ArticlesClient } from "@/components/ArticlesClient";
import { getMediaManifest } from "@/lib/media-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ข่าวสารและบทความ",
  description:
    "ข่าวสารโชว์รูม อีซูซุศาลาเชียงใหม่ รีวิวรถอีซูซุรุ่นใหม่ และเคล็ดลับการดูแลรักษารถยนต์",
};

export default async function ArticlesPage() {
  const activeArticles = ARTICLES.filter((a) => a.is_active);
  const media = await getMediaManifest();
  return <ArticlesClient articles={activeArticles} media={media} />;
}
