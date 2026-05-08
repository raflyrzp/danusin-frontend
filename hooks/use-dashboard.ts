import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const useSellerDashboard = () => useQuery({ queryKey: ["dashboard", "seller"], queryFn: () => dashboardService.getSellerSummary(), staleTime: 30000 });
export const useBuyerDashboard = () => useQuery({ queryKey: ["dashboard", "buyer"], queryFn: () => dashboardService.getBuyerSummary(), staleTime: 30000 });
