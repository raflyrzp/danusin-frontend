import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ShoppingBag, Store, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F4E1]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Value Props / Features */}
      <section className="border-b border-[#F3E8C0] bg-white py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 text-center text-[#4E1F00]">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-[#F1E7C9] p-3 text-[#74512D]">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold md:text-sm">
              Pre-Order Mudah
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-[#F1E7C9] p-3 text-[#74512D]">
              <Store className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold md:text-sm">
              Khusus Mahasiswa
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-[#F1E7C9] p-3 text-[#74512D]">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold md:text-sm">Bantu Teman</span>
          </div>
        </div>
      </section>

      {/* 3. Featured Products (API Integrated) */}
      <FeaturedProducts />

      {/* 4. Simple CTA */}
      <section className="mx-4 mb-12 mt-4 overflow-hidden rounded-3xl bg-[#4E1F00] px-6 py-12 text-center text-[#F8F4E1] shadow-xl md:mx-auto md:max-w-6xl md:px-12 md:text-left">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Mau Jualan Danusan?
            </h2>
            <p className="mt-2 text-[#E5DEC5]">
              Kelola pre-order tanpa ribet catat manual di WhatsApp.
            </p>
          </div>
          <button className="rounded-xl bg-[#FEBA17] px-8 py-3 text-sm font-bold text-[#4E1F00] transition hover:bg-[#e5a612] hover:shadow-lg">
            Mulai Jualan Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
