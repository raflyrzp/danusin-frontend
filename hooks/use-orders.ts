import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService, type CreateOrderDTO, type OrderFilters } from "@/services/orders.service";
import type { OrderStatus } from "@/types";

export function useMyOrders(filters?: OrderFilters) {
  return useQuery({
    queryKey: ["orders", "buyer", filters],
    queryFn: () => ordersService. getMyOrders(filters),
  });
}

export function useSellerOrders(filters?: OrderFilters) {
  return useQuery({
    queryKey: ["orders", "seller", filters],
    queryFn: () => ordersService. getSellerOrders(filters),
  });
}

export function useOrder(id: number | string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderDTO) => ordersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number | string; status: OrderStatus }) =>
      ordersService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient. invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => ordersService.cancel(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient. invalidateQueries({ queryKey: ["order", id] });
    },
  });
}
