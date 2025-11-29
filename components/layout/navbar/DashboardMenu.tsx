"use client";

import { ChevronDown, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardMenu() {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/dashboard");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition",
            isActive
              ? "bg-[#F5D36B] text-[#4E1F00] shadow-sm"
              : "text-[#4E1F00] hover:bg-[#f7e09a]"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuItem asChild>
          <Link href={ROUTES.DASHBOARD.BUYER}>Dashboard Buyer</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.DASHBOARD.SELLER}>Dashboard Seller</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
