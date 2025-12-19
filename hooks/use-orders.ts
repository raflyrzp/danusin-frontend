import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import type { Order, OrderStatus } from "@/types";

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
  currentStatus: OrderStatus | undefined;
  setPage: (page: number) => void;
  setStatus: (status: OrderStatus | undefined) => void;
  refetch: () => void;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatus | undefined>(undefined);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      if (status) {
        params.append("status", status);
      }

      const response = await apiClient.get<Order[]>(`/orders/me`);
      setOrders(response.data || []);

      if (response.meta) {
        setPagination({
          page: response.meta.page || 1,
          totalPages: response.meta.totalPages || 1,
          total: response.meta.total || 0,
          limit: response.meta.limit || 10,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat pesanan");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSetStatus = (newStatus: OrderStatus | undefined) => {
    setStatus(newStatus);
    setPage(1); // Reset to first page when filter changes
  };

  return {
    orders,
    isLoading,
    error,
    pagination,
    currentStatus: status,
    setPage,
    setStatus: handleSetStatus,
    refetch: fetchOrders,
  };
}

// Keep the existing hooks for backward compatibility
export function useMyOrders() {
  const { orders, isLoading, error, refetch } = useOrders();
  return {
    data: { data: orders },
    isLoading,
    isError: !!error,
    refetch,
  };
}

export function useStoreOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Order[]>("/orders/seller");
      setOrders(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat pesanan");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    data: { data: orders },
    isLoading,
    isError: !!error,
    refetch: fetchOrders,
  };
}
