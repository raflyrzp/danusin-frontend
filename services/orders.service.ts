import { apiClient } from "@/lib/api-client";
import type { Order, OrderStatus, PaginationParams } from "@/types";

export interface OrdersResponse {
  orders: Order[];
  total: number;
}

export interface CreateOrderDTO {
  product_id: number;
  quantity: number;
}

export interface OrderFilters extends PaginationParams {
  status?: OrderStatus;
}

export const ordersService = {
  /**
   * Get buyer's orders
   */
  getMyOrders: async (params?: OrderFilters) => {
    return await apiClient.get<OrdersResponse>("/orders/me/buyer", { params });
  },

  /**
   * Get seller's orders
   */
  getSellerOrders: async (params?: OrderFilters) => {
    return await apiClient. get<OrdersResponse>("/orders/me/seller", { params });
  },

  /**
   * Get order by ID
   */
  getById: async (id: number | string) => {
    return await apiClient.get<{ order: Order }>(`/orders/${id}`);
  },

  /**
   * Create order
   */
  create: async (data: CreateOrderDTO) => {
    return await apiClient. post<{ order: Order }>("/orders", data);
  },

  /**
   * Update order status (seller)
   */
  updateStatus: async (id: number | string, status: OrderStatus) => {
    return await apiClient. patch<{ order: Order }>(`/orders/${id}/status`, { status });
  },

  /**
   * Cancel order
   */
  cancel: async (id: number | string) => {
    return await apiClient. patch<{ order: Order }>(`/orders/${id}/cancel`);
  },
};
