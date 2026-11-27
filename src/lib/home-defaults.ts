export interface HeroSlideItem {
  slide_key: string;
  title: string;
  subtitle: string;
  cta_label: string;
  cta_href: string;
  text_theme: "light" | "dark";
  show_overlay_text: boolean;
  is_active: boolean;
}

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    slide_key: "slide-1",
    title: "ISUZU D-MAX EV",
    subtitle:
      "ปิกอัพพลังไฟฟ้า 100% ขับเคลื่อน 4 ล้อ Full-Time 4WD เริ่มต้น 1,591,000 บาท",
    cta_label: "รายละเอียดเพิ่มเติม",
    cta_href: "/models/isuzu-d-max-ev",
    text_theme: "light",
    show_overlay_text: true,
    is_active: true,
  },
  {
    slide_key: "slide-2",
    title: "ISUZU MU-X RS",
    subtitle: "สปอร์ตพรีเมียม 7 ที่นั่ง ขุมพลัง 2.2 Ddi MAXFORCE & Biturbo",
    cta_label: "รายละเอียดเพิ่มเติม",
    cta_href: "/models/mu-x-rs",
    text_theme: "light",
    show_overlay_text: true,
    is_active: true,
  },
  {
    slide_key: "slide-3",
    title: "ISUZU MU-X ULTIMATE",
    subtitle: "อเนกประสงค์ระดับพรีเมียม เทคโนโลยีความปลอดภัย ADAS เต็มระบบ",
    cta_label: "รายละเอียดเพิ่มเติม",
    cta_href: "/models/mu-x-ultimate",
    text_theme: "light",
    show_overlay_text: true,
    is_active: true,
  },
  {
    slide_key: "slide-4",
    title: "ข้อเสนอพิเศษ อีซูซุศาลาเชียงใหม่",
    subtitle: "ดอกเบี้ยเริ่มต้น 0.99% หรือคำนวณค่างวดออนไลน์ได้ทันที",
    cta_label: "คำนวณค่างวด",
    cta_href: "/calculator",
    text_theme: "light",
    show_overlay_text: true,
    is_active: true,
  },
];
