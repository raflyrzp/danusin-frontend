"use client";

import { useRouter } from "next/navigation";
import { OrderList } from "@/components/dashboard/buyer/OrderList";
import { useOrders } from "@/hooks/use-orders";
import { Order, OrderStatus } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "Menunggu Konfirmasi", label: "Menunggu Konfirmasi" },
  { value: "Diproses", label: "Diproses" },
  { value: "Selesai", label: "Selesai" },
  { value: "Dibatalkan", label: "Dibatalkan" },
];

export default function OrdersPage() {
  const router = useRouter();
  const { orders, isLoading, pagination, setPage, setStatus, currentStatus } = useOrders();

  const handleBuyAgain = (order: Order) => {
    router.push(`/products/${order.product_id}`);
  };

  const handleContactSeller = (order: Order) => {
    // WhatsApp redirect is handled in OrderCard
    console.log("Contact seller for order:", order.id);
  };

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setStatus(undefined);
    } else {
      setStatus(value as OrderStatus);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#4E1F00]">Pesananku</h1>

        {/* Filter */}
        {/*<Select
          value={currentStatus || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-48 border-[#E3D9BD]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>*/}
      </div>

      {/* Order List */}
      <OrderList
        orders={orders}
        isLoading={isLoading}
        onBuyAgain={handleBuyAgain}
        onContactSeller={handleContactSeller}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === 1}
            onClick={() => setPage(pagination.page - 1)}
            className="border-[#E3D9BD]"
          >
            Sebelumnya
          </Button>
          <span className="text-sm text-[#74512D]">
            Halaman {pagination.page} dari {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => setPage(pagination.page + 1)}
            className="border-[#E3D9BD]"
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  );
}
