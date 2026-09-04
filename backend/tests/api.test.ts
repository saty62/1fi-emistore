import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

// Mock the prisma client for unit/integration tests
vi.mock('../src/utils/prismaClient', () => {
  const mockProduct = {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'iphone-17-pro',
    name: 'Apple iPhone 17 Pro',
    brand: 'Apple',
    description: 'Next-gen flagship',
    category: 'smartphones',
    mrp: 134900,
    basePrice: 127400,
    isNew: true,
    variants: [
      {
        id: '22222222-2222-2222-2222-222222222222',
        productId: '11111111-1111-1111-1111-111111111111',
        color: 'Silver',
        colorCode: '#E3E4E5',
        storage: '256GB',
        mrp: 134900,
        price: 127400,
        imageUrl: '/images/iphone-17-pro-silver.svg',
        available: true,
      },
    ],
    emiPlans: [
      {
        id: '33333333-3333-3333-3333-333333333333',
        productId: '11111111-1111-1111-1111-111111111111',
        tenureMonths: 6,
        monthlyAmount: 22483,
        interestRate: 0.0,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: true,
      },
    ],
  };

  return {
    default: {
      product: {
        findMany: vi.fn().mockResolvedValue([mockProduct]),
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.slug === 'iphone-17-pro' || where.id === '11111111-1111-1111-1111-111111111111') {
            return Promise.resolve(mockProduct);
          }
          return Promise.resolve(null);
        }),
      },
      variant: {
        findMany: vi.fn().mockResolvedValue(mockProduct.variants),
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.id === '22222222-2222-2222-2222-222222222222') {
            return Promise.resolve(mockProduct.variants[0]);
          }
          return Promise.resolve(null);
        }),
      },
      emiPlan: {
        findMany: vi.fn().mockResolvedValue(mockProduct.emiPlans),
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.id === '33333333-3333-3333-3333-333333333333') {
            return Promise.resolve(mockProduct.emiPlans[0]);
          }
          return Promise.resolve(null);
        }),
      },
    },
  };
});

describe('1Fi EMI Store Backend API Endpoints', () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('returns status 200 with health metadata', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/products', () => {
    it('returns 200 with list of products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].slug).toBe('iphone-17-pro');
    });
  });

  describe('GET /api/products/slug/:slug', () => {
    it('returns 200 with product details for valid slug', async () => {
      const res = await request(app).get('/api/products/slug/iphone-17-pro');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Apple iPhone 17 Pro');
      expect(res.body.data.variants).toHaveLength(1);
      expect(res.body.data.emiPlans).toHaveLength(1);
    });

    it('returns 404 for non-existent slug', async () => {
      const res = await request(app).get('/api/products/slug/non-existent-phone');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('not found');
    });
  });

  describe('GET /api/products/:id', () => {
    it('returns 400 for invalid UUID parameter format', async () => {
      const res = await request(app).get('/api/products/invalid-uuid-123');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toBe('Validation failed');
    });

    it('returns 200 for valid UUID', async () => {
      const res = await request(app).get('/api/products/11111111-1111-1111-1111-111111111111');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('iphone-17-pro');
    });
  });

  describe('POST /api/emi-plans/select', () => {
    it('returns 400 if required fields are missing or invalid UUIDs', async () => {
      const res = await request(app)
        .post('/api/emi-plans/select')
        .send({ productId: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toBe('Validation failed');
    });

    it('returns 200 with confirmation summary for valid IDs', async () => {
      const res = await request(app)
        .post('/api/emi-plans/select')
        .send({
          productId: '11111111-1111-1111-1111-111111111111',
          variantId: '22222222-2222-2222-2222-222222222222',
          emiPlanId: '33333333-3333-3333-3333-333333333333',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('EMI plan selected successfully');
      expect(res.body.data).toHaveProperty('confirmationId');
      expect(res.body.data).toHaveProperty('financialBreakdown');
      expect(res.body.data.financialBreakdown.productPrice).toBe(127400);
      expect(res.body.data.financialBreakdown.cashbackDiscount).toBe(7500);
    });
  });

  describe('404 for unknown endpoints', () => {
    it('returns 404 for non-existent route', async () => {
      const res = await request(app).get('/api/unknown-route');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('not found');
    });
  });
});
