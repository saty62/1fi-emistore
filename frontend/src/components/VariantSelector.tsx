import React from 'react';
import { Check } from 'lucide-react';
import { Variant } from '../types';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  // Extract unique storage options
  const storageOptions = Array.from(new Set(variants.map((v) => v.storage)));

  // Extract unique color options for current storage (or all)
  const currentColors = Array.from(
    new Set(
      variants
        .filter((v) => !selectedVariant || v.storage === selectedVariant.storage)
        .map((v) => v.color)
    )
  );

  const handleStorageChange = (storage: string) => {
    const matching =
      variants.find(
        (v) => v.storage === storage && v.color === selectedVariant?.color
      ) || variants.find((v) => v.storage === storage);

    if (matching) onSelectVariant(matching);
  };

  const handleColorChange = (color: string) => {
    const matching =
      variants.find(
        (v) => v.color === color && v.storage === selectedVariant?.storage
      ) || variants.find((v) => v.color === color);

    if (matching) onSelectVariant(matching);
  };

  return (
    <div className="space-y-6 rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/80 shadow-sm transition-all">
      {/* Storage Capacity Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Storage Capacity
          </label>
          <span className="text-xs font-bold text-blue-600">
            {selectedVariant?.storage}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Storage capacity options">
          {storageOptions.map((storage) => {
            const isSelected = selectedVariant?.storage === storage;
            const variantWithStorage = variants.find((v) => v.storage === storage);

            return (
              <button
                key={storage}
                type="button"
                onClick={() => handleStorageChange(storage)}
                className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl py-3 px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-50/40 text-blue-900 shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
                role="radio"
                aria-checked={isSelected}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  {isSelected && <Check className="h-4 w-4 text-blue-600 flex-shrink-0 stroke-[3]" />}
                  <span>{storage}</span>
                </div>
                {variantWithStorage?.price && (
                  <span className="text-[11px] font-medium text-slate-500">
                    {storage === '256GB' ? 'Standard Tier' : 'High Performance'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Finish Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Finish & Color
          </label>
          <span className="text-xs font-bold text-slate-800">
            {selectedVariant?.color}
          </span>
        </div>
        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Device color options">
          {currentColors.map((colorName) => {
            const variantForColor = variants.find((v) => v.color === colorName);
            const isSelected = selectedVariant?.color === colorName;

            return (
              <button
                key={colorName}
                type="button"
                onClick={() => handleColorChange(colorName)}
                className={`group flex items-center gap-2.5 rounded-2xl py-2.5 px-4 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSelected
                    ? 'border-2 border-slate-900 bg-slate-900 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
                role="radio"
                aria-checked={isSelected}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/15 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: variantForColor?.colorCode || '#000000' }}
                />
                <span>{colorName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
