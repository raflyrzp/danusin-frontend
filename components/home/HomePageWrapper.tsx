"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(
  () => import("./HomeContent").then((mod) => mod.HomeContent),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F4E1]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#FEBA17] border-t-transparent"></div>
          <p className="mt-4 text-sm text-[#74512D]">Memuat Menu...</p>
        </div>
      </div>
    ),
  }
);

export function HomePageWrapper() {
  return <HomeContent />;
}
