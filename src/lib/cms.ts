import type {
  Article,
  Branch,
  CarCategory,
  CarModel,
  Promotion,
  SalesConsultant,
} from "@/types/database";
import { getPayloadClient } from "@/lib/payload-auth";

type AnyDoc = Record<string, unknown>;

function mapItemStrings(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object" && "item" in entry) {
        return String((entry as { item: unknown }).item ?? "");
      }
      return "";
    })
    .filter(Boolean);
}

function mapCarModel(doc: AnyDoc): CarModel {
  const modelKey =
    typeof doc.model_key === "string" && doc.model_key.trim() !== ""
      ? doc.model_key
      : String(doc.id);

  const categoryObj =
    doc.category && typeof doc.category === "object"
      ? (doc.category as AnyDoc)
      : null;
  const categoryId = categoryObj
    ? String(categoryObj.id)
    : String(doc.category ?? "");
  const categorySlug =
    categoryObj?.slug === "ppv" ? "ppv" : "pickup";

  const rawColors = Array.isArray(doc.colors) ? (doc.colors as AnyDoc[]) : [];
  const colors = rawColors.map((c) => ({
    id:
      typeof c.color_key === "string" && c.color_key.trim() !== ""
        ? c.color_key
        : String(c.id ?? ""),
    model_id: modelKey,
    color_name: String(c.color_name ?? ""),
    hex_code: String(c.hex_code ?? "#111317"),
    extra_price: Number(c.extra_price ?? 0),
  }));

  const rawTrims = Array.isArray(doc.trims) ? (doc.trims as AnyDoc[]) : [];
  const trims = rawTrims
    .filter((t) => t.is_active !== false)
    .map((t) => ({
      id:
        typeof t.trim_key === "string" && t.trim_key.trim() !== ""
          ? t.trim_key
          : String(t.id ?? ""),
      model_id: modelKey,
      name: String(t.name ?? ""),
      price: Number(t.price ?? 0),
      engine: String(t.engine ?? ""),
      transmission: String(t.transmission ?? ""),
      drivetrain: String(t.drivetrain ?? ""),
      is_active: Boolean(t.is_active ?? true),
      specs: {
        engine_displacement: String(t.engine_displacement ?? ""),
        max_power: String(t.max_power ?? ""),
        max_torque: String(t.max_torque ?? ""),
        safety: mapItemStrings(t.safety),
        exterior: mapItemStrings(t.exterior),
        interior: mapItemStrings(t.interior),
      },
    }));

  return {
    id: modelKey,
    category_id: categoryId,
    category_slug: categorySlug,
    name: String(doc.name ?? ""),
    slug: String(doc.slug ?? ""),
    tagline: String(doc.tagline ?? ""),
    description: String(doc.description ?? ""),
    starting_price: Number(doc.starting_price ?? 0),
    brochure_pdf_url: String(doc.brochure_pdf_url ?? ""),
    is_featured: Boolean(doc.is_featured ?? false),
    is_active: Boolean(doc.is_active ?? true),
    trims,
    colors,
  };
}

export async function getCarCategories(): Promise<CarCategory[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "car-categories",
    limit: 50,
    sort: "sort_order",
  });

  return res.docs.map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug === "ppv" ? "ppv" : "pickup",
    sort_order: Number(doc.sort_order ?? 0),
  }));
}

export async function getCarModels(): Promise<CarModel[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "car-models",
    where: {
      is_active: { equals: true },
    },
    limit: 100,
    depth: 1,
    sort: "sort_order",
  });

  return res.docs.map((doc) => mapCarModel(doc as unknown as AnyDoc));
}

export async function getCarModelBySlug(slug: string): Promise<CarModel | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "car-models",
    where: {
      and: [
        { slug: { equals: slug } },
        { is_active: { equals: true } },
      ],
    },
    limit: 1,
    depth: 1,
  });

  const doc = res.docs[0];
  return doc ? mapCarModel(doc as unknown as AnyDoc) : null;
}

export async function getPromotions(): Promise<Promotion[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "promotions",
    where: {
      is_active: { equals: true },
    },
    limit: 50,
    sort: "sort_order",
  });

  return res.docs.map((doc) => ({
    id:
      typeof doc.promo_key === "string" && doc.promo_key.trim() !== ""
        ? doc.promo_key
        : String(doc.id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category as Promotion["category"],
    highlight_badge: doc.highlight_badge,
    summary: doc.summary,
    start_date: doc.start_date,
    end_date: doc.end_date,
    is_active: Boolean(doc.is_active ?? true),
  }));
}

export async function getBranches(): Promise<Branch[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "branches",
    limit: 50,
    sort: "sort_order",
  });

  return res.docs.map((doc) => ({
    id:
      typeof doc.branch_key === "string" && doc.branch_key.trim() !== ""
        ? doc.branch_key
        : String(doc.id),
    name: doc.name,
    slug: doc.slug,
    address: doc.address,
    phone: doc.phone,
    line_oa_url: doc.line_oa_url,
    google_map_url: doc.google_map_url,
    map_embed_url: doc.map_embed_url ?? undefined,
    business_hours: doc.business_hours,
    is_head_office: Boolean(doc.is_head_office ?? false),
    services: mapItemStrings(doc.services),
  }));
}

