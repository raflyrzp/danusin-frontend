import { User, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// FETCH HELPER
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers:  {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Terjadi kesalahan");
  }

  return response.json();
}

// USER SERVICE
export const userService = {
  // Get current user profile
  async getMyProfile(): Promise<User> {
    const response = await fetchWithAuth<ApiResponse<User>>("/users/me");
    return response. data! ;
  },

  // Update profile
  async updateProfile(
    data: Partial<Pick<User, "name" | "whatsapp">>
  ): Promise<User> {
    const response = await fetchWithAuth<ApiResponse<User>>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response. data!;
  },

  // Update profile image
  async updateProfileImage(imageUrl: string): Promise<User> {
    const response = await fetchWithAuth<ApiResponse<User>>(
      "/users/me/profile-image",
      {
        method: "PATCH",
        body: JSON.stringify({ imageUrl }),
      }
    );
    return response.data! ;
  },

  // Update email
  async updateEmail(email: string, password: string): Promise<void> {
    await fetchWithAuth("/users/me/email", {
      method: "PATCH",
      body: JSON.stringify({ email, password }),
    });
  },

  // Update whatsapp
  async updateWhatsapp(whatsapp: string): Promise<void> {
    await fetchWithAuth("/users/me/whatsapp", {
      method:  "PATCH",
      body: JSON. stringify({ whatsapp }),
    });
  },

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await fetchWithAuth("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Upgrade to seller
  async upgradeToSeller(data: {
    store_name: string;
    description?: string;
    whatsapp: string;
  }): Promise<void> {
    await fetchWithAuth("/users/me/upgrade-seller", {
      method: "POST",
      body: JSON. stringify(data),
    });
  },

  // Get public profile
  async getPublicProfile(
    userId: number
  ): Promise<User & { active_products_count: number }> {
    const response = await fetchWithAuth<
      ApiResponse<User & { active_products_count: number }>
    >(`/users/${userId}/public-profile`);
    return response.data! ;
  },
};

// UPLOAD SERVICE
export const uploadService = {
  // Upload image - backend expects field name 'image'
  async uploadImage(file: File): Promise<string> {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
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

    // Return full URL (prepend API base if relative path)
    if (imageUrl.startsWith("/")) {
      // Get base URL without /api/v1 suffix
      const baseUrl = API_BASE_URL.replace(/\/api\/v1$/, "").replace(/\/api$/, "");
      return `${baseUrl}${imageUrl}`;
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
