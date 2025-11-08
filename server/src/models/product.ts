export interface Product {
  PK: string; // e.g. "PRODUCT#prod001"
  SK: string; // e.g. "DETAILS"
  type: "PRODUCT";
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}
