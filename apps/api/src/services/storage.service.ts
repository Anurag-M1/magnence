import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "../lib/supabase.js";
import { env } from "../config/env.js";

type UploadResult = {
  path: string;
  publicUrl: string;
};

export async function uploadToStorage(file: Buffer, fileName: string, contentType: string): Promise<UploadResult> {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const path = `${new Date().getFullYear()}/${randomUUID()}-${fileName}`;
  const { error } = await supabaseAdmin.storage.from(env.SUPABASE_STORAGE_BUCKET).upload(path, file, {
    contentType,
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(env.SUPABASE_STORAGE_BUCKET).getPublicUrl(path);

  return { path, publicUrl };
}
