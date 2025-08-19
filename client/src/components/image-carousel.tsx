import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
  autoRotate?: boolean;
}

export default function ImageCarousel({ 
  images, 
  alt, 
  currentIndex, 
  onIndexChange, 
  className,
  autoRotate = true 
}: ImageCarouselProps) {
  useEffect(() => {
    if (!autoRotate || images.length <= 1) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to auto-advance
        onIndexChange((currentIndex + 1) % images.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, onIndexChange, autoRotate]);

  if (images.length === 0) {
    return (
      <div className={cn("bg-gray-200 flex items-center justify-center", className)}>
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Images */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${alt} - Photo ${index + 1}`}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            index === currentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
          )}
        />
      ))}
      
      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={cn(
                "w-2 h-2 bg-white rounded-full transition-opacity duration-200",
                index === currentIndex ? "opacity-50" : "opacity-100"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
