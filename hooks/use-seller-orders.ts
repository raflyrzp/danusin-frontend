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
    total:  0,
    totalPages: 0,
  });
  const [params, setParams] = useState<OrdersQueryParams>(initialParams);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sellerOrderService.getSellerOrders(params);
      setOrders(data. orders);
      setPagination(data. pagination);
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

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setStatus = (status?:  OrderStatus) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const confirmOrder = async (orderId: number) => {
    try {
      await sellerOrderService.confirmOrder(orderId);
      toast.success("Pesanan berhasil dikonfirmasi");
      await fetchOrders();
    } catch (err) {
      const message =
        err instanceof Error ?  err.message : "Gagal mengkonfirmasi pesanan";
      toast. error(message);
      throw err;
    }
  };

  const completeOrder = async (orderId: number) => {
    try {
      await sellerOrderService.completeOrder(orderId);
      toast.success("Pesanan berhasil diselesaikan");
      await fetchOrders();
    } catch (err) {
      const message =
        err instanceof Error ?  err.message : "Gagal menyelesaikan pesanan";
      toast.error(message);
      throw err;
    }
  };

  const rejectOrder = async (orderId: number, reason?: string) => {
    try {
      await sellerOrderService.rejectOrder(orderId, reason);
      toast.success("Pesanan berhasil ditolak");
      await fetchOrders();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal menolak pesanan";
      toast.error(message);
      throw err;
    }
  };

  const updateStatus = async (orderId: number, status: OrderStatus) => {
    try {
      await sellerOrderService.updateOrderStatus(orderId, status);
      toast.success("Status pesanan berhasil diperbarui");
      await fetchOrders();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memperbarui status";
      toast.error(message);
      throw err;
    }
  };

  return {
    orders,
    isLoading,
    error,
    pagination,
    refetch: fetchOrders,
    setPage,
    setStatus,
    confirmOrder,
    completeOrder,
    rejectOrder,
    updateStatus,
    currentStatus: params.status,
  };
}
