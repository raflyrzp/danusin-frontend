"use server";

import { loginSchema, type LoginSchema } from "@/schemas/auth/login.schema";
// import { signIn } from "@/auth"; // Jika nanti pakai NextAuth / Auth.js

export async function loginAction(values: LoginSchema) {
  // 1. Validasi di sisi server
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Input tidak valid!" };
  }

  const { credential, password } = validatedFields.data;

  try {
    // 2. TODO: Integrasi Logic Login (Database / API External)
    // Contoh logika dummy:
    console.log("Login attempt:", { credential, password });

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Jika Gagal (contoh):
    // return { error: "Email atau password salah!" };

    // Jika Sukses:
    return { success: "Login berhasil!" };
  } catch (error) {
    return { error: "Terjadi kesalahan sistem." };
  }
}
