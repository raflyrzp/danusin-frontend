import { z } from "zod";

export const loginSchema = z.object({
  credential: z.string().min(1, "Email atau NIM wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
  remember: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
