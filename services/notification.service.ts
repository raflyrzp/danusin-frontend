import { apiClient } from "@/lib/api-client";
import type { Notification } from "@/types";

export const notificationService = {
  getAll: async () => (await apiClient.get<Notification[]>("/notifications")).data || [],
  getUnreadCount: async () => (await apiClient.get<{ count: number }>("/notifications/unread-count")).data?.count || 0,
  markAsRead: (id: number) => apiClient.patch(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.post("/notifications/read-all"),
};
