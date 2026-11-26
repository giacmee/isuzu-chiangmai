import type { CollectionConfig } from "payload";

export const SalesConsultants: CollectionConfig = {
  slug: "sales-consultants",
  admin: {
    useAsTitle: "full_name",
    group: "สาขาและทีมงาน",
    defaultColumns: ["nickname", "full_name", "branch", "phone", "is_active"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "full_name",
      label: "ชื่อ - นามสกุล",
      type: "text",
      required: true,
    },
    {
      name: "nickname",
      label: "ชื่อเล่น / ชื่อที่แสดง",
      type: "text",
      required: true,
    },
    {
      name: "branch",
      label: "สาขาประจำ",
      type: "relationship",
      relationTo: "branches",
      required: true,
    },
    {
      name: "phone",
      label: "เบอร์โทรศัพท์",
      type: "text",
      required: true,
    },
    {
      name: "line_id",
      label: "LINE ID / OA",
      type: "text",
      required: true,
    },
    {
      name: "specialty",
      label: "ความเชี่ยวชาญ",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
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
  ],
};
