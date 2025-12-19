"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  User as UserIcon,
  Settings,
  ShoppingBag,
  Store,
  ChevronRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
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

// Data menu tetap sama
const buyerItems: SidebarItem[] = [
  {
    label: "Akun Saya",
    href: "/buyer/profile",
    icon: <Settings className="h-4 w-4" />,
    children: [
      { label: "Profile", href: "/buyer/profile" },
      { label: "Ganti Password", href: "/buyer/change-password" },
    ],
  },
  {
    label: "Pesananku",
    href: "/buyer/orders",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
];

const storeItems: SidebarItem[] = [
  {
    label: "Dashboard Toko",
    href: "/store",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Manajemen Toko",
    href: "/store/orders", // Placeholder link
    icon: <Store className="h-4 w-4" />,
    children: [
      { label: "Pesanan Masuk", href: "/store/orders" },
      { label: "Produk Saya", href: "/store/products" },
    ],
  },
];

interface SidebarProps {
  user: User | null;
  userImage?: string | null;
  isLoading?: boolean;
  variant?: "buyer" | "store";
}

export function Sidebar({
  user,
  userImage,
  isLoading = false,
  variant = "buyer",
}: SidebarProps) {
  const pathname = usePathname();
  const isSeller = user?.role === "seller";

  // Helper untuk render menu item agar kodenya tidak berulang
  const renderNavItems = (items: SidebarItem[]) => {
    return (
      <nav className="space-y-1">
        {items.map((item) => {
          const isActiveParent =
            pathname === item.href ||
            item.children?.some((child) => pathname === child.href);

          return (
            <div key={item.label} className="mb-2">
              {/* Parent Item */}
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActiveParent
                    ? "bg-[#FEBA17]/10 text-[#4E1F00]"
                    : "text-[#74512D] hover:bg-[#F8F4E1] hover:text-[#4E1F00]"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.children && (
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isActiveParent ? "rotate-90 text-[#FEBA17]" : "text-[#B4A98C]"
                    )}
                  />
                )}
              </Link>

              {/* Children Items */}
              {item.children && isActiveParent && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E3D9BD] space-y-1">
                  {item.children.map((child) => {
                    const isActiveChild = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-sm transition-colors relative",
                          isActiveChild
                            ? "text-[#4E1F00] font-semibold bg-[#FEBA17]/20"
                            : "text-[#74512D] hover:text-[#4E1F00] hover:underline decoration-[#FEBA17]/50"
                        )}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  };

  return (
    <aside className="w-72 bg-white border-r border-[#E3D9BD] flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
      {/* 1. Header Area: Back Button & Profile */}
      <div className="p-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#B4A98C] hover:text-[#74512D] transition-colors mb-6"
        >
          <ArrowLeft className="h-3 w-3" />
          Kembali ke Beranda
        </Link>

        <div className="flex items-center gap-4 p-3 rounded-xl bg-[#FDFBF7] border border-[#E3D9BD]/50">
          <Avatar className="h-10 w-10 border border-[#E3D9BD]">
            <AvatarImage src={userImage || ""} alt={user?.name || ""} />
            <AvatarFallback className="bg-[#FEBA17] text-[#4E1F00] font-bold">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#4E1F00] text-sm truncate">
              {isLoading ? "Memuat..." : user?.name || "Pengguna"}
            </p>
            <p className="text-xs text-[#74512D] truncate">
              {user?.role === "seller" ? "Penjual & Pembeli" : "Pembeli"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
        {/* Section: Buyer (Selalu Muncul) */}
        <div>
          <p className="px-3 text-xs font-bold text-[#B4A98C] uppercase tracking-wider mb-2">
            Menu Pembeli
          </p>
          {renderNavItems(buyerItems)}
        </div>

        {/* PEMBATAS / DIVIDER */}
        {isSeller && (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E3D9BD]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#B4A98C]">Toko Saya</span>
            </div>
          </div>
        )}

        {/* Section: Seller (Hanya jika role seller) */}
        {isSeller && (
          <div>
            {renderNavItems(storeItems)}
          </div>
        )}
      </div>

      {/* 3. Footer Area: Call to Action */}
      <div className="p-4 border-t border-[#E3D9BD] bg-[#FDFBF7]">
        {!isSeller ? (
          <div className="rounded-xl bg-gradient-to-br from-[#4E1F00] to-[#74512D] p-4 text-[#F8F4E1] shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
              <Store className="h-16 w-16" />
            </div>
            <h4 className="font-bold text-sm mb-1 relative z-10">Punya Produk?</h4>
            <p className="text-xs text-[#F8F4E1]/80 mb-3 relative z-10">
              Buka tokomu sekarang dan mulai berjualan di DanusHub.
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full bg-[#FEBA17] text-[#4E1F00] hover:bg-[#ffcd4f] border-none font-bold text-xs shadow-md relative z-10"
              asChild
            >
              <Link href="/buyer/create-store">
                Buat Toko Gratis
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        )}
      </div>
    </aside>
  );
}