export async function getArticles(): Promise<Article[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "articles",
    where: {
      is_active: { equals: true },
    },
    limit: 100,
    sort: "-published_at",
  });

  return res.docs.map((doc) => {
    const paragraphs = Array.isArray(doc.content_paragraphs)
      ? doc.content_paragraphs
          .map((p) => (p && typeof p === "object" && "text" in p ? String(p.text ?? "") : ""))
          .filter(Boolean)
      : [];

    return {
      id:
        typeof doc.article_key === "string" && doc.article_key.trim() !== ""
          ? doc.article_key
          : String(doc.id),
      title: doc.title,
      slug: doc.slug,
      category: doc.category as Article["category"],
      excerpt: doc.excerpt,
      content: paragraphs,
      published_at: doc.published_at,
      read_time_minutes: Number(doc.read_time_minutes ?? 3),
      author: doc.author,
      is_featured: Boolean(doc.is_featured ?? false),
      is_active: Boolean(doc.is_active ?? true),
    };
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "articles",
    where: {
      and: [
        { slug: { equals: slug } },
        { is_active: { equals: true } },
      ],
    },
    limit: 1,
  });

  const doc = res.docs[0];
  if (!doc) return null;

  const paragraphs = Array.isArray(doc.content_paragraphs)
    ? doc.content_paragraphs
        .map((p) => (p && typeof p === "object" && "text" in p ? String(p.text ?? "") : ""))
        .filter(Boolean)
    : [];

  return {
    id:
      typeof doc.article_key === "string" && doc.article_key.trim() !== ""
        ? doc.article_key
        : String(doc.id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category as Article["category"],
    excerpt: doc.excerpt,
    content: paragraphs,
    published_at: doc.published_at,
    read_time_minutes: Number(doc.read_time_minutes ?? 3),
    author: doc.author,
    is_featured: Boolean(doc.is_featured ?? false),
    is_active: Boolean(doc.is_active ?? true),
  };
}

export async function getSalesConsultants(): Promise<SalesConsultant[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "sales-consultants",
    where: {
      is_active: { equals: true },
    },
    limit: 100,
    depth: 1,
    sort: "sort_order",
  });

  return res.docs.map((doc) => {
    const branchObj =
      doc.branch && typeof doc.branch === "object"
        ? (doc.branch as unknown as AnyDoc)
        : null;
    const branchId = branchObj
      ? typeof branchObj.branch_key === "string" && branchObj.branch_key.trim() !== ""
        ? branchObj.branch_key
        : String(branchObj.id)
      : String(doc.branch ?? "");
    const branchName = branchObj ? String(branchObj.name ?? "") : "";

    return {
      id: String(doc.id),
      branch_id: branchId,
      branch_name: branchName,
      full_name: doc.full_name,
      nickname: doc.nickname,
      phone: doc.phone,
      line_id: doc.line_id,
      specialty: doc.specialty,
      is_active: Boolean(doc.is_active ?? true),
    };
  });
}

export interface HomeBannerSettings {
  show_hero_text: boolean;
  hero_badge: string;
  hero_title_line1: string;
  hero_title_highlight: string;
  hero_description: string;
  hero_primary_cta_label: string;
  hero_primary_cta_href: string;
}

export const DEFAULT_HOME_SETTINGS: HomeBannerSettings = {
  show_hero_text: true,
  hero_badge: "อีซูซุศาลาเชียงใหม่ — โชว์รูมและศูนย์บริการมาตรฐานครบวงจร",
  hero_title_line1: "เหนือกว่าทุกขีดจำกัด",
  hero_title_highlight: "ISUZU D-MAX & MU-X",
  hero_description:
    "สัมผัสประสบการณ์เลือกรุ่นรถ เปลี่ยนสี คำนวณค่างวด และเปรียบเทียบสเปคได้ทันทีออนไลน์ พร้อมข้อเสนอพิเศษและบริการหลังการขายมาตรฐานศูนย์อีซูซุสำหรับชาวเชียงใหม่",
  hero_primary_cta_label: "สำรวจรุ่นรถทั้งหมด",
  hero_primary_cta_href: "/#models",
};

export async function getHomeSettings(): Promise<HomeBannerSettings> {
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({
      slug: "home-settings",
    })) as unknown as AnyDoc | null;

    if (!doc) return DEFAULT_HOME_SETTINGS;

    return {
      show_hero_text: doc.show_hero_text !== false,
      hero_badge:
        typeof doc.hero_badge === "string"
          ? doc.hero_badge
          : DEFAULT_HOME_SETTINGS.hero_badge,
      hero_title_line1:
        typeof doc.hero_title_line1 === "string"
          ? doc.hero_title_line1
          : DEFAULT_HOME_SETTINGS.hero_title_line1,
      hero_title_highlight:
        typeof doc.hero_title_highlight === "string"
          ? doc.hero_title_highlight
          : DEFAULT_HOME_SETTINGS.hero_title_highlight,
      hero_description:
        typeof doc.hero_description === "string"
          ? doc.hero_description
          : DEFAULT_HOME_SETTINGS.hero_description,
      hero_primary_cta_label:
        typeof doc.hero_primary_cta_label === "string" &&
        doc.hero_primary_cta_label.trim()
          ? doc.hero_primary_cta_label
          : DEFAULT_HOME_SETTINGS.hero_primary_cta_label,
      hero_primary_cta_href:
        typeof doc.hero_primary_cta_href === "string" &&
        doc.hero_primary_cta_href.trim()
          ? doc.hero_primary_cta_href
          : DEFAULT_HOME_SETTINGS.hero_primary_cta_href,
    };
  } catch {
    return DEFAULT_HOME_SETTINGS;
  }
}
