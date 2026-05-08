import { apiClient } from "@/lib/api-client";
import type { Order, PaginationParams, OrderStatus } from "@/types";

export interface OrdersQueryParams extends PaginationParams { status?: OrderStatus }
export interface OrdersResponse {
  orders: Order[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
export interface CreateOrderPayload { product_id: number; quantity: number }

const formatOrderRes = (res: any): OrdersResponse => ({
  orders: res.data || [],
  pagination: {
    page: res.meta?.page || 1,
    limit: res.meta?.limit || 10,
    total: res.meta?.total || 0,
    totalPages: res.meta?.totalPages || 0,
  }
});

export const orderService = {
  getMyOrders: async (params: OrdersQueryParams = {}) => {
    const res = await apiClient.get<Order[]>("/orders/me", { params });
    return formatOrderRes(res);
  },
  getOrderDetail: async (id: number) => (await apiClient.get<Order>(`/orders/${id}`)).data!,
  createOrder: async (data: CreateOrderPayload) => (await apiClient.post<{ order: Order }>("/orders", data)).data!.order,
  cancelOrder: (id: number) => apiClient.post(`/orders/${id}/cancel`),
};

export const sellerOrderService = {
  getSellerOrders: async (params: OrdersQueryParams = {}) => {
    const res = await apiClient.get<Order[]>("/orders/seller/incoming", { params });
    return formatOrderRes(res);
  },
  updateOrderStatus: async (id: number, status: OrderStatus, reason?: string) => 
    (await apiClient.patch<{ order: Order }>(`/orders/${id}/status`, { status, ...(reason && { reason }) })).data!.order,
};
