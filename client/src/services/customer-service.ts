import axios from 'axios';
import { API_URL } from '../services/base-service';
import { ICustomer, CustomerCreate, CustomerUpdate } from '../types/Customer';

export const fetchCustomers = async (): Promise<ICustomer[]> => {
  try {
    const response = await axios.get<ICustomer[]>(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const createCustomer = async (
  customer: CustomerCreate
): Promise<ICustomer> => {
  try {
    const response = await axios.post<ICustomer>(
      `${API_URL}/customers`,
      customer
    );
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/customers/${id}`);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const fetchCustomerById = async (id: number): Promise<ICustomer> => {
  try {
    const response = await axios.get<ICustomer>(`${API_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const updateCustomer = async (
  id: number,
  updatedCustomer: CustomerUpdate
): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/customers/${id}`, updatedCustomer);
    console.log(`Updated customer with ID: ${id}`);
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};
