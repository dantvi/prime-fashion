import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';
import { Cart } from '../types/cart.type';
import { logError } from '../utilities/logger';

export const getAllCarts = async (_: Request, res: Response) => {
  try {
    const carts = await cartService.findAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const cart = await cartService.findCartById(id);
    cart ? res.json(cart) : res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const createCart = async (req: Request, res: Response) => {
  const cartData = req.body as Omit<
    Cart,
    'cart_id' | 'created_at' | 'updated_at'
  >;
  try {
    const id = await cartService.addCart(cartData);
    res.status(201).json({ message: 'Cart created', id });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const incoming = req.body as Partial<
    Omit<Cart, 'cart_id' | 'created_at' | 'updated_at'>
  >;

  try {
    const existing = await cartService.findCartById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const toUpdate = {
      customer_id: incoming.customer_id ?? existing.customer_id,
      session_id: incoming.session_id ?? existing.session_id,
      active: incoming.active ?? existing.active,
    };

    const updated = await cartService.editCart(id, toUpdate);

    updated
      ? res.json({ message: 'Cart updated' })
      : res.status(400).json({ message: 'Failed to update cart' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await cartService.removeCart(id);
    deleted
      ? res.json({ message: 'Cart deleted' })
      : res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};
