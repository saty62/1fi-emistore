import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Product, Variant, EmiPlan, SelectedEmiSummary } from '../types';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/ProductGallery';
import { VariantSelector } from '../components/VariantSelector';
import { EmiPlanList } from '../components/EmiPlanList';
import { ProceedModal } from '../components/ProceedModal';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { formatINR, calculateDiscount } from '../utils/currencyFormatter';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [is404, setIs404] = useState<boolean>(false);

  // Modal & Proceed State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectionSummary, setSelectionSummary] = useState<SelectedEmiSummary | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!slug) return;
    try {
      setIsLoading(true);
      setError(null);
      setIs404(false);

      const data = await productService.getProductBySlug(slug);
      setProduct(data);

      // Automatically select default variant
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }

      // Automatically select default popular or first EMI plan
      if (data.emiPlans && data.emiPlans.length > 0) {
        const popular = data.emiPlans.find((p) => p.isPopular) || data.emiPlans[0];
        setSelectedPlan(popular);
      }
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'statusCode' in err &&
        (err as { statusCode: number }).statusCode === 404
      ) {
        setIs404(true);
      } else {
        const message = err instanceof Error ? err.message : 'Unable to load product';
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // Compute dynamic prices based on selected variant (or fallback to product base price)
  const currentPrice = useMemo(() => {
    if (selectedVariant?.price) return selectedVariant.price;
    return product?.basePrice ?? 0;
  }, [selectedVariant, product]);

  const currentMrp = useMemo(() => {
    if (selectedVariant?.mrp) return selectedVariant.mrp;
    return product?.mrp ?? 0;
  }, [selectedVariant, product]);

  const discount = useMemo(() => {
    return calculateDiscount(currentMrp, currentPrice);
  }, [currentMrp, currentPrice]);

  // Calculate variant-aware EMI plans when storage capacity changes price
  const displayedEmiPlans = useMemo(() => {
    if (!product?.emiPlans) return [];
    if (!selectedVariant || !selectedVariant.price || selectedVariant.price === product.basePrice) {
      return product.emiPlans;
    }
    const ratio = selectedVariant.price / product.basePrice;
    return product.emiPlans.map((plan) => ({
      ...plan,
      monthlyAmount: Math.round(plan.monthlyAmount * ratio),
    }));
  }, [product, selectedVariant]);

  // Active plan with accurate variant-adjusted monthly installment
  const activePlanCalculated = useMemo(() => {
    if (!selectedPlan) return null;
    return displayedEmiPlans.find((p) => p.id === selectedPlan.id) || selectedPlan;
  }, [selectedPlan, displayedEmiPlans]);

  // Handle proceed with EMI plan
  const handleProceed = async () => {
    if (!product || !selectedVariant || !selectedPlan) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const summary = await productService.selectEmiPlan({
        productId: product.id,
        variantId: selectedVariant.id,
        emiPlanId: selectedPlan.id,
      });

      setSelectionSummary(summary);
      setIsModalOpen(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to select EMI plan';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (is404) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState
          title="Product not found"
          message={`The smartphone with slug '${slug}' does not exist in our catalog.`}
          showBackToProducts={true}
        />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState
          title="Unable to load product"
          message={error || 'An unexpected error occurred while loading this product.'}
          onRetry={fetchProduct}
          showBackToProducts={true}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 sm:pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link
          to="/"
          className="hover:text-blue-600 transition-colors flex items-center gap-1 focus:outline-none focus:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Devices</span>
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">{product.brand}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Two-Column Layout (Matching the Reference Image Concept) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Showcase & Variant Selection */}
        <div className="lg:col-span-6 space-y-6">
          <ProductGallery
            productName={product.name}
            isNew={product.isNew}
            selectedVariant={selectedVariant}
            allVariants={product.variants}
            onSelectVariant={setSelectedVariant}
          />

          {/* Interactive Variant Options */}
          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          )}

          {/* Device Highlights Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Device Overview
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                1-Year Official Warranty
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                100% Original Brand Sealed
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Mutual Fund EMI Plans & Proceed Action */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Financial & EMI Selection Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
            {/* Price Header Row matching reference design */}
            <div className="flex flex-col pb-5 border-b border-slate-100">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {formatINR(currentPrice)}
                </span>
                <span className="text-base sm:text-lg text-slate-400 font-semibold line-through">
                  {formatINR(currentMrp)}
                </span>
                {discount > 0 && (
                  <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200/70">
                    Save {discount}%
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-400 mt-1">
                Inclusive of all taxes & free door-step delivery
              </span>
            </div>

            {/* Mutual Fund Financing Benefit Callout */}
            <div className="mt-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-blue-50/40 p-4 border border-blue-100/90 flex items-start gap-3.5">
              <div className="rounded-xl bg-blue-600 p-2 text-white flex-shrink-0 shadow-sm shadow-blue-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-blue-950 uppercase tracking-wide">
                  Mutual Fund Backed Financing
                </h4>
                <p className="text-xs text-blue-800/90 mt-0.5 leading-relaxed font-medium">
                  Keep your investments growing while paying low monthly EMIs. Enjoy 0% interest and instant cashback.
                </p>
              </div>
            </div>

            {/* Stack of EMI Plans matching reference design */}
            <div className="mt-6">
              <EmiPlanList
                plans={displayedEmiPlans}
                selectedPlan={activePlanCalculated}
                onSelectPlan={setSelectedPlan}
              />
            </div>

            {/* Selected Plan Summary Banner before button */}
            {activePlanCalculated ? (
              <div className="mt-6 rounded-2xl bg-slate-50/80 p-4 border border-slate-200/80 flex items-center justify-between transition-all">
                <div>
                  <span className="text-xs text-slate-500 font-semibold">Selected EMI Plan:</span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    {formatINR(activePlanCalculated.monthlyAmount)} × {activePlanCalculated.tenureMonths} months
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-semibold">Cashback:</span>
                  <p className="text-sm sm:text-base font-extrabold text-emerald-600">
                    {activePlanCalculated.cashbackAmount > 0
                      ? formatINR(activePlanCalculated.cashbackAmount)
                      : 'None'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-2.5 text-xs font-semibold text-amber-700 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/70">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-600" />
                <span>Please select an EMI plan above to proceed.</span>
              </div>
            )}

            {/* Inline Error Notice */}
            {submitError && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-rose-50 p-3.5 text-xs font-bold text-rose-700 border border-rose-200">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Prominent Proceed with EMI Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleProceed}
                disabled={!selectedPlan || isSubmitting}
                className={`group relative flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 px-6 text-base font-extrabold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
                  !selectedPlan || isSubmitting
                    ? 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Reserving Plan...</span>
                  </>
                ) : activePlanCalculated ? (
                  <>
                    <span>Proceed with {formatINR(activePlanCalculated.monthlyAmount)}/mo</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    <span>Proceed with EMI</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Trust Footer */}
              <div className="mt-3.5 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
                <Lock className="h-3 w-3 text-slate-400" />
                <span>Instant Digital Pledge • Zero Paperwork • High Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar for Small Viewports */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden border-t border-slate-200/90 bg-white/95 p-3.5 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
            {selectedVariant?.storage} • {selectedVariant?.color}
          </span>
          <span className="text-base font-black text-slate-900 block truncate">
            {activePlanCalculated
              ? `${formatINR(activePlanCalculated.monthlyAmount)}/mo`
              : formatINR(currentPrice)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleProceed}
          disabled={!selectedPlan || isSubmitting}
          className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition-all ${
            !selectedPlan || isSubmitting
              ? 'bg-slate-300 text-slate-500'
              : 'bg-blue-600 active:bg-blue-700 shadow-blue-500/30'
          }`}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>Proceed</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      <ProceedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summary={selectionSummary}
      />
    </div>
  );
};
