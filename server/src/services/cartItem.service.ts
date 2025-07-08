import * as cartItemModel from '../models/cartItem.model';
import { CartItem } from '../types/cartItem.type';

export const findAllCartItems = async (): Promise<CartItem[]> => {
  return await cartItemModel.getAllCartItems();
};

export const findCartItemById = async (
  cart_item_id: number
): Promise<CartItem | null> => {
  return await cartItemModel.getCartItemById(cart_item_id);
};

export const findCartItemsByCartId = async (
  cart_id: number
): Promise<CartItem[]> => {
  return await cartItemModel.getCartItemsByCartId(cart_id);
};

export const addCartItem = async (
  cartItem: Omit<CartItem, 'cart_item_id' | 'created_at' | 'updated_at'>
): Promise<number> => {
  return await cartItemModel.createCartItem(cartItem);
};

export const editCartItem = async (
  cart_item_id: number,
  cartItem: Omit<CartItem, 'cart_item_id' | 'created_at' | 'updated_at'>
): Promise<boolean> => {
  return await cartItemModel.updateCartItem(cart_item_id, cartItem);
};

export const removeCartItem = async (
  cart_item_id: number
): Promise<boolean> => {
  return await cartItemModel.deleteCartItem(cart_item_id);
};
