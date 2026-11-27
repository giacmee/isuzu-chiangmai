import type { GlobalConfig } from "payload";

export const HomeSettings: GlobalConfig = {
  slug: "home-settings",
  label: "ตั้งค่าแบนเนอร์หน้าแรก",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "show_hero_text",
      type: "checkbox",
      label: "แสดงข้อความทับบนแบนเนอร์",
      defaultValue: true,
    },
    {
      name: "hero_badge",
      type: "text",
      label: "ป้ายข้อความด้านบน (Badge)",
      defaultValue: "อีซูซุศาลาเชียงใหม่ — โชว์รูมและศูนย์บริการมาตรฐานครบวงจร",
    },
    {
      name: "hero_title_line1",
      type: "text",
      label: "หัวข้อหลัก บรรทัดที่ 1 (สีขาว)",
      defaultValue: "เหนือกว่าทุกขีดจำกัด",
    },
    {
      name: "hero_title_highlight",
      type: "text",
      label: "หัวข้อหลัก บรรทัดที่ 2 (สีแดงอีซูซุ)",
      defaultValue: "ISUZU D-MAX & MU-X",
    },
    {
      name: "hero_description",
      type: "textarea",
      label: "คำอธิบายใต้หัวข้อ",
      defaultValue:
        "สัมผัสประสบการณ์เลือกรุ่นรถ เปลี่ยนสี คำนวณค่างวด และเปรียบเทียบสเปคได้ทันทีออนไลน์ พร้อมข้อเสนอพิเศษและบริการหลังการขายมาตรฐานศูนย์อีซูซุสำหรับชาวเชียงใหม่",
    },
    {
      name: "hero_primary_cta_label",
      type: "text",
      label: "ข้อความปุ่มหลักสีแดง",
      defaultValue: "สำรวจรุ่นรถทั้งหมด",
    },
    {
      name: "hero_primary_cta_href",
      type: "text",
      label: "ลิงก์ปุ่มหลักสีแดง",
      defaultValue: "/#models",
    },
  ],
};
