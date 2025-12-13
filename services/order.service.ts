import { Order, ApiResponse, PaginationParams, OrderStatus } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// ============================================
// FETCH HELPER
// ============================================
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers:  {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Terjadi kesalahan");
  }

  return response.json();
}

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
    total:  number;
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
    if (params.page) searchParams.set("page", params. page.toString());
    if (params. limit) searchParams.set("limit", params.limit.toString());
    if (params.status) searchParams.set("status", params.status);

    const response = await fetchWithAuth<ApiResponse<Order[]>>(
      `/orders/my-orders?${searchParams.toString()}`
    );

    return {
      orders: response.data || [],
      pagination:  {
        page:  response.meta?. page || 1,
        limit: response. meta?.limit || 10,
        total:  response.meta?.total || 0,
        totalPages: response.meta?.totalPages || 0,
      },
    };
  },

  // Get single order detail
  async getOrderDetail(orderId:  number): Promise<Order> {
    const response = await fetchWithAuth<ApiResponse<Order>>(
      `/orders/${orderId}`
    );
    return response.data!;
  },

  // Create new order
  async createOrder(data: CreateOrderPayload): Promise<Order> {
    const response = await fetchWithAuth<ApiResponse<Order>>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data! ;
  },

  // Cancel order (buyer)
  async cancelOrder(orderId:  number): Promise<void> {
    await fetchWithAuth(`/orders/${orderId}/cancel`, {
      method: "PATCH",
    });
  },
};

// ============================================
// ORDER SERVICE (SELLER)
// ============================================
export const sellerOrderService = {
  // Get seller orders
  async getSellerOrders(params: OrdersQueryParams = {}): Promise<OrdersResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params. limit.toString());
    if (params. status) searchParams.set("status", params.status);

    const response = await fetchWithAuth<ApiResponse<Order[]>>(
      `/orders/seller-orders?${searchParams.toString()}`
    );

    return {
      orders: response.data || [],
      pagination: {
        page: response.meta?. page || 1,
        limit: response.meta?.limit || 10,
        total: response.meta?.total || 0,
        totalPages: response.meta?. totalPages || 0,
      },
    };
  },

  // Update order status (seller)
  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
    const response = await fetchWithAuth<ApiResponse<Order>>(
      `/orders/${orderId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
    return response.data!;
  },

  // Confirm order (seller)
  async confirmOrder(orderId: number): Promise<Order> {
    const response = await fetchWithAuth<ApiResponse<Order>>(
      `/orders/${orderId}/confirm`,
      {
        method: "PATCH",
      }
    );
    return response.data! ;
  },

  // Complete order (seller)
  async completeOrder(orderId: number): Promise<Order> {
    const response = await fetchWithAuth<ApiResponse<Order>>(
      `/orders/${orderId}/complete`,
      {
        method: "PATCH",
      }
    );
    return response.data! ;
  },

  // Reject order (seller)
  async rejectOrder(orderId: number, reason?: string): Promise<Order> {
    const response = await fetchWithAuth<ApiResponse<Order>>(
      `/orders/${orderId}/reject`,
      {
        method:  "PATCH",
        body: JSON. stringify({ reason }),
      }
    );
    return response. data!;
  },
};
