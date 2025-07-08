export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_each: number;
}

export interface OrderItemInput {
  product_id: number;
  quantity: number;
  price_each: number;
}
