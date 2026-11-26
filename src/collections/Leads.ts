import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "customer_name",
    group: "ข้อมูลลูกค้า (Step 4)",
    defaultColumns: ["customer_name", "phone", "branch", "car_model", "status"],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "customer_name",
      label: "ชื่อ - นามสกุล",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "เบอร์โทรศัพท์",
      type: "text",
      required: true,
    },
    {
      name: "branch",
      label: "สาขาที่สะดวก",
      type: "relationship",
      relationTo: "branches",
    },
    {
      name: "car_model",
      label: "รุ่นรถที่สนใจ",
      type: "relationship",
      relationTo: "car-models",
    },
    {
      name: "notes",
      label: "รายละเอียดเพิ่มเติม / LINE ID",
      type: "textarea",
    },
    {
      name: "status",
      label: "สถานะการติดตาม",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "รอดำเนินการ (New)", value: "new" },
        { label: "ติดต่อแล้ว (Contacted)", value: "contacted" },
        { label: "ปิดการขาย / เสร็จสิ้น (Closed)", value: "closed" },
      ],
    },
    {
      name: "calculator_snapshot",
      label: "ข้อมูลคำนวณค่างวด (JSON)",
      type: "json",
    },
  ],
};
