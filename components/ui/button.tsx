"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 " +
    "ring-offset-[var(--background)]",
  {
    variants: {
      variant: {
        default:
          "bg-[#FEBA17] text-[#4E1F00] hover:bg-[#e5a612] shadow-sm active:translate-y-[1px]",
        outline:
          "border border-[#E5DEC5] bg-white text-[#4E1F00] hover:bg-[#F1E7C9] hover:text-[#74512D]",
        ghost: "text-[#4E1F00] hover:bg-[#F1E7C9]",
        secondary:
          "bg-[#4E1F00] text-[#F8F4E1] hover:bg-[#74512D] shadow-sm active:translate-y-[1px]",
        link: "text-[#74512D] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 rounded-md text-xs",
        lg: "h-11 px-6 text-base rounded-xl",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
