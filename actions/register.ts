"use server";

import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth/register.schema";

export async function registerAction(values: RegisterSchema) {
  // 1. Validasi di sisi server (keamanan ganda)
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Input tidak valid!" };
  }

  // 2. Simulasi proses simpan ke DB / Call API Backend
  const { email, password, name } = validatedFields.data;

  try {
    // CONTOH: Panggil API eksternal atau ORM database di sini
    console.log("Mendaftarkan user:", { name, email });

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Jika sukses
    return { success: "Pendaftaran berhasil!" };
  } catch (error) {
    return { error: "Gagal mendaftarkan akun. Silakan coba lagi." };
  }
}
