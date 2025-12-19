"use client";

import { useState } from "react";
import { useSellerOrders } from "@/hooks/use-seller-orders";
import { formatPrice, cn } from "@/lib/utils";
import { OrderStatus } from "@/types";
import {
  Loader2,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Phone,
  User,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  "Menunggu Konfirmasi": {
    label: "Menunggu Konfirmasi",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  "Diproses": {
    label: "Diproses",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Package,
  },
  "Selesai": {
    label: "Selesai",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
  },
  "Dibatalkan": {
    label: "Dibatalkan",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StoreOrdersPage() {
  const {
    orders,
    isLoading,
    error,
    pagination,
    setPage,
    setStatus,
    confirmOrder,
    completeOrder,
    rejectOrder,
  } = useSellerOrders();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value);
    setStatus(value === "all" ? undefined : (value as OrderStatus));
  };

  const handleConfirm = async (orderId: number) => {
    setActionLoading(orderId);
    await confirmOrder(orderId);
    setActionLoading(null);
  };

  const handleComplete = async (orderId: number) => {
    setActionLoading(orderId);
    await completeOrder(orderId);
    setActionLoading(null);
  };

  const handleRejectClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setRejectReason("");
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedOrderId) return;
    setActionLoading(selectedOrderId);
    await rejectOrder(selectedOrderId, rejectReason);
    setActionLoading(null);
    setRejectDialogOpen(false);
    setSelectedOrderId(null);
    setRejectReason("");
  };

  // Filter orders by search query
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.product_name?.toLowerCase().includes(query) ||
      order.buyer_name?.toLowerCase().includes(query) ||
      order.id.toString().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-red-300 bg-red-50 p-10 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4E1F00]">Pesanan Masuk</h1>
          <p className="text-sm text-[#74512D] mt-1">
            Kelola pesanan dari pembeli
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 rounded-full border border-yellow-200">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-yellow-700 font-medium">
              {orders.filter((o) => o.status === "Menunggu Konfirmasi").length} Menunggu
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      {/*<div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B4A98C]" />
          <Input
            placeholder="Cari pesanan, produk, atau pembeli..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
          />
        </div>
        <Select value={selectedStatus} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 border-[#E3D9BD]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#74512D]" />
              <SelectValue placeholder="Filter Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Menunggu Konfirmasi">Menunggu Konfirmasi</SelectItem>
            <SelectItem value="Diproses">Diproses</SelectItem>
            <SelectItem value="Selesai">Selesai</SelectItem>
            <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>
      </div>*/}

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E3D9BD] bg-white p-10 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-[#B4A98C] mb-4" />
          <p className="text-[#74512D] font-medium">Belum ada pesanan</p>
          <p className="text-sm text-[#B4A98C] mt-1">
            Pesanan dari pembeli akan muncul di sini
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
          const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG["Menunggu Konfirmasi"];
          const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                className="rounded-xl border border-[#E3D9BD] bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-[#F8F4E1] flex items-center justify-center shrink-0">
                      <Package className="h-6 w-6 text-[#74512D]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#74512D]">
                        Order #{order.id}
                      </p>
                      <h3 className="font-semibold text-[#4E1F00]">
                        {order.product_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#B4A98C]">
                        <Calendar className="h-3 w-3" />
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 border",
                      statusConfig.color
                    )}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusConfig.label}
                  </Badge>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E3D9BD]">
                  <div>
                    <p className="text-xs text-[#B4A98C] mb-1">Pembeli</p>
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-[#74512D]" />
                      <span className="text-sm font-medium text-[#4E1F00]">
                        {order.buyer_name || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#B4A98C] mb-1">Kontak</p>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-[#74512D]" />
                      <span className="text-sm text-[#4E1F00]">
                        {order.buyer_whatsapp || "-"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#B4A98C] mb-1">Jumlah</p>
                    <span className="text-sm font-medium text-[#4E1F00]">
                      {order.quantity} item
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#B4A98C] mb-1">Total</p>
                    <span className="text-sm font-bold text-[#FEBA17]">
                      {formatPrice(order.total_price)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {order.status === "Menunggu Konfirmasi" && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                      onClick={() => handleConfirm(order.id)}
                      disabled={actionLoading === order.id}
                      className="flex-1 bg-[#FEBA17] text-[#4E1F00] hover:bg-[#e5a612]"
                    >
                      {actionLoading === order.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                      )}
                      Konfirmasi Pesanan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRejectClick(order.id)}
                      disabled={actionLoading === order.id}
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Tolak
                    </Button>
                  </div>
                )}

                {/*{order.status === "Diproses" && (
                  <div className="mt-4">
                    <Button
                      onClick={() => handleComplete(order.id)}
                      disabled={actionLoading === order.id}
                      className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
                    >
                      {actionLoading === order.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                      )}
                      Tandai Selesai
                    </Button>
                  </div>
                )}*/}

                {order.status === "Diproses" && (
                  <div className="mt-4">
                    <Button
                      onClick={() => handleComplete(order.id)}
                      disabled={actionLoading === order.id}
                      className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
                    >
                      {actionLoading === order.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                      )}
                      Selesaikan Pesanan
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-[#74512D]">
            Halaman {pagination.page} dari {pagination.totalPages} ({pagination.total} pesanan)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="border-[#E3D9BD]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="border-[#E3D9BD]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#4E1F00]">Tolak Pesanan</DialogTitle>
            <DialogDescription>
              Berikan alasan penolakan pesanan ini kepada pembeli.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Alasan penolakan (opsional)..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="border-[#E3D9BD] min-h-[100px]"
            />
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              className="border-[#E3D9BD]"
            >
              Batal
            </Button>
            <Button
              onClick={handleRejectConfirm}
              disabled={actionLoading !== null}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {actionLoading !== null ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Tolak Pesanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
