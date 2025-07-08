import { OrderItem } from './orderItem.type';

export interface Order {
  order_id: number;
  customer_id: number;
  total_price: number;
  payment_id: string | null;
  payment_status:
    | 'Unpaid'
    | 'Processing'
    | 'Paid'
    | 'Failed'
    | 'Cancelled'
    | string;
  order_status:
    | 'Pending'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled'
    | string;
  created_at: string;
  updated_at: string;
}

export interface OrderInput {
  customer_id: number;
  payment_id?: string;
  payment_status?: string;
  order_status?: string;
  order_items: {
    product_id: number;
    quantity: number;
    price_each: number;
  }[];
}

export interface OrderUpdate {
  payment_status?: string;
  payment_id?: string;
  order_status?: string;
}

export interface OrderDetails {
  order_id: number;
  customer_id: number;
  total_price: number;
  payment_id: string | null;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at: string;

  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  customer_phone: string;
  customer_street_address: string;
  customer_postal_code: string;
  customer_city: string;
  customer_country: string;

  order_items: OrderItem[];
}

export interface OrderSummary {
  order_id: number;
  customer_id: number;
  total_price: number;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at: string;
}
