import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { ProductListingSkeleton } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to connect to product service';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const brands = ['All', ...Array.from(new Set(products.map((p) => p.brand)))];
  const filteredProducts =
    selectedBrand === 'All'
      ? products
      : products.filter((p) => p.brand === selectedBrand);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Banner Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-bold mb-4 border border-blue-200/70 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>India&apos;s 1st Mutual Fund Backed EMI Store</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Flagship Smartphones with Flexible EMIs
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Upgrade to the latest flagship devices backed by your mutual fund portfolio.
          Enjoy 0% interest tenures, instant cashback up to ₹7,500, and terms up to 60 months.
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>0% Interest Available</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>Instant Digital Approval</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>Cashback Credited Directly</span>
          </div>
        </div>
      </div>

      {/* Brand Filters */}
      {!isLoading && !error && products.length > 0 && (
        <div className="mb-8 flex items-center justify-center gap-2.5 overflow-x-auto pb-2">
          {brands.map((brand) => {
            const count =
              brand === 'All'
                ? products.length
                : products.filter((p) => p.brand === brand).length;
            const isSelected = selectedBrand === brand;

            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{brand}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        <ProductListingSkeleton />
      ) : error ? (
        <ErrorState
          title="Unable to load products"
          message={error}
          onRetry={fetchProducts}
          showBackToProducts={false}
        />
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-base font-bold text-slate-700">
            No products found for this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
