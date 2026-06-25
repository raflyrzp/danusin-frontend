export const ORDER_STATUS = {
  PENDING: "MENUNGGU_KONFIRMASI",
  PROCESSING: "DIPROSES",
  COMPLETED: "SELESAI",
  CANCELLED: "DIBATALKAN",
} as const;

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  [ORDER_STATUS.PROCESSING]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [ORDER_STATUS.COMPLETED]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [ORDER_STATUS.CANCELLED]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
} as const;

export const USER_ROLE = { BUYER: "buyer", SELLER: "seller" } as const;
