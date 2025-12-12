"use client";

import { useState, useEffect } from "react";
import { Calendar, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice, formatDateLong, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (quantity: number) => void;
}

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const closeDate = new Date(product.po_close_date);
    setIsOpen(now <= closeDate);
  }, [product.po_close_date]);

  const hasStock = product.stock > 0;

  const handleAddToCart = async () => {
    if (! onAddToCart) return;
    setIsAdding(true);
    try {
      await onAddToCart(quantity);
    } finally {
      setIsAdding(false);
    }
  };

  const handleContactSeller = () => {
    if (product.seller_whatsapp) {
      const message = encodeURIComponent(
        `Halo, saya tertarik dengan produk "${product.name}" di Danus. in`
      );
      window.open(
        `https://wa.me/${product. seller_whatsapp}? text=${message}`,
        "_blank"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Badge - hanya render setelah mounted */}
      {mounted && (
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
              isOpen ? "bg-[#FEBA17] text-[#4E1F00]" : "bg-gray-400 text-white"
            )}
          >
            {isOpen ? "Open PO" : "Closed"}
          </span>
          {! isOpen && (
            <span className="text-sm text-red-500">Pre-order sudah ditutup</span>
          )}
          {isOpen && ! hasStock && (
            <span className="text-sm text-red-500">Stok habis</span>
          )}
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-2xl font-bold text-[#4E1F00] md:text-3xl">
        {product.name}
      </h1>

      {/* Available Days */}
      <div className="flex items-center gap-2 text-sm text-[#74512D]">
        <Calendar className="h-4 w-4 text-[#FEBA17]" />
        <span>{product.available_days?.join(", ") || "Setiap hari"}</span>
      </div>

      {/* Seller Info */}
      <div className="flex items-center gap-3 rounded-xl bg-[#F8F4E1] p-3">
        <Avatar className="h-10 w-10 border-2 border-[#FEBA17]">
          <AvatarFallback className="bg-[#FEBA17] text-sm font-bold text-[#4E1F00]">
            {product. seller_name?.charAt(0) || "S"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-xs text-[#74512D]">Penjual</p>
          <p className="font-semibold text-[#4E1F00]">
            {product.seller_name || "Penjual"}
          </p>
        </div>
        {product.seller_whatsapp && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full border-[#FEBA17] text-[#4E1F00] hover:bg-[#FEBA17]/10"
            onClick={handleContactSeller}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </Button>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[#4E1F00]">Deskripsi</h3>
        <p className="text-sm leading-relaxed text-[#74512D]">
          {product.description || "Tidak ada deskripsi"}
        </p>
      </div>

      {/* Stock */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-[#4E1F00]">Stok Tersedia</h3>
        <p className="text-lg font-bold text-[#74512D]">{product.stock} pcs</p>
      </div>

      {/* Price & Quantity */}
      <div className="space-y-4 rounded-2xl border border-[#F3E6C5] bg-white p-4 shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-[#74512D]">Harga</p>
            <p className="text-2xl font-extrabold text-[#4E1F00]">
              {formatPrice(product.price)}
            </p>
          </div>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            max={product.stock || 1}
            disabled={!mounted || ! isOpen || ! hasStock}
          />
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between border-t border-[#F3E6C5] pt-3">
          <span className="text-sm text-[#74512D]">Subtotal</span>
          <span className="text-lg font-bold text-[#FEBA17]">
            {formatPrice(product.price * quantity)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          fullWidth
          className="gap-2 text-base"
          onClick={handleAddToCart}
          disabled={!mounted || !isOpen || isAdding || !hasStock}
        >
          <ShoppingCart className="h-5 w-5" />
          {isAdding ? "Menambahkan..." : "Tambah ke Keranjang"}
        </Button>
      </div>

      {/* PO Dates Info */}
      <div className="rounded-xl bg-[#FFF9E6] p-4 text-sm">
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 h-4 w-4 text-[#FEBA17]" />
          <div className="space-y-1">
            <p className="text-[#74512D]">
              <span className="font-medium">Buka PO:</span>{" "}
              {formatDateLong(product.po_open_date)}
            </p>
            <p className="text-[#74512D]">
              <span className="font-medium">Tutup PO:</span>{" "}
              {formatDateLong(product. po_close_date)}
            </p>
            {product.delivery_date && (
              <p className="font-medium text-[#4E1F00]">
                <span>Pengambilan:</span> {formatDateLong(product.delivery_date)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
