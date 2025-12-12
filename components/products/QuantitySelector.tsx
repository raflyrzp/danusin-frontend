"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-[#E5DEC5] bg-white p-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md text-[#4E1F00] hover:bg-[#F1E7C9] disabled:opacity-40"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        aria-label="Kurangi jumlah"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2. 5rem] text-center text-sm font-semibold text-[#4E1F00]">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md text-[#4E1F00] hover:bg-[#F1E7C9] disabled:opacity-40"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        aria-label="Tambah jumlah"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
