import { describe, it, expect } from 'vitest';
import { formatINR, formatNumberIN, calculateDiscount } from './currencyFormatter';

describe('Frontend Currency & Formatting Utilities', () => {
  it('correctly calculates percentage discount', () => {
    // MRP: 1,34,900, BasePrice: 1,27,400 -> Discount is round(((134900 - 127400) / 134900) * 100) = 6%
    const discount = calculateDiscount(134900, 127400);
    expect(discount).toBe(6);
  });

  it('returns 0 discount if price is equal to or greater than MRP', () => {
    expect(calculateDiscount(100000, 100000)).toBe(0);
    expect(calculateDiscount(100000, 120000)).toBe(0);
    expect(calculateDiscount(0, 100000)).toBe(0);
  });

  it('formats number into Indian numbering system format', () => {
    const formatted = formatNumberIN(127400);
    // Should format with comma e.g. "1,27,400"
    expect(formatted).toContain('1,27,400');
  });

  it('formats currency with INR symbol', () => {
    const formatted = formatINR(127400);
    expect(formatted).toContain('1,27,400');
  });
});
