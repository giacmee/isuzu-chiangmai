# Project Handover: เว็บไซต์ อีซูซุศาลาเชียงใหม่ (`isuzuchiangmai.com` เวอร์ชันใหม่)

เอกสารนี้สรุปแผนงาน โครงสร้างระบบ สิ่งที่พัฒนาเสร็จแล้ว และขั้นตอนถัดไป เพื่อใช้ทำงานต่อใน Workspace `d:\Project-IT\Website\isuzu-chiangmai` ได้ทันที

---

## 1. เป้าหมายโปรเจกต์
- **ปรับโฉมใหม่ทั้งหมดโดยไม่ใช้ PHP** แทนเว็บเดิม `https://isuzuchiangmai.com/`
- **ยกระดับ UI/UX และฟีเจอร์ให้เทียบเท่าเว็บแม่** `https://www.isuzu-tis.com/` (โชว์รูมสลับสีรถ, ภาพหมุน 360°, คำนวณค่างวด, เปรียบเทียบรุ่นรถ, โหลดโบรชัวร์)
- **คงจุดแข็งของดีลเลอร์เดิมไว้ครบถ้วน** (นัดหมายศูนย์บริการออนไลน์, ศูนย์ซ่อมสีและตัวถัง Sala Faster Paint, ค้นหาที่ปรึกษาการขายประจำสาขา, เชื่อมต่อ LINE OA `@isuzusala`)
- **รักษาอันดับ SEO เดิม** ด้วยแผน 301 Redirect จาก URL เว็บ PHP เดิม

---

## 2. Tech Stack ที่เลือกใช้
- **Framework:** Next.js `16.4.6` (App Router, Turbopack) + React `19.3.1`
- **Language:** TypeScript `5`
- **Styling:** Tailwind CSS `4.3.3` + Isuzu CI Theme (`#D70015` แดงอีซูซุ, `#0D0F12` ดำเข้ม, `#F4F5F7` เทาอ่อน)
- **Typography:** Google Fonts ภาษาไทย (`Prompt` สำหรับหัวข้อ + `IBM Plex Sans Thai` สำหรับเนื้อหา)
- **Icons:** `lucide-react`
- **CMS & Database (Step 3):** Payload CMS v3 (`3.94.2`) + `@payloadcms/db-sqlite` (`data/payload.db` สำหรับ Local Dev — พร้อมสลับเป็น `@payloadcms/db-postgres` สำหรับ Production/Supabase)
- **Media & 360° Manager:** Local Slot Storage (`public/images/uploads/` + `data/media-manifest.json`) ป้องกันสิทธิ์ด้วย Payload Auth

---

## 3. โครงสร้าง Sitemap และ URL

