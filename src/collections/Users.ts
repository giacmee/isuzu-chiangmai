import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "ระบบและผู้ดูแล",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      label: "ชื่อผู้ใช้งาน",
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: "บทบาท",
      type: "select",
      required: true,
      defaultValue: "admin",
      options: [
        { label: "ผู้ดูแลระบบ (Admin)", value: "admin" },
        { label: "ผู้แก้ไขเนื้อหา (Editor)", value: "editor" },
        { label: "ฝ่ายขาย (Sales)", value: "sales" },
      ],
    },
  ],
};
