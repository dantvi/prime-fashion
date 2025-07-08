import { Request, Response } from 'express';
import * as cartItemService from '../services/cartItem.service';
import { CartItem } from '../types/cartItem.type';
import { logError } from '../utilities/logger';

export const getAllCartItems = async (_: Request, res: Response) => {
  try {
    const cartItems = await cartItemService.findAllCartItems();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCartItemById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const cartItem = await cartItemService.findCartItemById(id);
    cartItem
      ? res.json(cartItem)
      : res.status(404).json({ message: 'Cart item not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCartItemsByCartId = async (req: Request, res: Response) => {
  const cartId = parseInt(req.params.id);
  try {
    const items = await cartItemService.findCartItemsByCartId(cartId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const createCartItem = async (req: Request, res: Response) => {
  const itemData = req.body as Omit<
    CartItem,
    'cart_item_id' | 'created_at' | 'updated_at'
  >;
  try {
    const id = await cartItemService.addCartItem(itemData);
    res.status(201).json({ message: 'Cart item created', id });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const itemData = req.body as Omit<
    CartItem,
    'cart_item_id' | 'created_at' | 'updated_at'
  >;
  try {
    const updated = await cartItemService.editCartItem(id, itemData);
    updated
      ? res.json({ message: 'Cart item updated' })
      : res.status(404).json({ message: 'Cart item not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await cartItemService.removeCartItem(id);
    deleted
      ? res.json({ message: 'Cart item deleted' })
      : res.status(404).json({ message: 'Cart item not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};
