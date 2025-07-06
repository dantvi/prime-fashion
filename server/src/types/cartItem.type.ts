import { RowDataPacket } from 'mysql2';

export interface CartItem extends RowDataPacket {
  cart_item_id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price_each: number;
  created_at: string;
  updated_at: string;
}
