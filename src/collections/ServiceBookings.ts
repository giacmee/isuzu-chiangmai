import type { CollectionConfig } from "payload";

export const ServiceBookings: CollectionConfig = {
  slug: "service-bookings",
  admin: {
    useAsTitle: "customer_name",
    group: "ข้อมูลลูกค้า (Step 4)",
    defaultColumns: ["customer_name", "phone", "service_type", "preferred_date", "status"],
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
      name: "service_type",
      label: "ประเภทงานบริการ",
      type: "text",
      required: true,
    },
    {
      name: "license_plate",
      label: "ทะเบียนรถ",
      type: "text",
      required: true,
    },
    {
      name: "preferred_date",
      label: "วันที่ต้องการเข้าศูนย์",
      type: "text",
      required: true,
    },
    {
      name: "notes",
      label: "รายละเอียดเพิ่มเติม / LINE ID",
      type: "textarea",
    },
    {
      name: "status",
      label: "สถานะการนัดหมาย",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "รอยืนยัน (Pending)", value: "pending" },
        { label: "ยืนยันแล้ว (Confirmed)", value: "confirmed" },
        { label: "เข้ารับบริการแล้ว (Completed)", value: "completed" },
        { label: "ยกเลิก (Cancelled)", value: "cancelled" },
      ],
    },
  ],
};
