"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Store } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Product } from "@/types";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";

function StatusBadge({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={cn(
        "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm",
        isOpen ? "bg-[#FEBA17] text-[#4E1F00]" : "bg-gray-500 text-white"
      )}
    >
      {isOpen ? "Open PO" : "Closed"}
    </span>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Validasi safety check jika tanggal invalid
    if (product.po_close_date) {
        const now = new Date();
        const closeDate = new Date(product.po_close_date);
        setIsOpen(now <= closeDate);
    }
  }, [product.po_close_date]);

  const imageUrl = product.primary_image
    ? product.primary_image.replace(/\s/g, "")
    : null;

  return (
    <Link href={ROUTES.PRODUCT_DETAIL(product.id)}>
      <Card className="group relative h-full overflow-hidden border border-[#F3E6C5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,31,0,0.1)]">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#F1E7C9]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#B4A98C]">
              <Store className="h-12 w-12 opacity-50" />
            </div>
          )}
          {mounted && <StatusBadge isOpen={isOpen} />}
        </div>

        {/* Content */}
        <CardContent className="space-y-2 p-4">
          <h3 className="line-clamp-1 text-base font-bold text-[#4E1F00] transition-colors group-hover:text-[#FEBA17]">
            {product.name}
          </h3>

          <p className="line-clamp-1 text-xs text-[#8A7A57]">
            {product.available_days?.join(", ") || "Setiap hari"}
          </p>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#74512D]">
              <Avatar className="h-4 w-4 border border-[#E5DEC5]">
                <AvatarFallback className="text-[8px] bg-[#FEBA17] text-[#4E1F00]">
                  {product.seller_name?.charAt(0) || "S"}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-20 truncate">
                {product.seller_name || "Penjual"}
              </span>
            </div>
            {/* Tambahkan suppressHydrationWarning disini jika stock sering berubah */}
            <span className="text-[#8A7A57]">Stock: {product.stock ?? 0}</span>
          </div>

          <p
            className="text-lg font-extrabold text-[#4E1F00]"
            suppressHydrationWarning
          >
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
