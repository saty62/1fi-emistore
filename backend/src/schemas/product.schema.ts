import { z } from 'zod';

export const ProductSlugParamSchema = z.object({
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens'),
});

export const ProductIdParamSchema = z.object({
  id: z.string().uuid('Invalid product ID format. Must be a valid UUID.'),
});

export const ProductIdPathParamSchema = z.object({
  productId: z.string().uuid('Invalid product ID format. Must be a valid UUID.'),
});
