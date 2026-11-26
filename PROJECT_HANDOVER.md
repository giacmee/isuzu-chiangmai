# Project Handover: เว็บไซต์ อีซูซุศาลาเชียงใหม่ (`isuzuchiangmai.com` เวอร์ชันใหม่)

เอกสารนี้สรุปแผนงาน โครงสร้างระบบ สิ่งที่พัฒนาเสร็จแล้ว และขั้นตอนถัดไป เพื่อใช้ทำงานต่อใน Workspace `E:\Project-AI\Website` ได้ทันที

---

## 1. เป้าหมายโปรเจกต์
- **ปรับโฉมใหม่ทั้งหมดโดยไม่ใช้ PHP** แทนเว็บเดิม `https://isuzuchiangmai.com/`
- **ยกระดับ UI/UX และฟีเจอร์ให้เทียบเท่าเว็บแม่** `https://www.isuzu-tis.com/` (โชว์รูมสลับสีรถ, คำนวณค่างวด, เปรียบเทียบรุ่นรถ, โหลดโบรชัวร์)
- **คงจุดแข็งของดีลเลอร์เดิมไว้ครบถ้วน** (นัดหมายศูนย์บริการออนไลน์, ศูนย์ซ่อมสีและตัวถัง Sala Faster Paint, ค้นหาที่ปรึกษาการขายประจำสาขา, เชื่อมต่อ LINE OA `@isuzusala`)
- **รักษาอันดับ SEO เดิม** ด้วยแผน 301 Redirect จาก URL เว็บ PHP เดิม

---

## 2. Tech Stack ที่เลือกใช้
- **Framework:** Next.js `16.4.6` (App Router, Turbopack)
- **Language:** TypeScript `5`
- **Styling:** Tailwind CSS `4.3.3` + Isuzu CI Theme (`#D70015` แดงอีซูซุ, `#0D0F12` ดำเข้ม, `#F4F5F7` เทาอ่อน)
- **Typography:** Google Fonts ภาษาไทย (`Prompt` สำหรับหัวข้อ + `IBM Plex Sans Thai` สำหรับเนื้อหา)
- **Icons:** `lucide-react`
- **Database (แผน Step 3):** PostgreSQL (แนะนำ Supabase หรือติดตั้งคู่กับ Payload CMS)
- **Media Storage (แผน Step 3):** Cloudflare R2 หรือ Supabase Storage

---

## 3. โครงสร้าง Sitemap และ URL

| หมวดหมู่ | เส้นทาง URL | สถานะปัจจุบัน | รายละเอียด |
| :--- | :--- | :---: | :--- |
| หน้าแรก | `/` | ✅ เสร็จ (Mock Data) | Hero Banner, ตัวกรองรุ่นรถ, โปรโมชั่น, มาตรฐานบริการหลังการขาย |
| โชว์รูมรุ่นรถ | `/models/[slug]` | ✅ เสร็จ (Mock Data) | สลับสีรถ (+ราคาสีพิเศษ), เลือกรุ่นย่อย, ตารางสเปค, ปุ่มโหลดโบรชัวร์ |
| คำนวณค่างวด | `/calculator` | ✅ เสร็จ (Interactive) | เลือกรุ่น/รุ่นย่อย, ดาวน์ %, ดอกเบี้ย, 48–84 งวด คำนวณ Real-time |
| เปรียบเทียบรุ่นรถ | `/compare` | ✅ เสร็จ (Interactive) | เทียบสเปค ราคา เครื่องยนต์ ความปลอดภัยได้พร้อมกัน 3 รุ่น |
| นัดหมายศูนย์ / ขอใบเสนอราคา | `/service/booking` | ✅ เสร็จ (UI Form) | สลับโหมดได้ 2 แบบ: ขอใบเสนอราคา/ทดลองขับ และ นัดหมายศูนย์บริการ/ซ่อมสี |
| ค้นหาที่ปรึกษาการขาย | `/sales` | ✅ เสร็จ (Mock Data) | ค้นหาตามชื่อ/รุ่นที่เชี่ยวชาญ กรองตามสาขา ปุ่มโทรและแอด LINE ทันที |
| ข่าวสารและบทความ | `/articles` และ `/articles/[slug]` | ✅ เสร็จ (Mock Data) | บทความ SEO, ค้นหา/กรองหมวดหมู่ และหน้าอ่านบทความเต็ม |
| หน้ารวมสาขาและแผนที่ | `/branches` | ✅ เสร็จ (Mock Data) | แผนที่ Google Maps แบบโต้ตอบ, กรองตามบริการ และข้อมูลติดต่อทุกสาขา |

---

## 4. โครงสร้างไฟล์ที่สร้างไว้แล้วใน `E:\Project-AI\Website`

