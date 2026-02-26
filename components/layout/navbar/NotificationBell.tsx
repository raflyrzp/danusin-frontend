"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUnreadNotificationCount } from "@/hooks/use-notifications";
import { ROUTES } from "@/constants/routes";

export function NotificationBell() {
  const { data: count } = useUnreadNotificationCount();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"
      aria-label="Notifikasi"
      asChild
    >
      <Link href={ROUTES.NOTIFICATIONS}>
        <Bell className="h-5 w-5" />
        {count && count > 0 ? (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
