import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  deleteMediaSlot,
  getMediaManifest,
  saveMediaFile,
  saveMediaFrames,
  saveYouTubeSlot,
} from "@/lib/media-store";

export async function GET() {
  const manifest = await getMediaManifest();
  return NextResponse.json({ manifest });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = (await request.json().catch(() => ({}))) as {
        slotKey?: string;
        youtubeUrl?: string;
      };
      const slotKey = String(body.slotKey ?? "").trim();
      const youtubeUrl = String(body.youtubeUrl ?? "").trim();

      const { entry, manifest } = await saveYouTubeSlot(slotKey, youtubeUrl);
      revalidatePath("/", "layout");

      return NextResponse.json({ entry, manifest });
    }

    const formData = await request.formData();
    const slotKey = String(formData.get("slotKey") ?? "").trim();
    const mode = String(formData.get("mode") ?? "");
    const multiFiles = formData
      .getAll("files")
      .filter((f): f is File => f instanceof File);

    if (mode === "frames" || multiFiles.length > 0) {
      if (multiFiles.length === 0) {
        return NextResponse.json(
          { error: "ไม่พบไฟล์ภาพ 360° ที่อัปโหลด" },
          { status: 400 }
        );
      }

      const { entry, manifest } = await saveMediaFrames(slotKey, multiFiles);
      revalidatePath("/", "layout");

      return NextResponse.json({ entry, manifest });
    }

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
