import request from 'supertest';
import express, { Application } from 'express';
import { itemsRouter } from '../routes/items';
import { errorHandler } from '../middleware/errorHandler';

const createTestApp = (): Application => {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/items', itemsRouter);
  app.use(errorHandler);
  return app;
};

describe('Items API', () => {
  const app = createTestApp();

  describe('POST /api/v1/items', () => {
    it('should create a new item', async () => {
      const itemData = {
        name: 'Test Item',
        description: 'Test Description',
        price: 29.99,
      };

      const response = await request(app)
        .post('/api/v1/items')
        .send(itemData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(itemData.name);
      expect(response.body.data.price).toBe(itemData.price);
    });

    it('should return 400 for invalid price', async () => {
      const itemData = {
        name: 'Test Item',
        price: -10,
      };

      const response = await request(app)
        .post('/api/v1/items')
        .send(itemData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for missing name', async () => {
      const itemData = {
        price: 29.99,
      };

      const response = await request(app)
        .post('/api/v1/items')
        .send(itemData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/items', () => {
    it('should get all items with pagination', async () => {
      const response = await request(app).get('/api/v1/items?page=1&limit=10');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('page');
      expect(response.body.pagination).toHaveProperty('limit');
      expect(response.body.pagination).toHaveProperty('total');
    });
  });

  describe('GET /api/v1/items/:id', () => {
    it('should return 404 for non-existent item', async () => {
      const response = await request(app).get('/api/v1/items/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});

