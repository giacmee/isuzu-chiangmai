import type { CollectionConfig } from "payload";

export const CarModels: CollectionConfig = {
  slug: "car-models",
  admin: {
    useAsTitle: "name",
    group: "โชว์รูมและรุ่นรถ",
    defaultColumns: ["name", "slug", "starting_price", "is_featured", "is_active"],
    preview: (doc) => (doc?.slug ? `/models/${String(doc.slug)}` : "/"),
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "model_key",
      label: "รหัสอ้างอิงเดิม (Model Key)",
      type: "text",
      admin: {
        description: "ใช้จับคู่กับ slotKey ในระบบจัดการสื่อ เช่น model-dmax-ev",
      },
    },
    {
      name: "name",
      label: "ชื่อรุ่นรถ",
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
      label: "หมวดหมู่รถ",
      type: "relationship",
      relationTo: "car-categories",
      required: true,
    },
    {
      name: "tagline",
      label: "คำโปรย",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "รายละเอียด",
      type: "textarea",
      required: true,
    },
    {
      name: "starting_price",
      label: "ราคาเริ่มต้น (บาท)",
      type: "number",
      required: true,
    },
    {
      name: "brochure_pdf_url",
      label: "ลิงก์โบรชัวร์สำรอง",
      type: "text",
      defaultValue: "",
    },
    {
      type: "row",
      fields: [
        {
          name: "is_featured",
          label: "รุ่นแนะนำ",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "is_active",
          label: "เปิดแสดงผล",
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
    {
      name: "colors",
      label: "ตัวเลือกสีรถ",
      type: "array",
      fields: [
        {
          name: "color_key",
          label: "รหัสสี (Color Key สำหรับ Media Slot)",
          type: "text",
          required: true,
        },
        {
          name: "color_name",
          label: "ชื่อสี",
          type: "text",
          required: true,
        },
        {
          name: "hex_code",
          label: "รหัสสี Hex",
          type: "text",
          required: true,
        },
        {
          name: "extra_price",
          label: "ราคาเพิ่มพิเศษ (บาท)",
          type: "number",
          defaultValue: 0,
        },
      ],
    },
    {
      name: "trims",
      label: "รุ่นย่อย (Trims)",
      type: "array",
      fields: [
        {
          name: "trim_key",
          label: "รหัสรุ่นย่อย (Trim Key)",
          type: "text",
          required: true,
        },
        {
          name: "name",
          label: "ชื่อรุ่นย่อย",
          type: "text",
          required: true,
        },
        {
          name: "price",
          label: "ราคา (บาท)",
          type: "number",
          required: true,
        },
        {
          name: "engine",
          label: "เครื่องยนต์",
          type: "text",
          required: true,
        },
        {
          name: "transmission",
          label: "ระบบส่งกำลัง",
          type: "text",
          required: true,
        },
        {
          name: "drivetrain",
          label: "ระบบขับเคลื่อน",
          type: "text",
          required: true,
        },
        {
          name: "is_active",
          label: "เปิดจำหน่าย",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "engine_displacement",
          label: "ความจุกระบอกสูบ / แบตเตอรี่",
          type: "text",
          required: true,
        },
        {
          name: "max_power",
          label: "กำลังสูงสุด",
          type: "text",
          required: true,
        },
        {
          name: "max_torque",
          label: "แรงบิดสูงสุด",
          type: "text",
          required: true,
        },
        {
          name: "safety",
          label: "ระบบความปลอดภัย",
          type: "array",
          fields: [
            {
              name: "item",
              label: "รายการ",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "exterior",
          label: "อุปกรณ์ภายนอก",
          type: "array",
          fields: [
            {
              name: "item",
              label: "รายการ",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "interior",
          label: "อุปกรณ์ภายในและเทคโนโลยี",
          type: "array",
          fields: [
            {
              name: "item",
              label: "รายการ",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
