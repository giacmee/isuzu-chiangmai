import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Prompt } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getMediaManifest } from "@/lib/media-store";

const ibmPlexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-thai",
});

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: {
    default: "อีซูซุศาลาเชียงใหม่ | โชว์รูมและศูนย์บริการมาตรฐานอีซูซุ เชียงใหม่",
    template: "%s | อีซูซุศาลาเชียงใหม่",
  },
  description:
    "โชว์รูมจำหน่ายรถอีซูซุ D-Max และ MU-X พร้อมคำนวณค่างวด เปรียบเทียบรุ่นรถ โปรโมชั่นพิเศษ และนัดหมายศูนย์บริการออนไลน์ จังหวัดเชียงใหม่",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const media = await getMediaManifest();
  const siteLogoUrl = media["site_logo"]?.url;

  return (
    <html
      lang="th"
      className={`${ibmPlexThai.variable} ${prompt.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#111317]">
        <Navbar logoUrl={siteLogoUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
