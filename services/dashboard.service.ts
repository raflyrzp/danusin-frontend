import { apiClient } from "@/lib/api-client";
import type { DashboardSellerSummary, DashboardBuyerSummary } from "@/types";

export const dashboardService = {
  getSellerSummary: (period: string = "30") =>
    apiClient.get<DashboardSellerSummary>(
      `/dashboard/seller/summary?period=${period}`,
    ),
  getBuyerSummary: () =>
    apiClient.get<DashboardBuyerSummary>("/dashboard/buyer/summary"),
};
