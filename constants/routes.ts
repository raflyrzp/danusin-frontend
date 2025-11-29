export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  PROFILE: "/profile",
  DASHBOARD: {
    BUYER: "/dashboard/buyer",
    SELLER: "/dashboard/seller",
  },
} as const;
