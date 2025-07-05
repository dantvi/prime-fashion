import { RowDataPacket } from 'mysql2';

export interface Product extends RowDataPacket {
  product_id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  image_url: string | null;
  active: number;
  created_at: string;
  updated_at: string;
}
