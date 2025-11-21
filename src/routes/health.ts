import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  });
});

healthRouter.get('/ready', (_req: Request, res: Response) => {
  // Add readiness checks here (database, external services, etc.)
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get('/live', (_req: Request, res: Response) => {
  // Liveness check
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
  });
});

