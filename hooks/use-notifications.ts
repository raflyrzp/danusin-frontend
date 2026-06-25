"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { toast } from "sonner";

export const useNotifications = () => useQuery({ queryKey: ["notifications"], queryFn: () => notificationService.getAll(), staleTime: 30000, refetchInterval: 60000 });
export const useUnreadNotificationCount = () => useQuery({ queryKey: ["notifications", "unread-count"], queryFn: () => notificationService.getUnreadCount(), staleTime: 15000, refetchInterval: 30000 });

export function useMarkNotificationAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => notificationService.markAsRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllNotificationsAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Semua notifikasi dibaca");
    },
  });
}
