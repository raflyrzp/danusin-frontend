import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const useSellerDashboard = (period: string = "30") =>
  useQuery({
    queryKey: ["dashboard", "seller", period],
    queryFn: () => dashboardService.getSellerSummary(period),
    staleTime: 30000,
  });
export const useBuyerDashboard = () =>
  useQuery({
    queryKey: ["dashboard", "buyer"],
    queryFn: () => dashboardService.getBuyerSummary(),
    staleTime: 30000,
  });
