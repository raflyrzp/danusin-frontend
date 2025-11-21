export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000", 10),
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Danus.in",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Platform Pre-Order untuk Mahasiswa",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  },
  upload: {
    maxFileSize: parseInt(
      process.env.NEXT_PUBLIC_MAX_FILE_SIZE || "5242880",
      10
    ),
    allowedImageTypes: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES?.split(
      ","
    ) || ["image/jpeg", "image/png", "image/webp", "image/jpg"],
  },
  query: {
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  },
} as const;

export type Config = typeof config;
