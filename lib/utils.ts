import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve image URL - converts relative paths to full URLs
 * Backend returns paths like "/uploads/xxx.jpg"
 */
 export function getImageUrl(url: string | null | undefined): string | null {
   if (!url) return null;

   const trimmed = url.trim();
   if (!trimmed) return null;

   // Hapus semua spasi
   const noSpaces = trimmed.replace(/\s+/g, "");

   // 1. Cek apakah ini URL eksternal (misal dari Google/Unsplash)
   if (noSpaces.startsWith("http://") || noSpaces.startsWith("https://")) {
     return noSpaces;
   }

   // 2. HARDCODE URL BACKEND DI SINI
   // Ini memaksa semua gambar lokal mengambil dari port 3001
   const backendBaseUrl = "http://localhost:3001";

   // Pastikan path diawali dengan slash "/"
   const cleanPath = noSpaces.startsWith("/") ? noSpaces : `/${noSpaces}`;

   // Hasil: http://localhost:3001/uploads/nama-file.jpg
   return `${backendBaseUrl}${cleanPath}`;
 }

/**
 * Check if URL is a localhost/local IP URL
 * Used to determine whether to use Next.js Image optimization or regular img tag
 * This function normalizes the input (trim + remove internal whitespace) before checking.
 */
export function isLocalUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const s = url.trim().replace(/\s+/g, "");
  return (
    s.includes("localhost") ||
    s.includes("127.0.0.1") ||
    s.includes("::1")
  );
}

export function formatPrice(price: number): string {
  return new Intl. NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateLong(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
}
