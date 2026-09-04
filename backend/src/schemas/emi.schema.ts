import { z } from 'zod';

export const SelectEmiPlanSchema = z.object({
  productId: z.string().uuid('Product ID must be a valid UUID'),
  variantId: z.string().uuid('Variant ID must be a valid UUID'),
  emiPlanId: z.string().uuid('EMI Plan ID must be a valid UUID'),
});

export type SelectEmiPlanInput = z.infer<typeof SelectEmiPlanSchema>;
