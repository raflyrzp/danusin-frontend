"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sellerOrderService } from "@/services/order.service";
import type { OrderStatus } from "@/types";
import { toast } from "sonner";

export function useSellerOrders() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatus>();
  const { data, isLoading, error, refetch } = useQuery({ 
    queryKey: ["orders", "seller", { page, status }], 
    queryFn: () => sellerOrderService.getSellerOrders({ page, status }) 
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: ({ id, status, reason }: { id: number; status: OrderStatus; reason?: string }) => sellerOrderService.updateOrderStatus(id, status, reason),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["orders", "seller"] });
      const msgs: Record<string, string> = { "Diproses": "Pesanan dikonfirmasi", "Selesai": "Pesanan selesai", "Dibatalkan": "Pesanan ditolak" };
      toast.success(msgs[vars.status] || "Status diperbarui");
    },
    onError: (err: any) => toast.error(err.message || "Gagal memperbarui status"),
  });

  return {
    orders: data?.orders || [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    pagination: data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 },
    setPage,
    setStatus,
    refetch,
    confirmOrder: (id: number) => updateStatus({ id, status: "Diproses" }),
    completeOrder: (id: number) => updateStatus({ id, status: "Selesai" }),
    rejectOrder: (id: number, reason?: string) => updateStatus({ id, status: "Dibatalkan", reason }),
    updateStatus: (id: number, status: OrderStatus) => updateStatus({ id, status }),
  };
}
