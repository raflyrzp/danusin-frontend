"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Image as ImageType } from "@/types";
import Image from "next/image";

interface ImageGalleryProps {
  images: ImageType[];
  productName: string;
  primaryImage?: string | null;
}

export function ImageGallery({
  images,
  productName,
  primaryImage,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const cleanUrl = (url: string) => {
      if (!url) return "";
      return url.replace(/\s/g, "");
    };

  let displayImages: { id: number; url: string; alt_text: string | null }[] = [];

  if (images && images.length > 0) {
    displayImages = [...images].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return a.sort_order - b.sort_order;
    });
  } else if (primaryImage) {
    displayImages = [{ id: 0, url: primaryImage, alt_text: productName }];
  }

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  if (displayImages.length === 0) {
    return (
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#F1E7C9]">
        <div className="flex h-full w-full items-center justify-center text-[#B4A98C]">
          <Store className="h-24 w-24 opacity-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F1E7C9]">
        <Image
          src={cleanUrl(displayImages[activeIndex].url)}
          alt={
            displayImages[activeIndex].alt_text ||
            `${productName} - ${activeIndex + 1}`
          }
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:scale-110 hover:bg-white z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-[#4E1F00]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:scale-110 hover:bg-white z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-[#4E1F00]" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {activeIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              type="button"
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg transition-all",
                activeIndex === index
                  ? "ring-2 ring-[#FEBA17] ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={cleanUrl(image.url)}
                alt={image.alt_text || `Thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
