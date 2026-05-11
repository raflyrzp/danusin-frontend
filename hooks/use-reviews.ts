import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService, CreateReviewPayload } from "@/services/review.service";
import { toast } from "sonner";

export function useProductReviews(productId: number) {
  return useQuery({
    queryKey: ["reviews", "product", productId],
    queryFn: () => reviewService.getProductReviews(productId),
    enabled: !!productId,
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateReviewPayload) => reviewService.createReview(data),
    onSuccess: (review) => {
      qc.invalidateQueries({ queryKey: ["reviews", "product", review.product_id] });
      qc.invalidateQueries({ queryKey: ["orders"] }); // To refresh button states
      toast.success("Terima kasih atas ulasan Anda!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Gagal mengirim ulasan");
    },
  });
}
