import { apiClient } from "@/lib/api-client";
import type { Product, ProductFilters } from "@/types";

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock?: number;
  po_open_date: string;
  po_close_date: string;
  delivery_date?: string;
  images?: string[];
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  po_open_date?: string;
  po_close_date?: string;
  delivery_date?: string | null;
  images?: string[];
  add_images?: string[];
  remove_image_ids?: number[];
}

export const productsService = {
  /**
   * Get all products with optional filters
   * Response: { data: Product[], meta: {... } }
   */
  getAll: async (params?: ProductFilters) => {
    return await apiClient.get<Product[]>("/products", { params });
  },

  /**
   * Get single product by ID
   * Response: { data: Product, meta: {...} }
   */
  getById: async (id: number | string) => {
    return await apiClient.get<Product>(`/products/${id}`);
  },

  /**
   * Get products owned by current seller
   */
  getMine: async () => {
    return await apiClient.get<Product[]>("/products/me/mine");
  },

  /**
   * Create new product (seller only)
   */
  create: async (data: CreateProductDTO) => {
    const cleanData = {
      ...data,
      images: data.images?.filter((url): url is string =>
        typeof url === "string" && url.trim().length > 0
      ),
    };

    if (!cleanData.images || cleanData.images.length === 0) {
      delete cleanData.images;
    }

    return await apiClient.post<Product>("/products", cleanData);
  },

  /**
   * Update product (seller only)
   */
  update: async (id: number | string, data: UpdateProductDTO) => {
    const cleanData = { ...data };

    if (cleanData.images) {
      cleanData.images = cleanData.images.filter((url): url is string =>
        typeof url === "string" && url.trim().length > 0
      );
      if (cleanData.images.length === 0) {
        delete cleanData.images;
      }
    }

    if (cleanData.add_images) {
      cleanData.add_images = cleanData.add_images.filter((url): url is string =>
        typeof url === "string" && url.trim().length > 0
      );
      if (cleanData.add_images.length === 0) {
        delete cleanData.add_images;
      }
    }

    return await apiClient.put<Product>(`/products/${id}`, cleanData);
  },

  /**
   * Delete product (seller only)
   */
  delete: async (id: number | string) => {
    return await apiClient.delete(`/products/${id}`);
  },
};
