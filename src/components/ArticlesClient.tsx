"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import type { Article } from "@/types/database";
import { formatThaiDate } from "@/lib/format";
import type { MediaManifest } from "@/lib/media-store";

const CATEGORIES = [
  "ทั้งหมด",
  "ข่าวสารโชว์รูม",
  "รีวิวรุ่นรถ",
  "เคล็ดลับดูแลรถ",
  "กิจกรรมลูกค้า",
] as const;

export function ArticlesClient({
  articles,
  media = {},
}: {
  articles: Article[];
  media?: MediaManifest;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("ทั้งหมด");

  const featured = articles.find((a) => a.is_featured) ?? articles[0];

  const filtered = articles.filter((article) => {
    const matchesCategory = category === "ทั้งหมด" || article.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
          NEWS, REVIEWS &amp; TIPS
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-[#111317] sm:text-4xl">
          ข่าวสาร รีวิวรุ่นรถ และเคล็ดลับดูแลรถอีซูซุ
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          อัปเดตข่าวสารโชว์รูม อีซูซุศาลาเชียงใหม่ รีวิวสมรรถนะรถรุ่นใหม่
          และคำแนะนำการดูแลรักษารถจากช่างเทคนิคมาตรฐาน
        </p>
      </div>

      {/* Featured Article Banner */}
      {featured && category === "ทั้งหมด" && query.trim() === "" && (
        <Link
          href={`/articles/${featured.slug}`}
          className="group mt-8 block overflow-hidden rounded-2xl border border-neutral-200 bg-[#0d0f12] text-white shadow-sm transition hover:shadow-lg"
        >
          <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#d70015] px-3 py-1 text-xs font-semibold text-white">
                  บทความแนะนำ
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-200">
                  {featured.category}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-white transition group-hover:text-[#ff4d5e] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#d70015]" />
                  {formatThaiDate(featured.published_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#d70015]" />
                  อ่านประมาณ {featured.read_time_minutes} นาที
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 lg:col-span-4 lg:items-center lg:text-center">
              {media[`article:${featured.id}`]?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media[`article:${featured.id}`].url}
                  alt={featured.title}
                  className="mb-4 aspect-[16/10] w-full rounded-lg object-cover"
                />
              ) : (
                <Newspaper className="h-10 w-10 text-[#d70015]" />
              )}
              <p className="mt-2 text-xs text-neutral-300">โดย {featured.author}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#d70015] px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-[#a80010]">
                อ่านบทความเต็ม
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Search & Category Filter */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  isActive
                    ? "bg-[#d70015] text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:border-[#d70015] hover:text-[#d70015]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาบทความหรือรุ่นรถ..."
            className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#d70015] focus:outline-none"
          />
        </div>
      </div>

      {/* Article Cards Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-[#f4f5f7] p-12 text-center">
          <p className="font-display text-base font-bold text-[#111317]">
            ไม่พบบทความที่ตรงกับคำค้นหา
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่ &ldquo;ทั้งหมด&rdquo;
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => {
            const coverImg = media[`article:${article.id}`]?.url;
            return (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-[#d70015]/50 hover:shadow-md"
            >
              <div>
                {coverImg && (
                  <Link href={`/articles/${article.slug}`} className="block aspect-[16/9] w-full overflow-hidden bg-[#0d0f12]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImg}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#f4f5f7] px-2.5 py-1 text-xs font-semibold text-[#d70015]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                      <Clock className="h-3.5 w-3.5" />
                      {article.read_time_minutes} นาที
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-[#111317] transition group-hover:text-[#d70015]">
                    <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 px-6 py-4 text-xs">
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  {formatThaiDate(article.published_at)}
                </span>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-[#d70015] hover:underline"
                >
                  อ่านต่อ
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
