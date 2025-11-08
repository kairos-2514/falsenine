// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface Product {
  id: string;
  pName: string;
  pPrice: number;
  pDescription: string;
  pSizes: string[];
  pCategory: string;
  pFit: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

