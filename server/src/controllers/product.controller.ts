import { Request, Response } from 'express';
import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from '../services/product.service';
import { logError } from '../utilities/logger';
import { Product } from '../types/product.type';

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await getProductByIdService(id);
    product
      ? res.json(product)
      : res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category, image_url }: Product =
    req.body;
  try {
    const productId = await createProductService({
      name,
      description,
      price,
      stock,
      category,
      image_url,
    });
    res.status(201).json({ message: 'Product created', id: productId });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {
    name,
    description,
    price,
    stock,
    category,
    image_url,
  }: Partial<Product> = req.body;

  try {
    const updated = await updateProductService(id, {
      name,
      description,
      price,
      stock,
      category,
      image_url,
    });
    updated
      ? res.json({ message: 'Product updated' })
      : res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await deleteProductService(id);
    deleted
      ? res.json({ message: 'Product deleted' })
      : res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};
