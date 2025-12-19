"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
    // Redirect buyers to create store page
    if (!isLoading && user?.role === "buyer") {
      router.push("/buyer/create-store");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F4E1]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (!user || user.role !== "seller") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F4E1]">
      <div className="flex">
        <Sidebar user={user} userImage={user.profile_image} variant="store" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
