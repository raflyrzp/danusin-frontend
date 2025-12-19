import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Store, DashboardSellerSummary, CreateStoreDTO } from "@/types";

export function useMyStore() {
  return useQuery({
    queryKey: ["store", "my"],
    queryFn:  () => apiClient.get<Store>("/stores/my"),
  });
}

export function useStoreDashboard() {
  return useQuery({
    queryKey:  ["store", "dashboard"],
    queryFn:  () => apiClient.get<DashboardSellerSummary>("/dashboard/seller"),
  });
}

export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStoreDTO) => apiClient.post<Store>("/stores", data),
    onSuccess: () => {
      queryClient. invalidateQueries({ queryKey: ["store"] });
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
