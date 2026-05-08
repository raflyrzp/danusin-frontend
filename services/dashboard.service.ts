import { apiClient } from "@/lib/api-client";
import type { DashboardSellerSummary, DashboardBuyerSummary } from "@/types";

export const dashboardService = {
  getSellerSummary: () => apiClient.get<DashboardSellerSummary>("/dashboard/seller/summary"),
  getBuyerSummary: () => apiClient.get<DashboardBuyerSummary>("/dashboard/buyer/summary"),
};
