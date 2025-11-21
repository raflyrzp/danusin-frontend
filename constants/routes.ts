export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  ORDERS: "/orders",
  ORDER_DETAIL: (id: number | string) => `/orders/${id}`,
  PROFILE: "/profile",
  DASHBOARD: {
    BUYER: "/dashboard/buyer",
    SELLER: "/dashboard/seller",
    SELLER_PRODUCTS: "/dashboard/seller/products",
    SELLER_PRODUCT_NEW: "/dashboard/seller/products/new",
    SELLER_PRODUCT_EDIT: (id: number | string) =>
      `/dashboard/seller/products/${id}/edit`,
    SELLER_ORDERS: "/dashboard/seller/orders",
  },
} as const;
