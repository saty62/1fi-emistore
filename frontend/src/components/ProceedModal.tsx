import React, { useEffect } from 'react';
import { CheckCircle2, X, Sparkles, Shield, ArrowRight, Check, Clock } from 'lucide-react';
import { SelectedEmiSummary } from '../types';
import { formatINR } from '../utils/currencyFormatter';

interface ProceedModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: SelectedEmiSummary | null;
}

export const ProceedModal: React.FC<ProceedModalProps> = ({
  isOpen,
  onClose,
  summary,
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !summary) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-modal-in border border-slate-100">
        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner">
                <CheckCircle2 className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <h3 id="modal-title" className="text-lg font-black tracking-tight">
                  EMI Plan Reserved!
                </h3>
                <p className="text-xs text-blue-100 font-mono tracking-wide">
                  Booking Ref: {summary.confirmationId}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-white/80 hover:bg-white/15 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Selected Device Banner */}
          <div className="flex items-center gap-4 rounded-2xl bg-slate-50/80 p-4 border border-slate-200/80">
            <div className="h-16 w-16 flex-shrink-0 rounded-2xl bg-white p-2 border border-slate-200/90 flex items-center justify-center shadow-xs">
              <img
                src={summary.variant.imageUrl}
                alt={summary.product.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/product-fallback.svg';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                {summary.product.brand}
              </span>
              <h4 className="text-base font-extrabold text-slate-900 truncate">
                {summary.product.name}
              </h4>
              <p className="text-xs font-semibold text-slate-500">
                {summary.variant.storage} • {summary.variant.color} Finish
              </p>
            </div>
          </div>

          {/* EMI Selected Terms */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
              Financing Terms Summary
            </span>
            <div className="mt-3.5 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-medium text-slate-500">Monthly EMI</span>
                <p className="text-xl font-black text-blue-900 tracking-tight">
                  {formatINR(summary.selectedPlan.monthlyAmount)}
                </p>
                <span className="text-xs font-semibold text-slate-600">
                  x {summary.selectedPlan.tenureMonths} Months
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">Interest Rate</span>
                <p className="text-xl font-black text-slate-900 tracking-tight">
                  {summary.selectedPlan.interestRate === 0
                    ? '0% Interest'
                    : `${summary.selectedPlan.interestRate}% p.a.`}
                </p>
                <span className="text-xs font-semibold text-slate-600">Mutual Fund Backed</span>
              </div>
            </div>

            {summary.selectedPlan.cashbackAmount > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-800 border border-emerald-200/80">
                <Sparkles className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Cashback of {formatINR(summary.selectedPlan.cashbackAmount)} credited upon loan authorization!
                </span>
              </div>
            )}
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-2.5 rounded-2xl border border-slate-200/90 p-4 text-xs font-medium">
            <div className="flex justify-between text-slate-600">
              <span>Device Price</span>
              <span className="font-bold text-slate-900">
                {formatINR(summary.financialBreakdown.productPrice)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total EMI Payable ({summary.selectedPlan.tenureMonths} mos)</span>
              <span className="font-bold text-slate-900">
                {formatINR(summary.financialBreakdown.totalPayable)}
              </span>
            </div>
            {summary.selectedPlan.cashbackAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Instant Cashback Benefit</span>
                <span>- {formatINR(summary.financialBreakdown.cashbackDiscount)}</span>
              </div>
            )}
            <div className="pt-2.5 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Net Effective Cost</span>
              <span className="text-blue-600 text-base">
                {formatINR(summary.financialBreakdown.netEffectiveCost)}
              </span>
            </div>
          </div>

          {/* Demo Journey Steps (Fintech UX) */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Application Progress
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-700 font-semibold">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span>Plan Reserved Online (Completed)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-3 w-3" />
                </div>
                <span>Digital KYC & Portfolio Lien (Simulated)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-3 w-3" />
                </div>
                <span>Door-step Smartphone Delivery (Simulated)</span>
              </div>
            </div>
          </div>

          {/* Security & Disclaimer Notice */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5 text-[11px] text-slate-500 border border-slate-200">
            <Shield className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p>
              Assignment Demo Flow: This plan reservation has been verified and recorded on the backend API. No actual bank or mutual fund transaction has taken place.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-200/80 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            <span>Finish & Return</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
