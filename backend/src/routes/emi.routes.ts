import { Router } from 'express';
import { emiController } from '../controllers/emi.controller';
import { validateRequest } from '../middleware/validateRequest';
import { SelectEmiPlanSchema } from '../schemas/emi.schema';

const router = Router();

// POST select EMI plan
router.post(
  '/select',
  validateRequest({ body: SelectEmiPlanSchema }),
  (req, res, next) => emiController.handleSelectEmiPlan(req, res, next)
);

export default router;
