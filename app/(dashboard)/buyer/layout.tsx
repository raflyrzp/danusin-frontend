"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/dashboard/buyer/Sidebar";
import { useUser } from "@/hooks/use-user";

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4E1]">
      {/*<Navbar
        isAuthenticated={true}
        userName={user?.name}
        userEmail={user?.email}
        onLogout={handleLogout}
      />*/}

      <div className="flex-1 flex">
        <Sidebar user={user} isLoading={isLoading} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/*<Footer />*/}
    </div>
  );
}
