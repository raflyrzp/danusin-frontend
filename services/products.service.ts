import { apiClient } from "@/lib/api-client";
import type { Product, ApiResponse } from "@/types";

export const productsService = {
  getAll: async (params?: { q?: string; page?: number; limit?: number }) => {
    return await apiClient.get<
      ApiResponse<{ products: Product[]; total: number }>
    >("/products", {
      params,
    });
  },
};
