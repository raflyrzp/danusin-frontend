"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, ShoppingCart, Home, UtensilsCrossed, Store, User, LogOut } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserMenu } from "./UserMenu";
import { NotificationBell } from "./NotificationBell";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { logoutAction } from "@/actions/auth/logout";

const navLinks = [
  { label: "Beranda", href: ROUTES.HOME, icon: Home },
  { label: "Menu Jajanan", href: ROUTES.PRODUCTS, icon: UtensilsCrossed },
];

export function Navbar({ isAuthenticated: pAuth, userName: pName, userEmail: pEmail, onLogout: pLogout }: { isAuthenticated?: boolean; userName?: string; userEmail?: string; onLogout?: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated: hAuth, isLoading } = useAuth();
  const { mutate: hLogout } = useLogout();

  const auth = pAuth ?? hAuth;
  const name = pName || user?.name;
  const email = pEmail || user?.email;

  const handleLogout = async () => {
    if (pLogout) pLogout();
    else { hLogout(); await logoutAction(); }
  };

  const isAuth = ["/login", "/register", "/auth"].some(p => pathname.startsWith(p));

  if (isAuth) return (
    <header className="w-full border-b border-[#F3E8C0]/50 bg-linear-to-r from-[#FEBA17] to-[#F5D36B]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E1F00] shadow-lg"><span className="text-lg font-bold text-[#FEBA17]">D</span></div>
          <span className="text-xl font-bold tracking-tight text-[#4E1F00]">Danus.in</span>
        </Link>
        <span className="hidden sm:block text-sm font-medium text-[#4E1F00]/70">Platform Danusan Mahasiswa</span>
      </div>
    </header>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F3E8C0]/30 bg-linear-to-r from-[#FEBA17] via-[#FEBA17] to-[#F5D36B] shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href={ROUTES.HOME} className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E1F00] shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"><span className="text-lg font-bold text-[#FEBA17]">D</span></div>
            <span className="text-xl font-bold tracking-tight text-[#4E1F00] hidden sm:block">Danus.in</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={cn("flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200", pathname === href ? "bg-[#4E1F00] text-[#F8F4E1] shadow-md" : "text-[#4E1F00] hover:bg-[#4E1F00]/10")}>
                <Icon className="h-4 w-4" />{label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-24 bg-[#4E1F00]/10 animate-pulse rounded-xl" />
          ) : auth ? (
            <>
              <NotificationBell />
              <UserMenu name={name} email={email} onLogout={handleLogout} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="rounded-xl px-4 text-sm font-medium text-[#4E1F00] hover:bg-[#4E1F00]/10" asChild><Link href={ROUTES.LOGIN}>Masuk</Link></Button>
              <Button className="rounded-xl bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] px-5 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200" asChild><Link href={ROUTES.REGISTER}>Daftar Sekarang</Link></Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          {auth && <Button variant="ghost" size="icon" className="rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10" asChild><Link href="/cart"><ShoppingCart className="h-5 w-5" /></Link></Button>}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="rounded-xl text-[#4E1F00] hover:bg-[#4E1F00]/10 h-10 w-10"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent className="w-[300px] bg-[#FFFBF0] border-l border-[#E3D9BD]">
              <SheetHeader className="border-b border-[#E3D9BD] pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4E1F00]"><span className="text-sm font-bold text-[#FEBA17]">D</span></div>
                  <span className="text-lg font-bold text-[#4E1F00]">Danus.in</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {auth && name && (
                  <div className="p-4 rounded-2xl bg-linear-to-br from-[#FEBA17]/20 to-[#F5D36B]/20 border border-[#FEBA17]/30">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#FEBA17] flex items-center justify-center"><span className="text-lg font-bold text-[#4E1F00]">{name.charAt(0).toUpperCase()}</span></div>
                      <div>
                        <p className="font-semibold text-[#4E1F00]">{name}</p>
                        {email && <p className="text-xs text-[#74512D]">{email}</p>}
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#B4A98C] uppercase tracking-wider px-3 mb-2">Menu</p>
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all", pathname === href ? "bg-[#FEBA17] text-[#4E1F00] shadow-md" : "text-[#4E1F00] hover:bg-[#FEBA17]/20")}>
                      <Icon className="h-5 w-5" />{label}
                    </Link>
                  ))}
                </div>
                {auth && (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#B4A98C] uppercase tracking-wider px-3 mb-2">Akun</p>
                      <Link href={ROUTES.NOTIFICATIONS} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"><Bell className="h-5 w-5" />Notifikasi</Link>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#B4A98C] uppercase tracking-wider px-3 mb-2">Dashboard</p>
                      <Link href={ROUTES.DASHBOARD.BUYER} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"><User className="h-5 w-5" />Dashboard Buyer</Link>
                      <Link href={ROUTES.DASHBOARD.SELLER} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#4E1F00] hover:bg-[#FEBA17]/20"><Store className="h-5 w-5" />Dashboard Seller</Link>
                    </div>
                  </>
                )}
                <div className="pt-4 border-t border-[#E3D9BD]">
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-12 w-full bg-[#4E1F00]/10 animate-pulse rounded-xl" />
                      <div className="h-12 w-full bg-[#4E1F00]/10 animate-pulse rounded-xl" />
                    </div>
                  ) : auth ? (
                    <Button className="w-full rounded-xl bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] h-12 text-sm font-medium" onClick={() => { handleLogout(); setOpen(false); }}><LogOut className="h-4 w-4 mr-2" />Keluar</Button>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full rounded-xl border-[#4E1F00] text-[#4E1F00] hover:bg-[#FEBA17]/20 h-12 text-sm font-medium" asChild><Link href={ROUTES.LOGIN} onClick={() => setOpen(false)}>Masuk</Link></Button>
                      <Button className="w-full rounded-xl bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] h-12 text-sm font-medium" asChild><Link href={ROUTES.REGISTER} onClick={() => setOpen(false)}>Daftar Sekarang</Link></Button>
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
