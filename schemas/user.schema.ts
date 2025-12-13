import { z } from "zod";

// Profile form schema
export const profileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  whatsapp: z. string().regex(/^08\d{8,12}$/, "Nomor WhatsApp tidak valid"),
});

// Update email schema
export const updateEmailSchema = z. object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password diperlukan untuk verifikasi"),
});

// Update phone/whatsapp schema
export const updateWhatsappSchema = z.object({
  whatsapp: z.string().regex(/^08\d{8,12}$/, "Nomor WhatsApp tidak valid"),
});

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini diperlukan"),
    newPassword: z. string().min(8, "Password baru minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password diperlukan"),
  })
  .refine((data) => data.newPassword === data. confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

// Upgrade to seller schema
export const upgradeToSellerSchema = z.object({
  whatsapp: z. string().regex(/^08\d{8,12}$/, "Nomor WhatsApp tidak valid"),
  student_proof_url: z.string().min(1, "Bukti mahasiswa diperlukan"),
});

// Type exports
export type ProfileFormData = z.infer<typeof profileSchema>;
export type UpdateEmailFormData = z.infer<typeof updateEmailSchema>;
export type UpdateWhatsappFormData = z.infer<typeof updateWhatsappSchema>;
export type ChangePasswordFormData = z. infer<typeof changePasswordSchema>;
export type UpgradeToSellerFormData = z.infer<typeof upgradeToSellerSchema>;
