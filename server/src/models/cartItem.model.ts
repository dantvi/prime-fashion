import { db } from '../config/db';
import { CartItem } from '../types/cartItem.type';
import { ResultSetHeader } from 'mysql2';

export const getAllCartItems = async (): Promise<CartItem[]> => {
  const [rows] = await db.query<CartItem[]>('SELECT * FROM cart_items');
  return rows;
};

export const getCartItemById = async (id: number): Promise<CartItem | null> => {
  const [rows] = await db.query<CartItem[]>(
    'SELECT * FROM cart_items WHERE cart_item_id = ?',
    [id]
  );
  return rows[0] || null;
};

export const getCartItemsByCartId = async (
  cart_id: number
): Promise<CartItem[]> => {
  const [rows] = await db.query<CartItem[]>(
    'SELECT * FROM cart_items WHERE cart_id = ?',
    [cart_id]
  );
  return rows;
};

export const createCartItem = async (
  item: Omit<CartItem, 'cart_item_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  const sql = `
    INSERT INTO cart_items (cart_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
  `;
  const params = [item.cart_id, item.product_id, item.quantity, item.price];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.insertId;
};

export const updateCartItem = async (
  id: number,
  item: Omit<CartItem, 'cart_item_id' | 'created_at' | 'updated_at'>
): Promise<boolean> => {
  const sql = `
    UPDATE cart_items SET 
      cart_id = ?, product_id = ?, quantity = ?, price = ?
    WHERE cart_item_id = ?
  `;
  const params = [item.cart_id, item.product_id, item.quantity, item.price, id];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.affectedRows > 0;
};

export const deleteCartItem = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM cart_items WHERE cart_item_id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
