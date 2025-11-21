export interface User {
  id: number;
  nim: string;
  name: string;
  major: string;
  faculty: string;
  batch_year: number;
  whatsapp: string;
  email: string;
  role: "buyer" | "seller";
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  seller_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  po_open_date: string;
  po_close_date: string;
  delivery_date: string | null;
  created_at: string;
  updated_at: string;
  seller_name?: string;
  seller_faculty?: string;
  seller_whatsapp?: string;
}

export interface Order {
  id: number;
  buyer_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  status: "Menunggu Konfirmasi" | "Diproses" | "Selesai" | "Dibatalkan";
  created_at: string;
  updated_at: string;
  product_name?: string;
  product_image?: string;
  seller_name?: string;
  seller_whatsapp?: string;
  buyer_name?: string;
  buyer_whatsapp?: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface DashboardSellerSummary {
  total_revenue: number;
  pending_orders_count: number;
  processing_orders_count: number;
  active_products_count: number;
  total_products_count: number;
  total_orders_count: number;
  recent_orders: Order[];
  monthly_revenue: Array<{ month: string; revenue: number }>;
}

export interface DashboardBuyerSummary {
  total_orders_count: number;
  total_spent: number;
  orders_by_status: Array<{ status: string; count: number }>;
  recent_orders: Order[];
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Array<{
    path: string;
    message: string;
  }>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ProductFilters extends PaginationParams {
  q?: string;
  min_price?: number;
  max_price?: number;
  open_only?: boolean;
  seller_id?: number;
}

export type UserRole = "buyer" | "seller";
export type OrderStatus = Order["status"];
