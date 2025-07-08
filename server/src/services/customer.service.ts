import * as customerModel from '../models/customer.model';
import { Customer } from '../types/customer.type';

export const findAllCustomers = async (): Promise<Customer[]> => {
  return await customerModel.getAllCustomers();
};

export const findCustomerById = async (
  customer_id: string
): Promise<Customer | null> => {
  return await customerModel.getCustomerById(customer_id);
};

export const findCustomerByEmail = async (
  email: string
): Promise<Customer | null> => {
  return await customerModel.getCustomerByEmail(email);
};

export const addCustomer = async (
  customer: Omit<Customer, 'customer_id' | 'created_at'>
): Promise<number> => {
  return await customerModel.createCustomer(customer);
};

export const editCustomer = async (
  customer_id: string,
  customer: Omit<Customer, 'customer_id' | 'created_at'>
): Promise<boolean> => {
  return await customerModel.updateCustomer(customer_id, customer);
};

export const removeCustomer = async (customer_id: string): Promise<boolean> => {
  return await customerModel.deleteCustomer(customer_id);
};
