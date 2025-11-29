import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-white px-3 text-sm text-[#3B2A18] " +
            "placeholder:text-[#B4A98C] shadow-sm transition-colors " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danus-primary focus-visible:ring-offset-1 " +
            "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
