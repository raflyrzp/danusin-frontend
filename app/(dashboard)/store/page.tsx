"use client";

import { useStoreDashboard } from "@/hooks/use-store";
import { formatPrice, cn } from "@/lib/utils";
import { useState } from "react";
import {
  Loader2,
  Package,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const SalesChart = dynamic(
  () => import("@/components/dashboard/store/SalesChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#FEBA17]" />
      </div>
    ),
  },
);

const STATUS_STYLES: Record<string, string> = {
  MENUNGGU_KONFIRMASI: "bg-yellow-100 text-yellow-800",
  DIPROSES: "bg-blue-100 text-blue-800",
  SELESAI: "bg-green-100 text-green-800",
  DIBATALKAN: "bg-red-100 text-red-800",
};

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#74512D]">{title}</p>
          <p className="text-2xl font-bold text-[#4E1F00] mt-1">{value}</p>
        </div>
        <div className="rounded-full bg-[#F8F4E1] p-2">
          <Icon className="h-5 w-5 text-[#74512D]" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
          <TrendingUp className="h-3 w-3" />
          <span>+12% dari bulan lalu</span>
        </div>
      )}
    </div>
  );
}

export default function StoreDashboardPage() {
  const [period, setPeriod] = useState("30");
  const { data, isLoading, isError } = useStoreDashboard(period);

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-dashed border-red-300 bg-red-50 p-10 text-center">
        <p className="text-red-600">Gagal memuat dashboard</p>
      </div>
    );
  }

  const dashboard = data?.data;

  if (!dashboard) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4E1F00]">Dashboard Penjual</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border border-[#E3D9BD] bg-white px-3 py-1.5 text-sm text-[#4E1F00] shadow-sm outline-none focus:border-[#FEBA17] focus:ring-1 focus:ring-[#FEBA17]"
        >
          <option value="1">1 Hari Terakhir</option>
          <option value="3">3 Hari Terakhir</option>
          <option value="7">7 Hari Terakhir</option>
          <option value="30">30 Hari Terakhir</option>
          <option value="all">Semua Waktu</option>
        </select>
      </div>

      {dashboard.insights && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-blue-800">
              Insight & Rekomendasi
            </h2>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            {dashboard.insights.suggestion}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboard.insights.needsRestock?.length > 0 && (
              <div className="rounded-md bg-white p-3 border border-red-100">
                <p className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Perlu Tambah Stok (Stok
                  &lt; 5)
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-gray-700">
                  {dashboard.insights.needsRestock.map((p: any) => (
                    <li key={p.id}>
                      {p.name} (Stok: {p.stock})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {dashboard.insights.reduceStock?.length > 0 && (
              <div className="rounded-md bg-white p-3 border border-yellow-100">
                <p className="text-xs font-semibold text-yellow-600 mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Kurang Laku (Stok &gt;
                  10, 0 Penjualan)
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-gray-700">
                  {dashboard.insights.reduceStock.map((p: any) => (
                    <li key={p.id}>
                      {p.name} (Stok: {p.stock})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Produk"
          value={dashboard.total_products_count}
          icon={Package}
        />
        <StatCard
          title="Penjualan Bulan Ini"
          value={formatPrice(Number(dashboard.monthly_revenue) || 0)}
          icon={TrendingUp}
          trend
        />
        <StatCard
          title="Total Pesanan"
          value={dashboard.total_orders_count}
          icon={ShoppingBag}
        />
        <StatCard
          title="Pesanan Menunggu"
          value={dashboard.pending_orders_count}
          icon={Clock}
        />
        <StatCard
          title="Pesanan Selesai"
          value={Number(dashboard.completed_orders_count) || 0}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-[#4E1F00] mb-4">
            Grafik Penjualan
          </h2>
          <SalesChart data={dashboard.monthly_sales || []} />
        </div>

        <div className="rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#4E1F00]">Pesanan Terbaru</h2>
            <ShoppingBag className="h-4 w-4 text-[#74512D]" />
          </div>
          <div className="space-y-3">
            {!dashboard.recent_orders ||
            dashboard.recent_orders.length === 0 ? (
              <p className="text-sm text-[#74512D] text-center py-4">
                Belum ada pesanan
              </p>
            ) : (
              dashboard.recent_orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-start justify-between border-b border-[#E3D9BD] pb-3 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#4E1F00]">
                      {order.buyer_name || "Unknown"}
                    </p>
                    <p className="text-xs text-[#74512D]">
                      {order.product_name} ({order.quantity})
                    </p>
                    <p className="text-sm font-semibold text-[#4E1F00] mt-1">
                      {formatPrice(Number(order.total_price) || 0)}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      "text-[10px]",
                      STATUS_STYLES[order.status] || "bg-gray-100",
                    )}
                  >
                    {order.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
