"use client";

import { use } from "react";
import { useProduct } from "@/hooks/use-products";
import { BackButton } from "@/components/ui/back-button";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const { data, isLoading, isError } = useProduct(id);

  const handleAddToCart = async (quantity: number) => {
    console.log(`Adding ${quantity} items to cart for product ${id}`);
    alert(`${quantity} item berhasil ditambahkan ke keranjang! `);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F4E1]">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#FEBA17]" />
          <p className="mt-4 text-sm text-[#74512D]">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  // Response: { data: Product, meta: {... } }
  // data?. data adalah Product langsung
  const product = data?.data;

  // Error state
  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F4E1] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[#4E1F00]">
            Produk Tidak Ditemukan
          </h2>
          <p className="mb-6 text-sm text-[#74512D]">
            Maaf, produk yang Anda cari tidak tersedia atau sudah dihapus.
          </p>
          <Button asChild>
            <Link href={ROUTES.HOME}>Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    );
  }

  // const images = product. images || [];

  return (
    <div className="min-h-screen bg-[#F8F4E1]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton label="Kembali" />
        </div>

        {/* Product Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="order-1">
            <ImageGallery
              images={product.images || []}
              productName={product.name}
              primaryImage={product.primary_image}
            />
          </div>

          {/* Right: Product Info */}
          <div className="order-2">
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
