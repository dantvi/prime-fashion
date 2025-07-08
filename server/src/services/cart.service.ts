import * as cartModel from '../models/cart.model';
import { Cart } from '../types/cart.type';

export const findAllCarts = async (): Promise<Cart[]> => {
  return await cartModel.getAllCarts();
};

export const findCartById = async (cart_id: number): Promise<Cart | null> => {
  return await cartModel.getCartById(cart_id);
};

export const addCart = async (
  cart: Omit<Cart, 'cart_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  return await cartModel.createCart(cart);
};

export const editCart = async (
  cart_id: number,
  cart: Omit<Cart, 'cart_id' | 'created_at' | 'updated_at'>
): Promise<boolean> => {
  return await cartModel.updateCart(cart_id, cart);
};

export const removeCart = async (cart_id: number): Promise<boolean> => {
  return await cartModel.deleteCart(cart_id);
};
