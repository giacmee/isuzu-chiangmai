import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    group: "การตลาดและข่าวสาร",
    defaultColumns: ["title", "category", "published_at", "is_featured", "is_active"],
    preview: (doc) => (doc?.slug ? `/articles/${String(doc.slug)}` : "/articles"),
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "article_key",
      label: "รหัสบทความ (Article Key สำหรับ Media Slot)",
      type: "text",
      required: true,
    },
    {
      name: "title",
      label: "หัวข้อบทความ",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "category",
      label: "หมวดหมู่",
      type: "select",
      required: true,
      options: [
        { label: "ข่าวสารโชว์รูม", value: "ข่าวสารโชว์รูม" },
        { label: "รีวิวรุ่นรถ", value: "รีวิวรุ่นรถ" },
        { label: "เคล็ดลับดูแลรถ", value: "เคล็ดลับดูแลรถ" },
        { label: "กิจกรรมลูกค้า", value: "กิจกรรมลูกค้า" },
      ],
    },
    {
      name: "excerpt",
      label: "บทคัดย่อ",
      type: "textarea",
      required: true,
    },
    {
      name: "content_paragraphs",
      label: "เนื้อหาบทความ (แบ่งตามย่อหน้า)",
      type: "array",
      fields: [
        {
          name: "text",
          label: "ย่อหน้า",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "published_at",
          label: "วันที่เผยแพร่ (YYYY-MM-DD)",
          type: "text",
          required: true,
        },
        {
          name: "read_time_minutes",
          label: "เวลาอ่าน (นาที)",
          type: "number",
          defaultValue: 3,
        },
        {
          name: "author",
          label: "ผู้เขียน",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "is_featured",
          label: "บทความแนะนำ",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "is_active",
          label: "เปิดเผยแพร่",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
};
