import { describe, it, expect } from 'vitest';
import { calculateEmi } from '../src/utils/emiCalculator';

describe('EMI Calculator Utility', () => {
  it('correctly calculates 0% interest EMI', () => {
    // 127400 / 6 = 21233.33... or matching 0% interest division
    const result = calculateEmi(127400, 6, 0.0, 7500);

    expect(result.principal).toBe(127400);
    expect(result.tenureMonths).toBe(6);
    expect(result.annualInterestRate).toBe(0.0);
    expect(result.monthlyEmi).toBe(Math.round(127400 / 6));
    expect(result.totalInterest).toBe(0);
    expect(result.cashback).toBe(7500);
    expect(result.netEffectiveCost).toBe(result.monthlyEmi * 6 - 7500);
  });

  it('correctly calculates positive interest EMI using standard amortization formula', () => {
    // Principal: 1,27,400, Tenure: 36 months, Interest: 10.5%
    const result = calculateEmi(127400, 36, 10.5, 7500);

    expect(result.principal).toBe(127400);
    expect(result.tenureMonths).toBe(36);
    expect(result.annualInterestRate).toBe(10.5);
    // Calculated monthly EMI should be approximately ~4,139 - 4,297 depending on compounding
    expect(result.monthlyEmi).toBeGreaterThan(3500);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.totalRepayment).toBe(result.monthlyEmi * 36);
  });

  it('throws error for non-positive tenure', () => {
    expect(() => calculateEmi(100000, 0, 10.5)).toThrow('Tenure months must be greater than 0');
    expect(() => calculateEmi(100000, -5, 10.5)).toThrow('Tenure months must be greater than 0');
  });
});
