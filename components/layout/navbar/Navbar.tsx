"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
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
import { DashboardMenu } from "./DashboardMenu";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/hooks/use-auth";
import { logoutAction } from "@/actions/auth/logout";

const navLinks = [
  { label: "Beranda", href: ROUTES.HOME },
  { label: "Menu Jajanan", href: ROUTES.PRODUCTS },
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

  // Gunakan useAuth hook untuk mengecek status autentikasi
  const { user, isAuthenticated: hookIsAuthenticated, isLoading, logout: hookLogout } = useAuth();

  // Prioritaskan props jika diberikan, jika tidak gunakan dari hook
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : hookIsAuthenticated;
  const userName = propUserName || user?.name;
  const userEmail = propUserEmail || user?.email;

  const handleLogout = async () => {
    if (propOnLogout) {
      propOnLogout();
    } else {
      // Hapus token dari localStorage
      hookLogout();
      // Hapus cookie session via server action
      await logoutAction();
    }
  };

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/auth");

  if (isAuthPage) {
    return (
      <header className="w-full border-b border-[#F3E8C0] bg-[#FEBA17]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href={ROUTES.HOME}
            className="text-lg font-semibold tracking-tight text-[#4E1F00]"
          >
            Danus.in
          </Link>
          <span className="text-xs font-medium text-[#74512D]">
            Platform Pre-Order Mahasiswa
          </span>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F3E8C0] bg-[#FEBA17]/95 backdrop-blur-sm" >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand & nav kiri */}
        <div className="flex items-center gap-6">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 rounded-full bg-[#F6D77A] px-3 py-1.5 shadow-sm"
          >
            <span className="text-lg font-semibold tracking-tight text-[#4E1F00]">
              Danus.in
            </span>
          </Link>

          <nav className="hidden items-center gap-3 text-sm md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 transition",
                    active
                      ? "bg-[#F5D36B] text-[#4E1F00] font-medium shadow-sm"
                      : "text-[#4E1F00] hover:bg-[#f7e09a]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <DashboardMenu />
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#4E1F00] hover:bg-[#f7e09a]"
                aria-label="Notifikasi"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#4E1F00] hover:bg-[#f7e09a]"
                aria-label="Keranjang"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
            </>
          )}

          {isAuthenticated ? (
            <UserMenu name={userName} email={userEmail} onLogout={handleLogout} />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#4E1F00] hover:bg-[#f7e09a]"
                aria-label="Keranjang"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full px-3 text-sm text-[#4E1F00] hover:bg-[#f7e09a]"
                asChild
              >
                <Link href={ROUTES.LOGIN}>Masuk</Link>
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] px-4 text-sm"
                asChild
              >
                <Link href={ROUTES.REGISTER}>Daftar</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[#4E1F00] hover:bg-[#f7e09a]"
              aria-label="Keranjang"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#4E1F00] hover:bg-[#f7e09a]"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-[#4E1F00]">Menu</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-[#4E1F00] hover:bg-[#F1E7C9]"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetHeader>

              <div className="space-y-2">
                {/* User info jika authenticated */}
                {isAuthenticated && userName && (
                  <div className="mb-4 p-3 rounded-xl bg-[#F5D36B]/50">
                    <p className="font-medium text-[#4E1F00]">{userName}</p>
                    {userEmail && (
                      <p className="text-xs text-[#74512D]">{userEmail}</p>
                    )}
                  </div>
                )}

                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm font-medium",
                        active
                          ? "bg-[#F5D36B] text-[#4E1F00] shadow-sm"
                          : "text-[#4E1F00] hover:bg-[#f7e09a]"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Menu khusus authenticated */}
                {isAuthenticated && (
                  <>
                    <Link
                      href="/notifications"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#4E1F00] hover:bg-[#f7e09a]"
                    >
                      <Bell className="h-4 w-4" />
                      Notifikasi
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#4E1F00] hover:bg-[#f7e09a]"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Keranjang
                    </Link>
                  </>
                )}

                <div className="mt-2">
                  <p className="mb-1 text-xs font-semibold text-[#7A6848]">
                    Dashboard
                  </p>
                  <div className="space-y-1 rounded-xl bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <Link
                      href={ROUTES.DASHBOARD.BUYER}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-1.5 text-sm text-[#4E1F00] hover:bg-[#F1E7C9]"
                    >
                      Dashboard Buyer
                    </Link>
                    <Link
                      href={ROUTES.DASHBOARD.SELLER}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-1.5 text-sm text-[#4E1F00] hover:bg-[#F1E7C9]"
                    >
                      Dashboard Seller
                    </Link>
                  </div>
                </div>

                <div className="mt-4 border-t border-[#E7DFC6] pt-4">
                  {isAuthenticated ? (
                    <Button
                      className="w-full rounded-full bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D]"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      Keluar
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full rounded-full border-[#E3D9BD] bg-white text-sm text-[#4E1F00] hover:bg-[#F1E7C9]"
                        asChild
                      >
                        <Link
                          href={ROUTES.LOGIN}
                          onClick={() => setOpen(false)}
                        >
                          Masuk
                        </Link>
                      </Button>
                      <Button
                        className="w-full rounded-full bg-[#4E1F00] text-sm text-[#F8F4E1] hover:bg-[#74512D]"
                        asChild
                      >
                        <Link
                          href={ROUTES.REGISTER}
                          onClick={() => setOpen(false)}
                        >
                          Daftar
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
