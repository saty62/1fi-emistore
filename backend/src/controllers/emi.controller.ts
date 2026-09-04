import { Request, Response, NextFunction } from 'express';
import { emiService } from '../services/emi.service';

export class EmiController {
  async handleSelectEmiPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId, variantId, emiPlanId } = req.body;
      const result = await emiService.selectEmiPlan({
        productId,
        variantId,
        emiPlanId,
      });

      res.status(200).json({
        success: true,
        message: 'EMI plan selected successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const emiController = new EmiController();
