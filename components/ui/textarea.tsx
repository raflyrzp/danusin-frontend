import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-[#3B2A18] " +
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
Textarea.displayName = "Textarea";
