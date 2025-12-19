"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  ShoppingCart,
  X,
  Home,
  UtensilsCrossed,
  Store,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardMenu } from "./DashboardMenu";
import { UserMenu } from "./UserMenu";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { logoutAction } from "@/actions/auth/logout";

const navLinks = [
  { label: "Beranda", href: ROUTES.HOME, icon: Home },
  // { label: "Menu Jajanan", href: ROUTES.PRODUCTS, icon: UtensilsCrossed },
];

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export function Navbar({
  isAuthenticated: propIsAuthenticated,
  userName: propUserName,
  userEmail: propUserEmail,
  onLogout: propOnLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated: hookIsAuthenticated, isLoading } = useAuth();
  const { mutate: hookLogout } = useLogout();

  const isAuthenticated =
    propIsAuthenticated !== undefined
      ? propIsAuthenticated
      : hookIsAuthenticated;
  const userName = propUserName || user?.name;
  const userEmail = propUserEmail || user?.email;

  const handleLogout = async () => {
    if (propOnLogout) {
      propOnLogout();
    } else {
      hookLogout();
      await logoutAction();
    }
  };

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/auth");

  // Minimal navbar for auth pages
  if (isAuthPage) {
    return (
      <header className="w-full border-b border-[#F3E8C0]/50 bg-linear-to-r from-[#FEBA17] to-[#F5D36B]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E1F00] shadow-lg">
              <span className="text-lg font-bold text-[#FEBA17]">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#4E1F00]">
              Danus.in
            </span>
          </Link>
          <span className="hidden sm:block text-sm font-medium text-[#4E1F00]/70">
            Platform Danusan Mahasiswa
          </span>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F3E8C0]/30 bg-linear-to-r from-[#FEBA17] via-[#FEBA17] to-[#F5D36B] shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E1F00] shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-lg font-bold text-[#FEBA17]">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#4E1F00] hidden sm:block">
              Danus.in
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-[#4E1F00] text-[#F8F4E1] shadow-md"
                      : "text-[#4E1F00] hover:bg-[#4E1F00]/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            {/*<DashboardMenu />*/}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              {/*<Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"
                aria-label="Notifikasi"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                    3
                  </span>
                </Link>
              </Button>*/}

              {/* Cart */}
              {/*<Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"
                aria-label="Keranjang"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>*/}

              {/* User Menu */}
              <UserMenu
                name={userName}
                email={userEmail}
                onLogout={handleLogout}
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              {/*<Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"
                aria-label="Keranjang"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>*/}
              <Button
                variant="ghost"
                className="rounded-xl px-4 text-sm font-medium text-[#4E1F00] hover:bg-[#4E1F00]/10"
                asChild
              >
                <Link href={ROUTES.LOGIN}>Masuk</Link>
              </Button>
              <Button
                className="rounded-xl bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] px-5 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link href={ROUTES.REGISTER}>Daftar Sekarang</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
            </>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-[#FFFBF0] border-l border-[#E3D9BD]">
              <SheetHeader className="border-b border-[#E3D9BD] pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4E1F00]">
                    <span className="text-sm font-bold text-[#FEBA17]">D</span>
                  </div>
                  <span className="text-lg font-bold text-[#4E1F00]">
                    Danus.in
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* User info if authenticated */}
                {isAuthenticated && userName && (
                  <div className="p-4 rounded-2xl bg-linear-to-br from-[#FEBA17]/20 to-[#F5D36B]/20 border border-[#FEBA17]/30">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#FEBA17] flex items-center justify-center">
                        <span className="text-lg font-bold text-[#4E1F00]">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#4E1F00]">
                          {userName}
                        </p>
                        {userEmail && (
                          <p className="text-xs text-[#74512D]">{userEmail}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#B4A98C] uppercase tracking-wider px-3 mb-2">
                    Menu
                  </p>
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                          active
                            ? "bg-[#FEBA17] text-[#4E1F00] shadow-md"
                            : "text-[#4E1F00] hover:bg-[#FEBA17]/20"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Authenticated Menu Items */}
                {/*{isAuthenticated && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#B4A98C] uppercase tracking-wider px-3 mb-2">
                      Akun
                    </p>
                    <Link
                      href="/notifications"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"
                    >
                      <Bell className="h-5 w-5" />
                      Notifikasi
                      <span className="ml-auto px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        3
                      </span>
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Keranjang
                    </Link>
                  </div>
                )}*/}

                {/* Dashboard Links */}
                {/*<div className="space-y-1">
                  <p className="text-xs font-semibold text-[#B4A98C] uppercase tracking-wider px-3 mb-2">
                    Dashboard
                  </p>
                  <Link
                    href={ROUTES.DASHBOARD.BUYER}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"
                  >
                    <User className="h-5 w-5" />
                    Dashboard Buyer
                  </Link>
                  <Link
                    href={ROUTES.DASHBOARD.SELLER}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"
                  >
                    <Store className="h-5 w-5" />
                    Dashboard Seller
                  </Link>
                </div>*/}

                {/* Auth Actions */}
                <div className="pt-4 border-t border-[#E3D9BD]">
                  {isAuthenticated ? (
                    <Button
                      className="w-full rounded-xl bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] h-12 text-sm font-medium"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-[#4E1F00] text-[#4E1F00] hover:bg-[#FEBA17]/20 h-12 text-sm font-medium"
                        asChild
                      >
                        <Link href={ROUTES.LOGIN} onClick={() => setOpen(false)}>
                          Masuk
                        </Link>
                      </Button>
                      <Button
                        className="w-full rounded-xl bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] h-12 text-sm font-medium"
                        asChild
                      >
                        <Link
                          href={ROUTES.REGISTER}
                          onClick={() => setOpen(false)}
                        >
                          Daftar Sekarang
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
