import prisma from '../utils/prismaClient';
import { AppError } from '../middleware/errorHandler';
import { calculateEmi } from '../utils/emiCalculator';

export interface SelectEmiPlanParams {
  productId: string;
  variantId: string;
  emiPlanId: string;
}

export class EmiService {
  /**
   * Validates selection of a product, variant, and EMI plan,
   * calculates complete financing terms, and returns a verified confirmation summary.
   */
  async selectEmiPlan({ productId, variantId, emiPlanId }: SelectEmiPlanParams) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError(`Product with ID '${productId}' not found`, 404);
    }

    const variant = await prisma.variant.findUnique({
      where: { id: variantId },
    });

    if (!variant || variant.productId !== productId) {
      throw new AppError(`Variant '${variantId}' does not belong to product '${productId}'`, 400);
    }

    const emiPlan = await prisma.emiPlan.findUnique({
      where: { id: emiPlanId },
    });

    if (!emiPlan || emiPlan.productId !== productId) {
      throw new AppError(`EMI Plan '${emiPlanId}' does not belong to product '${productId}'`, 400);
    }

    const effectivePrice = variant.price ?? product.basePrice;
    const effectiveMrp = variant.mrp ?? product.mrp;
    const priceRatio = product.basePrice > 0 ? effectivePrice / product.basePrice : 1;

    const variantMonthlyAmount = Math.round(emiPlan.monthlyAmount * priceRatio);
    const totalPayable = variantMonthlyAmount * emiPlan.tenureMonths;
    const totalInterest = Math.max(0, totalPayable - effectivePrice);
    const netEffectiveCost = totalPayable - emiPlan.cashbackAmount;

    return {
      confirmationId: `CONF-${Date.now().toString(36).toUpperCase()}`,
      selectedAt: new Date().toISOString(),
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
      },
      variant: {
        id: variant.id,
        color: variant.color,
        storage: variant.storage,
        imageUrl: variant.imageUrl,
        price: effectivePrice,
        mrp: effectiveMrp,
      },
      selectedPlan: {
        id: emiPlan.id,
        tenureMonths: emiPlan.tenureMonths,
        monthlyAmount: variantMonthlyAmount,
        interestRate: emiPlan.interestRate,
        cashbackAmount: emiPlan.cashbackAmount,
        processingFee: emiPlan.processingFee,
      },
      financialBreakdown: {
        productPrice: effectivePrice,
        totalPayable,
        totalInterestSavedOrPaid: totalInterest,
        cashbackDiscount: emiPlan.cashbackAmount,
        netEffectiveCost,
        financingType: 'Mutual Fund Backed Flexible Credit',
      },
    };
  }
}

export const emiService = new EmiService();
