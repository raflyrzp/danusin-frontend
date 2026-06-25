"use client";

import { useBuyerDashboard } from "@/hooks/use-dashboard";
import { formatPrice, cn } from "@/lib/utils";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const STATUS_STYLES: Record<string, string> = {
  PENDING_PAYMENT: "bg-gray-100 text-gray-800",
  MENUNGGU_KONFIRMASI: "bg-yellow-100 text-yellow-800",
  DIPROSES: "bg-blue-100 text-blue-800",
  SELESAI: "bg-green-100 text-green-800",
  DIBATALKAN: "bg-red-100 text-red-800",
};

export default function BuyerDashboardPage() {
  const { data, isLoading, isError } = useBuyerDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Clock className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-red-500 text-center p-10">
        Gagal memuat dashboard.
      </div>
    );
  }

  const summary = data.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#4E1F00]">Dashboard Pembeli</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#74512D]">Total Pesanan</p>
          <p className="text-2xl font-bold text-[#4E1F00]">
            {summary.total_orders_count}
          </p>
        </div>
        <div className="rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#74512D]">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-[#4E1F00]">
            {formatPrice(Number(summary.total_spent) || 0)}
          </p>
        </div>
        {summary.orders_by_status.map((statusData) => (
          <div
            key={statusData.status}
            className="rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-[#74512D]">
              Pesanan {statusData.status}
            </p>
            <p className="text-2xl font-bold text-[#4E1F00]">
              {statusData.count}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#4E1F00]">
            Aktivitas Pesanan Terbaru
          </h2>
          <Link
            href="/buyer/orders"
            className="text-sm text-[#FEBA17] hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        {!summary.recent_orders || summary.recent_orders.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Package className="h-10 w-10 mx-auto text-gray-300 mb-2" />
            <p>Belum ada pesanan terbaru.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {summary.recent_orders.map((order) => (
              <div
                key={order.id}
                className="flex gap-4 border border-gray-100 rounded-lg p-4 items-center"
              >
                {order.product_image ? (
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={order.product_image}
                      alt={order.product_name || "Produk"}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    <Package />
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-semibold text-[#4E1F00]">
                    {order.product_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Toko: {order.seller_name}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {formatPrice(Number(order.total_price) || 0)}
                  </p>
                </div>

                <div className="text-right">
                  <Badge
                    className={cn(
                      "text-xs font-normal",
                      STATUS_STYLES[order.status] ||
                        "bg-gray-100 text-gray-800",
                    )}
                  >
                    {order.status}
                  </Badge>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {new Date(order.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
