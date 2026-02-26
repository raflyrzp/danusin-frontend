import { apiClient } from "@/lib/api-client";
import { config } from "@/lib/config";
import type { User, ApiResponse } from "@/types";

// USER SERVICE
export const userService = {
  // Get current user profile
  async getMyProfile(): Promise<User> {
    const response = await apiClient.get<User>("/users/me");
    return response.data!;
  },

  // Update profile
  async updateProfile(
    data: Partial<Pick<User, "name" | "whatsapp">>,
  ): Promise<User> {
    const response = await apiClient.patch<User>("/users/me", data);
    return response.data!;
  },

  // Update profile image
  async updateProfileImage(imageUrl: string): Promise<User> {
    const response = await apiClient.patch<User>("/users/me/profile-image", {
      imageUrl,
    });
    return response.data!;
  },

  // Update email
  async updateEmail(email: string, password: string): Promise<void> {
    await apiClient.patch("/users/me/email", { email, password });
  },

  // Update whatsapp
  async updateWhatsapp(whatsapp: string): Promise<void> {
    await apiClient.patch("/users/me/whatsapp", { whatsapp });
  },

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    await apiClient.patch("/users/me/password", {
      currentPassword,
      newPassword,
    });
  },

  // Upgrade to seller
  async upgradeToSeller(data: {
    store_name: string;
    description?: string;
    whatsapp: string;
  }): Promise<void> {
    await apiClient.post("/users/me/upgrade-seller", data);
  },

  // Get public profile
  async getPublicProfile(
    userId: number,
  ): Promise<User & { active_products_count: number }> {
    const response = await apiClient.get<
      User & { active_products_count: number }
    >(`/users/${userId}/public-profile`);
    return response.data!;
  },
};

// UPLOAD SERVICE
export const uploadService = {
  // Upload image - backend expects field name 'image'
  async uploadImage(file: File): Promise<string> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const formData = new FormData();
    formData.append("image", file);

    const baseUrl = config.api.baseUrl;

    const response = await fetch(`${baseUrl}/upload`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengupload gambar");
    }

    const data = await response.json();

    // Backend returns { data: { image_url: "/uploads/xxx.jpg" } }
    const imageUrl = data?.data?.image_url;

    if (!imageUrl || typeof imageUrl !== "string") {
      console.error("Invalid upload response:", data);
      throw new Error("Response upload tidak valid");
    }

    // Return full URL (prepend backend base if relative path)
    if (imageUrl.startsWith("/")) {
      // Get base URL without /api/v1 suffix
      const backendBase = baseUrl
        .replace(/\/api\/v1$/, "")
        .replace(/\/api$/, "");
      return `${backendBase}${imageUrl}`;
    }

    return imageUrl;
  },

  // Upload multiple images
  async uploadImages(files: File[]): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const url = await this.uploadImage(file);
      uploadedUrls.push(url);
    }

    return uploadedUrls;
  },
};
