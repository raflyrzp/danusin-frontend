"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { isLocalUrl, getImageUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined;
  fallback?: React.ReactNode;
}

/**
 * SafeImage component that handles both localhost and remote images
 * - Normalizes and resolves src via `getImageUrl` helper when possible
 * - Uses regular <img> tag for localhost URLs (to avoid Next.js Image Optimization issues)
 * - Uses Next.js <Image> for remote URLs
 * - Shows fallback when src is empty or on error
 */
export function SafeImage({
  src,
  alt,
  className,
  fallback,
  fill,
  width,
  height,
  sizes,
  priority,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // Normalize and resolve the source:
  // - Prefer getImageUrl (which also trims/removes internal whitespace)
  // - Fallback to trimming + removing internal whitespace
  const normalizedSrc: string | null = (() => {
    if (!src) return null;
    try {
      const resolved = getImageUrl(src);
      if (resolved) return resolved;
    } catch {
      // ignore and fallback to manual normalization
    }
    const fallbackNormalized = String(src).trim().replace(/\s+/g, "");
    return fallbackNormalized || null;
  })();

  // Show fallback if no resolved src or error occurred
  if (!normalizedSrc || error) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#F1E7C9] text-[#B4A98C]",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
    );
  }

  // Use regular img tag for localhost URLs to avoid Next.js Image Optimization issues
  if (isLocalUrl(normalizedSrc)) {
    return (
      <img
        src={normalizedSrc}
        alt={alt}
        className={cn(fill && "absolute inset-0 h-full w-full", className)}
        onError={() => setError(true)}
        style={!fill ? { width, height } : { objectFit: "cover" }}
        loading={priority ? "eager" : "lazy"}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  // Use Next.js Image for remote URLs (production)
  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      className={className}
      fill={fill}
      width={fill ? undefined : (width as number)}
      height={fill ? undefined : (height as number)}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      {...props}
    />
  );
}
