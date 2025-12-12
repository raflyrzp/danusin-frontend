"use server";

import { cookies } from "next/headers";
import { config } from "@/lib/config";
import { type LoginSchema, loginSchema } from "@/schemas/auth/login.schema";
import type { ApiResponse } from "@/types";

interface ActionState {
  error?: string;
  success?: string;
}

export async function loginAction(values: LoginSchema): Promise<ActionState> {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Input tidak valid" };
  }

  const { credential, password } = validatedFields.data;

  try {
    const res = await fetch(`${config.api.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential, password }),
      cache: "no-store",
    });

    const data: ApiResponse = await res.json();

    if (!res.ok) {
      return {
        error: data.message || "Gagal masuk, periksa kembali data Anda.",
      };
    }

    const token = (data.data as { token: string })?.token;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "session",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      });
    }

    return { success: "Login berhasil!" };
  } catch (err) {
    console.error("Login Error:", err);
    return { error: "Terjadi kesalahan koneksi ke server." };
  }
}
