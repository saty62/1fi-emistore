import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: '1Fi EMI Store API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
