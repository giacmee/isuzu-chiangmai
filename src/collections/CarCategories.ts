import type { CollectionConfig } from "payload";

export const CarCategories: CollectionConfig = {
  slug: "car-categories",
  admin: {
    useAsTitle: "name",
    group: "โชว์รูมและรุ่นรถ",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      label: "ชื่อหมวดหมู่",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "รถกระบะ (pickup)", value: "pickup" },
        { label: "รถอเนกประสงค์ (ppv)", value: "ppv" },
      ],
    },
    {
      name: "sort_order",
      label: "ลำดับการแสดงผล",
      type: "number",
      defaultValue: 0,
    },
  ],
};
