import { apiClient } from "@/lib/api-client";
import type { Notification } from "@/types";

export const notificationService = {
  // Get all notifications
  async getAll(): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>("/notifications");
    return response.data || [];
  },

  // Get unread count
  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>(
      "/notifications/unread-count",
    );
    return response.data?.count || 0;
  },

  // Mark single notification as read
  async markAsRead(notificationId: number): Promise<void> {
    await apiClient.patch(`/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await apiClient.post("/notifications/read-all");
  },
};