| หมวดหมู่ | เส้นทาง URL | สถานะปัจจุบัน | รายละเอียด |
| :--- | :--- | :---: | :--- |
| หน้าแรก | `/` | ✅ เสร็จ (Payload CMS) | Hero Banner/Video, ตัวกรองรุ่นรถ, โปรโมชั่น, มาตรฐานบริการหลังการขาย |
| โชว์รูมรุ่นรถ | `/models/[slug]` | ✅ เสร็จ (Payload CMS) | สลับสีรถ (+ราคาสีพิเศษ), ภาพหมุน 360°, เลือกรุ่นย่อย, ตารางสเปค, โหลดโบรชัวร์ |
| คำนวณค่างวด | `/calculator` | ✅ เสร็จ (Payload CMS) | เลือกรุ่น/รุ่นย่อยจาก CMS, ดาวน์ %, ดอกเบี้ย, 48–84 งวด คำนวณ Real-time |
| เปรียบเทียบรุ่นรถ | `/compare` | ✅ เสร็จ (Payload CMS) | เทียบสเปค ราคา เครื่องยนต์ ความปลอดภัยได้พร้อมกัน 3 รุ่น |
| นัดหมายศูนย์ / ขอใบเสนอราคา | `/service/booking` | ✅ UI + CMS Options | สลับโหมด 2 แบบ (ดึงรายชื่อสาขา/รุ่นรถจาก CMS; เชื่อม Lead API ใน Step 4) |
| ค้นหาที่ปรึกษาการขาย | `/sales` | ✅ เสร็จ (Payload CMS) | ค้นหาตามชื่อ/รุ่นที่เชี่ยวชาญ กรองตามสาขา ปุ่มโทรและแอด LINE ทันที |
| ข่าวสารและบทความ | `/articles` และ `/articles/[slug]` | ✅ เสร็จ (Payload CMS) | บทความ SEO, ค้นหา/กรองหมวดหมู่ และหน้าอ่านบทความเต็ม |
| หน้ารวมสาขาและแผนที่ | `/branches` | ✅ เสร็จ (Payload CMS) | แผนที่ Google Maps แบบโต้ตอบ, กรองตามบริการ และข้อมูลติดต่อทุกสาขา |
| ระบบจัดการเนื้อหา (CMS) | `/admin` | ✅ เสร็จ (Payload CMS) | ระบบ Admin จัดการรุ่นรถ, หมวดหมู่, โปรโมชั่น, สาขา, เซลส์, บทความ และผู้ใช้ |
| จัดการรูปภาพ & 360° | `/media-manager` | ✅ เสร็จ (Auth Protected) | อัปโหลดรูปสีรถ, ภาพหมุน 360°, วิดีโอ/YouTube, โบรชัวร์ PDF (Redirect จาก `/admin/media`) |

---

## 4. โครงสร้างไฟล์หลักใน `d:\Project-IT\Website\isuzu-chiangmai`

```text
d:\Project-IT\Website\isuzu-chiangmai
├── .env / .env.example                 # DATABASE_URL, PAYLOAD_SECRET, SEED_ADMIN_*
├── next.config.ts                      # withPayload + Turbopack + Redirects
├── package.json                        # Next.js 16 + Payload CMS 3.94.2 + SQLite
├── data/
│   ├── media-manifest.json             # เมตาดาต้ารูปภาพและไฟล์ 360°
│   └── payload.db                      # ฐานข้อมูล SQLite (สร้างจาก npm run seed)
└── src/
    ├── payload.config.ts               # Payload CMS Config (SQLite Adapter + 9 Collections)
    ├── payload-types.ts                # Auto-generated TypeScript types จาก Payload
    ├── seed.ts                         # สคริปต์ Seed ข้อมูลเริ่มต้น (Idempotent)
    ├── collections/                    # Payload Collections (users, car-categories, car-models, promotions, branches, sales-consultants, articles, leads, service-bookings)
    ├── lib/
    │   ├── cms.ts                      # Payload Local API helpers สำหรับหน้าเว็บฝั่ง Frontend
    │   ├── payload-auth.ts             # Auth helper (getCurrentAdminUser)
    │   ├── media-store.ts              # ตัวจัดการไฟล์อัปโหลด + 360° + YouTube
    │   └── format.ts                   # formatBaht, formatThaiDate
    ├── components/                     # UI Components (Navbar, Footer, HomeLineup, ShowroomClient, Car360Viewer, CalculatorClient, CompareClient, SalesFinderClient, ServiceBookingClient, MediaManagerClient, ...)
    └── app/
        ├── (payload)/                  # Payload Admin (/admin) & REST/GraphQL API (/api/[...slug])
        ├── (frontend)/                 # หน้าเว็บลูกค้าทั้งหมด + /media-manager (Auth protected)
        └── api/media/                  # API จัดการรูปภาพ/360°/PDF (POST/DELETE ต้อง Login Payload)
```

---

## 5. Payload CMS Collections & การใช้งาน

