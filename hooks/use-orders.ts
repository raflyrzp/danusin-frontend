"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import type { OrderStatus } from "@/types";

export function useOrders() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatus>();
  const { data, isLoading, error, refetch } = useQuery({ 
    queryKey: ["orders", "me", { page, status }], 
    queryFn: () => orderService.getMyOrders({ page, status }) 
  });

  return {
    orders: data?.orders || [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    pagination: data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 },
    setPage,
    setStatus,
    currentStatus: status,
    refetch,
  };
}

export function useOrderDetail(id: number) {
  return useQuery({ queryKey: ["order", id], queryFn: () => orderService.getOrderDetail(id), enabled: !!id });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orderService.cancelOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
