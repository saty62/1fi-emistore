import React from 'react';

export const ProductListingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-5"
        >
          <div className="aspect-square w-full rounded-2xl skeleton-shimmer" />
          <div className="space-y-2.5">
            <div className="h-3 w-1/4 rounded-full skeleton-shimmer" />
            <div className="h-6 w-3/4 rounded-xl skeleton-shimmer" />
            <div className="h-3.5 w-1/2 rounded-full skeleton-shimmer" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 rounded-lg skeleton-shimmer" />
              <div className="h-4 w-16 rounded-lg skeleton-shimmer" />
            </div>
            <div className="h-10 w-full rounded-xl skeleton-shimmer" />
            <div className="h-12 w-full rounded-2xl skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left Column Skeleton */}
      <div className="lg:col-span-6 space-y-6">
        {/* Gallery Showcase Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 w-full">
              <div className="h-3 w-12 rounded-full skeleton-shimmer" />
              <div className="h-8 w-2/3 rounded-xl skeleton-shimmer" />
              <div className="h-4 w-20 rounded-md skeleton-shimmer" />
            </div>
          </div>
          <div className="h-80 sm:h-96 w-full rounded-2xl skeleton-shimmer" />
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="h-3 w-32 rounded-full skeleton-shimmer" />
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full skeleton-shimmer" />
              <div className="h-6 w-6 rounded-full skeleton-shimmer" />
              <div className="h-6 w-6 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Variant Selector Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-5">
          <div className="space-y-2">
            <div className="h-3 w-28 rounded-full skeleton-shimmer" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 rounded-2xl skeleton-shimmer" />
              <div className="h-14 rounded-2xl skeleton-shimmer" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 rounded-full skeleton-shimmer" />
            <div className="flex gap-2">
              <div className="h-10 w-24 rounded-2xl skeleton-shimmer" />
              <div className="h-10 w-28 rounded-2xl skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className="lg:col-span-6 space-y-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {/* Price Header */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="flex items-baseline gap-3">
              <div className="h-10 w-44 rounded-xl skeleton-shimmer" />
              <div className="h-6 w-24 rounded-lg skeleton-shimmer" />
            </div>
            <div className="h-3 w-48 rounded-full skeleton-shimmer" />
          </div>

          {/* Mutual Fund Banner Placeholder */}
          <div className="h-20 w-full rounded-2xl skeleton-shimmer" />

          {/* Stacked EMI Plan Cards */}
          <div className="space-y-3">
            <div className="h-4 w-52 rounded-full skeleton-shimmer mb-4" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-20 w-full rounded-2xl skeleton-shimmer" />
            ))}
          </div>

          {/* Proceed Button Placeholder */}
          <div className="h-14 w-full rounded-2xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};
