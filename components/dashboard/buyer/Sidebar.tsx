"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, User as UserIcon, Settings, ShoppingBag, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "My Account",
    href:  "/buyer",
    icon: <Settings className="h-4 w-4" />,
    children: [
      { label: "Profile", href: "/buyer/profile" },
      { label: "Change Password", href: "/buyer/change-password" },
    ],
  },
  {
    label: "Pesananku",
    href:  "/buyer/orders",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
];

interface SidebarProps {
  user: User | null;
  userImage?: string | null;
  isLoading?: boolean;
}

export function Sidebar({ user, userImage, isLoading = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#FEBA17]/20 border-r border-[#E3D9BD] p-4 shrink-0">
      {/* Back button */}
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-[#4E1F00] hover:text-[#74512D] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      {/* User info */}
      <div className="flex items-center gap-3 mb-6">
        <Avatar className="h-10 w-10 border-2 border-[#FEBA17]">
          <AvatarImage src={userImage || ""} alt={user?.name || ""} />
          <AvatarFallback className="bg-[#4E1F00] text-[#FEBA17]">
            {user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-[#4E1F00] text-sm">
            {isLoading ? "Loading..." : user?.name || "User"}
          </p>
          <Link
            href="/buyer/profile"
            className="text-xs text-[#74512D] hover: underline flex items-center gap-1"
          >
            <UserIcon className="h-3 w-3" />
            Edit profile
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href ||
            item.children?.some((child) => pathname === child.href);

          return (
            <div key={item.href}>
              <Link
                href={item. children ?  item.children[0].href : item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#FEBA17] text-[#4E1F00]"
                    : "text-[#4E1F00] hover:bg-[#FEBA17]/50"
                )}
              >
                {item.icon}
                {item. label}
              </Link>

              {item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child. href}
                      className={cn(
                        "block px-3 py-1. 5 rounded-lg text-xs transition-colors",
                        pathname === child.href
                          ? "text-[#4E1F00] font-medium"
                          : "text-[#74512D] hover: text-[#4E1F00]"
                      )}
                    >
                      {child. label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Upgrade to Seller button */}
      {user?.role !== "seller" && (
        <div className="mt-6">
          <Button
            size="sm"
            className="w-full rounded-full bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] text-xs"
            asChild
          >
            <Link href="/buyer/upgrade-seller">
              <Store className="h-3 w-3 mr-1" />
              Upgrade to Seller
            </Link>
          </Button>
        </div>
      )}
    </aside>
  );
}
