import axios from 'axios';
import { API_URL } from '../services/base-service';
import { IProduct, ProductCreate, ProductUpdate } from '../types/Product';

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axios.get<IProduct[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (
  product: ProductCreate
): Promise<IProduct> => {
  try {
    const response = await axios.post<IProduct>(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<IProduct> => {
  try {
    const response = await axios.get<IProduct>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const updateProduct = async (
  id: number,
  updatedProduct: ProductUpdate
): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/products/${id}`, updatedProduct);
    console.log(`Updated product with ID: ${id}`);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
