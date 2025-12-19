"use client";

import { useState, useEffect, useCallback } from "react";
import { Order, OrderStatus } from "@/types";
import {
  sellerOrderService,
  OrdersQueryParams,
} from "@/services/order.service";
import { toast } from "sonner";

export function useSellerOrders(initialParams: OrdersQueryParams = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [params, setParams] = useState<OrdersQueryParams>(initialParams);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sellerOrderService.getSellerOrders(params);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat pesanan");
      toast.error("Gagal memuat pesanan");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ============================================
  // HELPER UNTUK UPDATE STATUS (UNIFIED)
  // ============================================
  const handleStatusUpdate = async (
    orderId: number,
    status: OrderStatus,
    successMsg: string,
    reason?: string
  ) => {
    try {
      await sellerOrderService.updateOrderStatus(orderId, status, reason);
      toast.success(successMsg);
      await fetchOrders(); // Segarkan data setelah update
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal memperbarui status";
      toast.error(message);
      throw err;
    }
  };

  // ============================================
  // ACTIONS (WRAPPER)
  // ============================================
  const confirmOrder = (orderId: number) =>
    handleStatusUpdate(orderId, "Diproses", "Pesanan berhasil dikonfirmasi");

  const completeOrder = (orderId: number) =>
    handleStatusUpdate(orderId, "Selesai", "Pesanan berhasil diselesaikan");

  const rejectOrder = (orderId: number, reason?: string) =>
    handleStatusUpdate(orderId, "Dibatalkan", "Pesanan telah ditolak", reason);

  // Jika Anda masih butuh fungsi manual untuk status lain
  const updateStatus = (orderId: number, status: OrderStatus) =>
    handleStatusUpdate(orderId, status, "Status pesanan diperbarui");

  return {
    orders,
    isLoading,
    error,
    pagination,
    refetch: fetchOrders,
    setPage: (page: number) => setParams((prev) => ({ ...prev, page })),
    setStatus: (status?: OrderStatus) => setParams((prev) => ({ ...prev, status, page: 1 })),
    confirmOrder,
    completeOrder,
    rejectOrder,
    updateStatus,
    currentStatus: params.status,
  };
}
