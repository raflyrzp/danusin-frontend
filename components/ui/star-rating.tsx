import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  onRatingChange,
  interactive = false,
  size = "md",
  className,
}: StarRatingProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onRatingChange?.(starValue)}
            className={cn(
              "transition-all duration-200",
              interactive ? "hover:scale-110 active:scale-95" : "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizes[size],
                isFilled
                  ? "fill-[#FEBA17] text-[#FEBA17]"
                  : "fill-transparent text-[#E3D9BD]"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
