import { db } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Order, OrderUpdate } from '../types/order.type';

export const createOrder = async (
  order: Omit<Order, 'order_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  const sql = `
    INSERT INTO orders (
      customer_id,
      total_price,
      payment_id,
      payment_status,
      order_status
    ) VALUES (?, ?, ?, ?, ?)
  `;
  const params = [
    order.customer_id,
    order.total_price,
    order.payment_id ?? null,
    order.payment_status ?? 'Unpaid',
    order.order_status ?? 'Pending',
  ];

  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.insertId;
};

export const findAllOrders = async (): Promise<RowDataPacket[]> => {
  const sql = `
    SELECT 
      order_id,
      customer_id,
      total_price,
      payment_status,
      order_status,
      created_at,
      updated_at
    FROM orders
    ORDER BY created_at DESC
  `;
  const [rows] = await db.query<RowDataPacket[]>(sql);
  return rows;
};

export const findOrderById = async (
  order_id: number
): Promise<RowDataPacket[]> => {
  const sql = `
    SELECT 
      o.*, 
      c.firstname AS customer_firstname,
      c.lastname AS customer_lastname,
      c.email AS customer_email,
      c.phone AS customer_phone,
      c.street_address AS customer_street_address,
      c.postal_code AS customer_postal_code,
      c.city AS customer_city,
      c.country AS customer_country,
      oi.order_item_id,
      oi.product_id,
      oi.quantity,
      oi.price_each
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_id = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(sql, [order_id]);
  return rows;
};

export const findOrderByPaymentId = async (
  payment_id: string
): Promise<RowDataPacket[]> => {
  const sql = `
    SELECT 
      o.*, 
      c.firstname AS customer_firstname,
      c.lastname AS customer_lastname,
      c.email AS customer_email,
      c.phone AS customer_phone,
      c.street_address AS customer_street_address,
      c.postal_code AS customer_postal_code,
      c.city AS customer_city,
      c.country AS customer_country,
      oi.order_item_id,
      oi.product_id,
      oi.quantity,
      oi.price_each
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.payment_id = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(sql, [payment_id]);
  return rows;
};

export const updateOrder = async (
  order_id: number,
  updates: OrderUpdate
): Promise<boolean> => {
  const fields: string[] = [];
  const params: any[] = [];

  if (updates.payment_status) {
    fields.push('payment_status = ?');
    params.push(updates.payment_status);
  }
  if (updates.payment_id) {
    fields.push('payment_id = ?');
    params.push(updates.payment_id);
  }
  if (updates.order_status) {
    fields.push('order_status = ?');
    params.push(updates.order_status);
  }

  if (fields.length === 0) return false;

  const sql = `
    UPDATE orders
    SET ${fields.join(', ')}
    WHERE order_id = ?
  `;
  params.push(order_id);
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.affectedRows > 0;
};

export const deleteOrder = async (order_id: number): Promise<boolean> => {
  const sql = 'DELETE FROM orders WHERE order_id = ?';
  const [result] = await db.query<ResultSetHeader>(sql, [order_id]);
  return result.affectedRows > 0;
};
