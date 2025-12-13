"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OrderCard } from "./OrderCard";
import { Order } from "@/types";
import { Loader2, ShoppingBag } from "lucide-react";

interface OrderListProps {
  orders: Order[];
  isLoading:  boolean;
  onBuyAgain?: (order: Order) => void;
  onContactSeller?: (order: Order) => void;
}

export function OrderList({
  orders,
  isLoading,
  onBuyAgain,
  onContactSeller,
}: OrderListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="bg-white border-[#E3D9BD]">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-12 w-12 text-[#E3D9BD] mb-4" />
          <p className="text-[#74512D] font-medium">Belum ada pesanan</p>
          <p className="text-sm text-[#74512D]/70 mt-1">
            Pesanan Anda akan muncul di sini
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onBuyAgain={onBuyAgain}
          onContactSeller={onContactSeller}
        />
      ))}
    </div>
  );
}
