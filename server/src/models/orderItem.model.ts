import { db } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { OrderItem, OrderItemInput } from '../types/orderItem.type';

export const createOrderItem = async (
  item: OrderItemInput & { order_id: number }
): Promise<number> => {
  const sql = `
    INSERT INTO order_items (
      order_id,
      product_id,
      quantity,
      price_each
    ) VALUES (?, ?, ?, ?)
  `;
  const params = [
    item.order_id,
    item.product_id,
    item.quantity,
    item.price_each,
  ];

  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.insertId;
};

export const findOrderItemById = async (
  id: number
): Promise<OrderItem | null> => {
  const sql = 'SELECT * FROM order_items WHERE order_item_id = ?';
  const [rows] = await db.query<RowDataPacket[]>(sql, [id]);
  return rows.length > 0 ? (rows[0] as OrderItem) : null;
};

export const updateOrderItem = async (
  id: number,
  quantity: number
): Promise<boolean> => {
  const sql = `
    UPDATE order_items
    SET quantity = ? 
    WHERE order_item_id = ?
  `;
  const [result] = await db.query<ResultSetHeader>(sql, [quantity, id]);
  return result.affectedRows > 0;
};

export const deleteOrderItem = async (id: number): Promise<boolean> => {
  const sql = 'DELETE FROM order_items WHERE order_item_id = ?';
  const [result] = await db.query<ResultSetHeader>(sql, [id]);
  return result.affectedRows > 0;
};

export const updateOrderTotalPrice = async (
  order_id: number
): Promise<void> => {
  const sql = `
    UPDATE orders
    SET total_price = (
      SELECT COALESCE(SUM(price_each * quantity), 0)
      FROM order_items
      WHERE order_id = ?
    )
    WHERE order_id = ?
  `;
  await db.query(sql, [order_id, order_id]);
};
