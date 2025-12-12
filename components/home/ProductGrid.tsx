'use client';

import { Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
}

export function ProductGrid({ products, isLoading, isError }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-dashed border-red-300 bg-red-50 p-10 text-center text-red-600">
        Gagal memuat produk.  Pastikan API backend berjalan di{' '}
        <code className="rounded bg-red-100 px-1">http://localhost:3000</code>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#E5DEC5] bg-[#FAFAFA] p-10 text-center text-[#74512D]">
        Belum ada produk yang tersedia saat ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products. map((product) => (
        <ProductCard key={product. id} product={product} />
      ))}
    </div>
  );
}
