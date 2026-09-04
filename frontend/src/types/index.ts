export interface Variant {
  id: string;
  productId: string;
  color: string;
  colorCode: string;
  storage: string;
  mrp?: number | null;
  price?: number | null;
  imageUrl: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmiPlan {
  id: string;
  productId: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  processingFee: number;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  mrp: number;
  basePrice: number;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
  emiPlans: EmiPlan[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export interface SelectEmiPlanPayload {
  productId: string;
  variantId: string;
  emiPlanId: string;
}

export interface SelectedEmiSummary {
  confirmationId: string;
  selectedAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string;
  };
  variant: {
    id: string;
    color: string;
    storage: string;
    imageUrl: string;
    price: number;
    mrp: number;
  };
  selectedPlan: {
    id: string;
    tenureMonths: number;
    monthlyAmount: number;
    interestRate: number;
    cashbackAmount: number;
    processingFee: number;
  };
  financialBreakdown: {
    productPrice: number;
    totalPayable: number;
    totalInterestSavedOrPaid: number;
    cashbackDiscount: number;
    netEffectiveCost: number;
    financingType: string;
  };
}
