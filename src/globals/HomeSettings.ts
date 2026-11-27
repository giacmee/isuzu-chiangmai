import type { GlobalConfig } from "payload";

export const HomeSettings: GlobalConfig = {
  slug: "home-settings",
  label: "ตั้งค่าแบนเนอร์หน้าแรก",
  admin: {
    preview: () => "/",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "hero_auto_slide",
      type: "checkbox",
      label: "เปิดเลื่อนแบนเนอร์อัตโนมัติ (Auto-play)",
      defaultValue: true,
      admin: {
        description:
          "เปิดเพื่อเลื่อนสไลด์อัตโนมัติ หรือปิดเพื่อเลื่อนเฉพาะตอนกด/ปัดเหมือนหน้าเว็บ Honda",
      },
    },
    {
      name: "hero_auto_slide_interval",
      type: "number",
      label: "ระยะเวลาเปลี่ยนสไลด์อัตโนมัติ (มิลลิวินาที)",
      defaultValue: 5000,
      min: 2000,
      max: 15000,
      admin: {
        description:
          "เช่น 5000 = เปลี่ยนสไลด์ทุก 5 วินาที (ใช้เมื่อเปิดเลื่อนอัตโนมัติ)",
      },
    },
    {
      name: "hero_slides",
      type: "array",
      label: "รายการสไลด์แบนเนอร์หน้าแรก (แบบเลื่อนแง้มขอบขวา)",
      admin: {
        description:
          "อัปโหลดรูปภาพหรือวิดีโอของแต่ละสไลด์ได้ที่หน้า จัดการรูปภาพ (/media-manager) โดยอ้างอิงจากรหัสสไลด์ (Slide Key)",
      },
      fields: [
        {
          name: "slide_key",
          type: "text",
          label: "รหัสสไลด์ (Slide Key สำหรับจับคู่รูปใน Media Manager)",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "หัวข้อหลักบนแบนเนอร์",
          required: true,
        },
        {
          name: "subtitle",
          type: "text",
          label: "ข้อความรอง / คำโปรย",
        },
        {
          type: "row",
          fields: [
            {
              name: "cta_label",
              type: "text",
              label: "ข้อความปุ่ม (เว้นว่างเพื่อซ่อนปุ่ม)",
              defaultValue: "รายละเอียดเพิ่มเติม",
            },
            {
              name: "cta_href",
              type: "text",
              label: "ลิงก์ปลายทางของปุ่ม",
              defaultValue: "/#models",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "text_theme",
              type: "select",
              label: "โทนสีตัวอักษร",
              defaultValue: "light",
              options: [
                { label: "ตัวอักษรสีขาว (พื้นหลังโทนเข้ม)", value: "light" },
                { label: "ตัวอักษรสีเข้ม (พื้นหลังโทนสว่าง)", value: "dark" },
              ],
            },
            {
              name: "show_overlay_text",
              type: "checkbox",
              label: "แสดงข้อความทับบนสไลด์นี้",
              defaultValue: true,
            },
            {
              name: "is_active",
              type: "checkbox",
              label: "เปิดแสดงสไลด์นี้",
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: "show_hero_text",
      type: "checkbox",
      label: "แสดงข้อความทับบนแบนเนอร์ (ค่าเดิม)",
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
