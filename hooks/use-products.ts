import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";

export function useProducts(params?: { q?: string; page?: number }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productsService.getAll(params),
  });
}