Collections ที่สร้างไว้ใน `src/collections/`:
1. `users` — บัญชีผู้ดูแลระบบ (`auth: true`, role: `admin` / `editor` / `sales`)
2. `car-categories` — หมวดหมู่รถ (`pickup`, `ppv`)
3. `car-models` — รุ่นรถหลัก, สีรถ (`colors` + `color_key`), รุ่นย่อย (`trims` + สเปค)
4. `promotions` — โปรโมชั่นรายเดือน (`promo_key` เชื่อมกับรูปใน `/media-manager`)
5. `branches` — สาขาในเชียงใหม่, ที่อยู่, เบอร์โทร, LINE OA, Google Map
6. `sales-consultants` — รายชื่อที่ปรึกษาการขายผูกกับ `branches`
7. `articles` — ข่าวสารและบทความ SEO (`article_key` เชื่อมกับรูปปกใน `/media-manager`)
8. `leads` — เตรียมโครงสร้างสำหรับเก็บข้อมูลลูกค้าขอใบเสนอราคา (Step 4)
9. `service-bookings` — เตรียมโครงสร้างสำหรับเก็บการนัดหมายศูนย์บริการ (Step 4)

---

## 6. วิธีรันและ Seed ข้อมูล

```bash
cd d:\Project-IT\Website\isuzu-chiangmai
npm run seed   # Seed ข้อมูลเริ่มต้น + บัญชี Admin ลง data/payload.db (รันซ้ำได้ไม่ซ้ำซ้อน)
npm run dev    # เปิดเซิร์ฟเวอร์พัฒนา
```

- **หน้าเว็บลูกค้า:** `http://localhost:3000`
- **Payload CMS Admin:** `http://localhost:3000/admin` (บัญชีเริ่มต้นดูใน `.env` / `.env.example`: `admin@isuzuchiangmai.com` / `IsuzuSala2026!`)
- **จัดการรูปภาพ & 360°:** `http://localhost:3000/media-manager` (ต้อง Login ผ่าน `/admin` ก่อน)

### การสลับไปใช้ PostgreSQL / Supabase ใน Production
เปลี่ยนใน `src/payload.config.ts` จาก `sqliteAdapter` (`@payloadcms/db-sqlite`) เป็น `postgresAdapter` (`@payloadcms/db-postgres`) พร้อมตั้งค่า `DATABASE_URL` ชี้ไปยัง PostgreSQL/Supabase

---

## 7. ขั้นตอนการทำงานต่อ (Roadmap)

### ✅ ทำเสร็จแล้ว
- **Step 0–2.5:** ออกแบบระบบ, ขึ้นโปรเจกต์ Next.js 16 + Tailwind v4 + Isuzu CI, พัฒนาหน้า Showroom 360°, Calculator, Compare, Sales, Branches, Articles, และระบบจัดการสื่อ `/media-manager`
- **Step 3 (Payload CMS v3 + SQLite):** ติดตั้ง Payload CMS v3, แยก Route Groups `(payload)` และ `(frontend)`, ย้ายหน้าเว็บทั้งหมดมาอ่านข้อมูลจาก Payload Local API, สร้างสคริปต์ `npm run seed`, และล็อกสิทธิ์ `/media-manager` + `/api/media` (POST/DELETE) ด้วย Payload Auth

### ⏳ ขั้นตอนถัดไป
- **Step 4 (Lead API & LINE OA):** สร้าง API Route (`/api/leads`, `/api/service-bookings`) บันทึกลง Payload Collections `leads` และ `service-bookings`, ใส่กันสแปม **Cloudflare Turnstile**, และแจ้งเตือนเข้า **LINE Messaging API / Google Sheets**
- **Step 5 (SEO & 301 Redirect):** Export URL เดิมจาก `isuzuchiangmai.com/sitemap.xml` มาใส่ใน `next.config.ts` (`redirects()`), เพิ่ม JSON-LD Schema (`AutoDealer`, `Car`), ติดตั้ง GA4 / GTM / Meta Pixel
- **Step 6 (Deploy & Cutover):** สลับ DB เป็น PostgreSQL + Object Storage (Cloudflare R2 / Supabase Storage), Deploy ขึ้น Staging, ทดสอบบนมือถือจริง แล้วสลับ DNS ผ่าน Cloudflare
