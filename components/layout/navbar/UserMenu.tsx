"use client";

import Link from "next/link";
import { LogOut, Settings, ShoppingBag, User } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  name?: string;
  email?: string;
  onLogout?: () => void;
}

export function UserMenu({ name = "User", email, onLogout }: UserMenuProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-[#F6E1A6] bg-[#FBD96B] px-3 py-1.5 text-sm font-medium text-[#4E1F00] shadow-sm transition hover:bg-[#e5a612]"
        >
          <Avatar className="h-7 w-7 border border-[#F6E1A6]">
            <AvatarFallback className="text-xs font-semibold text-[#4E1F00]">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{name.split(" ")[0]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs">
          <div className="font-medium text-[#4E1F00]">{name}</div>
          {email && <div className="text-[11px] text-[#8A7A57]">{email}</div>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.PROFILE} className="flex items-center gap-2">
            <User className="h-4 w-4 text-[#C2A56F]" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={ROUTES.DASHBOARD.BUYER}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4 text-[#C2A56F]" />
            <span>Dashboard Buyer</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={ROUTES.DASHBOARD.SELLER}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4 text-[#C2A56F]" />
            <span>Dashboard Seller</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
