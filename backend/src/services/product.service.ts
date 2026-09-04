import prisma from '../utils/prismaClient';
import { AppError } from '../middleware/errorHandler';

export class ProductService {
  /**
   * Retrieves all products with variants preview and count of EMI plans
   */
  async getAllProducts() {
    return prisma.product.findMany({
      include: {
        variants: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  /**
   * Retrieves a product by its unique slug including all variants and EMI plans
   */
  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          orderBy: [
            { storage: 'asc' },
            { color: 'asc' },
          ],
        },
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
    });

    if (!product) {
      throw new AppError(`Product with slug '${slug}' not found`, 404);
    }

    return product;
  }

  /**
   * Retrieves a product by its UUID
   */
  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          orderBy: [
            { storage: 'asc' },
            { color: 'asc' },
          ],
        },
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
    });

    if (!product) {
      throw new AppError(`Product with ID '${id}' not found`, 404);
    }

    return product;
  }

  /**
   * Retrieves variants for a specific product ID
   */
  async getProductVariants(productId: string) {
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!productExists) {
      throw new AppError(`Product with ID '${productId}' not found`, 404);
    }

    return prisma.variant.findMany({
      where: { productId },
      orderBy: [
        { storage: 'asc' },
        { color: 'asc' },
      ],
    });
  }

  /**
   * Retrieves EMI plans for a specific product ID
   */
  async getProductEmiPlans(productId: string) {
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!productExists) {
      throw new AppError(`Product with ID '${productId}' not found`, 404);
    }

    return prisma.emiPlan.findMany({
      where: { productId },
      orderBy: {
        tenureMonths: 'asc',
      },
    });
  }
}

export const productService = new ProductService();
