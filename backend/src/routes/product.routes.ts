import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { validateRequest } from '../middleware/validateRequest';
import {
  ProductSlugParamSchema,
  ProductIdParamSchema,
  ProductIdPathParamSchema,
} from '../schemas/product.schema';

const router = Router();

// GET all products
router.get('/', (req, res, next) => productController.getProducts(req, res, next));

// GET product by slug (placed before /:id to prevent route conflicts)
router.get(
  '/slug/:slug',
  validateRequest({ params: ProductSlugParamSchema }),
  (req, res, next) => productController.getProductBySlug(req, res, next)
);

// GET product by UUID
router.get(
  '/:id',
  validateRequest({ params: ProductIdParamSchema }),
  (req, res, next) => productController.getProductById(req, res, next)
);

// GET all variants for a product
router.get(
  '/:productId/variants',
  validateRequest({ params: ProductIdPathParamSchema }),
  (req, res, next) => productController.getProductVariants(req, res, next)
);

// GET all EMI plans for a product
router.get(
  '/:productId/emi-plans',
  validateRequest({ params: ProductIdPathParamSchema }),
  (req, res, next) => productController.getProductEmiPlans(req, res, next)
);

export default router;
