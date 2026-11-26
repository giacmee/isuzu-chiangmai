import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  deleteMediaSlot,
  getMediaManifest,
  saveMediaFile,
} from "@/lib/media-store";

export async function GET() {
  const manifest = await getMediaManifest();
  return NextResponse.json({ manifest });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const slotKey = String(formData.get("slotKey") ?? "").trim();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "ไม่พบไฟล์ที่อัปโหลด" },
        { status: 400 }
      );
    }

    const { entry, manifest } = await saveMediaFile(slotKey, file);
    revalidatePath("/", "layout");

    return NextResponse.json({ entry, manifest });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการอัปโหลดไฟล์";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let slotKey = searchParams.get("slotKey") ?? "";

    if (!slotKey) {
      const body = (await request.json().catch(() => ({}))) as {
        slotKey?: string;
      };
      slotKey = String(body.slotKey ?? "").trim();
    }

    if (!slotKey) {
      return NextResponse.json(
        { error: "กรุณาระบุ slotKey ที่ต้องการลบ" },
        { status: 400 }
      );
    }

    const { deleted, manifest } = await deleteMediaSlot(slotKey);
    revalidatePath("/", "layout");

    return NextResponse.json({ deleted, manifest });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการลบไฟล์";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
