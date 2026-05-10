import { apiClient } from "@/lib/api-client";
import { config } from "@/lib/config";
import type { User } from "@/types";

export const userService = {
  getMyProfile: async () => (await apiClient.get<User>("/users/me")).data!,
  updateProfile: async (data: Partial<Pick<User, "name" | "whatsapp">>) => (await apiClient.patch<User>("/users/me", data)).data!,
  updateProfileImage: async (imageUrl: string) => (await apiClient.patch<User>("/users/me/profile-image", { imageUrl })).data!,
  updateEmail: (email: string, password: string) => apiClient.patch("/users/me/email", { email, password }),
  updateWhatsapp: (whatsapp: string) => apiClient.patch("/users/me/whatsapp", { whatsapp }),
  changePassword: (currentPassword: string, newPassword: string) => apiClient.patch("/users/me/password", { currentPassword, newPassword }),
  upgradeToSeller: (data: { store_name: string; description?: string; whatsapp: string }) => apiClient.post("/users/me/store", data),
  getPublicProfile: async (id: number) => (await apiClient.get<User & { active_products_count: number }>(`/users/${id}/public-profile`)).data!,
};

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`${config.api.baseUrl}/upload`, {
      method: "POST",
      headers: { ...(apiClient.getAuthToken() && { Authorization: `Bearer ${apiClient.getAuthToken()}` }) },
      body: fd,
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || "Gagal mengupload gambar");
    const { data } = await res.json();
    const url = data?.image_url;
    if (!url) throw new Error("Response upload tidak valid");
    return url.startsWith("/") ? `${config.api.baseUrl.replace(/\/api\/v1$/, "")}${url}` : url;
  },
  uploadImages: async (files: File[]) => Promise.all(files.map(f => uploadService.uploadImage(f))),
};
