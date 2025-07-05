import * as productModel from '../models/product.model';
import { Product } from '../types/product.type';

export const getAllProductsService = async (): Promise<Product[]> => {
  return await productModel.getAllProducts();
};

export const getProductByIdService = async (
  id: number
): Promise<Product | null> => {
  return await productModel.getProductById(id);
};

export const createProductService = async (
  product: Omit<Product, 'product_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  return await productModel.createProduct(product);
};

export const updateProductService = async (
  id: number,
  product: Partial<Omit<Product, 'product_id' | 'created_at' | 'updated_at'>>
): Promise<boolean> => {
  return await productModel.updateProduct(id, product);
};

export const deleteProductService = async (id: number): Promise<boolean> => {
  return await productModel.deleteProduct(id);
};
