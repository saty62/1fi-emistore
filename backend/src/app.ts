import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoutes from './routes/health.routes';
import productRoutes from './routes/product.routes';
import emiRoutes from './routes/emi.routes';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): Express {
  const app = express();

  // Security Headers
  app.use(helmet());

  // CORS Configuration
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ];

  if (process.env.FRONTEND_URL) {
    const normalizedUrl = process.env.FRONTEND_URL.trim().replace(/\/+$/, '');
    allowedOrigins.push(normalizedUrl);
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
          return callback(null, true);
        }

        try {
          const parsed = new URL(origin);
          if (parsed.hostname.endsWith('.vercel.app') || parsed.hostname === 'vercel.app') {
            return callback(null, true);
          }
        } catch {
          // Invalid URL format
        }

        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Request Parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use('/api', healthRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/emi-plans', emiRoutes);

  // 404 Route Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        message: `Route '${req.method} ${req.originalUrl}' not found`,
      },
    });
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export default createApp;
