export interface IOrder {
  id: number;
  customer_id: number;
  order_status: string;
  total_price: number;
  created_at: string;
}

export type OrderUpdate = Partial<
  Omit<IOrder, 'id' | 'customer_id' | 'created_at'>
> & {
  order_status?: string;
};

export interface IOrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface IOrderDetails extends IOrder {
  customer_firstname?: string;
  customer_lastname?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_street_address?: string;
  customer_postal_code?: string;
  customer_city?: string;
  customer_country?: string;
  order_items: IOrderItem[];
}
