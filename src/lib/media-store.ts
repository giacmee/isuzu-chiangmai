import { promises as fs } from "fs";
import path from "path";

export interface MediaEntry {
  slotKey: string;
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  updatedAt: string;
}

export type MediaManifest = Record<string, MediaEntry>;

const UPLOADS_DIR = path.join(process.cwd(), "public", "images", "uploads");
const DATA_DIR = path.join(process.cwd(), "data");
const MANIFEST_PATH = path.join(DATA_DIR, "media-manifest.json");

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/webp": ".webp",
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function getUploadsDir(): string {
  return UPLOADS_DIR;
}

export function getMimeTypeFromExt(ext: string): string {
  switch (ext.toLowerCase()) {
    case ".webp":
      return "image/webp";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

async function ensureDirs() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getMediaManifest(): Promise<MediaManifest> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf-8");
    const parsed = JSON.parse(raw) as MediaManifest;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeMediaManifest(manifest: MediaManifest): Promise<void> {
  await ensureDirs();
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

function sanitizeSlotKey(slotKey: string): string {
  return slotKey.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 80);
}

export async function saveMediaFile(
  slotKey: string,
  file: File
): Promise<{ entry: MediaEntry; manifest: MediaManifest }> {
  if (!slotKey || slotKey.trim() === "") {
    throw new Error("กรุณาระบุตำแหน่งรูปภาพ (slotKey)");
  }

  const ext = ALLOWED_MIME_TYPES[file.type];
  if (!ext) {
    throw new Error(
      "รองรับเฉพาะไฟล์รูปภาพ (.webp, .png, .jpg, .svg) และไฟล์โบรชัวร์ (.pdf) เท่านั้น"
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("ขนาดไฟล์ต้องไม่เกิน 10 MB");
  }

  await ensureDirs();
  const manifest = await getMediaManifest();

  // ลบไฟล์เดิมของช่องนี้ถ้ามี
  const existing = manifest[slotKey];
  if (existing?.filename) {
    const oldPath = path.join(UPLOADS_DIR, path.basename(existing.filename));
    await fs.unlink(oldPath).catch(() => {});
  }

  const safeSlot = sanitizeSlotKey(slotKey);
  const filename = `${safeSlot}-${Date.now()}${ext}`;
  const targetPath = path.join(UPLOADS_DIR, filename);

  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));

  const entry: MediaEntry = {
    slotKey,
    url: `/api/media/files/${filename}`,
    filename,
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
    updatedAt: new Date().toISOString(),
  };

  manifest[slotKey] = entry;
  await writeMediaManifest(manifest);

  return { entry, manifest };
}

export async function deleteMediaSlot(
  slotKey: string
): Promise<{ deleted: boolean; manifest: MediaManifest }> {
  const manifest = await getMediaManifest();
  const existing = manifest[slotKey];

  if (!existing) {
    return { deleted: false, manifest };
  }

  if (existing.filename) {
    const filePath = path.join(UPLOADS_DIR, path.basename(existing.filename));
    await fs.unlink(filePath).catch(() => {});
  }

  delete manifest[slotKey];
  await writeMediaManifest(manifest);

  return { deleted: true, manifest };
}
