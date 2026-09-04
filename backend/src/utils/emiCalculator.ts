/**
 * Financial calculation utilities for EMI and Mutual Fund backed financing
 */

export interface EmiCalculationResult {
  principal: number;
  tenureMonths: number;
  annualInterestRate: number;
  monthlyEmi: number;
  totalRepayment: number;
  totalInterest: number;
  cashback: number;
  netEffectiveCost: number;
}

/**
 * Calculates monthly EMI based on standard amortization formula.
 *
 * For 0% interest:
 *   EMI = Principal / Months
 *
 * For r > 0:
 *   EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 *   where r = annual rate / (12 * 100), n = months
 */
export function calculateEmi(
  principal: number,
  tenureMonths: number,
  annualInterestRate: number,
  cashback = 0
): EmiCalculationResult {
  if (tenureMonths <= 0) {
    throw new Error('Tenure months must be greater than 0');
  }

  let monthlyEmi = 0;

  if (annualInterestRate === 0) {
    monthlyEmi = Math.round(principal / tenureMonths);
  } else {
    const monthlyRate = annualInterestRate / (12 * 100);
    const compoundFactor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmi = Math.round((principal * monthlyRate * compoundFactor) / (compoundFactor - 1));
  }

  const totalRepayment = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalRepayment - principal);
  const netEffectiveCost = totalRepayment - cashback;

  return {
    principal,
    tenureMonths,
    annualInterestRate,
    monthlyEmi,
    totalRepayment,
    totalInterest,
    cashback,
    netEffectiveCost,
  };
}
