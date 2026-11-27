import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  GitCompare,
  ShieldCheck,
  Wrench,
  Sparkles,
  Users,
  CalendarCheck,
} from "lucide-react";
import { HomeLineup } from "@/components/HomeLineup";
import {
  getCarCategories,
  getCarModels,
  getHomeSettings,
  getPromotions,
} from "@/lib/cms";
import { getMediaManifest } from "@/lib/media-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, models, promotions, media, homeSettings] =
    await Promise.all([
      getCarCategories(),
      getCarModels(),
      getPromotions(),
      getMediaManifest(),
      getHomeSettings(),
    ]);
  const heroEntry = media["hero_banner"];
  const heroYoutube = media["hero_youtube"];
  const isHeroVideo = Boolean(heroEntry?.mimeType?.startsWith("video/"));

  return (
    <div>
      {/* Hero Section สไตล์ isuzu-tis.com */}
      <section className="relative overflow-hidden bg-[#0d0f12] text-white">
        {isHeroVideo && heroEntry?.url ? (
          <>
            <video
              src={heroEntry.url}
              autoPlay
              muted
              loop
              playsInline
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/75 to-[#0d0f12]/35" />
          </>
        ) : heroYoutube?.mimeType === "text/youtube" && heroYoutube.filename ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${heroYoutube.filename}?autoplay=1&mute=1&loop=1&playlist=${heroYoutube.filename}&controls=0&rel=0&playsinline=1&modestbranding=1`}
              title="ISUZU Hero Video"
              allow="autoplay; encrypted-media"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 opacity-50"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/75 to-[#0d0f12]/35" />
          </>
        ) : heroEntry?.url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroEntry.url}
              alt="อีซูซุศาลาเชียงใหม่"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/80 to-[#0d0f12]/40" />
          </>
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 80% 25%, #d70015 0%, transparent 45%), radial-gradient(circle at 15% 85%, #374151 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          {homeSettings.show_hero_text ? (
            <div className="max-w-3xl">
              {homeSettings.hero_badge.trim() !== "" && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wide text-neutral-200">
                  <span className="h-2 w-2 rounded-full bg-[#d70015]" />
                  {homeSettings.hero_badge}
                </span>
              )}
              {(homeSettings.hero_title_line1.trim() !== "" ||
                homeSettings.hero_title_highlight.trim() !== "") && (
                <h1 className="mt-6 font-display text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  {homeSettings.hero_title_line1}
                  {homeSettings.hero_title_highlight.trim() !== "" && (
                    <span className="block text-[#d70015]">
                      {homeSettings.hero_title_highlight}
                    </span>
                  )}
                </h1>
              )}
              {homeSettings.hero_description.trim() !== "" && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                  {homeSettings.hero_description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={homeSettings.hero_primary_cta_href}
                  className="btn-spring group inline-flex items-center gap-2 rounded-lg bg-[#d70015] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(215,0,21,0.38)] hover:bg-[#b80012]"
                >
                  {homeSettings.hero_primary_cta_label}
                  <ArrowRight className="spring-transition h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/calculator"
                  className="btn-spring inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10"
                >
                  <Calculator className="h-4 w-4 text-[#d70015]" />
                  คำนวณค่างวด
                </Link>
                <Link
                  href="/compare"
                  className="btn-spring inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10"
                >
                  <GitCompare className="h-4 w-4 text-neutral-300" />
                  เปรียบเทียบรุ่นรถ
                </Link>
              </div>
            </div>
          ) : (
            <div className="min-h-[260px] sm:min-h-[340px]" />
          )}

          {/* Quick Action Strip */}
          <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/models/d-max-hi-lander"
              className="card-spring group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#d70015] hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-neutral-400">Interactive Showroom</p>
                <p className="font-display text-sm font-semibold text-white">ทดลองเลือกสีรถและรุ่นย่อย</p>
              </div>
              <ArrowRight className="spring-transition h-4 w-4 text-[#d70015] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/calculator"
              className="card-spring group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#d70015] hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-neutral-400">Finance Tool</p>
                <p className="font-display text-sm font-semibold text-white">คำนวณเงินดาวน์ &amp; ผ่อนรายเดือน</p>
              </div>
              <Calculator className="spring-transition h-4 w-4 text-[#d70015] transition-transform duration-300 group-hover:scale-115" />
            </Link>
            <Link
              href="/service/booking"
              className="card-spring group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#d70015] hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-neutral-400">After-Sales Service</p>
                <p className="font-display text-sm font-semibold text-white">นัดหมายเช็คระยะ / ซ่อมสีตัวถัง</p>
              </div>
              <CalendarCheck className="spring-transition h-4 w-4 text-[#d70015] transition-transform duration-300 group-hover:scale-115" />
            </Link>
            <Link
              href="/sales"
              className="card-spring group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#d70015] hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-neutral-400">Sales Consultant</p>
                <p className="font-display text-sm font-semibold text-white">ค้นหาที่ปรึกษาการขายประจำสาขา</p>
              </div>
              <Users className="spring-transition h-4 w-4 text-[#d70015] transition-transform duration-300 group-hover:scale-115" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Lineup Section */}
      <HomeLineup categories={categories} models={models} media={media} />

      {/* Promotions Section */}
      <section id="promotions" className="bg-[#f4f5f7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
                SPECIAL OFFERS
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-[#111317]">
                โปรโมชั่นและข้อเสนอพิเศษประจำเดือน
              </h2>
            </div>
            <Link
              href="/service/booking"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#d70015] hover:underline"
            >
              ขอรับข้อเสนอพิเศษ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {promotions.map((promo) => {
              const promoImg = media[`promo:${promo.id}`]?.url;
              return (
              <div
                key={promo.id}
                className="card-spring group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white hover:border-[#d70015]/40 hover:shadow-[0_16px_32px_rgba(17,19,23,0.1)]"
              >
                <div>
                  {promoImg && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#0d0f12]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={promoImg}
                        alt={promo.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#d70015]/10 px-3 py-1 text-xs font-semibold text-[#d70015]">
                        {promo.category}
                      </span>
                      <span className="text-xs font-medium text-neutral-500">
                        {promo.highlight_badge}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug text-[#111317]">
                      {promo.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                      {promo.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 px-6 py-4">
                  <span className="text-xs text-neutral-400">
                    ถึง {promo.end_date}
                  </span>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#111317] hover:text-[#d70015]"
                  >
                    คำนวณค่างวดโปรนี้
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* After-Sales & Dealer Strength Section (จุดแข็งเดิมของ isuzuchiangmai.com) */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-[#d70015] uppercase">
              AFTER-SALES EXCELLENCE
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-[#111317]">
              มาตรฐานบริการหลังการขาย อีซูซุศาลาเชียงใหม่
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#d70015]/10 text-[#d70015]">
                <Wrench className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">
                เครื่องมือวินิจฉัยอัจฉริยะ GIDSS
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                ตรวจเช็คระบบเครื่องยนต์และไฟฟ้าอย่างแม่นยำโดยทีมช่างผู้ชำนาญการที่ผ่านการรับรองมาตรฐานจากตรีเพชรอีซูซุ
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#d70015]/10 text-[#d70015]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">
                ศูนย์ซ่อมสีและตัวถัง Sala Faster Paint
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                บริการซ่อมสีและตัวถังมาตรฐานโรงงาน ใช้สีสูตรน้ำเป็นมิตรต่อสิ่งแวดล้อม พร้อมรับประกันงานซ่อมและอะไหล่แท้
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#d70015]/10 text-[#d70015]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">
                บริการครบวงจร Trade-in / พ.ร.บ. / ประกันภัย
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                ประเมินราคาแลกเปลี่ยนรถเก่าให้ราคาสูง พร้อมดูแลต่อภาษี พ.ร.บ. และประกันภัยรถยนต์ครบจบในที่เดียว
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
