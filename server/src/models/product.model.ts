import { db } from '../config/db';
import { Product } from '../types/product.type';
import { ResultSetHeader } from 'mysql2';

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await db.query<Product[]>('SELECT * FROM products');
  return rows;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const [rows] = await db.query<Product[]>(
    'SELECT * FROM products WHERE product_id = ?',
    [id]
  );
  return rows[0] || null;
};

export const createProduct = async (
  product: Omit<Product, 'product_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  const sql = `
    INSERT INTO products (name, description, price, stock, category, image_url, active)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.category,
    product.image_url,
    product.active,
  ];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.insertId;
};

export const updateProduct = async (
  id: number,
  product: Partial<Omit<Product, 'product_id' | 'created_at' | 'updated_at'>>
): Promise<boolean> => {
  const sql = `
    UPDATE products
    SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ?, active = ?
    WHERE product_id = ?
  `;
  const params = [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.category,
    product.image_url,
    product.active,
    id,
  ];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.affectedRows > 0;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM products WHERE product_id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
