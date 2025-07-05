import { RowDataPacket } from 'mysql2';

export interface Customer extends RowDataPacket {
  customer_id: number | null;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
  created_at: string;
}
