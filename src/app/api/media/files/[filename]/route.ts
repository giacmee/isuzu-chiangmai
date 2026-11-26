import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getMimeTypeFromExt, getUploadsDir } from "@/lib/media-store";

interface RouteContext {
  params: Promise<{ filename: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { filename } = await context.params;
  const safeName = path.basename(filename);

  if (!safeName || safeName !== filename || safeName.includes("..")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = path.join(getUploadsDir(), safeName);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const mimeType = getMimeTypeFromExt(path.extname(safeName));

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
