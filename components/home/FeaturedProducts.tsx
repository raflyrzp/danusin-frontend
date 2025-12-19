"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        Gagal memuat produk. Pastikan API berjalan.
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#4E1F00]">Menu Terbaru</h2>
          <p className="text-[#74512D]">Jajanan yang baru aja buka PO nih!</p>
        </div>
        <Button variant="link" className="hidden md:inline-flex">
          Lihat Semua
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E5DEC5] bg-[#F8F4E1] p-10 text-center text-[#74512D]">
          Belum ada produk yang tersedia saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {(Array.isArray(products) ? products : []).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center md:hidden">
        <Button variant="outline" className="w-full rounded-full">
          Lihat Semua Menu
        </Button>
      </div>
    </section>
  );
}
