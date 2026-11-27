import { getPayload } from "payload";
import config from "./payload.config";
import { DEFAULT_HERO_SLIDES } from "./lib/home-defaults";
import {
  ARTICLES,
  BRANCHES,
  CAR_CATEGORIES,
  CAR_MODELS,
  PROMOTIONS,
  SALES_CONSULTANTS,
} from "./data/mock-data";

async function seed() {
  const payload = await getPayload({ config });

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@isuzuchiangmai.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "IsuzuSala2026!";

  const summary = {
    users: { created: 0, skipped: 0 },
    categories: { created: 0, skipped: 0 },
    models: { created: 0, skipped: 0 },
    promotions: { created: 0, skipped: 0 },
    branches: { created: 0, skipped: 0 },
    sales: { created: 0, skipped: 0 },
    articles: { created: 0, skipped: 0 },
  };

  // 1. Admin User
  const existingUsers = await payload.find({
    collection: "users",
    where: { email: { equals: adminEmail } },
    limit: 1,
  });

  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: adminEmail,
        password: adminPassword,
        name: "ผู้ดูแลระบบ อีซูซุศาลาเชียงใหม่",
        role: "admin",
      },
    });
    summary.users.created++;
  } else {
    summary.users.skipped++;
  }

  // 2. Car Categories
  const categoryIdBySlug = new Map<string, number | string>();
  for (const cat of CAR_CATEGORIES) {
    const existing = await payload.find({
      collection: "car-categories",
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: "car-categories",
        data: {
          name: cat.name,
          slug: cat.slug,
          sort_order: cat.sort_order,
        },
      });
      categoryIdBySlug.set(cat.slug, created.id);
      summary.categories.created++;
    } else {
      categoryIdBySlug.set(cat.slug, existing.docs[0].id);
      summary.categories.skipped++;
    }
  }

  // 3. Car Models
  for (const [index, model] of CAR_MODELS.entries()) {
    const existing = await payload.find({
      collection: "car-models",
      where: { slug: { equals: model.slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      const categoryId = categoryIdBySlug.get(model.category_slug);
      if (!categoryId) {
        throw new Error(`Missing category for slug ${model.category_slug}`);
      }

      await payload.create({
        collection: "car-models",
        data: {
          model_key: model.id,
          name: model.name,
          slug: model.slug,
          category: categoryId as number,
          tagline: model.tagline,
          description: model.description,
          starting_price: model.starting_price,
          brochure_pdf_url: model.brochure_pdf_url,
          is_featured: model.is_featured,
          is_active: model.is_active,
          sort_order: index,
          colors: model.colors.map((c) => ({
            color_key: c.id,
            color_name: c.color_name,
            hex_code: c.hex_code,
            extra_price: c.extra_price,
          })),
          trims: model.trims.map((t) => ({
            trim_key: t.id,
            name: t.name,
            price: t.price,
            engine: t.engine,
            transmission: t.transmission,
            drivetrain: t.drivetrain,
            is_active: t.is_active,
            engine_displacement: t.specs.engine_displacement,
            max_power: t.specs.max_power,
            max_torque: t.specs.max_torque,
            safety: t.specs.safety.map((item) => ({ item })),
            exterior: t.specs.exterior.map((item) => ({ item })),
            interior: t.specs.interior.map((item) => ({ item })),
          })),
        },
      });
      summary.models.created++;
    } else {
      summary.models.skipped++;
    }
  }

  // 4. Promotions
  for (const [index, promo] of PROMOTIONS.entries()) {
    const existing = await payload.find({
      collection: "promotions",
      where: { slug: { equals: promo.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "promotions",
        data: {
          promo_key: promo.id,
          title: promo.title,
          slug: promo.slug,
          category: promo.category,
          highlight_badge: promo.highlight_badge,
          summary: promo.summary,
          start_date: promo.start_date,
          end_date: promo.end_date,
          is_active: promo.is_active,
          sort_order: index,
        },
      });
      summary.promotions.created++;
    } else {
      summary.promotions.skipped++;
    }
  }

  // 5. Branches
  const branchIdByKey = new Map<string, number | string>();
  for (const [index, branch] of BRANCHES.entries()) {
    const existing = await payload.find({
      collection: "branches",
      where: { slug: { equals: branch.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: "branches",
        data: {
          branch_key: branch.id,
          name: branch.name,
          slug: branch.slug,
          address: branch.address,
          phone: branch.phone,
          line_oa_url: branch.line_oa_url,
          google_map_url: branch.google_map_url,
          map_embed_url: branch.map_embed_url,
          business_hours: branch.business_hours,
          is_head_office: Boolean(branch.is_head_office),
          services: (branch.services ?? []).map((item) => ({ item })),
          sort_order: index,
        },
      });
      branchIdByKey.set(branch.id, created.id);
      summary.branches.created++;
    } else {
      branchIdByKey.set(branch.id, existing.docs[0].id);
      summary.branches.skipped++;
    }
  }

  // 6. Sales Consultants
  for (const [index, sales] of SALES_CONSULTANTS.entries()) {
    const existing = await payload.find({
      collection: "sales-consultants",
      where: {
        and: [
          { full_name: { equals: sales.full_name } },
          { nickname: { equals: sales.nickname } },
        ],
      },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      const branchId = branchIdByKey.get(sales.branch_id);
      if (!branchId) {
        throw new Error(`Missing branch for key ${sales.branch_id}`);
      }
      await payload.create({
        collection: "sales-consultants",
        data: {
          full_name: sales.full_name,
          nickname: sales.nickname,
          branch: branchId as number,
          phone: sales.phone,
          line_id: sales.line_id,
          specialty: sales.specialty,
          is_active: sales.is_active,
          sort_order: index,
        },
      });
      summary.sales.created++;
    } else {
      summary.sales.skipped++;
    }
  }

  // 7. Articles
  for (const article of ARTICLES) {
    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: article.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "articles",
        data: {
          article_key: article.id,
          title: article.title,
          slug: article.slug,
          category: article.category,
          excerpt: article.excerpt,
          content_paragraphs: article.content.map((text) => ({ text })),
          published_at: article.published_at,
          read_time_minutes: article.read_time_minutes,
          author: article.author,
          is_featured: article.is_featured,
          is_active: article.is_active,
        },
      });
      summary.articles.created++;
    } else {
      summary.articles.skipped++;
    }
  }

  // 8. HomeSettings Global (Hero Banner Slides + Auto-Play)
  const homeSettings = (await payload.findGlobal({
    slug: "home-settings",
  })) as unknown as { hero_slides?: unknown[] } | null;

  if (!homeSettings?.hero_slides || homeSettings.hero_slides.length === 0) {
    await payload.updateGlobal({
      slug: "home-settings",
      data: {
        hero_auto_slide: true,
        hero_auto_slide_interval: 5000,
        hero_slides: DEFAULT_HERO_SLIDES,
      },
    });
    console.log("Seeded default hero_slides into home-settings global.");
  }

  console.log("Payload CMS Seed Summary:", JSON.stringify(summary, null, 2));
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
