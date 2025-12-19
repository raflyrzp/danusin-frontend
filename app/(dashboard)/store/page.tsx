"use client";

import { useStoreDashboard } from "@/hooks/use-store";
import { formatPrice, cn } from "@/lib/utils";
import {
  Loader2,
  Package,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

// Dynamic import untuk chart (client-only)
const SalesChart = dynamic(
  () => import("@/components/dashboard/store/SalesChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#FEBA17]" />
      </div>
    ),
  }
);

const STATUS_STYLES: Record<string, string> = {
  "Menunggu Konfirmasi": "bg-yellow-100 text-yellow-800",
  Diproses: "bg-blue-100 text-blue-800",
  Selesai: "bg-green-100 text-green-800",
  Dibatalkan: "bg-red-100 text-red-800",
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
  const { data, isLoading, isError } = useStoreDashboard();

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
      <h1 className="text-2xl font-bold text-[#4E1F00]">Dashboard Penjual</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Produk"
          value={dashboard.total_products_count}
          icon={Package}
        />
        <StatCard
          title="Penjualan Bulan Ini"
          // FIX: Konversi ke Number() sebelum format
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
          // FIX: Konversi ke Number() untuk keamanan
          value={Number(dashboard.completed_orders_count) || 0}
          icon={CheckCircle2}
        />
      </div>

      {/* Chart & Recent Orders */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-[#4E1F00] mb-4">
            Grafik Penjualan
          </h2>
          <SalesChart data={dashboard.monthly_sales || []} />
        </div>

        {/* Recent Orders */}
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
                      {/* FIX: Konversi ke Number() */}
                      {formatPrice(Number(order.total_price) || 0)}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      "text-[10px]",
                      STATUS_STYLES[order.status] || "bg-gray-100"
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
