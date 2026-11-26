import type { CollectionConfig } from "payload";

export const Promotions: CollectionConfig = {
  slug: "promotions",
  admin: {
    useAsTitle: "title",
    group: "การตลาดและข่าวสาร",
    defaultColumns: ["title", "category", "highlight_badge", "end_date", "is_active"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "promo_key",
      label: "รหัสโปรโมชั่น (Promo Key สำหรับ Media Slot)",
      type: "text",
      required: true,
    },
    {
      name: "title",
      label: "หัวข้อโปรโมชั่น",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
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
        { label: "รถกระบะ", value: "รถกระบะ" },
        { label: "รถอเนกประสงค์", value: "รถอเนกประสงค์" },
        { label: "ศูนย์บริการ", value: "ศูนย์บริการ" },
      ],
    },
    {
      name: "highlight_badge",
      label: "ป้ายกำกับ (Badge)",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      label: "รายละเอียดโดยย่อ",
      type: "textarea",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "start_date",
          label: "วันที่เริ่มต้น (YYYY-MM-DD)",
          type: "text",
          required: true,
        },
        {
          name: "end_date",
          label: "วันที่สิ้นสุด (YYYY-MM-DD)",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "is_active",
          label: "เปิดใช้งาน",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "sort_order",
          label: "ลำดับการแสดงผล",
          type: "number",
          defaultValue: 0,
        },
      ],
    },
  ],
};
