import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { EmiPlan } from '../types';
import { formatINR } from '../utils/currencyFormatter';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export const EmiPlanCard: React.FC<EmiPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  const isZeroInterest = plan.interestRate === 0;

  return (
    <div
      onClick={() => onSelect(plan)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(plan);
        }
      }}
      tabIndex={0}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${formatINR(plan.monthlyAmount)} per month for ${plan.tenureMonths} months at ${
        isZeroInterest ? '0% interest' : `${plan.interestRate}% interest`
      }`}
      className={`group relative cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-2 border-blue-600 bg-blue-50/20 shadow-md ring-2 ring-blue-600/10'
          : 'border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Most Popular Badge */}
      {plan.isPopular && (
        <span className="absolute -top-2.5 right-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
          Recommended
        </span>
      )}

      <div className="flex items-center justify-between gap-3">
        {/* Left: Radio & Monthly installment + tenure */}
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Custom Radio Checkbox */}
          <div
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-150 ${
              isSelected
                ? 'border-blue-600 bg-blue-600 text-white shadow-sm scale-105'
                : 'border-slate-300 bg-white group-hover:border-slate-400'
            }`}
          >
            {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
          </div>

          <div className="flex flex-col min-w-0">
            {/* Amount and tenure matching reference screenshot */}
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {formatINR(plan.monthlyAmount)}
              </span>
              <span className="text-sm font-semibold text-slate-600">
                x {plan.tenureMonths} months
              </span>
            </div>

            {/* Additional cashback text matching reference screenshot */}
            {plan.cashbackAmount > 0 && (
              <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                <span>Additional cashback of {formatINR(plan.cashbackAmount)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interest Rate Badge matching reference design */}
        <div className="flex flex-col items-end flex-shrink-0">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold tracking-tight whitespace-nowrap ${
              isZeroInterest
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {isZeroInterest ? '0% interest' : `${plan.interestRate}% interest`}
          </span>
        </div>
      </div>
    </div>
  );
};
