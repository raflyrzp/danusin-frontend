export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  PROFILE: "/buyer/profile",
  NOTIFICATIONS: "/buyer/notifications",
  DASHBOARD: {
    BUYER: "/buyer/profile",
    SELLER: "/store",
  },
} as const;
