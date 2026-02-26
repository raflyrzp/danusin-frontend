import { apiClient } from "@/lib/api-client";
import type {
  Order,
  ApiResponse,
  PaginationParams,
  OrderStatus,
} from "@/types";

// ============================================
// TYPES
// ============================================
export interface OrdersQueryParams extends PaginationParams {
  status?: OrderStatus;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateOrderPayload {
  product_id: number;
  quantity: number;
}

// ============================================
// ORDER SERVICE (BUYER)
// ============================================
export const orderService = {
  // Get user orders (buyer)
  async getMyOrders(params: OrdersQueryParams = {}): Promise<OrdersResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.status) searchParams.set("status", params.status);

    const response = await apiClient.get<Order[]>(
      `/orders/me?${searchParams.toString()}`,
    );

    return {
      orders: response.data || [],
      pagination: {
        page: response.meta?.page || 1,
        limit: response.meta?.limit || 10,
        total: response.meta?.total || 0,
        totalPages: response.meta?.totalPages || 0,
      },
    };
  },

  // Get single order detail
  async getOrderDetail(orderId: number): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${orderId}`);
    return response.data!;
  },

  // Create new order
  async createOrder(data: CreateOrderPayload): Promise<Order> {
    const response = await apiClient.post<{ order: Order }>("/orders", data);
    return response.data!.order;
  },

  // Cancel order (buyer) - backend uses POST /:id/cancel
  async cancelOrder(orderId: number): Promise<void> {
    await apiClient.post(`/orders/${orderId}/cancel`);
  },
};

// ============================================
// ORDER SERVICE (SELLER)
// ============================================
export const sellerOrderService = {
  // Get seller orders
  async getSellerOrders(
    params: OrdersQueryParams = {},
  ): Promise<OrdersResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.status) searchParams.set("status", params.status);

    const response = await apiClient.get<Order[]>(
      `/orders/seller/incoming?${searchParams.toString()}`,
    );

    return {
      orders: response.data || [],
      pagination: {
        page: response.meta?.page || 1,
        limit: response.meta?.limit || 10,
        total: response.meta?.total || 0,
        totalPages: response.meta?.totalPages || 0,
      },
    };
  },

  // Update order status (seller)
  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
    reason?: string,
  ): Promise<Order> {
    const response = await apiClient.patch<{ order: Order }>(
      `/orders/${orderId}/status`,
      {
        status,
        ...(reason && { reason }),
      },
    );
    return response.data!.order;
  },
};
