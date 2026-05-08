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

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  add_images?: string[];
  remove_image_ids?: number[];
}

const cleanImages = (urls?: string[]) => urls?.filter(u => u?.trim())?.length ? urls.filter(u => u?.trim()) : undefined;

export const productsService = {
  getAll: (params?: ProductFilters) => apiClient.get<Product[]>("/products", { params }),
  getById: (id: number | string) => apiClient.get<Product>(`/products/${id}`),
  getMine: () => apiClient.get<Product[]>("/products/me/mine"),
  create: (data: CreateProductDTO) => {
    const images = cleanImages(data.images);
    return apiClient.post<Product>("/products", { ...data, images });
  },
  update: (id: number | string, data: UpdateProductDTO) => {
    const images = cleanImages(data.images);
    const add_images = cleanImages(data.add_images);
    return apiClient.put<Product>(`/products/${id}`, { ...data, images, add_images });
  },
  delete: (id: number | string) => apiClient.delete(`/products/${id}`),
};
