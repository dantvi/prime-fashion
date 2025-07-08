import { db } from '../config/db';
import { Cart } from '../types/cart.type';
import { ResultSetHeader } from 'mysql2';

export const getAllCarts = async (): Promise<Cart[]> => {
  const [rows] = await db.query<Cart[]>('SELECT * FROM carts');
  return rows;
};

export const getCartById = async (id: number): Promise<Cart | null> => {
  const [rows] = await db.query<Cart[]>(
    'SELECT * FROM carts WHERE cart_id = ?',
    [id]
  );
  return rows[0] || null;
};

export const createCart = async (
  cart: Omit<Cart, 'cart_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  const sql = `
    INSERT INTO carts (customer_id, session_id, active)
    VALUES (?, ?, ?)
  `;
  const params = [cart.customer_id, cart.session_id, cart.active ?? true];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.insertId;
};

export const updateCart = async (
  id: number,
  cart: Omit<Cart, 'cart_id' | 'created_at' | 'updated_at'>
): Promise<boolean> => {
  const sql = `
    UPDATE carts SET 
      customer_id = ?, session_id = ?, active = ?
    WHERE cart_id = ?
  `;
  const params = [cart.customer_id, cart.session_id, cart.active, id];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.affectedRows > 0;
};

export const deleteCart = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM carts WHERE cart_id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
