import Link from "next/link";
import { Calendar, Store } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Product } from "@/types";
import { ROUTES } from "@/constants/routes";

function StatusBadge({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={cn(
        "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm",
        isOpen ? "bg-[#FEBA17] text-[#4E1F00]" : "bg-gray-500 text-white"
      )}
    >
      {isOpen ? "Open PO" : "Closed"}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const now = new Date();
  const closeDate = new Date(product.po_close_date);
  const isOpen = now <= closeDate;

  return (
    <Link href={ROUTES.PRODUCT_DETAIL(product.id)}>
      <Card className="group relative h-full overflow-hidden border-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,31,0,0.1)]">
        <div className="relative aspect-square w-full overflow-hidden bg-[#F1E7C9]">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#B4A98C]">
              <Store className="h-12 w-12 opacity-50" />
            </div>
          )}
          <StatusBadge isOpen={isOpen} />
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#8A7A57]">
            <Calendar className="h-3 w-3" />
            <span>
              Tutup:{" "}
              {new Date(product.po_close_date).toLocaleDateString("id-ID")}
            </span>
          </div>

          <h3 className="line-clamp-2 text-base font-bold text-[#4E1F00] group-hover:text-[#FEBA17] transition-colors">
            {product.name}
          </h3>

          <p className="mt-2 text-lg font-extrabold text-[#74512D]">
            {formatPrice(product.price)}
          </p>
        </CardContent>

        <CardFooter className="flex items-center gap-3 border-t border-[#F3E6C5] bg-[#FAFAFA] p-3">
          <Avatar className="h-6 w-6 border border-[#E5DEC5]">
            <AvatarFallback className="text-[10px] bg-[#FEBA17] text-[#4E1F00]">
              {product.seller_name?.charAt(0) || "S"}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-xs font-medium text-[#4E1F00]">
            {product.seller_name || "Penjual"}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
