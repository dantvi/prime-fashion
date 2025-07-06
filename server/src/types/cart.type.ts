import { RowDataPacket } from 'mysql2';

export interface Cart extends RowDataPacket {
  cart_id: number;
  customer_id: number | null;
  session_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}
