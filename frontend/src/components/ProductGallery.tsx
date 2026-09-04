import React, { useState, useEffect } from 'react';
import { Variant } from '../types';

interface ProductGalleryProps {
  productName: string;
  isNew: boolean;
  selectedVariant: Variant | null;
  allVariants: Variant[];
  onSelectVariant: (variant: Variant) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  productName,
  isNew,
  selectedVariant,
  allVariants,
  onSelectVariant,
}) => {
  const [imgError, setImgError] = useState(false);

  // Reset image error whenever variant image changes
  useEffect(() => {
    setImgError(false);
  }, [selectedVariant?.imageUrl]);

  // Group unique colors to display the finishes dots matching the reference design:
  // "Available in X finishes" with interactive color swatches
  const uniqueColors = Array.from(
    new Set(allVariants.map((v) => v.color))
  ).map((colorName) => {
    return allVariants.find((v) => v.color === colorName)!;
  });

  const displayImage = imgError
    ? '/images/product-fallback.svg'
    : selectedVariant?.imageUrl || '/images/product-fallback.svg';

  return (
    <div className="flex flex-col items-center w-full">
      {/* Visual Product Showcase Card - Faithful to Reference Layout */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/60 border border-slate-200/90 p-6 sm:p-10 shadow-sm transition-all duration-300 flex flex-col items-center">
        {/* Top Header Row inside Image Card matching reference design */}
        <div className="w-full flex items-start justify-between mb-2">
          <div className="flex flex-col">
            {isNew && (
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-500 mb-1">
                NEW
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {productName}
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">
              {selectedVariant ? selectedVariant.storage : ''}
            </p>
          </div>
        </div>

        {/* Central Phone Presentation Area with soft radial backdrop */}
        <div className="relative my-6 flex items-center justify-center w-full h-80 sm:h-96 group">
          {/* Subtle ambient light aura */}
          <div
            className="absolute inset-8 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: selectedVariant?.colorCode || '#3B82F6' }}
          />

          <img
            key={displayImage}
            src={displayImage}
            alt={`${productName} in ${selectedVariant?.color || ''}`}
            onError={() => setImgError(true)}
            className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-all duration-500 transform group-hover:scale-105"
            fetchPriority="high"
          />
        </div>

        {/* Reference Design Section: "Available in X finishes" with color swatches */}
        <div className="mt-4 flex flex-col items-center gap-2.5">
          <span className="text-xs font-medium text-slate-500 tracking-tight">
            Available in {uniqueColors.length} finishes
          </span>
          <div
            className="flex items-center gap-3 p-1"
            role="radiogroup"
            aria-label="Device color finishes"
          >
            {uniqueColors.map((colorVariant) => {
              const isSelected = selectedVariant?.color === colorVariant.color;
              return (
                <button
                  key={colorVariant.id}
                  type="button"
                  onClick={() => {
                    setImgError(false);
                    const matchingVariant =
                      allVariants.find(
                        (v) =>
                          v.color === colorVariant.color &&
                          v.storage === selectedVariant?.storage
                      ) || colorVariant;
                    onSelectVariant(matchingVariant);
                  }}
                  className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isSelected
                      ? 'ring-2 ring-slate-900 ring-offset-2 scale-110 shadow-sm'
                      : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  role="radio"
                  aria-checked={isSelected}
                  title={`${colorVariant.color} finish`}
                >
                  <span
                    className="h-full w-full rounded-full border border-black/15 shadow-inner"
                    style={{ backgroundColor: colorVariant.colorCode }}
                  />
                  {isSelected && (
                    <span className="sr-only">Selected {colorVariant.color} finish</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
