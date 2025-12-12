import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useSellerDashboard() {
  return useQuery({
    queryKey: ["dashboard", "seller"],
    queryFn: () => dashboardService.getSellerSummary(),
    staleTime: 30 * 1000,
  });
}

export function useBuyerDashboard() {
  return useQuery({
    queryKey: ["dashboard", "buyer"],
    queryFn: () => dashboardService.getBuyerSummary(),
    staleTime: 30 * 1000,
  });
}
