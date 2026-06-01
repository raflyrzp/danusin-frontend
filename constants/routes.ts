export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  PROFILE: "/buyer/profile",
  NOTIFICATIONS: "/buyer/notifications",
  DASHBOARD: { BUYER: "/buyer", SELLER: "/store" },
} as const;
