import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { EmiPlan } from '../types';
import { EmiPlanCard } from './EmiPlanCard';

interface EmiPlanListProps {
  plans: EmiPlan[];
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
}

export const EmiPlanList: React.FC<EmiPlanListProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
}) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
        <Info className="mx-auto h-8 w-8 text-slate-400 mb-2" />
        <p className="text-sm font-semibold text-slate-700">
          No EMI plans are currently available for this product.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Please check back later or choose another configuration.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Heading matching reference image: "EMI plans backed by mutual funds" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>EMI plans backed by mutual funds</span>
            <ShieldCheck className="h-4 w-4 text-blue-600 hidden sm:inline-block" />
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Flexible monthly tenures with 0% interest & instant cashback.
          </p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 w-fit">
          {plans.length} flexible plans
        </span>
      </div>

      {/* List of EMI Plan Cards */}
      <div
        className="space-y-3"
        role="radiogroup"
        aria-label="Available EMI plans backed by mutual funds"
      >
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </div>
  );
};
