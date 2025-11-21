import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CustomError } from '../middleware/errorHandler';

export const itemsRouter = Router();

// In-memory store (replace with database in production)
const items: Array<{ id: string; name: string; description?: string; price: number; createdAt: string }> = [];

// Validation schemas
const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
});

const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
});

// GET /api/v1/items - Get all items
itemsRouter.get('/', (req: Request, res: Response) => {
  const { page = '1', limit = '10' } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  const paginatedItems = items.slice(start, end);

  res.json({
    success: true,
    data: paginatedItems,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: items.length,
      totalPages: Math.ceil(items.length / limitNum),
    },
  });
});

// GET /api/v1/items/:id - Get item by ID
itemsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const item = items.find((i) => i.id === req.params.id);

  if (!item) {
    return next(new CustomError('Item not found', 404));
  }

  res.json({
    success: true,
    data: item,
  });
});

// POST /api/v1/items - Create new item
itemsRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createItemSchema.parse(req.body);

    const newItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    items.push(newItem);

    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new CustomError(error.errors[0].message, 400));
    }
    next(error as Error);
  }
});

// PUT /api/v1/items/:id - Update item
itemsRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemIndex = items.findIndex((i) => i.id === req.params.id);

    if (itemIndex === -1) {
      return next(new CustomError('Item not found', 404));
    }

    const validatedData = updateItemSchema.parse(req.body);

    items[itemIndex] = {
      ...items[itemIndex],
      ...validatedData,
    };

    res.json({
      success: true,
      data: items[itemIndex],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new CustomError(error.errors[0].message, 400));
    }
    next(error as Error);
  }
});

// DELETE /api/v1/items/:id - Delete item
itemsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const itemIndex = items.findIndex((i) => i.id === req.params.id);

  if (itemIndex === -1) {
    return next(new CustomError('Item not found', 404));
  }

  items.splice(itemIndex, 1);

  res.json({
    success: true,
    message: 'Item deleted successfully',
  });
});

