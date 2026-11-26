import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, User, Calculator, Wrench } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/cms";
import { formatThaiDate } from "@/lib/format";
import { getMediaManifest } from "@/lib/media-store";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "ไม่พบบทความ" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [article, allArticles, media] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
    getMediaManifest(),
  ]);

  if (!article) {
    notFound();
  }

  const coverImg = media[`article:${article.id}`]?.url;
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 transition hover:text-[#d70015]"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับไปหน้าข่าวสารและบทความ
      </Link>

      <article className="mt-6">
        <span className="inline-block rounded-full bg-[#d70015]/10 px-3 py-1 text-xs font-semibold text-[#d70015]">
          {article.category}
        </span>

        <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-[#111317] sm:text-4xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-neutral-200 pb-6 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-[#d70015]" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#d70015]" />
            {formatThaiDate(article.published_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#d70015]" />
            อ่านประมาณ {article.read_time_minutes} นาที
          </span>
        </div>

        {coverImg && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-[#0d0f12]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImg}
              alt={article.title}
              className="max-h-[440px] w-full object-cover"
            />
          </div>
        )}

        <p className="mt-6 rounded-xl border-l-4 border-[#d70015] bg-[#f4f5f7] p-4 text-sm font-medium leading-relaxed text-[#111317] sm:text-base">
          {article.excerpt}
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-700">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Conversion CTA Box */}
      <div className="mt-12 rounded-2xl bg-[#0d0f12] p-6 text-white sm:p-8">
        <h2 className="font-display text-xl font-bold">
          สนใจรถอีซูซุหรือต้องการนัดหมายศูนย์บริการ?
        </h2>
        <p className="mt-2 text-sm text-neutral-300">
          ทีมงานอีซูซุศาลาเชียงใหม่พร้อมดูแลทุกขั้นตอน ตั้งแต่คำนวณค่างวด ทดลองขับ จนถึงบริการหลังการขาย
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/service/booking"
            className="inline-flex items-center gap-2 rounded-lg bg-[#d70015] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a80010]"
          >
            <Wrench className="h-4 w-4" />
            ขอใบเสนอราคา / นัดหมายศูนย์
          </Link>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Calculator className="h-4 w-4" />
            คำนวณค่างวดออนไลน์
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mt-14 border-t border-neutral-200 pt-10">
          <h2 className="font-display text-xl font-bold text-[#111317]">
            บทความอื่นที่น่าสนใจ
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-[#d70015]"
              >
                <span className="text-[11px] font-semibold text-[#d70015]">
                  {item.category}
                </span>
                <h3 className="mt-1.5 font-display text-sm font-bold leading-snug text-[#111317]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-500">
                  {formatThaiDate(item.published_at)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
