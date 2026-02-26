"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { toast } from "sonner";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getAll(),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // Poll every 60 seconds
  });
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationService.getUnreadCount(),
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000, // Poll every 30 seconds
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      notificationService.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Semua notifikasi ditandai sudah dibaca");
    },
  });
}
