"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function BuyerLayout({
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
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F4E1]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F4E1]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar user={user} userImage={user.profile_image} variant="buyer" />
        <main className="flex-1 w-full max-w-full overflow-hidden p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
