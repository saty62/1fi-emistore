import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatINR, calculateDiscount } from '../utils/currencyFormatter';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const primaryVariant = product.variants?.[0];
  const lowestEmi = product.emiPlans?.length
    ? Math.min(...product.emiPlans.map((p) => p.monthlyAmount))
    : null;
  const discount = calculateDiscount(product.mrp, product.basePrice);

  // Unique color swatches for card preview
  const uniqueColors = Array.from(
    new Set(product.variants?.map((v) => v.colorCode) || [])
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300">
      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        {product.isNew && (
          <span className="rounded-md bg-rose-500 px-2.5 py-0.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm">
            NEW
          </span>
        )}
        <span className="rounded-md bg-slate-900/85 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white tracking-wide">
          {product.brand}
        </span>
      </div>

      {/* Product Image Stage */}
      <div className="relative flex aspect-square items-center justify-center p-8 bg-gradient-to-b from-slate-50/70 via-slate-50/40 to-slate-100/40 overflow-hidden">
        <img
          src={primaryVariant?.imageUrl || '/images/product-fallback.svg'}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/product-fallback.svg';
          }}
          className="h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">
              {product.category}
            </span>

            {/* Finishes dots preview */}
            {uniqueColors.length > 0 && (
              <div className="flex items-center gap-1.5" title={`${uniqueColors.length} finishes available`}>
                {uniqueColors.map((colorCode, idx) => (
                  <span
                    key={idx}
                    className="h-2.5 w-2.5 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: colorCode }}
                  />
                ))}
              </div>
            )}
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
            {product.variants?.length || 0} storage & finish options
          </p>
        </div>

        {/* Pricing Area */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">
              {formatINR(product.basePrice)}
            </span>
            <span className="text-xs text-slate-400 font-semibold line-through">
              {formatINR(product.mrp)}
            </span>
            {discount > 0 && (
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                {discount}% OFF
              </span>
            )}
          </div>

          {lowestEmi && (
            <div className="mt-2.5 flex items-center justify-between text-xs text-blue-800 font-bold bg-blue-50/80 px-3 py-2 rounded-xl border border-blue-100">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                <span>From {formatINR(lowestEmi)}/mo</span>
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                0% Available
              </span>
            </div>
          )}

          <Link
            to={`/products/${product.slug}`}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>View Details & EMIs</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
