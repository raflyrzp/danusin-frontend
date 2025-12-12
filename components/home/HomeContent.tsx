"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { SearchSection } from "@/components/home/SearchSection";
import { FilterSidebar } from "@/components/home/FilterSidebar";
import { ProductGrid } from "@/components/home/ProductGrid";
import type { ProductFilters, Product } from "@/types";

export function HomeContent() {
  const [filters, setFilters] = useState<ProductFilters>({
    q: "",
    min_price: 0,
    max_price: 100000,
    page: 1,
    limit: 12,
  });

  const { data, isLoading, isError } = useProducts(filters);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, q: query, page: 1 }));
  };

  const handleFilterChange = (newFilters: {
    minPrice: number;
    maxPrice: number;
    days: string[];
    locations: string[];
  }) => {
    setFilters((prev) => ({
      ...prev,
      min_price: newFilters.minPrice,
      max_price: newFilters.maxPrice,
      page: 1,
    }));
  };

  const products: Product[] = data?.data || [];
  const total = data?.meta?.total || products.length;
  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="min-h-screen bg-[#F8F4E1]" suppressHydrationWarning>
      {/* Search Section */}
      <div suppressHydrationWarning>
        <SearchSection onSearch={handleSearch} initialQuery={filters.q} />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 shrink-0">
             <FilterSidebar onFilterChange={handleFilterChange} />
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#4E1F00]">Menu Jajanan</h2>
              <span className="text-sm text-[#74512D]">
                {total} produk ditemukan
              </span>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              isError={isError}
            />

            {/* Pagination */}
            {!isLoading && !isError && totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setFilters((prev) => ({ ...prev, page }))}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                        filters.page === page
                          ? "bg-[#FEBA17] text-[#4E1F00]"
                          : "bg-white text-[#74512D] hover:bg-[#F1E7C9]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
