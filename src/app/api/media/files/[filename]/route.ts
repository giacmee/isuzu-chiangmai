import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getMimeTypeFromExt, getUploadsDir } from "@/lib/media-store";

interface RouteContext {
  params: Promise<{ filename: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { filename } = await context.params;
  const safeName = path.basename(filename);

  if (!safeName || safeName !== filename || safeName.includes("..")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = path.join(getUploadsDir(), safeName);

  try {
    const stat = await fs.stat(filePath);
    const total = stat.size;
    const mimeType = getMimeTypeFromExt(path.extname(safeName));
    const rangeHeader = request.headers.get("range");

    if (rangeHeader) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
      if (match) {
        const start = match[1] ? Number.parseInt(match[1], 10) : 0;
        const end = match[2]
          ? Math.min(Number.parseInt(match[2], 10), total - 1)
          : total - 1;

        if (
          Number.isNaN(start) ||
          Number.isNaN(end) ||
          start < 0 ||
          start > end ||
          start >= total
        ) {
          return new NextResponse(null, {
            status: 416,
            headers: {
              "Content-Range": `bytes */${total}`,
              "Accept-Ranges": "bytes",
            },
          });
        }

        const chunkSize = end - start + 1;
        const handle = await fs.open(filePath, "r");
        try {
          const chunk = Buffer.alloc(chunkSize);
          await handle.read(chunk, 0, chunkSize, start);
          return new NextResponse(chunk, {
            status: 206,
            headers: {
              "Content-Type": mimeType,
              "Content-Range": `bytes ${start}-${end}/${total}`,
              "Accept-Ranges": "bytes",
              "Content-Length": String(chunkSize),
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } finally {
          await handle.close();
        }
      }
    }

    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Accept-Ranges": "bytes",
        "Content-Length": String(total),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