```text
E:\Project-AI\Website
├── next.config.ts                     # ตั้งค่า Turbopack + ช่องเตรียมใส่ 301 Redirects
├── package.json                       # Next.js 16 + React 19 + Tailwind v4 + lucide-react
├── PROJECT_HANDOVER.md                # เอกสารนี้
└── src/
    ├── types/
    │   └── database.ts                # TypeScript Interfaces ตรงตาม PostgreSQL Schema
    ├── data/
    │   └── mock-data.ts               # ข้อมูลจำลองรุ่นรถ (D-Max, V-Cross, MU-X, ELF), โปรฯ, สาขา, เซลส์
    ├── components/
    │   ├── Navbar.tsx                 # แถบเมนูหลัก (Desktop + Mobile Drawer)
    │   ├── Footer.tsx                 # Footer + Mobile Sticky Action Bar (โทร/LINE/คำนวณค่างวด)
    │   ├── HomeLineup.tsx             # แถบกรองและแสดงรุ่นรถหน้าแรก
    │   ├── ShowroomClient.tsx         # หน้าโชว์รูมสลับสีรถ & รุ่นย่อย
    │   ├── CalculatorClient.tsx       # เครื่องคำนวณค่างวด Real-time
    │   └── CompareClient.tsx          # ตารางเปรียบเทียบรุ่นรถ 3 รุ่น
    └── app/
        ├── globals.css                # Isuzu CI CSS Variables & Tailwind v4 Theme
        ├── layout.tsx                 # Root Layout + ฟอนต์ Prompt / IBM Plex Sans Thai
        ├── page.tsx                   # หน้าแรก (/)
        ├── models/[slug]/page.tsx     # หน้ารายละเอียดรุ่นรถ (SSG)
        ├── calculator/page.tsx        # หน้าคำนวณค่างวด
        ├── compare/page.tsx           # หน้าเปรียบเทียบรุ่นรถ
        ├── sales/page.tsx             # หน้าค้นหาที่ปรึกษาการขาย
        └── service/booking/page.tsx   # หน้าฟอร์มนัดหมายศูนย์บริการ & ขอใบเสนอราคา
```

### ผลการตรวจสอบล่าสุด
- รัน `npm run build` ผ่านเรียบร้อย (Exit code 0) ไม่มี Error ทั้ง TypeScript และ Next.js SSG (สร้าง 12 routes สำเร็จ)

---

## 5. โครงสร้างฐานข้อมูล (PostgreSQL Schema สำหรับ Step 3)

ตารางที่ออกแบบไว้ใน Step 0 (มี Type รองรับแล้วใน `src/types/database.ts`):
1. `car_categories` — หมวดหมู่รถ (`pickup`, `ppv`, `truck`)
2. `car_models` — รุ่นรถหลัก, `slug`, `starting_price`, `hero_image_url`, `brochure_pdf_url`
3. `car_trims` — รุ่นย่อย, `price`, `engine`, `transmission`, `drivetrain`, `specs_json` (`jsonb`)
4. `car_colors` — สีรถ, `hex_code`, `extra_price` (เช่น สีขาวมุก +7,000 บาท), `car_image_url`
5. `promotions` — โปรโมชั่นรายเดือน, `start_date`, `end_date`, `is_active`
6. `branches` — สาขาในเชียงใหม่, ที่อยู่, เบอร์โทร, LINE OA, Google Map
7. `sales_consultants` — รายชื่อที่ปรึกษาการขายผูกกับ `branch_id`
8. `leads` — เก็บข้อมูลลูกค้าที่ขอใบเสนอราคา/ทดลองขับ + `calculator_snapshot` (`jsonb`)
9. `service_bookings` — เก็บข้อมูลการนัดหมายเช็คระยะ/ซ่อมสีและตัวถัง

---

## 6. วิธีรันโปรเจกต์ใน Workspace ใหม่

```bash
cd E:\Project-AI\Website
npm run dev
```
เปิดเบราว์เซอร์ที่ `http://localhost:3000`
*(หมายเหตุ: โฟลเดอร์ `node_modules` ถูกย้ายมาด้วยแล้ว หากมีปัญหาสามารถรัน `npm install` ซ้ำได้)*

---

## 7. ขั้นตอนการทำงานต่อ (Roadmap)

### ✅ ทำเสร็จแล้ว
- **Step 0:** ออกแบบ Sitemap, PostgreSQL Schema, แผน 301 Redirect และ Asset Checklist
- **Step 1:** ขึ้นโปรเจกต์ Next.js + TypeScript + Tailwind CSS + Isuzu CI Theme & ฟอนต์ไทย
- **Step 2:** สร้างหน้าเว็บ Prototype ครบทุกฟีเจอร์หลัก (Homepage, Showroom สลับสี, Calculator, Compare, Service Booking, Sales Finder) และผ่าน `npm run build`

### ⏳ ขั้นตอนถัดไป (ทำต่อในโปรเจกต์นี้)
- **Step 2.5 (ระบบจัดการรูปภาพและโบรชัวร์ — เสร็จแล้ว):** สร้างหน้า `/admin/media` + API (`/api/media`, `/api/media/files/[filename]`) ให้เพิ่ม เปลี่ยน ลบรูปรถแต่ละสี, แบนเนอร์, โลโก้, โปรโมชั่น, ปกบทความ และโบรชัวร์ PDF ได้ทันทีแบบ Drag & Drop พร้อมแสดงผลจริงทุกหน้าทันที
- **Step 3 (Database & Admin CMS):** เชื่อม **Supabase (PostgreSQL + Storage)** หรือติดตั้ง **Payload CMS** เพื่อให้แอดมินแก้ราคา โปรโมชั่น ข่าวสาร และรายชื่อเซลส์ได้เอง
- **Step 4 (Lead API & LINE OA):** สร้าง API Route (`/api/leads`, `/api/service-bookings`) บันทึกลงฐานข้อมูล ใส่กันสแปม **Cloudflare Turnstile** และยิง Webhook แจ้งเตือนเข้า **LINE Messaging API / Google Sheets**
- **Step 5 (SEO & 301 Redirect):** Export URL เดิมจาก `isuzuchiangmai.com/sitemap.xml` มาใส่ใน `next.config.ts` (`redirects()`), เพิ่ม JSON-LD Schema (`AutoDealer`, `Car`), ติดตั้ง GA4 / GTM / Meta Pixel
- **Step 6 (Deploy & Cutover):** Deploy ขึ้น Staging (Vercel หรือ Docker บน VPS โซน Singapore) ทดสอบบนมือถือจริง แล้วสลับ DNS ผ่าน Cloudflare
