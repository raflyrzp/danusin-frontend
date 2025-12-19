"use client";

import Link from "next/link";
import { LogOut, User, ChevronDown } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  avatarUrl?: string;
  onLogout?: () => void;
}

export function UserMenu({
  name = "User",
  email,
  avatarUrl,
  onLogout
}: UserMenuProps) {
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
          className="group flex items-center gap-2 rounded-full border border-[#E3D9BD] bg-white pl-1 pr-3 py-1 shadow-sm transition-all hover:bg-[#F8F4E1] hover:border-[#FEBA17] focus:outline-none focus:ring-2 focus:ring-[#FEBA17]/20"
        >
          <Avatar className="h-8 w-8 border border-[#E3D9BD]">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-[#FEBA17] text-xs font-bold text-[#4E1F00]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start text-left hidden sm:flex">
            <span className="text-xs font-semibold text-[#4E1F00] leading-none group-hover:text-[#74512D] transition-colors">
              {name.split(" ")[0]}
            </span>
          </div>

          <ChevronDown className="h-4 w-4 text-[#B4A98C] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 p-2">
        {/* Header: Nama & Email */}
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-[#4E1F00] leading-none">
              {name}
            </p>
            {email && (
              <p className="text-xs leading-none text-[#8A7A57] truncate">
                {email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#E3D9BD]/50 my-1" />

        {/* Menu Profile */}
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-[#FEBA17]/10 focus:text-[#4E1F00]">
          <Link href={ROUTES.PROFILE || "/buyer/profile"} className="flex items-center gap-2">
            <User className="h-4 w-4 text-[#C2A56F]" />
            <span>Profil Saya</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#E3D9BD]/50 my-1" />

        {/* Menu Logout */}
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
