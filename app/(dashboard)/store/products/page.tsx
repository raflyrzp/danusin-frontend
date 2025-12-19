"use client";

import { useState } from "react";
import Link from "next/link";
import { useMyProducts, useDeleteProduct } from "@/hooks/use-products";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { Loader2, Plus, Package, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function StoreProductsPage() {
  const { data, isLoading, isError, refetch } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (product: { id: number; name: string }) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProduct.mutateAsync(productToDelete.id);
      toast.success("Produk berhasil dihapus");
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      refetch();
    } catch (error: any) {
      toast.error("Gagal menghapus produk", {
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

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
        <p className="text-red-600">Gagal memuat produk</p>
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4E1F00]">Produk Saya</h1>
        <Button asChild className="gap-2 bg-[#FEBA17] text-[#4E1F00] hover:bg-[#e5a612]">
          <Link href="/store/products/new">
            <Plus className="h-4 w-4" />
            Tambah Produk
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E3D9BD] bg-white p-10 text-center">
          <Package className="h-12 w-12 mx-auto text-[#B4A98C] mb-4" />
          <p className="text-[#74512D] mb-4">Belum ada produk</p>
          <Button asChild className="bg-[#FEBA17] text-[#4E1F00] hover:bg-[#e5a612]">
            <Link href="/store/products/new">Tambah Produk Pertama</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border border-[#E3D9BD] bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-[#F1E7C9]">
                {product.primary_image ? (
                  <img
                    src={getImageUrl(product.primary_image) || ""}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-8 w-8 text-[#B4A98C]" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#4E1F00] truncate">{product.name}</h3>
                <p className="text-sm text-[#74512D] font-medium">{formatPrice(product.price)}</p>
                <p className="text-xs text-[#74512D] mt-1">Stok: {product.stock}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-[#E3D9BD] hover:bg-[#F8F4E1]"
                  asChild
                >
                  <Link href={`/store/products/${product.id}/edit`}>
                    <Edit className="h-4 w-4 text-[#74512D]" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                  onClick={() => handleDeleteClick({ id: product.id, name: product.name })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-[#4E1F00]">Hapus Produk</DialogTitle>
                <DialogDescription className="mt-1">
                  Tindakan ini tidak dapat dibatalkan
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-[#74512D]">
              Apakah Anda yakin ingin menghapus produk{" "}
              <span className="font-semibold text-[#4E1F00]">
                "{productToDelete?.name}"
              </span>
              ? Semua data termasuk gambar akan dihapus secara permanen.
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
              className="border-[#E3D9BD] text-[#4E1F00]"
            >
              Batal
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Produk
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
