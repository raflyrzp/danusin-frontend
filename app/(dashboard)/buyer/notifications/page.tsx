"use client";

import { Bell, CheckCheck, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/hooks/use-notifications";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const unreadCount =
    notifications?.filter((n: Notification) => !n.is_read).length || 0;

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-[#FEBA17]" />
            <h1 className="text-2xl font-bold text-[#4E1F00]">Notifikasi</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
              className="text-sm"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        {!notifications || notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bell className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                Belum ada notifikasi
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Notifikasi pesanan akan muncul di sini
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification: Notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  !notification.is_read &&
                    "border-l-4 border-l-[#FEBA17] bg-[#FEBA17]/5",
                )}
                onClick={() => {
                  if (!notification.is_read) {
                    markAsRead.mutate(notification.id);
                  }
                }}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="mt-1">
                    {!notification.is_read ? (
                      <Circle className="h-3 w-3 fill-[#FEBA17] text-[#FEBA17]" />
                    ) : (
                      <Circle className="h-3 w-3 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm",
                        !notification.is_read
                          ? "font-semibold text-[#4E1F00]"
                          : "font-medium text-gray-700",
                      )}
                    >
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatRelativeTime(notification.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
