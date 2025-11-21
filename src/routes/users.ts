import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CustomError } from '../middleware/errorHandler';

export const usersRouter = Router();

// In-memory store (replace with database in production)
const users: Array<{ id: string; name: string; email: string; createdAt: string }> = [];

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

// GET /api/v1/users - Get all users
usersRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: users,
    count: users.length,
  });
});

// GET /api/v1/users/:id - Get user by ID
usersRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  res.json({
    success: true,
    data: user,
  });
});

// POST /api/v1/users - Create new user
usersRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    // Check if email already exists
    if (users.some((u) => u.email === validatedData.email)) {
      return next(new CustomError('Email already exists', 409));
    }

    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new CustomError(error.errors[0].message, 400));
    }
    next(error as Error);
  }
});

// PUT /api/v1/users/:id - Update user
usersRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIndex = users.findIndex((u) => u.id === req.params.id);

    if (userIndex === -1) {
      return next(new CustomError('User not found', 404));
    }

    const validatedData = updateUserSchema.parse(req.body);

    // Check if email already exists (if being updated)
    if (validatedData.email && users.some((u) => u.email === validatedData.email && u.id !== req.params.id)) {
      return next(new CustomError('Email already exists', 409));
    }

    users[userIndex] = {
      ...users[userIndex],
      ...validatedData,
    };

    res.json({
      success: true,
      data: users[userIndex],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new CustomError(error.errors[0].message, 400));
    }
    next(error as Error);
  }
});

// DELETE /api/v1/users/:id - Delete user
usersRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);

  if (userIndex === -1) {
    return next(new CustomError('User not found', 404));
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});

