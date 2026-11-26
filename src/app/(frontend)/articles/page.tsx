import type { Metadata } from "next";
import { ArticlesClient } from "@/components/ArticlesClient";
import { getArticles } from "@/lib/cms";
import { getMediaManifest } from "@/lib/media-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ข่าวสารและบทความ",
  description:
    "ข่าวสารโชว์รูม อีซูซุศาลาเชียงใหม่ รีวิวรถอีซูซุรุ่นใหม่ และเคล็ดลับการดูแลรักษารถยนต์",
};

export default async function ArticlesPage() {
  const [activeArticles, media] = await Promise.all([
    getArticles(),
    getMediaManifest(),
  ]);
  return <ArticlesClient articles={activeArticles} media={media} />;
}
