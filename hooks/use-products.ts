import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService, type CreateProductDTO, type UpdateProductDTO } from "@/services/products.service";
import type { ProductFilters } from "@/types";

export const useProducts = (filters?: ProductFilters) => useQuery({ queryKey: ["products", filters], queryFn: () => productsService.getAll(filters), staleTime: 60000 });
export const useProduct = (id: number | string) => useQuery({ queryKey: ["product", id], queryFn: () => productsService.getById(id), enabled: !!id });
export const useMyProducts = () => useQuery({ queryKey: ["products", "mine"], queryFn: () => productsService.getMine() });

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductDTO) => productsService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateProductDTO }) => productsService.update(id, data),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product", v.id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => productsService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
