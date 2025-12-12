import type * as React from "react";
import { cn } from "@/lib/utils";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#F1E6C7]",
        props.className
      )}
    />
  );
}

export const CardHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn("mb-4 space-y-1", props.className)} />
);

export const CardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    {...props}
    className={cn(
      "text-xl font-semibold tracking-tight text-[#4E1F00]",
      props.className
    )}
  />
);

export const CardDescription = (
  props: React.HTMLAttributes<HTMLParagraphElement>
) => <p {...props} className={cn("text-sm text-[#8A7A57]", props.className)} />;

export const CardContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn("space-y-4", props.className)} />
);

export const CardFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn("mt-4 flex items-center justify-between", props.className)}
  />
);
