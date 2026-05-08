import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const s = url.trim().replace(/\s+/g, "");
  if (s.startsWith("http")) return s;
  const base = "http://localhost:3000";
  return `${base}${s.startsWith("/") ? s : `/${s}`}`;
};

export const isLocalUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  const s = url.trim().replace(/\s+/g, "");
  return s.includes("localhost") || s.includes("127.0.0.1") || s.includes("::1");
};

export const formatPrice = (price: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export const formatDate = (date: string | Date) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));

export const formatDateLong = (date: string | Date) => new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(date));

export const formatDateTime = (date: string | Date) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(date));

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diff < 60) return "Baru saja";
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} menit yang lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari yang lalu`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} minggu yang lalu`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} bulan yang lalu`;
  return `${Math.floor(days / 365)} tahun yang lalu`;
};
