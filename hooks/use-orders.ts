"use client";

import { useState, useEffect, useCallback } from "react";
import { Order, OrderStatus } from "@/types";
import { orderService, OrdersQueryParams } from "@/services/order.service";
import { toast } from "sonner";

export function useOrders(initialParams: OrdersQueryParams = {}) {
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
      const data = await orderService. getMyOrders(params);
      setOrders(data. orders);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message :  "Gagal memuat pesanan");
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

  const cancelOrder = async (orderId: number) => {
    try {
      await orderService.cancelOrder(orderId);
      toast.success("Pesanan berhasil dibatalkan");
      await fetchOrders();
    } catch (err) {
      const message =
        err instanceof Error ? err. message : "Gagal membatalkan pesanan";
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
    cancelOrder,
    currentStatus: params.status,
  };
}
