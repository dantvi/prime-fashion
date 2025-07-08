import { db } from '../config/db';
import { Customer } from '../types/customer.type';
import { ResultSetHeader } from 'mysql2';

export const getAllCustomers = async (): Promise<Customer[]> => {
  const [rows] = await db.query<Customer[]>('SELECT * FROM customers');
  return rows;
};

export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const [rows] = await db.query<Customer[]>(
    'SELECT * FROM customers WHERE customer_id = ?',
    [id]
  );
  return rows[0] || null;
};

export const getCustomerByEmail = async (
  email: string
): Promise<Customer | null> => {
  const [rows] = await db.query<Customer[]>(
    'SELECT * FROM customers WHERE email = ?',
    [email]
  );
  return rows[0] || null;
};

export const createCustomer = async (
  customer: Omit<Customer, 'customer_id' | 'created_at'>
): Promise<number> => {
  const sql = `
    INSERT INTO customers (
      firstname, lastname, email, password, phone,
      street_address, postal_code, city, country
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    customer.firstname,
    customer.lastname,
    customer.email,
    customer.password,
    customer.phone,
    customer.street_address,
    customer.postal_code,
    customer.city,
    customer.country,
  ];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.insertId;
};

export const updateCustomer = async (
  id: string,
  customer: Omit<Customer, 'customer_id' | 'created_at'>
): Promise<boolean> => {
  const sql = `
    UPDATE customers SET 
      firstname = ?, lastname = ?, email = ?, password = ?, phone = ?,
      street_address = ?, postal_code = ?, city = ?, country = ?
    WHERE customer_id = ?
  `;
  const params = [
    customer.firstname,
    customer.lastname,
    customer.email,
    customer.password,
    customer.phone,
    customer.street_address,
    customer.postal_code,
    customer.city,
    customer.country,
    id,
  ];
  const [result] = await db.query<ResultSetHeader>(sql, params);
  return result.affectedRows > 0;
};

export const deleteCustomer = async (id: string): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM customers WHERE customer_id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
