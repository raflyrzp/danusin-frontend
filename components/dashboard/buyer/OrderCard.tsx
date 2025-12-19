"use client";

import { MapPin, Store, MessageCircle } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getImageUrl } from "@/lib/utils";
import { Order, OrderStatus } from "@/types";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  "Menunggu Konfirmasi": {
    label: "Menunggu Konfirmasi",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  "Diproses": {
    label: "Diproses",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  "Selesai": {
    label: "Selesai",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  "Dibatalkan": {
    label: "Dibatalkan",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

interface OrderCardProps {
  order: Order;
  onBuyAgain?: (order: Order) => void;
  onContactSeller?: (order: Order) => void;
}

export function OrderCard({ order, onBuyAgain, onContactSeller }: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContactSeller = () => {
    if (order.seller_whatsapp) {
      const message = encodeURIComponent(
        `Halo, saya ingin bertanya tentang pesanan #${order.id} (${order.product_name})`
      );
      window.open(`https://wa.me/${order.seller_whatsapp.replace(/^0/, "62")}?text=${message}`, "_blank");
    }
    onContactSeller?.(order);
  };

  return (
    <Card className="bg-white border-[#E3D9BD] shadow-sm">
      <CardContent className="p-4">
        {/* Order Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <SafeImage
                src={getImageUrl(order.product_image) || "/placeholder.jpg"}
                alt={order.product_name || "Product"}
                fill
                className="object-cover"
                fallback={
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <Store className="h-8 w-8 opacity-50" />
                  </div>
                }
              />
            </div>

            {/* Product Info */}
            <div>
              <h3 className="font-semibold text-[#4E1F00]">
                {order.product_name} ({order.quantity})
              </h3>
              {order.seller_name && (
                <div className="flex items-center gap-1 text-xs text-[#74512D] mt-1">
                  <Store className="h-3 w-3" />
                  {order.seller_name}
                </div>
              )}
              <p className="text-sm text-[#74512D] mt-1">
                {formatPrice(order.total_price / order.quantity)} x {order.quantity}
              </p>
            </div>
          </div>

          {/* Date */}
          <p className="text-sm text-[#74512D]">{formatDate(order.created_at)}</p>
        </div>

        {/* Order Total */}
        <div className="flex items-center justify-end pt-4 border-t border-[#E3D9BD]">
          <p className="text-sm text-[#74512D]">
            Order Total:{" "}
            <span className="font-bold text-[#4E1F00]">
              {formatPrice(order.total_price)}
            </span>
          </p>
        </div>

        {/* Order Status and Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E3D9BD]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#74512D]">Status:</span>
            <Badge
              variant="outline"
              className={cn("text-xs", statusConfig[order.status].className)}
            >
              {statusConfig[order.status].label}
            </Badge>
          </div>
          <div className="flex gap-2">
            {order.status === "Selesai" && (
              <Button
                size="sm"
                className="bg-[#FEBA17] text-[#4E1F00] hover:bg-[#F5D36B] rounded-full text-xs"
                onClick={() => onBuyAgain?.(order)}
              >
                Beli Lagi
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="border-[#E3D9BD] text-[#4E1F00] hover:bg-[#F8F4E1] rounded-full text-xs"
              onClick={handleContactSeller}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Hubungi Penjual
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
