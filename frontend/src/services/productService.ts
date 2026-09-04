import { request } from './api';
import {
  Product,
  Variant,
  EmiPlan,
  ApiResponse,
  SelectEmiPlanPayload,
  SelectedEmiSummary,
} from '../types';

export const productService = {
  /**
   * Fetch all products
   */
  async getProducts(): Promise<Product[]> {
    const res = await request<ApiResponse<Product[]>>('/products');
    return res.data;
  },

  /**
   * Fetch product details by slug (includes variants and EMI plans)
   */
  async getProductBySlug(slug: string): Promise<Product> {
    const res = await request<ApiResponse<Product>>(`/products/slug/${slug}`);
    return res.data;
  },

  /**
   * Fetch product details by UUID
   */
  async getProductById(id: string): Promise<Product> {
    const res = await request<ApiResponse<Product>>(`/products/${id}`);
    return res.data;
  },

  /**
   * Fetch all variants for a specific product
   */
  async getProductVariants(productId: string): Promise<Variant[]> {
    const res = await request<ApiResponse<Variant[]>>(`/products/${productId}/variants`);
    return res.data;
  },

  /**
   * Fetch all EMI plans for a specific product
   */
  async getProductEmiPlans(productId: string): Promise<EmiPlan[]> {
    const res = await request<ApiResponse<EmiPlan[]>>(`/products/${productId}/emi-plans`);
    return res.data;
  },

  /**
   * Post selected EMI plan and get confirmation summary
   */
  async selectEmiPlan(payload: SelectEmiPlanPayload): Promise<SelectedEmiSummary> {
    const res = await request<ApiResponse<SelectedEmiSummary>>('/emi-plans/select', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },
};
