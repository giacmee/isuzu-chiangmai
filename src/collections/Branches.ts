import type { CollectionConfig } from "payload";

export const Branches: CollectionConfig = {
  slug: "branches",
  admin: {
    useAsTitle: "name",
    group: "สาขาและทีมงาน",
    defaultColumns: ["name", "phone", "is_head_office", "sort_order"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "branch_key",
      label: "รหัสสาขา (Branch Key)",
      type: "text",
      required: true,
    },
    {
      name: "name",
      label: "ชื่อสาขา",
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
      name: "address",
      label: "ที่อยู่",
      type: "textarea",
      required: true,
    },
    {
      name: "phone",
      label: "เบอร์โทรศัพท์",
      type: "text",
      required: true,
    },
    {
      name: "line_oa_url",
      label: "ลิงก์ LINE OA",
      type: "text",
      required: true,
    },
    {
      name: "google_map_url",
      label: "ลิงก์ Google Maps",
      type: "text",
      required: true,
    },
    {
      name: "map_embed_url",
      label: "ลิงก์ Google Maps Embed",
      type: "text",
    },
    {
      name: "business_hours",
      label: "เวลาทำการ",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "is_head_office",
          label: "สำนักงานใหญ่",
          type: "checkbox",
          defaultValue: false,
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
      name: "services",
      label: "บริการประจำสาขา",
      type: "array",
      fields: [
        {
          name: "item",
          label: "บริการ",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
