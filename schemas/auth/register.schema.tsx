import { z } from "zod";

export const registerSchema = z
  .object({
    nim: z
      .string()
      .min(5, "NIM minimal 5 karakter")
      .max(20, "NIM maksimal 20 karakter"),
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    whatsapp: z
      .string()
      .min(10, "Nomor WhatsApp minimal 10 digit")
      .regex(/^08[0-9]+$/, "Format nomor harus dimulai dengan 08"),
    faculty: z.string().min(1, "Fakultas wajib dipilih"),
    major: z.string().min(1, "Jurusan wajib dipilih"),


    batch_year: z.coerce
      .number({ message: "Angkatan harus berupa angka" })
      .min(1900, "Tahun tidak valid")
      .int("Tahun harus bilangan bulat"),

    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z
      .string()
      .min(8, "Konfirmasi password minimal 8 karakter"),
    agree: z
      .boolean()
      .refine(
        (val) => val === true,
        "Anda harus menyetujui syarat & ketentuan"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
