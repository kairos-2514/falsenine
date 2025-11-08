export interface OrderItem {
  product_id: string; 
  quantity: number; 
  size: string;
  price: string; 
}

export interface Order {
  order_id: string; 
  customer_id: string; 
  items: OrderItem[];
  order_date: string; 
  status: string; 
  total_Amt: string; 
}
