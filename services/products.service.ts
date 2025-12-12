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
    return await apiClient.post<Product>("/products", data);
  },

  /**
   * Update product (seller only)
   */
  update: async (id: number | string, data: UpdateProductDTO) => {
    return await apiClient.put<Product>(`/products/${id}`, data);
  },

  /**
   * Delete product (seller only)
   */
  delete: async (id: number | string) => {
    return await apiClient.delete(`/products/${id}`);
  },
};
