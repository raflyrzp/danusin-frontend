import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Store, DashboardSellerSummary, CreateStoreDTO } from "@/types";

export const useMyStore = () =>
  useQuery({
    queryKey: ["store", "my"],
    queryFn: () => apiClient.get<Store>("/stores/my"),
  });
export const useStoreDashboard = (period: string = "30") =>
  useQuery({
    queryKey: ["store", "dashboard", period],
    queryFn: () =>
      apiClient.get<DashboardSellerSummary>(
        `/dashboard/seller/summary?period=${period}`,
      ),
  });

export function useCreateStore() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStoreDTO) =>
      apiClient.post<Store>("/stores", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store"] });
      qc.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
