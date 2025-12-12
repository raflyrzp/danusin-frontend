import { apiClient } from "@/lib/api-client";
import type { Image } from "@/types";

export interface CreateImageDTO {
  url: string;
  alt_text?: string;
  entity_type: "product" | "user";
  entity_id: number;
  is_primary?: boolean;
}

export interface BulkCreateImagesDTO {
  entity_type: "product" | "user";
  entity_id: number;
  images: Array<{
    url: string;
    alt_text?: string;
    is_primary?: boolean;
  }>;
}

export const imagesService = {
  /**
   * Get images by entity
   */
  getByEntity: async (entityType: "product" | "user", entityId: number) => {
    return await apiClient.get<{ images: Image[] }>("/images", {
      params: { entity_type: entityType, entity_id: entityId },
    });
  },

  /**
   * Get image by ID
   */
  getById: async (id: number) => {
    return await apiClient. get<{ image: Image }>(`/images/${id}`);
  },

  /**
   * Create single image
   */
  create: async (data: CreateImageDTO) => {
    return await apiClient.post<{ image: Image }>("/images", data);
  },

  /**
   * Bulk create images
   */
  bulkCreate: async (data: BulkCreateImagesDTO) => {
    return await apiClient.post<{ images: Image[] }>("/images/bulk", data);
  },

  /**
   * Update image
   */
  update: async (id: number, data: Partial<CreateImageDTO>) => {
    return await apiClient. put<{ image: Image }>(`/images/${id}`, data);
  },

  /**
   * Set as primary image
   */
  setPrimary: async (id: number) => {
    return await apiClient.patch<{ image: Image }>(`/images/${id}/primary`);
  },

  /**
   * Delete image
   */
  delete: async (id: number) => {
    return await apiClient.delete(`/images/${id}`);
  },

  /**
   * Reorder images
   */
  reorder: async (entityType: "product" | "user", entityId: number, imageIds: number[]) => {
    return await apiClient.post("/images/reorder", {
      entity_type: entityType,
      entity_id: entityId,
      image_ids: imageIds,
    });
  },
};
