"use server";

import { config } from "@/lib/config";
import { type RegisterSchema, registerSchema } from "@/schemas/auth/register.schema";
import type { ApiResponse } from "@/types";

interface ActionState {
  error?: string;
  success?: string;
}

export async function registerAction(
  values: RegisterSchema
): Promise<ActionState> {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { confirmPassword: _confirmPassword, agree: _agree, ...payload } =
    validatedFields.data;

  try {
    const res = await fetch(`${config.api.baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse = await res.json();

    if (!res.ok) {
      return { error: data.message || "Gagal mendaftar." };
    }

    return { success: "Registrasi berhasil! Silakan login." };
  } catch (err) {
    console.error("Register Error:", err);
    return { error: "Terjadi kesalahan koneksi ke server." };
  }
}
