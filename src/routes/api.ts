import { Router } from 'express';
import { usersRouter } from './users';
import { itemsRouter } from './items';

export const apiRouter = Router();

// API routes
apiRouter.use('/users', usersRouter);
apiRouter.use('/items', itemsRouter);

// API info endpoint
apiRouter.get('/', (_req, res) => {
  res.json({
    message: 'TypeScript Microservice Demo API',
    version: '1.0.0',
    endpoints: {
      users: '/api/v1/users',
      items: '/api/v1/items',
      health: '/health',
    },
  });
});

