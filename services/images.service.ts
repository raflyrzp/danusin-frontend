import { apiClient } from "@/lib/api-client";
import type { Image } from "@/types";

export interface CreateImageDTO {
  url: string;
  alt_text?: string;
  entity_type: "product" | "user" | "store";
  entity_id: number;
  is_primary?: boolean;
}

export interface BulkCreateImagesDTO {
  entity_type: "product" | "user" | "store";
  entity_id: number;
  images: Array<{ url: string; alt_text?: string; is_primary?: boolean }>;
}

export const imagesService = {
  getByEntity: (type: "product" | "user" | "store", id: number) => apiClient.get<{ images: Image[] }>("/images", { params: { entity_type: type, entity_id: id } }),
  getById: (id: number) => apiClient.get<{ image: Image }>(`/images/${id}`),
  create: (data: CreateImageDTO) => apiClient.post<{ image: Image }>("/images", data),
  bulkCreate: (data: BulkCreateImagesDTO) => apiClient.post<{ images: Image[] }>("/images/bulk", data),
  update: (id: number, data: Partial<CreateImageDTO>) => apiClient.put<{ image: Image }>(`/images/${id}`, data),
  setPrimary: (id: number) => apiClient.patch<{ image: Image }>(`/images/${id}/primary`),
  delete: (id: number) => apiClient.delete(`/images/${id}`),
  reorder: (type: "product" | "user", id: number, ids: number[]) => apiClient.post("/images/reorder", { entity_type: type, entity_id: id, image_ids: ids }),
};
