import { apiClient } from "@/lib/api-client";
import type { Review, ProductReviewsResponse } from "@/types";

export interface CreateReviewPayload {
  order_id: number;
  rating: number;
  comment?: string;
  images?: string[];
}

export const reviewService = {
  createReview: async (data: CreateReviewPayload) => 
    (await apiClient.post<{ review: Review }>("/reviews", data)).data!.review,
    
  getProductReviews: async (productId: number) => 
    (await apiClient.get<ProductReviewsResponse>(`/reviews/product/${productId}`)).data!,
};
