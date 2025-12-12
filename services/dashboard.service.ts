import { apiClient } from "@/lib/api-client";
import type { DashboardSellerSummary, DashboardBuyerSummary } from "@/types";

export const dashboardService = {
  /**
   * Get seller dashboard summary
   */
  getSellerSummary: async () => {
    return await apiClient.get<DashboardSellerSummary>("/dashboard/seller/summary");
  },

  /**
   * Get buyer dashboard summary
   */
  getBuyerSummary: async () => {
    return await apiClient.get<DashboardBuyerSummary>("/dashboard/buyer/summary");
  },
};
