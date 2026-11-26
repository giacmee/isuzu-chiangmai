import { promises as fs } from "fs";
import path from "path";

export interface MediaFrame {
  url: string;
  filename: string;
  originalName: string;
  size: number;
}

export interface MediaEntry {
  slotKey: string;
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  updatedAt: string;
  frames?: MediaFrame[];
}

export type MediaManifest = Record<string, MediaEntry>;

const UPLOADS_DIR = path.join(process.cwd(), "public", "images", "uploads");
const DATA_DIR = path.join(process.cwd(), "data");
const MANIFEST_PATH = path.join(DATA_DIR, "media-manifest.json");

const IMAGE_MIME_TYPES: Record<string, string> = {
  "image/webp": ".webp",
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
};

const ALLOWED_MIME_TYPES: Record<string, string> = {
  ...IMAGE_MIME_TYPES,
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB
const MAX_FRAME_COUNT = 72;

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
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    default:
      return "application/octet-stream";
  }
}

export function extractYouTubeId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match?.[1]) return match[1];
  }
  return null;
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

async function removeExistingFiles(existing?: MediaEntry): Promise<void> {
  if (!existing || existing.mimeType === "text/youtube") return;
  const filenames = new Set<string>();
  if (existing.filename) {
    filenames.add(path.basename(existing.filename));
  }
  for (const frame of existing.frames ?? []) {
    if (frame.filename) {
      filenames.add(path.basename(frame.filename));
    }
  }
  await Promise.all(
    Array.from(filenames).map((name) =>
      fs.unlink(path.join(UPLOADS_DIR, name)).catch(() => {})
    )
  );
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
      "รองรับเฉพาะไฟล์รูปภาพ (.webp, .png, .jpg, .svg), วิดีโอ (.mp4, .webm) และไฟล์โบรชัวร์ (.pdf) เท่านั้น"
    );
  }

  const isVideo = file.type.startsWith("video/");
  const maxLimit = isVideo ? MAX_VIDEO_SIZE : MAX_FILE_SIZE;
  if (file.size > maxLimit) {
    throw new Error(
      isVideo
        ? "ขนาดไฟล์วิดีโอต้องไม่เกิน 50 MB"
        : "ขนาดไฟล์ต้องไม่เกิน 10 MB"
    );
  }

  await ensureDirs();
  const manifest = await getMediaManifest();

  // ลบไฟล์เดิมของช่องนี้ถ้ามี
  await removeExistingFiles(manifest[slotKey]);

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

export async function saveMediaFrames(
  slotKey: string,
  files: File[]
): Promise<{ entry: MediaEntry; manifest: MediaManifest }> {
  if (!slotKey || slotKey.trim() === "") {
    throw new Error("กรุณาระบุตำแหน่งรูปภาพ (slotKey)");
  }

  if (files.length < 1 || files.length > MAX_FRAME_COUNT) {
    throw new Error(`กรุณาเลือกภาพ 360° จำนวน 1–${MAX_FRAME_COUNT} รูป`);
  }

  for (const file of files) {
    if (!IMAGE_MIME_TYPES[file.type]) {
      throw new Error(
        `ไฟล์ "${file.name}" ไม่รองรับ (ชุดภาพ 360° รองรับเฉพาะ .webp, .png, .jpg)`
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`ไฟล์ "${file.name}" มีขนาดเกิน 10 MB`);
    }
  }

  const sortedFiles = [...files].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  await ensureDirs();
  const manifest = await getMediaManifest();

  // ลบชุดไฟล์เดิมของช่องนี้ถ้ามี
  await removeExistingFiles(manifest[slotKey]);

  const safeSlot = sanitizeSlotKey(slotKey);
  const timestamp = Date.now();
  const frames: MediaFrame[] = [];
  let totalSize = 0;

  for (let i = 0; i < sortedFiles.length; i++) {
    const file = sortedFiles[i];
    const ext = IMAGE_MIME_TYPES[file.type];
    const filename = `${safeSlot}-f${String(i + 1).padStart(2, "0")}-${timestamp}${ext}`;
    const targetPath = path.join(UPLOADS_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(targetPath, Buffer.from(arrayBuffer));

    totalSize += file.size;
    frames.push({
      url: `/api/media/files/${filename}`,
      filename,
      originalName: file.name,
      size: file.size,
    });
  }

  const entry: MediaEntry = {
    slotKey,
    url: frames[0].url,
    filename: frames[0].filename,
    originalName: `${frames.length} เฟรม (360°)`,
    mimeType: sortedFiles[0].type,
    size: totalSize,
    frames,
    updatedAt: new Date().toISOString(),
  };

  manifest[slotKey] = entry;
  await writeMediaManifest(manifest);

  return { entry, manifest };
}

export async function saveYouTubeSlot(
  slotKey: string,
  rawUrl: string
): Promise<{ entry: MediaEntry; manifest: MediaManifest }> {
  if (!slotKey || slotKey.trim() === "") {
    throw new Error("กรุณาระบุตำแหน่งสื่อ (slotKey)");
  }

  const videoId = extractYouTubeId(rawUrl);
  if (!videoId) {
    throw new Error(
      "ลิงก์ YouTube ไม่ถูกต้อง กรุณาวางลิงก์เช่น https://www.youtube.com/watch?v=..."
    );
  }

  await ensureDirs();
  const manifest = await getMediaManifest();
  await removeExistingFiles(manifest[slotKey]);

  const entry: MediaEntry = {
    slotKey,
    url: `https://www.youtube.com/embed/${videoId}`,
    filename: videoId,
    originalName: rawUrl.trim(),
    mimeType: "text/youtube",
    size: 0,
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

  if (existing.mimeType !== "text/youtube") {
    await removeExistingFiles(existing);
  }

  delete manifest[slotKey];
  await writeMediaManifest(manifest);

  return { deleted: true, manifest };
}
